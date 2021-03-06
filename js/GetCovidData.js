// Get Covid-19 Data from the GNB Endpoint API // 

async function preloadData(){
    showElement('loadingSpinner');

    try {
        // Load out endpoints into session on refresh
        caseSummaryJSON = await checkGetDataJSON('CaseSummary',ProvincialSummaryURL,true);
        vaccinationSummaryJSON = await checkGetDataJSON('VaccinationSummary',VaccinationSummaryURL,true);
        caseHistoryJSON = await checkGetDataJSON('CaseHistory',CaseHistoryURL,true);
        vaccineHistoryJSON = await checkGetDataJSON('VaccineHistory',VaccineTimetableURL,true);
        schoolsSummaryJSON = await checkGetDataJSON('SchoolsSummary',SchoolsDataURL,true);
        caseRatesJSON = await checkBuildDataSet("caseRates",true);
        caseStatusJSON = await checkGetDataJSON('CaseVaccinationStatus',VaccinationRatesURL,true);   
        hospitalStatusAllJSON = await checkGetDataJSON("HospitalStatusAll",HospitalStatusAllURL, true);
        covidHospitalJSON = await checkGetDataJSON('CovidHospitalSummary', CovidHospitalSummaryURL, true);
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
    }
    
    
    
}

// Load in the background into session
async function backgroundLoadData(){
    schoolsListJSON = await checkGetDataJSON('SchoolsList',SchoolsListURL,true);
    healthZoneJSON = await checkGetDataJSON('HealthZoneSummary',ZoneSummaryURL,true);
    dailyTestingJSON = await checkGetDataJSON("dailyTesting",DailyTestingURL,true);
    vaccineAgeGroupsJSON = await checkGetDataJSON("vaccineAgeGroups",VaccinesByAgeGroupURL,true);    
    hospitalRatesJSON = await checkBuildDataSet("hospitalRates",true);
    icuRatesJSON = await checkBuildDataSet("icuRates",true);
    caseAgeRatesJSON = await checkBuildDataSet("caseAgeRates",true);

    document.getElementById("circuitBreakerMap").href = CircuitBreakerMapURL;
}


function html_table_to_excel(tableName){
    var type = 'xlsx';

    var data = document.getElementById(tableName);

    var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

    XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

    XLSX.writeFile(file, 'NBCovidData.' + type);
}


function Get(url){
    var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;           
}

async function checkGetDataJSON(name,url,forceReload=false){
    return new Promise((resolve,reject)=>{
        if (!sessionStorage.getItem(name) || forceReload){ // not yet stored
            var newData = Get(url);
            var json = convertArcGIStoJSON(newData,name); // returns stringified data
            sessionStorage.setItem(name,json);
        }   
        resolve(sessionStorage.getItem(name));
    })
}


function convertArcGIStoJSON(ArcGISData,jsonName){
    var arr = [];
    arr = JSON.parse(ArcGISData); 	// Convert JSON to array.

    // Create new json collection
    var jsonText = '{ "' + jsonName + '" : [';

    var col = []; // Contains our headers 

    // ID columns not needed, so discarding 
    for (var i = 0; i < arr['features'].length; i++) {
        for (var key in arr['features'][i].attributes) {
            if (col.indexOf(key) === -1 
            && key.indexOf('OBJECTID') == -1
            && key.indexOf('Shape') == -1
            && key.indexOf('FID') == -1) {
                col.push(key);
            }
        }
    }    
    // Add JSON to the table rows.
    for (var i = 0; i < arr['features'].length; i++) {

        // Open new row
        var jsonRow = '{ ';

        for (var j = 0; j < col.length; j++) { 

            if (col[j] == 'Date' 
            || col[j] == 'DATE' 
            || col[j] == 'LastUpdateText'
            || col[j] == 'UpdateRecord'
            )// Fixing inconsistent date formats
            { 
                reportDate = new Date(arr['features'][i].attributes[col[j]]);
                displayReportDate = reportDate.toISOString();
                displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

                jsonRow +=  '"' + col[j] + '":"' + displayReportDate + '"';
            }
            else {
                var value = arr['features'][i].attributes[col[j]]; 
                value = sanitizeJSON(value);             
                jsonRow +=  '"' + col[j] + '":"' + value + '"';
            }
            if (j < col.length -1) {jsonRow += ',';}  
        }

        // Close new row
        jsonRow += '}';        
        if (i < arr['features'].length -1) {jsonRow += ',';} 
        
        // Append row to collection
        jsonText += jsonRow;
    }

    // Close json collection
    jsonText += ']}';

    jsonOutput = JSON.parse(jsonText);
    
    return JSON.stringify(jsonOutput,null,2);
}

function downloadJSON(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonOutput,null,2));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", currentReport + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function sanitizeJSON(unsanitized){	
    if (unsanitized != null){
        var string = unsanitized.toString();
         return string.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f")
               .replace(/"/g, '\\"')
               .replace(/[\u0000-\u0019]+/g,"");
    }
    else {
        return "";
    }
}