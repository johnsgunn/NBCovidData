
// GLOBALS // 
// URLs for GNB ArcGIS endpoints
var CaseHistoryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyCaseStats2/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=DATE+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var ProvincialSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3D%27Province%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var ZoneSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3C%3E%27Province%27+AND+HealthZone%3C%3E%27Outside+NB%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=HealthZnEng+asc&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var CaseOriginURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZnEng%3D%27New+Brunswick%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=%5B%7B%22onStatisticField%22%3A%22TravelRel%22%2C%22outStatisticFieldName%22%3A%22TravelRel%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22ClsContct%22%2C%22outStatisticFieldName%22%3A%22ClsContct%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22CommTrnsmsn%22%2C%22outStatisticFieldName%22%3A%22CommTrnsmsn%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22UnderInves%22%2C%22outStatisticFieldName%22%3A%22UnderInves%22%2C%22statisticType%22%3A%22avg%22%7D%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
var DailyTestingURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19TestStatistics/FeatureServer/0/query?where=Category%3D%27Age%27&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var HospitalStatusAllURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Hospitals/FeatureServer/0/query?where=1%3D1&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=102100&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=true&returnM=true&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&objectIds=";

var VaccinationSummaryURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineData/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&sqlFormat=none&f=pjson&token=";
var VaccineTimetableURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyVaccineStats/FeatureServer/0/query?where=%28TotalReceivedENG+IS+NOT+NULL+OR+TotalExpectedENG+IS+NOT+NULL%29&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=Date+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=";
var VaccinationHistoryURL = VaccineTimetableURL;

var VaccinesByAgeGroupURL = 'https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineAge/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=';

// List of Exposures 
var ExposuresURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19_Exposures/FeatureServer/0/query?f=json&cacheHint=true&maxRecordCountFactor=4&resultOffset=0&resultRecordCount=8000&where=1%3D1&orderByFields=OBJECTID&outFields=*&outSR=102100&returnGeometry=false&spatialRel=esriSpatialRelIntersects";

// List of Adult Residental Facilities
var AdultResidentialFacilitiesListURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/AdultResidentialFacilities/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=";
var GEO_AdultResidentialFacilitiesListURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/AdultResidentialFacilities/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=";



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
var C_HospitalizationRate_7DayAverageURL = "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vS0RViSegmUaJQ8QsLBRdKxflonpyJdXP3oHbcRTyUINVBkJzQpJesbrpD0gL0dX6Lrb72RNJ4IbGbI/pubchart?oid=916870618&format=interactive";

var jsonOutput;
var currentReport;

var caseHistoryChart = null;
var vaccineHistoryChart = null;
var healthZoneChart = null;

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

function hideSummaryBoard(){
    var bodyHeader = document.getElementById("bodyHeader");
    bodyHeader.innerHTML = "";
    var board = document.getElementById("board1");
    board.innerHTML = "";
    board = document.getElementById("board2");
    board.innerHTML = "";
    board = document.getElementById("board3");
    board.innerHTML = "";
    board = document.getElementById("board4");
    board.innerHTML = "";

    if (caseHistoryChart != null && vaccineHistoryChart != null){
        caseHistoryChart.destroy();
        vaccineHistoryChart.destroy();
    }
    
}

function showCaseHistoryChart(){

}

function html_table_to_excel(tableName){
    var type = 'xlsx';

    var data = document.getElementById(tableName);

    var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

    XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

    XLSX.writeFile(file, 'NBCovidData.' + type);
}

function showDashboard(){
    hideSummaryBoard(); // clear previous data
    hideExportButton();

    var dataDisplay = document.getElementById("dashboard");
    dataDisplay.innerHTML = ""; // clear text area

    GetDataFromUrl(ProvincialSummaryURL, "showCaseSummary", "ProvincialSummary");
    GetDataFromUrl(VaccinationSummaryURL, "showVaccineSummary", "VaccinationSummary");
    GetDataFromUrl(CaseHistoryURL,"showCaseHistoryChart","CaseHistory");
    GetDataFromUrl(VaccinationHistoryURL,"showVaccineHistoryChart","VaccineHistory");
    GetDataFromUrl(ZoneSummaryURL,"showHealthZoneChart","ZoneSummary");

    var currentRate = document.createElement("p");
    
    // currentRate.innerHTML = "<div class='row justify-content-md-center'>"+
    //                         "<div class='col col-md-auto .align-middle'><object data='"+C_CaseRate_7DayAverageURL+"' width='600px' height='400px'></object></div>"+
    //                         "<div class='col col-md-auto .align-middle'><object data='"+C_HospitalizationRateURL+"' width='600px' height='400px'></object></div>"+
    //                         "</div>";

    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(currentRate);
}


function showCaseSummaryBoard(arcgis,name){
    json = ArcGIStoJSON(arcgis,name,false);
    var arr = [];
    sessionStorage.setItem(name,json);
    arr = JSON.parse(json); 	// Convert JSON to array.

    var col = []; // Contains our headers 

    for (var i = 0; i < arr[name].length; i++) {
        for (var key in arr[name][i]) {
            if (col.indexOf(key) === -1 
            && key.indexOf('OBJECTID') == -1
            && key.indexOf('Shape') == -1
            && key.indexOf('FID') == -1) {
                col.push(key);
            }
        }
    }
    
    var bodyHeader = document.getElementById("bodyHeader");
    bodyHeader.innerHTML = "";
    var board1 = document.getElementById("board1");
    var board2 = document.getElementById("board2");
    //var board3 = document.getElementById("board3");

    var header = document.createElement("col");
    header.setAttribute("class","col-md-auto");
    header.innerHTML = "<h1>New Brunswick Covid-19 Dashboard (Updated " + arr[name][0]['LastUpdateText'] + ")</h1>";

    var cases = document.createElement("p");
    cases.innerHTML =    
        "<table class='table table-hover table-bordered'>"+
            "<thead>"+
                "<tr class='table-primary'>"+
                    "<td colspan=2><h2>Cases</h2></td>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td><h3>New Cases</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['NewToday']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Active Cases</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['ActiveCases']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>New Recoveries</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['NewRecoveries']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Recoveries</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['Recovered']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Cases</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['TotalCases']+"</span></h3></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>";
        
    
    var hospitalizations = document.createElement("p");
    hospitalizations.innerHTML =  
    "<table class='table table-hover table-bordered'>"+
            "<thead>"+
                "<tr class='table-primary'>"+
                    "<td colspan=2><h2>Hospitalizations</h2></td>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td><h3>In Hospital</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['Hospitalised']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>In ICU</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['ICU']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Deaths</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['Deaths']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Hospitalized</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['TtlHospitald']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Discharged</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['DischHosp']+"</span></h3></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>";

    var caseSources = document.createElement("p");
    caseSources.innerHTML =  
    "<table class='table table-hover table-bordered'>"+
            "<thead>"+
                "<tr class='table-primary'>"+
                    "<td colspan=2><h2>Case Sources</h2></td>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td><h3>Close Contact</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['ClsContct']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Travel Related</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['TravelRel']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Community Transmission</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['CommTrnsmsn']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Under Investigation</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['UnderInves']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Tot. Discharged</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['DischHosp']+"</span></h3></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>";

    bodyHeader.appendChild(header);
    board1.appendChild(cases);
    board2.appendChild(hospitalizations);
    //board3.appendChild(caseSources);
}

function showVaccineSummaryBoard(arcgis,name){

    json = ArcGIStoJSON(arcgis,name,false);
    sessionStorage.setItem(name,json);
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var col = []; // Contains our headers 

    for (var i = 0; i < arr[name].length; i++) {
        for (var key in arr[name][i]) {
            if (col.indexOf(key) === -1 
            && key.indexOf('OBJECTID') == -1
            && key.indexOf('Shape') == -1
            && key.indexOf('FID') == -1) {
                col.push(key);
            }
        }
    }

    var board3 = document.getElementById("board3");

    var vaccinations = document.createElement("p");
    vaccinations.innerHTML =  
    "<table class='table table-hover table-bordered'>"+
            "<thead>"+
                "<tr class='table-primary'>"+
                    "<td colspan=2><h2>Vaccinations</h2></td>"+
                "</tr>"+
            "</thead>"+
            "<tbody>"+
                "<tr>"+
                    "<td><h3>One Dose</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['PopOneDose']+"</span> <span class='badge bg-secondary'>(" + arr[name][0]['PercentOneDose'] + "%)</td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Two Doses</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['PopSecondDose']+"</span> <span class='badge bg-secondary'>(" + arr[name][0]['PercentSecondDose'] + "%)</td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>Total Administered</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['TotalAdmin']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>New First Dose</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['NewFirstDose']+"</span></h3></td>"+
                "</tr>"+
                "<tr>"+
                    "<td><h3>New Second Dose</h3></td>"+
                    "<td><h3><span class='badge bg-secondary'>"+arr[name][0]['NewSecondDose']+"</span></h3></td>"+
                "</tr>"+
            "</tbody>"+
        "</table>";

    board3.appendChild(vaccinations);
}

function showCharts(chartName){
    hideExportButton();
    hideSummaryBoard();
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
        case "Hospitalizations":
            chartURL = C_HospitalizationRateURL;
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
    hideSummaryBoard();
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
        case "AdultResidentialFacilities":
            reportURL = AdultResidentialFacilitiesListURL;
            break;
        case "AdultResidentialFacilitiesGEO":
            reportURL = GEO_AdultResidentialFacilitiesListURL;
                break;
        default: // invalid selection
            exit;
    }

    StoreArcGisData(reportURL,reportName, true);  
    
    showExportButton();
}

function showMore (pageName) {
    hideSummaryBoard(); // clear previous data
    hideExportButton();

    pageName = pageName + ".html";
    var text = document.createElement("text");
    
    text.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object type='text/html' width=900 height=800 data='more/" + pageName + "' ></object></div>";
    var dataDisplay = document.getElementById("dashboard");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(text);
}

function createTableFromJSON(jsonData,name) {
    var arr = [];
    arr = JSON.parse(jsonData); 	// Convert JSON to array.

    var col = []; // Contains our headers 

    for (var i = 0; i < arr[name].length; i++) {
        for (var key in arr[name][i]) {
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
        for (var i = 0; i < arr[name].length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);        

            if (col[j] == 'Date' 
            || col[j] == 'DATE' 
            || col[j] == 'LastUpdateText'
            || col[j] == 'UpdateRecord'
            )// Fixing inconsistent date formats
            { 
                reportDate = new Date(arr[name][i][col[j]]);
                displayReportDate = reportDate.toISOString();
                displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

                tabCell.innerHTML = displayReportDate;
            }
            else {
                tabCell.innerHTML = arr[name][i][col[j]];
            }
        }
    }

    // Finally, add the dynamic table to a container.
    var divContainer = document.getElementById("dashboard");
    divContainer.innerHTML = "<h4>Report from GNB API: " + name + "</h4>";
    divContainer.appendChild(table);
}

function showCaseHistoryChart(jsonData,name) {
    json = ArcGIStoJSON(jsonData,name,false);
    var arr = [];
    sessionStorage.setItem(name,json);
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps.push({ x: arr[name][i]['DATE'], y: arr[name][i]['NewToday']});
    }

    var ctx = document.getElementById('chart1');
    caseHistoryChart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [{
                label: "New Cases",
                data:dps,
                borderWidth: 0,
                pointRadius: 0,
                fill: true,
                backgroundColor: "#ff6347"
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Daily Case History'
                }
            }
        }
    });
    caseHistoryChart.render();
}

function showVaccineHistoryChart(jsonData,name) {
    json = ArcGIStoJSON(jsonData,name,false);
    var arr = [];
    sessionStorage.setItem(name,json);
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['DoseAdminEng']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['FirstDose']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['SecondDose']});
    }

    var ctx = document.getElementById('chart3');
    vaccineHistoryChart = new Chart(ctx, {
        
        data: {
            datasets: [
            {
                type: "line",
                label: "Second Doses",
                data:dps3,
                borderWidth: 0,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#9966ff"
            },{
                type: "line",
                label: "First Doses",
                data:dps2,
                borderWidth: 0,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#66ffcc"
            },{
                type: "line",
                label: "Total Doses",
                data:dps1,
                borderWidth: 1,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#0066ff"
            }
            
        ]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Vaccination History'
                }
            }
        }
    });
    vaccineHistoryChart.render();
}

function showHealthZoneChart(jsonData,name) {
    json = ArcGIStoJSON(jsonData,name,false);
    var arr = [];
    sessionStorage.setItem(name,json);
    arr = JSON.parse(json); 	// Convert JSON to array.

    var chartLabels = [];
    var cases = [];
    for (var i=0 ; i < arr[name].length ; i++){
        chartLabels.push(arr[name][i]['HealthZnEng']);
        cases.push(arr[name][i]['ActiveCases']);
    }

    var ctx = document.getElementById('chart2');
    var data = {
        labels: [
            chartLabels[0],
            chartLabels[1],
            chartLabels[2],
            chartLabels[3],
            chartLabels[4],
            chartLabels[5],
            chartLabels[6]
        ],
        datasets: [{
            label: "Cases by Health Zone",
            data: cases,
            backgroundColor: [
                 '#9966ff',
                 '#99ffcc',
                 '#ff9966',
                 '#00ccff',
                 '#ff3399',
                 '#ffff99',
                 '#003300'
            ]
        }]
    }
    healthZoneChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Active Cases By Health Zone'
                },
                
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: true
                }
            }
        }
    });
    healthZoneChart.render();
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

function GetDataFromUrl(url,opt,name){

    // Create XMLHttpRequest object.
    var oXHR = new XMLHttpRequest();

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", url, true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.

            // Create an HTML table using response from server.
            switch (opt){
                case "showTable":
                    createTableFromJSON(this.responseText);
                    break;
                case "showCaseSummary":
                    showCaseSummaryBoard(this.responseText,name); // case summary 
                    break;
                case "showVaccineSummary":
                    showVaccineSummaryBoard(this.responseText,name); // vaccine summary
                    break;
                case "showCaseHistoryChart":
                    showCaseHistoryChart(this.responseText,name); 
                    break;
                case "showVaccineHistoryChart":
                    showVaccineHistoryChart(this.responseText,name);
                    break;
                case "showHealthZoneChart":
                    showHealthZoneChart(this.responseText,name);
                    break;
                default:
                    createTableFromJSON(this.responseText);
                    break;
            }            
        }
    }
}


// STORING ARCGIS DATA TO JSON FILES //

function ArcGIStoJSON(ArcGISData,jsonName,displayData){
    var arr = [];
    arr = JSON.parse(ArcGISData); 	// Convert JSON to array.


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
                var value = arr['features'][i].attributes[col[j]];
                value = replaceAll(value,"\"","'"); // Sanitize quotes from JSON data
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

    if (displayData){
        createTableFromJSON(JSON.stringify(jsonOutput,null,2),jsonName);
        return null;
    }
    else{
        return JSON.stringify(jsonOutput,null,2);
    }
    
}

function StoreArcGisData(url,name,displayData){

    // Create XMLHttpRequest object.
    var oXHR = new XMLHttpRequest();
    var json;

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", url, true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.

            // Create an HTML table using response from server.
            ArcGIStoJSON(this.responseText,name,displayData);
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

function escapeRegExp(string) {
return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
    if (str != null){
        return str.toString().replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }
    else {
        return str;
    }
    
}