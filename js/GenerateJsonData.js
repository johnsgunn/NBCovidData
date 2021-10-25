// Generate JSON Data for insertion into JSON objects in the dashboard //

function showGenerateData(){
    showElement("generate_row");
}

async function generateData(name){
    currentReport = name;
    hideAll();
    hideElement("generate_row");
    showElement("export_row");

    console.log("Name = " + name);

    var jsonOutput = await checkBuildDataSet(name,false);
    // console.log(jsonOutput);
    createTableFromJSON(jsonOutput,name,"desc");
}

// Check for data in session, generate and store if not
// Then return data from session
async function checkBuildDataSet(name,forceReload=false){
    return new Promise((resolve,reject)=>{
        if (!sessionStorage.getItem(name) 
                || forceReload) { 
            var jsonOutput;
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
                default:
                    reject("Invalid selection");
                    break;
            }
            sessionStorage.setItem(name,JSON.stringify(jsonOutput,null,2));
            sessionStorage.setItem(name + "-loadedOn",new Date());
        }   
        resolve(sessionStorage.getItem(name));
    })
}

// Generate single row for case age
// Returns current day, which is all that's stored on API
function buildCaseAgeRow(){

}

function buildPediatricCaseRow(){

}

// Hospital Cases - Build Rate Per Pop plus 7 Day Average
function buildHospitalCaseRate(){
    var daily = {};
    var hospitalRates = [];
    daily.hospitalRates = hospitalRates;

    vaccinationSummaryArr = JSON.parse(vaccinationSummaryJSON);

    // Populations 
    // fv = fully vaccinated, pv = partially vaccinated, uv = unvaccinated 
    var secondDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopSecondDose;
    var firstDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopOneDose;

    var fvPop = parseInt(secondDosePop);
    var pvPop = parseInt(firstDosePop) - fvPop;
    var uvPop = 780000 - fvPop - pvPop;
    var uvEligiblePop = 696000 - fvPop - pvPop;

    // Hospitalizations 

    for (var i = 0 ; i < hospitalCases['hospitalCases'].length ; i++){
        var date = hospitalCases['hospitalCases'][i]['Date'];
        var admitted = parseInt(hospitalCases['hospitalCases'][i]['Admitted']);
        var fvCases = parseInt(hospitalCases['hospitalCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(hospitalCases['hospitalCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(hospitalCases['hospitalCases'][i]['Unvaccinated']) || 0;

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

    vaccinationSummaryArr = JSON.parse(vaccinationSummaryJSON);

    // Populations 
    // fv = fully vaccinated, pv = partially vaccinated, uv = unvaccinated 
    var secondDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopSecondDose;
    var firstDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopOneDose;

    var fvPop = parseInt(secondDosePop);
    var pvPop = parseInt(firstDosePop) - fvPop;
    var uvPop = 780000 - fvPop - pvPop;
    var uvEligiblePop = 696000 - fvPop - pvPop;

    // ICU Cases
    
    console.log(icuCases['icuCases']);

    for (var i = 0 ; i < icuCases['icuCases'].length ; i++){
        var date = icuCases['icuCases'][i]['Date'];
        var admitted = parseInt(icuCases['icuCases'][i]['Admitted']);
        var fvCases = parseInt(icuCases['icuCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(icuCases['icuCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(icuCases['icuCases'][i]['Unvaccinated']) || 0;

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

    vaccinationSummaryArr = JSON.parse(vaccinationSummaryJSON);

    // Populations 
    // fv = fully vaccinated, pv = partially vaccinated, uv = unvaccinated 
    var secondDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopSecondDose;
    var firstDosePop = vaccinationSummaryArr['VaccinationSummary'][0].PopOneDose;

    var fvPop = parseInt(secondDosePop);
    var pvPop = parseInt(firstDosePop) - fvPop;
    var uvPop = 780000 - fvPop - pvPop;
    var uvEligiblePop = 696000 - fvPop - pvPop;

    // ICU Cases

    for (var i = 0 ; i < nbCases['nbCases'].length ; i++){
        var date = nbCases['nbCases'][i]['Date'];
        var newCases = parseInt(nbCases['nbCases'][i]['New Cases']);
        var fvCases = parseInt(nbCases['nbCases'][i]['Fully Vaccinated']) || 0;
        var pvCases = parseInt(nbCases['nbCases'][i]['Partially Vaccinated']) || 0;
        var uvCases = parseInt(nbCases['nbCases'][i]['Unvaccinated']) || 0;

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