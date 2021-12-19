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
            chartJSON = await checkBuildDataSet("caseAgeRates");
            showPedCasesChart(chartJSON,'caseAgeRates',"chart1");
            break;
        case "caseTrends":
            showCaseTrendsChart(caseRatesJSON,'caseRates',"chart1");
            break;
        case "hospitalTrends":
            showCaseTrendsChart(hospitalRatesJSON,'hospitalRates',"chart1");
            break;
        case "icuTrends":
            showCaseTrendsChart(icuRatesJSON,'icuRates',"chart1");
            break;
        case "schoolList":
            showSchoolListBoard(schoolsListJSON,"SchoolsList",'dataTableSmall');
            break;
        case "VaccineAgeGroups":
            showVaccineAgeChart(vaccineAgeGroupsJSON,"VaccineAgeGroups","chart1");
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
            chartJSON = await checkBuildDataSet("caseAgeRates");
            showPedCasesChart(chartJSON,'caseAgeRates',"largeChart");
            break;
        case "caseAgeGroups":
            chartJSON = await checkBuildDataSet("caseAgeRates");
            showAgeCaseChart(chartJSON,'caseAgeRates',"largeChart");
            break;
        case "caseTrends":
            showCaseTrendsChart(caseRatesJSON,'caseRates',"largeChart");
            break;
        case "schoolList":
            showSchoolListBoard(schoolsListJSON,"SchoolsList",'dataTableContainer');
            break;
        case "VaccineAgeGroups":
            showVaccineAgeChart(vaccineAgeGroupsJSON,"VaccineAgeGroups","largeChart");
            break;
        case "hospitalTrends":
            showCaseTrendsChart(hospitalRatesJSON,'hospitalRates',"largeChart");
            break;
        case "icuTrends":
            showCaseTrendsChart(icuRatesJSON,'icuRates',"largeChart");
            break;
        case "VaccineAgeCount":
            chartJSON = await checkBuildDataSet('vaccineAgeGroupCount');
            showVaccineAgeCountChart(chartJSON, 'VaccineAgeCount', 'largeChart');
            break;
        case "CaseRate":
            chartJSON = await checkBuildDataSet('dailyCaseRates');
            showDailyCaseRatesChart(chartJSON,'DailyCaseRate','largeChart');
            break;
        case "hospitalTrends_GNB":
            //chartJSON = await checkBuildDataSet('HospitalTrends');
            chartJSON = await checkGetDataJSON('HospitalTrends',hospitalTrendsURL,true);
            console.log(chartJSON);
            showHospitalTrendsChart(chartJSON,'HospitalTrends','largeChart');
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
            createTableFromJSON(JSON.stringify(pediatricCases,null,2),name,"desc");
            break;
        case "caseTrends":
            createTableFromJSON(JSON.stringify(caseTrends,null,2),name,"desc");
            break;
        case "hospitalCases":
            createTableFromJSON(JSON.stringify(hospitalCases,null,2),name,"desc");
            break;
        case "hospitalRates":            
            showGenerateData("hospitalRates");
            break;
        case "icuCases":
            createTableFromJSON(JSON.stringify(icuCases,null,2),name,"desc");
            break;
        case "icuRates":            
            showGenerateData("icuRates");
            break;
        case "vaccineAgeGroupHistory":
            createTableFromJSON(JSON.stringify(vaccineAgeGroupHistory,null,2),name,"desc");            
            break;
        case "vaccineAgeGroupCount":
            showGenerateDate("vaccineAgeGroupCount");
            break;
        case "caseRateByVaccineStatus":
            /// TODO: Build table based on new API call for cases based on vaccine status
            break;
        default: 
            break;
    }
}

function showChartsDisplay(){
    hideAll();
    showElement("large_chart");
    showFullSizeChart('caseTrends');
}
async function showArcGis_FromLink(url){
    // replace pbf with json in link
    var jsonUrl = url.replace("pbf","json");
    jsonUrl = jsonUrl.replace("html","json");

    var name = url.split('services/').pop().split('/FeatureServer')[0];

    var tableData = await checkGetDataJSON(name,jsonUrl,true);
    createTableFromJSON(tableData,name,"asc","tableRow","tableContainer");
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
        case "CaseVaccinationStatus":
            url = VaccinationRatesURL;
            break;
        case "CaseAgeStats":
            url = caseAgeStatsURL;
            break;
        case "HospitalTrends":
            url = hospitalTrendsURL;
            break;
        default: // invalid selection
            exit;
    }

    var tableData = await checkGetDataJSON(name,url,true);
    createTableFromJSON(tableData,name);
    hideElement("loadingSpinner");
}

function loadArcGisFeatures (jurisdiction) {
    var select = document.getElementById('arcgis_features');
    select.innerHTML = "";

    var features = arcgis_features[jurisdiction.value];

    features.forEach(function (item,index){
            var option = document.createElement("option");
            option.text = item['FeatureName'];
            select.add(option,select[index+1]);
        }
    )

    showElement('arcgis_features');

}

async function showArcGis_FromFeatures(feature, jurisdiction){
    var arcGisBase = "";
    switch (jurisdiction){
        case "britishcolumbia":
            arcGisBase = acrgisBC;
            break;
        case "newbrunswick":
            arcGisBase = arcgisNB;
            break;
        case "novascotia":
            arcGisBase = arcgisNS;
            break;
        default: 
            exit();
            break;
    }
    // build url from passed feature
    var url = arcGisBase + feature + arcgisOptions;

    await showArcGis_FromLink(url);

}