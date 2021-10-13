
// GLOBALS // 
// URLs for GNB ArcGIS endpoints
var CaseHistoryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyCaseStats2/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=DATE+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var ProvincialSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3D%27Province%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var ZoneSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3C%3E%27Province%27+AND+HealthZone%3C%3E%27Outside+NB%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=HealthZnEng+asc&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var CaseOriginURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZnEng%3D%27New+Brunswick%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=%5B%7B%22onStatisticField%22%3A%22TravelRel%22%2C%22outStatisticFieldName%22%3A%22TravelRel%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22ClsContct%22%2C%22outStatisticFieldName%22%3A%22ClsContct%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22CommTrnsmsn%22%2C%22outStatisticFieldName%22%3A%22CommTrnsmsn%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22UnderInves%22%2C%22outStatisticFieldName%22%3A%22UnderInves%22%2C%22statisticType%22%3A%22avg%22%7D%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var DailyTestingURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19TestStatistics/FeatureServer/0/query?where=Category%3D%27Age%27&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var HospitalStatusAllURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Hospitals/FeatureServer/0/query?where=1%3D1&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=102100&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=true&returnM=true&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&objectIds=";
var VaccinationSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineData/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&sqlFormat=none&f=pjson&token=";
var VaccinationHistoryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyVaccineStats/FeatureServer/0/query?where=SecondDose%3E0&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=Date+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var VaccineTimetableURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyVaccineStats/FeatureServer/0/query?where=%28TotalReceivedENG+IS+NOT+NULL+OR+TotalExpectedENG+IS+NOT+NULL%29&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=Date+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var VaccinesByAgeGroupURL = 'https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineAge/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=';
var ExposuresURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Exposures/FeatureServer/0/query?f=json&cacheHint=true&maxRecordCountFactor=4&resultOffset=0&resultRecordCount=8000&where=1%3D1&orderByFields=FID&outFields=*&outSR=102100&returnGeometry=false&spatialRel=esriSpatialRelIntersects";

// URLs for Google Charts
var C_CaseRate_7DayAverageURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0RViSegmUaJQ8QsLBRdKxflonpyJdXP3oHbcRTyUINVBkJzQpJesbrpD0gL0dX6Lrb72RNJ4IbGbI/pubchart?oid=1169786871&amp;format=interactive";
var C_DashboardURL = "https://docs.google.com/spreadsheets/u/1/d/1GyePBWpvLBIjWr7fxzwqoTyFy-nL_1tqK3gJWJ4LU5U/htmlembed?single=true&gid=2022522407&range=F1:H22";
var C_CaseHistoryURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ20y8noYktwJlkpyL0uMgM2QqWS_Kp2aZJVEYysI-pwTgjtouYR5GdPb51sT8fMeRDbhJpOu0PlVzp/pubchart?oid=393355124&format=interactive";
var C_VaccineHistoryURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ20y8noYktwJlkpyL0uMgM2QqWS_Kp2aZJVEYysI-pwTgjtouYR5GdPb51sT8fMeRDbhJpOu0PlVzp/pubchart?oid=1018446867&format=interactive";
var C_VaccineAgeGroupURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ20y8noYktwJlkpyL0uMgM2QqWS_Kp2aZJVEYysI-pwTgjtouYR5GdPb51sT8fMeRDbhJpOu0PlVzp/pubchart?oid=906887683&format=interactive";
var C_PediatricCasesURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0RViSegmUaJQ8QsLBRdKxflonpyJdXP3oHbcRTyUINVBkJzQpJesbrpD0gL0dX6Lrb72RNJ4IbGbI/pubchart?oid=705596724&format=interactive";
var C_CurrentRateURL = "https://docs.google.com/spreadsheets/u/1/d/1GyePBWpvLBIjWr7fxzwqoTyFy-nL_1tqK3gJWJ4LU5U/htmlembed?single=true&gid=2022522407&range=F1:L22";
var C_VaccinationTableURL = "https://docs.google.com/spreadsheets/u/1/d/1GyePBWpvLBIjWr7fxzwqoTyFy-nL_1tqK3gJWJ4LU5U/htmlembed?single=true&gid=2038645865&range=A1:J14";
var C_CurrentHospitalRateURL = "https://docs.google.com/spreadsheets/u/1/d/1GyePBWpvLBIjWr7fxzwqoTyFy-nL_1tqK3gJWJ4LU5U/htmlembed?single=true&gid=2022522407&range=J1:L13";
var C_HospitalizationRateURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0RViSegmUaJQ8QsLBRdKxflonpyJdXP3oHbcRTyUINVBkJzQpJesbrpD0gL0dX6Lrb72RNJ4IbGbI/pubchart?oid=1743702753&format=interactive";

var jsonOutput;
var currentReport;

function showExportButton(){
    let x = document.getElementById("export_row");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hideExportButton(){
    let x = document.getElementById("export_row");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function html_table_to_excel(tableName){
    var type = 'xlsx';

    var data = document.getElementById(tableName);

    var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

    XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

    XLSX.writeFile(file, 'NBCovidData.' + type);
}

function showDashboard(){
    hideExportButton();

    var currentRate = document.createElement("text");
    var caseAvg = document.createElement("text");
    var closeDiv = document.createElement("text");
    closeDiv.innerHTML = "</div>";
    
    currentRate.innerHTML = "<div class='row justify-content-md-center'>"+
                            "<div class='col col-md-auto .align-middle'><object data='"+C_CaseRate_7DayAverageURL+"' width='600px' height='400px'></object></div>"+
                            "<div class='col col-md-auto .align-middle'><object data='"+C_CaseHistoryURL+"' width='600px' height='400px'></object></div>"+
                            "</div>"+
                            "<div class='row justify-content-md-center'>"+
                            "<div class='col col-md-auto .align-middle'><object data='"+C_PediatricCasesURL+"' width='600px' height='400px'></object></div>"+
                            "<div class='col col-md-auto .align-middle'><object data='"+C_HospitalizationRateURL+"' width='600px' height='400px'></object></div>"+
                            "</div>";

    var dataDisplay = document.getElementById("dashboard");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(currentRate);
}

function showCharts(chartName){
    hideExportButton();
    var chartURL = "";
    var width = "600";
    var height = "400";

    switch(chartName){
        case "Dashboard":
            showDashboard();
            return 0;
            break;
        case "CaseRate_7DayAverage":
            chartURL = C_CaseRate_7DayAverageURL;
            break;
        case "CaseHistory":
            chartURL = C_CaseHistoryURL;
            break;
        case "VaccineHistory":
            chartURL = C_VaccineHistoryURL;
            break;
        case "VaccineAgeGroup":
            chartURL = C_VaccinationTableURL;
            width = "1050";
            break;
        case "PediatricCases":
            chartURL = C_PediatricCasesURL;
            break;
        case "CaseRate_Table":
            chartURL = C_CurrentRateURL;
            width = "700";
            height = "600";
            break;
        default: // invalid selection
            exit;
    }

    var text = document.createElement("text");
    
    text.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object data='"+chartURL+"' width='"+width+"px' height='"+height+"px'></object></div>";

    var dataDisplay = document.getElementById("dashboard");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(text);
}

function showArcGis(reportName){
    var reportURL = "";
    currentReport = reportName;
    switch (reportName){
        case "CaseHistory":
            reportURL = CaseHistoryURL;
            break;
        case "ProvincialSummary":
            reportURL = ProvincialSummaryURL;
            break;
        case "ZoneSummary":
            reportURL = ZoneSummaryURL;
            break;
        case "CaseOrigin":
            reportURL = CaseOriginURL;
            break;
        case "DailyTesting":
            reportURL = DailyTestingURL;
            break;
        case "VaccinationSummary":
            reportURL = VaccinationSummaryURL;
            break;
        case "HospitalStatusAll":
            reportURL = HospitalStatusAllURL;
            break;
        case "VaccinationHistory":
            reportURL = VaccinationHistoryURL;
            break;
        case "VaccinationTimetable":
            reportURL = VaccineTimetableURL;
            break;
        case "VaccinationAgeGroups":
            reportURL = VaccinesByAgeGroupURL;
            break;
        case "Exposures":
            reportURL = ExposuresURL;
            break;
        default: // invalid selection
            exit;
    }


    GetDataFromUrl(reportURL);
    StoreArcGisData(reportURL,reportName);
    showExportButton();
}

function showMore (pageName) {
    pageName = pageName + ".html";
    var text = document.createElement("text");
    
    text.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object type='text/html' width=900 height=490 data='more/" + pageName + "' ></object></div>";
    var dataDisplay = document.getElementById("dashboard");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(text);
}

function createTableFromJSON(jsonData) {
    var arr = [];
    arr = JSON.parse(jsonData); 	// Convert JSON to array.

    var col = []; // Contains our headers 

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

    // Create a dynamic table.
    var table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('table-striped');
    table.classList.add('table-hover');
    table.classList.add('table-bordered');

    table.id = 'tblData';
    
    // Create table header.
    var tr = table.insertRow(-1);                   // Table row.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // Table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // Add JSON to the table rows.
    for (var i = 0; i < arr['features'].length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);        

            if (col[j] == 'Date' 
            || col[j] == 'DATE' 
            || col[j] == 'LastUpdateText'
            || col[j] == 'UpdateRecord'
            )// Fixing inconsistent date formats
            { 
                reportDate = new Date(arr['features'][i].attributes[col[j]]);
                displayReportDate = reportDate.toISOString();
                displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

                tabCell.innerHTML = displayReportDate;
            }
            else {
                tabCell.innerHTML = arr['features'][i].attributes[col[j]];
            }
        }
    }

    // Finally, add the dynamic table to a container.
    var divContainer = document.getElementById("dashboard");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function GetDataFromUrlToTable(url){
     // Create XMLHttpRequest object.
     var oXHR = new XMLHttpRequest();
     var retTable = document.createElement("table");

     // Initiate request.
     oXHR.onreadystatechange = reportStatus;
     oXHR.open("GET", url, true);  // get json file.
     oXHR.send();
 
     function reportStatus() {
         if (oXHR.readyState == 4) {		// Check if request is complete.
 
             // Create an HTML table using response from server.
             retTable = createObjectFromJSON(this.responseText);
         }
     }

     return retTable;
}

function GetDataFromUrl(url){

    // Create XMLHttpRequest object.
    var oXHR = new XMLHttpRequest();

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", url, true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.

            // Create an HTML table using response from server.
            createTableFromJSON(this.responseText);
        }
    }
}


// STORING ARCGIS DATA TO JSON FILES //

function ArcGIStoJSON(ArgGISdata,jsonName){
    var arr = [];
    arr = JSON.parse(ArgGISdata); 	// Convert JSON to array.

    // Create new json collection
    var jsonText = '{ "' + jsonName + '" : [';

    var col = []; // Contains our headers 

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
                jsonRow +=  '"' + col[j] + '":"' + arr['features'][i].attributes[col[j]] + '"';
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
    console.log(jsonOutput);
}

function StoreArcGisData(url,name){

    // Create XMLHttpRequest object.
    var oXHR = new XMLHttpRequest();

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", url, true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.

            // Create an HTML table using response from server.
            ArcGIStoJSON(this.responseText,name);
        }
    }
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