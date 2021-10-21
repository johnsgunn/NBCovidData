
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

// List of School Data
var SchoolsDataURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19SchoolsData/FeatureServer/0/query?f=json&cacheHint=true&resultOffset=0&resultRecordCount=50&where=1%3D1&outFields=*&resultType=standard&returnGeometry=false&spatialRel=esriSpatialRelIntersects";
var SchoolsCountURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19NBSchools/FeatureServer/0/query?f=html&returnIdsOnly=true&returnCountOnly=true&spatialRel=esriSpatialRelIntersects&where=1%3D1";
var SchoolsImpactedURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19NBSchools/FeatureServer/0/query?f=html&returnIdsOnly=true&returnCountOnly=true&spatialRel=esriSpatialRelIntersects&where=TotalSchoolsImpacted%20%3D%20%27Yes%27";
var SchoolsListURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19NBSchools/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=strnm+ASC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=4000&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=";
var SchoolsListXYURL = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19NBSchools/FeatureServer/0/query?f=json&cacheHint=true&maxRecordCountFactor=4&resultOffset=0&resultRecordCount=8000&where=TotalSchoolsImpacted%20%3D%20%27Yes%27&orderByFields=OBJECTID&outFields=OBJECTID%2CTotalSchoolsImpacted&outSR=102100&spatialRel=esriSpatialRelIntersects";

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

// URLs for Google CSVs
var CSV_PedData = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0RViSegmUaJQ8QsLBRdKxflonpyJdXP3oHbcRTyUINVBkJzQpJesbrpD0gL0dX6Lrb72RNJ4IbGbI/pub?gid=913983582&single=true&output=csv";


var jsonOutput;
var currentReport;

var caseHistoryChart = null;
var vaccineHistoryChart = null;
var healthZoneChart = null;
var largeChart = null;
var pedCasesChart = null;
var caseTrendsChart = null;

var darkMode = false;

const chartTextColor = "#f2f2f2";
const chartGridColor = "#999999";
const canvasBG = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'dimgray';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  var caseSummaryJSON = null;
  var healthZoneJSON = null;
  var vaccinationSummaryJSON = null;
  var caseHistoryJSON = null;
  var vaccineHistoryJSON = null;
  var schoolsSummaryJSON = null;
  var schoolsListJSON = null;

async function preloadData(){
    showElement('loadingSpinner');

    // Load out endpoints into session on refresh
    caseSummaryJSON = await checkGetDataJSON('CaseSummary',ProvincialSummaryURL,true);
    vaccinationSummaryJSON = await checkGetDataJSON('VaccinationSummary',VaccinationSummaryURL,true);
    caseHistoryJSON = await checkGetDataJSON('CaseHistory',CaseHistoryURL,true);
    vaccineHistoryJSON = await checkGetDataJSON('VaccineHistory',VaccinationHistoryURL,true);
    healthZoneJSON = await checkGetDataJSON('HealthZoneSummary',ZoneSummaryURL,true);
    schoolsSummaryJSON = await checkGetDataJSON('SchoolsSummary',SchoolsDataURL,true);
    schoolsListJSON = await checkGetDataJSON('SchoolsList',SchoolsListURL,true);

    hideElement('loadingSpinner');
}

function hideAll(){
    let elementList = [
        'export_row',
        'bodyRow',
        'summaryDashboard',
        'large_chart',
        'dashboard',
        'loadingSpinner',
        'dataTableContainer'
    ];

    // Reset divs
    for (var i = 0; i < elementList.length ; i++){
        let x = document.getElementById(elementList[i]);
        x.classList.add('hidden');
    }

    destroyCharts();
}

function destroyCharts(){
    // Destroy charts 
    if (caseHistoryChart) caseHistoryChart.destroy();
    if (vaccineHistoryChart) vaccineHistoryChart.destroy();
    if (healthZoneChart) healthZoneChart.destroy();
    if (pedCasesChart) pedCasesChart.destroy();
    if (largeChart) largeChart.destroy();
}

function showElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.remove('hidden');
}

function hideElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.add('hidden');
}

function toggleDarkMode(){
    var body = document.querySelector('body');
    var navbar = document.getElementById('nav');
    var tableBody = document.getElementsByTagName("tbody");
    var footer = document.getElementById('footer');
    var h4 = document.getElementsByTagName("h4");
    var tableHead = document.getElementsByTagName("thead");

    if (darkMode){
        darkMode = false;
        body.style.backgroundColor = 'white';
        navbar.classList.remove('bg-secondary');
        navbar.classList.add('bg-dark');
        footer.classList.remove('text-light');
        footer.classList.add('text-dark');

        for (let i = 0 ; i < tableBody.length ; i++){
            tableBody[i].classList.remove('text-light');
            tableBody[i].classList.add('text-dark');
        }
        for (let i = 0 ; i < tableHead.length ; i++){            
            tableHead[i].classList.add('text-dark');
            tableHead[i].classList.remove('text-light');
        } 

        for (let i = 0 ; i < h4.length ; i++){
            h4[i].classList.remove('text-light');
            h4[i].classList.add('text-dark');
        }  
        
    }
    else {
        
        darkMode = true;
        body.style.backgroundColor = '#292b2c';
        navbar.classList.remove('bg-dark');
        navbar.classList.add('bg-secondary');
        footer.classList.remove('text-dark');
        footer.classList.add('text-light');

        for (let i = 0 ; i < tableBody.length ; i++){
            tableBody[i].classList.remove('text-dark');
            tableBody[i].classList.add('text-light');
        } 
        for (let i = 0 ; i < tableHead.length ; i++){
            tableHead[i].classList.remove('text-dark');
            tableHead[i].classList.add('text-light');
        } 
        
        for (let i = 0 ; i < h4.length ; i++){
            h4[i].classList.remove('text-dark');
            h4[i].classList.add('text-light');
        }   
         
    }
}

function html_table_to_excel(tableName){
    var type = 'xlsx';

    var data = document.getElementById(tableName);

    var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

    XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

    XLSX.writeFile(file, 'NBCovidData.' + type);
}

async function showDashboard(firstLoad=false){
    if (firstLoad){
        await preloadData();
    }

    hideAll();
    
    showElement("summaryDashboard");

    showCaseSummaryBoard(caseSummaryJSON,'CaseSummary');
    showVaccineSummaryBoard(vaccinationSummaryJSON, "VaccinationSummary");
    showSchoolSummaryBoard(schoolsSummaryJSON,'SchoolsSummary');
    // showSchoolListBoard(schoolsListJSON,"SchoolsList");
    showCaseHistoryChart(caseHistoryJSON,'CaseHistory',"chart1");  
    // showVaccineHistoryChart(vaccineHistoryJSON,'VaccineHistory',"chart3");   
    
    var tableBody = document.getElementsByTagName("tbody");
    var tableHead = document.getElementsByTagName("thead");
    if (darkMode){
        for (let i = 0 ; i < tableBody.length ; i++){
            tableBody[i].classList.remove('text-dark');
            tableBody[i].classList.add('text-light');
        } 
        for (let i = 0 ; i < tableHead.length ; i++){
            tableHead[i].classList.remove('text-dark');
            tableHead[i].classList.add('text-light');
        } 
    }
    else{
        for (let i = 0 ; i < tableBody.length ; i++){            
            tableBody[i].classList.add('text-dark');
            tableBody[i].classList.remove('text-light');
        } 
        for (let i = 0 ; i < tableHead.length ; i++){            
            tableHead[i].classList.add('text-dark');
            tableHead[i].classList.remove('text-light');
        } 
    }    
}

function buildBoardTable(header,body){
    var table = 
    "<table class='table table-bordered'>"+
    "<thead>"+
        "<tr class='table-primary'>"+
            "<td colspan=2><h2>"+header+"</h2></td>"+
            "</tr>"+
        "</thead>"+
        "<tbody>";


    for (var i = 0; i < body.length ; i++){
        table += 
        "<tr>"+
            "<td><h3>"+body[i]["title"]+"</span></h3></td>"+
            "<td><h3><span class='badge bg-info'>"+body[i]["value"]+"</span></h3></td>"+
        "</tr>"
    }
    table += 
        "</tbody>"+
        "</table>";

    return table;
}


// Displays dashboard tables for Case Summary and Hospitalization Summary
// Data source: GNB API 
function showCaseSummaryBoard(json,name){
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var menuHeader = document.getElementById("menuHeader");
    menuHeader.innerHTML = "Last Updated: " + arr[name][0]['LastUpdateText'];
    var board1 = document.getElementById("board1");
    board1.innerHTML = "";
    var board2 = document.getElementById("board2");
    board2.innerHTML = "";

    var header = document.createElement("col");
    header.setAttribute("class","col-md-auto");
    header.innerHTML = "<h1>New Brunswick Covid-19 Dashboard (Updated " + arr[name][0]['LastUpdateText'] + ")</h1>";

    var tableHeader = "<div class='d-flex  justify-content-between'>Cases" +
    "<div class='d-flex justify-content-end'>" +
    "<button type='button' class='btn btn-charts btn-outline-primary' id='caseTrends' onclick='showDashboardChart(\"caseTrends\")'>View Trends</button>&nbsp;" +
    "<button type='button' class='btn btn-charts btn-outline-primary' id='caseHistory' onclick='showDashboardChart(\"caseHistory\")'>View History</button></div></div>";
    var tableBody = [];

    tableBody.push({title: "New Cases", value: arr[name][0]['NewToday']},
                    {title: "Active Cases", value: arr[name][0]['ActiveCases']},
                    {title: "New Recoveries", value: arr[name][0]['NewRecoveries']},
                    {title: "Tot. Recoveries", value: arr[name][0]['Recovered']},
                    {title: "Tot. Cases", value: arr[name][0]['TotalCases']},
                    );

    var cases = document.createElement("p");
    cases.innerHTML = buildBoardTable(tableHeader,tableBody);

    tableHeader = "Hospitalizations";
    tableBody = [];

    tableBody.push({title: "In Hospital", value: arr[name][0]['Hospitalised']},
                    {title: "In ICU", value: arr[name][0]['ICU']},
                    {title: "Tot. Deaths", value: arr[name][0]['Deaths']},
                    {title: "Tot. Hospitalized", value: arr[name][0]['TtlHospitald']},
                    {title: "Tot. Discharged", value: arr[name][0]['DischHosp']},
                    );
        
    
    var hospitalizations = document.createElement("p");
    hospitalizations.innerHTML = buildBoardTable(tableHeader,tableBody);

    board1.appendChild(cases);
    board2.appendChild(hospitalizations);
}

// Display dashboard table for Vaccination Summary
// Data source: GNB API
function showVaccineSummaryBoard(json,name){
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var board3 = document.getElementById("board3");
    board3.innerHTML = "";
    var tableHeader = "<div class='d-flex justify-content-between'>Vaccinations" +
    "<button type='button' class='btn btn-charts btn-outline-primary' id='VaccineHistory' onclick='showDashboardChart(\"VaccineHistory\")'>View History</button></div>";
    var tableBody = [];

    tableBody.push({title: "One Dose", value: arr[name][0]['PopOneDose']+"</span> <span class='badge bg-info'>(" + arr[name][0]['PercentOneDose'] + "%)"},
                    {title: "Two Doses", value: arr[name][0]['PopSecondDose']+"</span> <span class='badge bg-info'>(" + arr[name][0]['PercentSecondDose'] + "%)"},
                    {title: "Total. Administered", value: arr[name][0]['TotalAdmin']},
                    {title: "New First Dose", value: arr[name][0]['NewFirstDose']},
                    {title: "New Second", value: arr[name][0]['NewSecondDose']},
                    );

    var vaccinations = document.createElement("p");
    vaccinations.innerHTML = buildBoardTable(tableHeader,tableBody);

    board3.appendChild(vaccinations);
}

function showSchoolSummaryBoard(json,name){
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var board4 = document.getElementById("board4");
    board4.innerHTML = "";
    var tableHeader = "<div class='d-flex justify-content-between'>Schools" +
    "<div class='d-flex justify-content-end'>" +
    "<button type='button' class='btn btn-charts btn-outline-primary' id='pediatricCases' onclick='showDashboardChart(\"pediatricCases\")'>Pediatric Cases</button>&nbsp;" +
    "<button type='button' class='btn btn-charts btn-outline-primary' id='schoolList' onclick='showDashboardChart(\"schoolList\")'>View Exposures</button></div>";
    var tableBody = [];

    tableBody.push({title: "New Cases", value: arr[name][0]['NewCases']},
                    {title: "Total Cases <small>since 9/7/2021</small>", value: arr[name][0]['TotalCasesSince7Sept2021']},
                    {title: "New Schools Impacted", value: arr[name][0]['NewSchoolsImpacted']},
                    {title: "Active Schools Impacted", value: arr[name][0]['SchoolsActiveImpact']},
                    {title: "Schools with New Cases", value: arr[name][0]['SchoolswithNewCases']},
                    {title: "Total Schools Impacted", value: arr[name][0]['TotalSchoolsSince7Sept2021']},
                    );

    var schoolSummary = document.createElement("p");
    schoolSummary.innerHTML = buildBoardTable(tableHeader,tableBody);

    board4.appendChild(schoolSummary);
}

function showSchoolListBoard(json,name,loc){
    var arr = [];
    arr = JSON.parse(json);

    var tableHeader = ["School","District","City","Status","New Cases","Prev. Impacted"];
    var tableIndexes = ['strnm','strdst','strcm','SchoolStatus','NewCases','TotalSchoolsImpacted'];

    // Create a dynamic table.
    var table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('display');
    table.classList.add('nowrap');

    table.id = 'schoolListTable';

    // Create table header.
    var header = table.createTHead();    
    var tr = header.insertRow(-1);                   // Table row.

    console.log(tableHeader.length);
    for (var i = 0; i < tableHeader.length; i++) {
        var th = document.createElement("th");      // Table header.
        th.innerHTML = tableHeader[i];
        tr.appendChild(th);
    }

    var body = table.createTBody();

    // Add JSON to the table rows.
    for (var i = 0; i < arr[name].length; i++) {
        tr = body.insertRow(-1);      

        for (var j = 0; j < tableHeader.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (arr[name][i][tableIndexes[j]] == ""){
                tabCell.innerHTML = "No";
            }
            else {
                tabCell.innerHTML = arr[name][i][tableIndexes[j]];
            }
            
        }          
    }

    var divContainer = document.getElementById(loc);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    $(document).ready(function() {
        $('#schoolListTable').DataTable({
            scrollX:        true,
            scrollCollapse: true,
            autoWidth:         true,  
             paging:         true, 
             columnDefs: [
                { "width": "150", "targets": [2] },
                { "width": "100", "targets": [3] },
                { "width": "75", "targets": [1,4,5] },
                { "width": "300", "targets": [0] }
              ]
    });
    } );    

    showElement(loc);
}


function showCharts(chartName){
    hideAll();
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

    showElement("bodyRow");

    var embeddedChart = document.createElement("p");
    
    embeddedChart.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object data='"+chartURL+"' width='"+width+"px' height='"+height+"px'></object></div>";

    var dataDisplay = document.getElementById("bodyRow");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(embeddedChart);
}

function showChartsDisplay(){
    hideAll();
    showElement("large_chart");
    showFullSizeChart('caseTrends');
}

async function showArcGis(name){
    hideAll();
    showElement("loadingSpinner");
    var url = "";
    currentReport = name;
    switch (name){
        case "CaseHistory":
            url = CaseHistoryURL;
            break;
        case "ProvincialSummary":
            url = ProvincialSummaryURL;
            break;
        case "HealthZoneSummary":
            url = ZoneSummaryURL;
            break;
        case "CaseOrigin":
            url = CaseOriginURL;
            break;
        case "DailyTesting":
            url = DailyTestingURL;
            break;
        case "VaccinationSummary":
            url = VaccinationSummaryURL;
            break;
        case "HospitalStatusAll":
            url = HospitalStatusAllURL;
            break;
        case "VaccinationHistory":
            url = VaccinationHistoryURL;
            break;
        case "VaccinationTimetable":
            url = VaccineTimetableURL;
            break;
        case "VaccinationAgeGroups":
            url = VaccinesByAgeGroupURL;
            break;
        case "Exposures":
            url = ExposuresURL;
            break;
        case "AdultResidentialFacilities":
            url = AdultResidentialFacilitiesListURL;
            break;
        case "AdultResidentialFacilitiesGEO":
            url = GEO_AdultResidentialFacilitiesListURL;
            break;
        case "SchoolsSummary":
            url = SchoolsDataURL;
            break;
        case "SchoolsList":
            url = SchoolsListURL;
            break;
        default: // invalid selection
            exit;
    }

    var tableData = await checkGetDataJSON(name,url,true);
    createTableFromJSON(tableData,name);
    hideElement("loadingSpinner");
}

function showCompiledData(name){
    hideAll();
    currentReport = name;

    switch (name){
        case "pediatricCases":
            createTableFromJSON(JSON.stringify(pediatricCases,null,2),name);
            break;
        case "caseHistory":
            createTableFromJSON(JSON.stringify(caseHistory,null,2),name);
        default: 
            break;
    }
}

function showMore (pageName) {
    hideAll();
    showElement("bodyRow");    

    pageName = pageName + ".html";
    var displayPage = document.createElement("p");
    
    displayPage.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object type='text/html' width=900 height=800 data='more/" + pageName + "' ></object></div>";
    var dataDisplay = document.getElementById("bodyRow");
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(displayPage);
}

// Converts json object to a table
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

    var tableTextColor = "text-dark";
    if (darkMode){
        tableTextColor = "text-light";
    }

    // Create a dynamic table.
    var table = document.createElement("table");
    table.classList.add('table');
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

    table.classList.add(tableTextColor);

    // Finally, add the dynamic table to a container.
    var divContainer = document.getElementById("bodyRow");
    divContainer.innerHTML = "<h4 class='" + tableTextColor + "'>Report from GNB Data: " + name + "</h4>";
    divContainer.appendChild(table);
    showElement("bodyRow");
    showElement("export_row");
}

// Render case history chart to specified location on page
// Data source: GNB API
function showCaseHistoryChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['DATE'], y: arr[name][i]['NewToday']});
        dps2.push({ x: arr[name][i]['DATE'], y: arr[name][i]['Active']});
    }

    var ctx = document.getElementById(loc);    
    if (caseHistoryChart) caseHistoryChart.destroy();

    caseHistoryChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
                {
                    label: "New Cases",
                    data:dps1,
                    borderWidth: 0,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: "#ff6347"
                },
                {
                    label: "Active Cases",
                    data:dps2,
                    borderWidth: 0,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: "#0099ff" 
                }
            ]
        },
        options: {                        
            scales: {
                yAxes: {
                    grid: {                        
                        color: chartGridColor
                    },
                    title: {
                        display: true,
                        text: 'Cases',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                xAxes: {
                    grid: {
                        drawOnChartArea: false,
                        color: chartGridColor
                    },
                    title: {
                        display: false,
                        text: 'Date',
                        color: chartTextColor,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Daily Case History',
                    color: chartTextColor
                },
                legend: {
                    display: true,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        },
        type: "line"        
    });
    caseHistoryChart.render();
}

// Render vaccine history chart to specified location on page
// Data source: GNB API
function showVaccineHistoryChart(json,name,loc) {    
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['DoseAdminEng']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['FirstDose']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['SecondDose']});
    }
    


    var ctx = document.getElementById(loc);
    if (vaccineHistoryChart) vaccineHistoryChart.destroy();
    vaccineHistoryChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
            {
                type: "line",
                label: "Second Doses",
                data:dps3,
                borderWidth: 1,
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
                yAxes: {
                    grid: {
                        color: chartGridColor
                    },
                    title: {
                        display: true,
                        text: 'Doses',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                xAxes: {
                    grid: {
                        drawOnChartArea: false,
                        color: chartGridColor
                    },
                    title: {
                        display: false,
                        text: 'Date',
                        color: chartTextColor,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Vaccination History',
                    color: chartTextColor
                },
                legend: {
                    display: true,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        }
    });
    vaccineHistoryChart.render();
}

// Render health zone chart to specified location on page
// Data source: GNB API
function showHealthZoneChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    console.log(arr);

    var chartLabels = [];
    var cases = [];
    for (var i=0 ; i < arr[name].length ; i++){
        chartLabels.push(arr[name][i]['HealthZnEng']);
        cases.push(arr[name][i]['ActiveCases']);
    }

    var ctx = document.getElementById(loc);
    if (healthZoneChart) healthZoneChart.destroy();    

    healthZoneChart = new Chart(ctx, {
        type: "doughnut",
        data: {
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
        },
        plugins: [canvasBG],
        options: {    
            plugins: {
                title: {
                    display: true,
                    text: 'Active Cases By Health Zone',
                    color: chartTextColor
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: false,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        },
    });
    healthZoneChart.render();
}

// Render health zone chart to specified location on page
// Data source: GNB API
function showCaseTrendsChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=0 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['V 7 Day Avg']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['PV 7 Day Avg']});        
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['UV 7 Day Avg']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['New Cases']});
    }

    var ctx = document.getElementById(loc);
    if (largeChart) largeChart.destroy();
    const data = {
        datasets: [
        {
            type: "line",
            label: "Vaccinated Average",
            data:dps1,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#00ffff",
            tension: 0.1,
            backgroundColor: "#00ffff",
            yAxisID: 'y'
        },
        {
            type: "line",
            label: "Partially Vaccinated Average",
            data:dps2,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#00cc00",
            tension: 0.1,
            backgroundColor: "#00cc00",
            yAxisID: 'y' 
        },
        {
            type: "line",
            label: "Unvaccinated Average",
            data:dps3,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#ff9900",
            tension: 0.1,
            backgroundColor: "#ff9900",
            yAxisID: 'y'
        },            
        {
            type: "bar",
            label: "New Cases",
            data:dps4,
            borderWidth: 1,
            pointRadius: 1,
            fill: false,
            backgroundColor: "#000066",
            yAxisID: 'y1'
        }]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false, 
        },
        scales: {
            y: {
                grid: {
                    color: chartGridColor
                },
                display: true,
                type: 'linear',
                position: 'left',
                color: chartTextColor,
                title: {
                    display: true,
                    text: 'Case Average',
                    color: chartTextColor,
                    font: {
                        size: 15
                    },                        
                },
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
            }, 
            y1: {
                grid: {
                    drawOnChartArea: false,
                    color: chartGridColor
                },
                title: {
                    display: true,
                    text: 'New Cases',
                    color: chartTextColor,
                    font: {
                        size: 15
                    },                        
                },
                display: true,
                type: 'linear',
                position: 'right',
                color: chartTextColor,
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
                
            },   
            x: {
                grid: {
                    drawOnChartArea: false,
                    color: chartGridColor
                },
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
            }             
        },   
        plugins: {
            title: {
                display: true,
                text: 'NB Covid-19 Case Rate, 7-day Average',
                color: chartTextColor
            },
            legend: {
                display: true,
                position:'top',
                fullWidth: false,
                labels: {
                    color: chartTextColor
                }
            },
            filler: {
                propagate: true
            }
        }
    };

    largeChart = new Chart(ctx, {
        stacked: false, 
        data: data,
        options: options,
        plugins: [canvasBG]
    });
    largeChart.render();
}

function showPedCasesChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=0 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Cases Age < 10']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['7 Day Trend (Age < 10)']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Cases Age 10-19']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['7 Day Trend (Age 10-19)']});
    }

    var ctx = document.getElementById(loc);
    if (pedCasesChart) pedCasesChart.destroy();
    pedCasesChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
            {
                type: "line",
                label: "7 Day Trend (Age < 10)",
                data:dps2,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ff0000",
                tension: 0.1,
                backgroundColor: "#ff0000" 
            },
            {
                type: "line",
                label: "7 Day Trend (Age 10-19)",
                data:dps4,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#00cc00",
                backgroundColor: "#00cc00" 
            },
            {
                type: "bar",
                label: "Cases Age < 10",
                data:dps1,
                borderWidth: 1,
                pointRadius: 1,
                fill: false,
                backgroundColor: "#ffbbbb"
            },            
            {
                type: "bar",
                label: "Cases Age 10-19",
                data:dps3,
                borderWidth: 1,
                pointRadius: 1,
                fill: false,
                backgroundColor: "#b3ffb3"
            }
            
        ]
        },

        options: {
            scales: {
                y: {
                    grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Cases',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    },
                    beginAtZero: true
                },
                x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Pediatric Case Trends',
                    color: chartTextColor
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: false,
                    labels: {
                        color: chartTextColor
                    }
                }
            }
            
        }
    });
    pedCasesChart.render();
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

function selectedFullSizeChart (chartName){
    var charts = document.getElementsByClassName('btn-charts');

    for (let i = 0 ; i < charts.length ; i++){
        charts[i].classList.remove("btn-primary");
        charts[i].classList.add("btn-outline-primary");
    }


    var selectedButton = document.getElementById(chartName);
    selectedButton.classList.remove("btn-outline-primary");
    selectedButton.classList.add("btn-primary");
}

async function showDashboardChart(chartName){
    destroyCharts();
    hideElement('dataTableSmall');
    var chartJSON;

    switch (chartName){
        case "caseHistory":
            chartJSON = await checkGetDataJSON('caseHistory',CaseHistoryURL);
            showCaseHistoryChart(chartJSON,'caseHistory',"chart1");         
            break;
        case "VaccineHistory":
            chartJSON = await checkGetDataJSON('VaccineHistory',VaccinationHistoryURL);
            showVaccineHistoryChart(chartJSON,'VaccineHistory',"chart1");  
            break;
        case "HealthZoneSummary":
            chartJSON = healthZoneJSON;
            showHealthZoneChart(chartJSON,chartName,"chart1");
            break;
        case "pediatricCases":
            showPedCasesChart(JSON.stringify(pediatricCases,null,2),'pediatricCases',"chart1");
            break;
        case "caseTrends":
            showCaseTrendsChart(JSON.stringify(caseTrends,null,2),'caseTrends',"chart1");
            break;
        case "schoolList":
            showSchoolListBoard(schoolsListJSON,"SchoolsList",'dataTableSmall');
            break;
        default:
            // bad selection
            break;
    }   
}

// Display full sized chart on page
async function showFullSizeChart (chartName){
    // Clear and prep area
    hideAll();
    showElement("large_chart");

    selectedFullSizeChart(chartName);

    var chartJSON;

    switch (chartName){
        case "caseHistory":
            chartJSON = await checkGetDataJSON('caseHistory',CaseHistoryURL);
            showCaseHistoryChart(chartJSON,'caseHistory',"largeChart");         
            break;
        case "VaccineHistory":
            chartJSON = await checkGetDataJSON('VaccineHistory',VaccinationHistoryURL);
            showVaccineHistoryChart(chartJSON,'VaccineHistory',"largeChart");  
            break;
        case "HealthZoneSummary":
            chartJSON = healthZoneJSON;
            showHealthZoneChart(chartJSON,chartName,"largeChart");
            break;
        case "pediatricCases":
            showPedCasesChart(JSON.stringify(pediatricCases,null,2),'pediatricCases',"largeChart");
            break;
        case "caseTrends":
            showCaseTrendsChart(JSON.stringify(caseTrends,null,2),'caseTrends',"largeChart");
            break;
        case "schoolList":
            // showSchoolListBoard(JSON.stringify(schoolsListJSON,null,2),"SchoolsList");
            showSchoolListBoard(schoolsListJSON,"SchoolsList",'dataTableContainer');
            break;
        default:
            // bad selection
            break;
    }                
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
                if (jsonName == "SchoolsList"){value = sanitizeJSON(value);}                
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
        // return string.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f").replace(/"/g,"\\\"").replace(/'/g,"\\\'").replace(/\&/g, "\\&"); 
        return string.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f")
               .replace(/[\u0000-\u0019]+/g,"");
    }
    else {
        return "";
    }
}