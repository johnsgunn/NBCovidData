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