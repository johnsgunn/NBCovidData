// Generate JSON Data for insertion into JSON objects in the dashboard //

function showGenerateData(){
    showElement("generate_row");
}

async function generateData(name,order="desc"){
    currentReport = name;
    hideAll();
    hideElement("generate_row");
    showElement("export_row");

    var jsonOutput = await checkBuildDataSet(name,true);
    createTableFromJSON(jsonOutput,name,order);
}

// Check for data in session, generate and store if not
// Then return data from session
async function checkBuildDataSet(name,forceReload=false){
    return new Promise((resolve,reject)=>{
        if (!sessionStorage.getItem(name) 
                || forceReload) { 
            switch (name){
                case "hospitalRates":
                    jsonOutput = buildHospitalCaseRate();
                    break;
                case "icuRates":
                    jsonOutput = buildIcuCaseRate();
                    break;
                case "caseRates":
                    jsonOutput = buildCaseRate();
                    break;
                case "caseAgeRates":
                    jsonOutput = buildCaseAgeTrends();
                    break;
                case "caseAgeHistory":
                    jsonOutput = buildCaseAgeRow();
                    break;
                case "vaccinesByAge":
                    jsonOutput = buildVaccineAgeRow();
                    break;
                case "vaccineAgeGroupCount":
                    jsonOutput = buildVaccineAgeCount();
                    break;
                default:
                    reject("Invalid selection");
                    break;
            }
            sessionStorage.setItem(name,JSON.stringify(jsonOutput,null,2));
        }   
        resolve(sessionStorage.getItem(name));
    })
}

function buildCaseAgeTrends(){
    var daily = {};
    var caseAgeRates = [];
    daily.caseAgeRates = caseAgeRates;

    var AgeTags = [
        '< 10',
        '10-19',
        '20-29',
        '30-39',
        '40-49',
        '50-59',
        '60-69',
        '70-79',
        '80-89',
        '90+'
    ];

    var NewCasesTags = [
        'New Cases < 10',
        'New Cases 10-19',
        'New Cases 20-29',
        'New Cases 30-39',
        'New Cases 40-49',
        'New Cases 50-59',
        'New Cases 60-69',
        'New Cases 70-79',
        'New Cases 80-89',
        'New Cases 90+'
    ];

    var TrendTags = [
        'Trend < 10',
        'Trend 10-19',
        'Trend 20-29',
        'Trend 30-39',
        'Trend 40-49',
        'Trend 50-59',
        'Trend 60-69',
        'Trend 70-79',
        'Trend 80-89',
        'Trend 90+'
    ];
    
    for (var i = 0 ; i < ageCases['ageCases'].length ; i++){
        var date = ageCases['ageCases'][i]['Date'];
        var Age_Cases = [];
        var Age_New_Cases = [];
        var Age_Trend_Cases = [];

        AgeTags.forEach(function (item,index) {
            var newCases = parseInt(ageCases['ageCases'][i][item]) || 0;
            var prevCases = 0;
            if (i > 0) {prevCases = parseInt(ageCases['ageCases'][i-1][item])} ;

            Age_Cases[item] = newCases;
            Age_New_Cases[item] = newCases - prevCases;  

            var newCasesSum = 0;

            if (i > 7){ // start generating averages 
                for (var j = i-1 ; j > i-8; j--){
                    var obj = daily.caseAgeRates[j] ;  
                    var tag = "New Cases " + item;                    
                    
                    newCasesSum += parseInt(obj[tag]);
                }                
            }
            Age_Trend_Cases[item] = Math.round(newCasesSum/7);
             

        });

        var row = {};

        row['Date'] = date;

        for (var j = 0 ; j < AgeTags.length ; j++){
            var caseColumn = [NewCasesTags[j]];
            var trendColumn = [TrendTags[j]];
            var ageColumn = [AgeTags[j]];
            
            row[ageColumn] = Age_Cases[AgeTags[j]] ;
            row[caseColumn] = Age_New_Cases[AgeTags[j]];
            row[trendColumn] = Age_Trend_Cases[AgeTags[j]];
        }
       
        daily.caseAgeRates.push(row);
    }

    return daily;

}

function buildVaccineAgeCount() {
    var AgeTags = [
        "12-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-64",
        "65-69",
        "70-74",
        "75-79",
        "80-84",
        "85+"
    ];

    var daily = {};
    var vaccineAgeGroupCount = [];
    daily.vaccineAgeGroupCount = vaccineAgeGroupCount;
    
    var vaccineAgePercent = JSON.parse(vaccineAgeGroupsJSON);
    var population = agePopulation;

    AgeTags.forEach(function (item, index) {
        var row = {};
        var groupPopulation = parseInt(population['agePopulation'][index]['populationSize']);
        row["Age Group"] = item;
        row["Population"] = groupPopulation;
        row["1st Dose Percent"] = parseInt(vaccineAgePercent['vaccineAgeGroups'][index]['FirstDose']) / 100;
        row["2nd Dose Percent"] = parseInt(vaccineAgePercent['vaccineAgeGroups'][index]['SecondDose']) / 100;

        
        row["1st Dose Count"] = parseInt(groupPopulation * row["1st Dose Percent"]);
        row["2nd Dose Count"] = parseInt(groupPopulation * row["2nd Dose Percent"]);

        row["Fully Vaccinated"] = row["2nd Dose Count"];
        row["Partially Vaccinated"] = row["1st Dose Count"] - row["2nd Dose Count"];
        row["Unvaccinated"] = groupPopulation - row["1st Dose Count"];

        daily.vaccineAgeGroupCount.push(row);
    });

    return daily;

}

// JSON row for today's data to be able to save more easily
function buildCaseAgeRow(){
    var daily = {};
    var caseAgeHistory = [];
    daily.caseAgeHistory = caseAgeHistory;

    var AgeTags = [
        '< 10',
        '10-19',
        '20-29',
        '30-39',
        '40-49',
        '50-59',
        '60-69',
        '70-79',
        '80-89',
        '90+'
    ];

    var row = {};
    var positiveTests = JSON.parse(dailyTestingJSON);

    AgeTags.forEach(function (item,index) {
        row[item] = parseInt(positiveTests['dailyTesting'][index]['PostiveTests1']);
    });

    daily.caseAgeHistory.push(row);

    return daily;
}

// JSON row for today's data to be able to save more easily
function buildVaccineAgeRow(){
    var daily = {};
    var vaccinesByAge = [];
    daily.vaccinesByAge = vaccinesByAge;

    var AgeTags = [
        '12-19',
        '20-29',
        '30-39',
        '40-49',
        '50-59',
        '60-64',
        '65-69',
        '70-74',
        '75-79',
        '80-84',
        '85+'
    ];

    var row = {};
    var doses = JSON.parse(vaccineAgeGroupsJSON);

    AgeTags.forEach(function (item,index) {
        var firstDose = item + " 1st Dose";
        var secondDose = item + " 2nd Dose";

        row[firstDose] = parseFloat(doses['vaccineAgeGroups'][index]['FirstDose']);
        row[secondDose] = parseFloat(doses['vaccineAgeGroups'][index]['SecondDose']);
    });

    daily.vaccinesByAge.push(row);

    return daily;
}

// Hospital Cases - Build Rate Per Pop plus 7 Day Average
function buildHospitalCaseRate(){
    var daily = {};
    var hospitalRates = [];
    daily.hospitalRates = hospitalRates;

    vaccinationArr = JSON.parse(vaccineHistoryJSON);

    // Hospitalizations 

    for (var i = 0 ; i < hospitalCases['hospitalCases'].length ; i++){
        var date = hospitalCases['hospitalCases'][i]['Date'];
        var admitted = parseInt(hospitalCases['hospitalCases'][i]['Admitted']);
        var fvCases = parseInt(hospitalCases['hospitalCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(hospitalCases['hospitalCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(hospitalCases['hospitalCases'][i]['Unvaccinated']) || 0;

        // Populations 
        var secondDosePop = vaccinationArr['VaccineHistory'][i].SecondDose;
        var firstDosePop = vaccinationArr['VaccineHistory'][i].FirstDose;

        var fvPop = parseInt(secondDosePop);
        var pvPop = parseInt(firstDosePop) - fvPop;
        var uvPop = 780000 - fvPop - pvPop;
        var uvEligiblePop = 696000 - fvPop - pvPop;

        var fvRate = Math.round((fvCases/fvPop) * 100000);
        var pvRate = Math.round((pvCases/pvPop) * 100000);
        var uvRate = Math.round((uvCases/uvEligiblePop) * 100000); // Eligible as no cases are under 19

        var fvRateTrend = fvCases;
        var pvRateTrend = pvCases;
        var uvRateTrend = uvCases;

        if (i > 6){ // start generating averages 
            var fvSum = 0;
            var pvSum = 0;
            var uvSum = 0;            

            for (var j = i-1 ; j > i-7; j--){
                var obj = daily.hospitalRates[j];           
                
                fvSum += obj["Fully Vaccinated"];;
                pvSum += obj["Partially Vaccinated"];
                uvSum += obj["Unvaccinated"];
            }

            fvRateTrend = Math.round(fvSum/7);
            pvRateTrend = Math.round(pvSum/7);
            uvRateTrend = Math.round(uvSum/7);
        }

        var row = {
            "Date": date,
            "Admitted": admitted,
            "Fully Vaccinated": fvRate,
            "Fully Vaccinated Trend": fvRateTrend,
            "Partially Vaccinated": pvRate,
            "Partially Vaccinated Trend": pvRateTrend,
            "Unvaccinated": uvRate,
            "Unvaccinated Trend": uvRateTrend
        };

        daily.hospitalRates.push(row);
    }
    return daily;
}

// ICU Cases - Build Rate Per Pop plus 7 Day Average
function buildIcuCaseRate(){
    var daily = {};
    var icuRates = [];
    daily.icuRates = icuRates;

    vaccinationArr = JSON.parse(vaccineHistoryJSON);

    // ICU Cases
    // fv = fully vaccinated, pv = partially vaccinated, uv = unvaccinated  
    for (var i = 0 ; i < icuCases['icuCases'].length ; i++){
        var date = icuCases['icuCases'][i]['Date'];
        var admitted = parseInt(icuCases['icuCases'][i]['Admitted']);
        var fvCases = parseInt(icuCases['icuCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(icuCases['icuCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(icuCases['icuCases'][i]['Unvaccinated']) || 0;

        // Populations 
        var secondDosePop = vaccinationArr['VaccineHistory'][i].SecondDose;
        var firstDosePop = vaccinationArr['VaccineHistory'][i].FirstDose;

        var fvPop = parseInt(secondDosePop);
        var pvPop = parseInt(firstDosePop) - fvPop;
        var uvPop = 780000 - fvPop - pvPop;
        var uvEligiblePop = 696000 - fvPop - pvPop;

        // Case Rates
        var fvRate = Math.round((fvCases/fvPop) * 100000);
        var pvRate = Math.round((pvCases/pvPop) * 100000);
        var uvRate = Math.round((uvCases/uvEligiblePop) * 100000); // Eligible as no cases are under 19

        var fvRateTrend = fvCases;
        var pvRateTrend = pvCases;
        var uvRateTrend = uvCases;

        // Trending
        if (i > 6){ // start generating averages 
            var fvSum = 0;
            var pvSum = 0;
            var uvSum = 0;            

            for (var j = i-1 ; j > i-7; j--){
                var obj = daily.icuRates[j];           
                
                fvSum += obj["Fully Vaccinated"];;
                pvSum += obj["Partially Vaccinated"];
                uvSum += obj["Unvaccinated"];
            }

            fvRateTrend = Math.round(fvSum/7);
            pvRateTrend = Math.round(pvSum/7);
            uvRateTrend = Math.round(uvSum/7);
        }

        var row = {
            "Date": date,
            "Admitted": admitted,
            "Fully Vaccinated": fvRate,
            "Fully Vaccinated Trend": fvRateTrend,
            "Partially Vaccinated": pvRate,
            "Partially Vaccinated Trend": pvRateTrend,
            "Unvaccinated": uvRate,
            "Unvaccinated Trend": uvRateTrend
        };

        daily.icuRates.push(row);
    }

    return daily;
}

// Total Cases - Build Rate Per Pop plus 7 Day Average
function buildCaseRate(){
    var daily = {};
    var caseRates = [];
    daily.caseRates = caseRates;

    vaccinationArr = JSON.parse(vaccineHistoryJSON);

    // NB Total Cases

    for (var i = 0 ; i < nbCases['nbCases'].length ; i++){
        var date = nbCases['nbCases'][i]['Date'];
        var newCases = parseInt(nbCases['nbCases'][i]['New Cases']);
        var fvCases = parseInt(nbCases['nbCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(nbCases['nbCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(nbCases['nbCases'][i]['Unvaccinated']) || 0;

        // Populations 
        var secondDosePop = vaccinationArr['VaccineHistory'][i].SecondDose;
        var firstDosePop = vaccinationArr['VaccineHistory'][i].FirstDose;

        var fvPop = parseInt(secondDosePop);
        var pvPop = parseInt(firstDosePop) - fvPop;
        var uvPop = 780000 - fvPop - pvPop;
        var uvEligiblePop = 696000 - fvPop - pvPop;

        var fvRate = Math.round((fvCases/fvPop) * 100000);
        var pvRate = Math.round((pvCases/pvPop) * 100000);
        var uvRate = Math.round((uvCases/uvEligiblePop) * 100000); // Eligible as no cases are under 19

        var fvRateTrend = fvCases;
        var pvRateTrend = pvCases;
        var uvRateTrend = uvCases;

        if (i > 6){ // start generating averages 
            var fvSum = 0;
            var pvSum = 0;
            var uvSum = 0;            

            for (var j = i-1 ; j > i-7; j--){
                var obj = daily.caseRates[j];           
                
                fvSum += obj["Fully Vaccinated"];;
                pvSum += obj["Partially Vaccinated"];
                uvSum += obj["Unvaccinated"];
            }

            fvRateTrend = Math.round(fvSum/7);
            pvRateTrend = Math.round(pvSum/7);
            uvRateTrend = Math.round(uvSum/7);
        }

        var row = {
            "Date": date,
            "New Cases": newCases,
            "Fully Vaccinated": fvRate,
            "Fully Vaccinated Trend": fvRateTrend,
            "Partially Vaccinated": pvRate,
            "Partially Vaccinated Trend": pvRateTrend,
            "Unvaccinated": uvRate,
            "Unvaccinated Trend": uvRateTrend
        };

        daily.caseRates.push(row);
    }

    return daily;
}