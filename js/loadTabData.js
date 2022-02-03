async function LoadVaccinationData(){
    var tableData = await checkGetDataJSON(VaccinationSummaryURL,url,true);
    createTableFromJSON(tableData,VaccinationSummaryURL,'desc','vaccinations','bodyContainer');
}

async function LoadActiveCaseData(){
    hideElement('bodyContainer');
    showElement('loadingSpinner');

    var caseSummary = [];
    var caseHistory = [];

    var upArrow = "<i class='fas fa-arrow-up'></i>";
    var downArrow = "<i class='fas fa-arrow-down'></i>";
    var neutral = "<i class='fas fa-minus'></i>";

    try {
        caseSummaryJSON = await checkGetDataJSON('CaseSummary',ProvincialSummaryURL,true);
        caseHistoryJSON = await checkGetDataJSON('CaseHistory',CaseHistoryURL,true);
        covidHospitalJSON = await checkGetDataJSON('CovidHospitalSummary', CovidHospitalSummaryURL, true);

        caseSummary = JSON.parse(caseSummaryJSON);
        caseHistory = JSON.parse(caseHistoryJSON);
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
    }

    var totalNewCases = parseInt(caseSummary['CaseSummary'][0]['NewToday']) + parseInt(caseSummary['CaseSummary'][0]['NewPOCT']);

    // UPDATE DATE // 
    setElementContents('case_dateStamp','Updated On: ' + caseSummary['CaseSummary'][0]['LastUpdateText']);

    // NEW CASES //
    var newPCR = parseInt(caseSummary['CaseSummary'][0]['NewToday']);
    var newPOCT = parseInt(caseSummary['CaseSummary'][0]['NewPOCT']);

    setElementContents('case_newCases',totalNewCases);
    setElementContents('case_newPCR', newPCR + " PCR");
    setElementContents('case_newPOCT', newPOCT + " POCT");

    // ACTIVE CASES //
    var NewActiveIcon = neutral;
    var NewActiveCases = parseInt(caseHistory['CaseHistory'][0]['Active']) - parseInt(caseHistory['CaseHistory'][1]['Active']);

    if (NewActiveCases != 0){
        NewActiveIcon = NewActiveCases > 0 ? upArrow : downArrow;
    }
    setElementContents('case_activeCases',caseSummary['CaseSummary'][0]['ActiveCases']);
    setElementContents('case_activeCasesChange',NewActiveIcon + " " + Math.abs(NewActiveCases));

    // IN HOSPITAL //
    var inHospital = parseInt(caseHistory['CaseHistory'][0]['Hospitalizations']);
    var newInHospital = parseInt(caseHistory['CaseHistory'][0]['NewHosp']);
    var newInHospitalIcon = neutral;

    if (newInHospital != 0){
        newInHospitalIcon = newInHospital > 0 ? upArrow : downArrow;
    }

    setElementContents('case_hospital',inHospital);
    setElementContents('case_hospitalChange',newInHospitalIcon + " " + Math.abs(newInHospital));

    // IN ICU // 
    var inICU = parseInt(caseHistory['CaseHistory'][0]['ICU']);
    var newInICU = parseInt(caseHistory['CaseHistory'][0]['NewICU']);
    var ventilated = caseSummary['CaseSummary'][0]['Ventilated'];
    var newInICUIcon = neutral;

    if (newInICU != 0){
        newInICUIcon = newInICU > 0 ? upArrow : downArrow;
    }

    setElementContents('case_icu',inICU);
    setElementContents('case_icuChange',newInICUIcon + " " + Math.abs(newInICU));
    setElementContents('case_icuVent',"Ventilated: " + ventilated);

    //TOTAL DEATHS // 
    var totalDeaths = parseInt(caseHistory['CaseHistory'][0]['Deaths']);
    var newDeaths = parseInt(caseHistory['CaseHistory'][0]['NewDeaths']);
    var newDeathsIcon = neutral;

    if (newDeaths != 0){
        newDeathsIcon = newDeaths > 0 ? upArrow : downArrow;
    }

    setElementContents('case_deaths',totalDeaths);
    setElementContents('case_deathsChange',newDeathsIcon + " " + Math.abs(newDeaths));

    // RAPID TESTS //
    var totalPOCT = parseInt(caseSummary['CaseSummary'][0]['TotalPOCT']);
    var POCTChangeIcon = newPOCT > 0 ? upArrow : neutral;

    setElementContents('case_rapid', totalPOCT);
    setElementContents('case_rapidChange', POCTChangeIcon + " " + newPOCT);

    // PCR TESTS //
    var totalPCR = parseInt(caseSummary['CaseSummary'][0]['TotalCases']);
    var PCRChangeIcon = newPCR > 0 ? upArrow : neutral;

    setElementContents('case_totalPCR', totalPCR);
    setElementContents('case_totalPCRChange', PCRChangeIcon + " " + newPCR);

    // TOTAL CASES //
    var totalAllCases = totalPOCT + totalPCR;
    var totalAllCasesChangeIcon = totalNewCases > 0 ? upArrow : neutral;

    setElementContents('case_total', totalAllCases);
    setElementContents('case_totalChange', totalAllCasesChangeIcon + " " + totalNewCases);

    // RECOVERIES //
    var recoveries = parseInt(caseSummary['CaseSummary'][0]['Recovered']);
    var newRecoveries = parseInt(caseSummary['CaseSummary'][0]['NewRecoveries']);
    var newRecoveriesChangeIcon = newRecoveries > 0 ? upArrow : neutral;

    setElementContents('case_recoveries', recoveries);
    setElementContents('case_recoveriesChange', newRecoveriesChangeIcon + " " + newRecoveries);


    // TOTAL HOSPITAL //
    var NewHospitalIcon = neutral;

    if (parseInt(caseHistory['CaseHistory'][0]['NewHosp']) != 0){
        NewHospitalIcon = parseInt(caseHistory['CaseHistory'][0]['NewHosp']) > 0 ? upArrow : downArrow;
    }

    setElementContents('case_totalHospital',caseSummary['CaseSummary'][0]['TtlHospitald']);    
    setElementContents('case_totalHospitalChange',NewHospitalIcon + " " + caseHistory['CaseHistory'][0]['NewHosp']);

    hideElement('loadingSpinner');
    showElement('bodyContainer');    
}



async function LoadActiveHospitalData (){
    hideElement('bodyContainer');
    showElement('loadingSpinner');

    var caseSummary = [];
    var caseHistory = [];
    var covidHospitalStats = [];
    var covidHospitalAgeStats = [];
    var covidICUAgeStats = [];
    var covidNewDeathsAgeStats = [];

    var upArrow = "<i class='fas fa-arrow-up'></i>";
    var downArrow = "<i class='fas fa-arrow-down'></i>";
    var neutral = "<i class='fas fa-minus'></i>";

    try {
        caseSummaryJSON = await checkGetDataJSON('CaseSummary',ProvincialSummaryURL,true);
        caseHistoryJSON = await checkGetDataJSON('CaseHistory',CaseHistoryURL,true);
        covidHospitalJSON = await checkGetDataJSON('CovidHospitalSummary', CovidHospitalSummaryURL, true);
        covidHospitalAgeStatsJSON = await checkGetDataJSON('CovidHospitalAgeStats', CovidHospitalAgeStatsURL, true);
        covidNewDeathsAgeStatsJSON = await checkGetDataJSON('CovidNewDeathsAgeStats', CovidNewDeathsAgeStatURL, true);

        caseSummary = JSON.parse(caseSummaryJSON);
        caseHistory = JSON.parse(caseHistoryJSON);
        covidHospitalStats = JSON.parse(covidHospitalAgeStatsJSON);
        covidNewDeathsAgeStats = JSON.parse(covidNewDeathsAgeStatsJSON);

        covidHospitalAgeStats = covidHospitalStats['CovidHospitalAgeStats'][0];
        covidICUAgeStats = covidHospitalStats['CovidHospitalAgeStats'][1];
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
    }

    // UPDATE DATE // 
    setElementContents('hosp_dateStamp','Updated On: ' + caseSummary['CaseSummary'][0]['LastUpdateText']);

    // IN HOSPITAL //
    var inHospital = parseInt(caseHistory['CaseHistory'][0]['Hospitalizations']);
    var newInHospital = parseInt(caseHistory['CaseHistory'][0]['NewHosp']);
    var newInHospitalIcon = neutral;

    if (newInHospital != 0){
        newInHospitalIcon = newInHospital > 0 ? upArrow : downArrow;
    }

    // IN HOSPITAL 
    // > PRIMARY 
    var inHospitalPrimary = parseInt(caseHistory['CaseHistory'][0]['HospForC19']);
    var newInHospitalPrimary = inHospitalPrimary - parseInt(caseHistory['CaseHistory'][1]['HospForC19']);
    var newInHospitalPrimaryIcon = neutral;

    if (newInHospitalPrimary != 0){
        newInHospitalPrimaryIcon = newInHospitalPrimary > 0 ? upArrow : downArrow;
    }

    // IN HOSPITAL
    // > INCIDENTAL 
    var inHospitalInc = parseInt(caseHistory['CaseHistory'][0]['HospWithC19']);
    var newInHospitalInc = inHospitalInc - parseInt(caseHistory['CaseHistory'][1]['HospWithC19']);
    var newInHospitalIncIcon = neutral;

    if (newInHospitalInc != 0){
        newInHospitalIncIcon = newInHospitalInc > 0 ? upArrow : downArrow;
    }

    setElementContents('hosp_hospital',inHospital);
    setElementContents('hosp_hospitalChange',newInHospitalIcon + " " + Math.abs(newInHospital));

    setElementContents('hosp_primaryHosp',inHospitalPrimary + " " + newInHospitalPrimaryIcon + " " + Math.abs(newInHospitalPrimary));
    setElementContents('hosp_incHosp',inHospitalInc + " " + newInHospitalIncIcon + " " + Math.abs(newInHospitalInc));

    // IN ICU // 
    var inICU = parseInt(caseHistory['CaseHistory'][0]['ICU']);
    var newInICU = parseInt(caseHistory['CaseHistory'][0]['NewICU']);
    
    var newInICUIcon = neutral;

    if (newInICU != 0){
        newInICUIcon = newInICU > 0 ? upArrow : downArrow;
    }

    // IN ICU 
    // > PRIMARY 
    var inICUPrimary = parseInt(caseHistory['CaseHistory'][0]['ICUForC19']);
    var newInICUPrimary = inICUPrimary - parseInt(caseHistory['CaseHistory'][1]['ICUForC19']);
    var newInICUPrimaryIcon = neutral;

    if (newInICUPrimary != 0){
        newInICUPrimaryIcon = newInICUPrimary > 0 ? upArrow : downArrow;
    }

    // IN ICU
    // > INCIDENTAL 
    var inICUInc = parseInt(caseHistory['CaseHistory'][0]['ICUWithC19']);
    var newInICUInc = inICUInc - parseInt(caseHistory['CaseHistory'][1]['ICUWithC19']);
    var newInICUIncIcon = neutral;

    if (newInICUInc != 0){
        newInICUIncIcon = newInICUInc > 0 ? upArrow : downArrow;
    }

    setElementContents('hosp_icu',inICU);
    setElementContents('hosp_icuChange',newInICUIcon + " " + Math.abs(newInICU));

    setElementContents('hosp_primaryICU',inICUPrimary + " " + newInICUPrimaryIcon + " " + Math.abs(newInICUPrimary));
    setElementContents('hosp_incICU',inICUInc + " " + newInICUIncIcon + " " + Math.abs(newInICUInc));

    // VENTILATED //    
    var ventilated = caseSummary['CaseSummary'][0]['Ventilated'];
    var newVentilated = caseHistory['CaseHistory'][0]['NewVentilated'];
    var newVentilatedIcon = neutral;

    if (newVentilated != 0){
        newVentilatedIcon = newVentilated > 0 ? upArrow : downArrow;
    }

    setElementContents('hosp_vent',ventilated);
    setElementContents('hosp_ventChange',newVentilatedIcon + " " + Math.abs(newVentilated));

    // NEW DEATHS //    
    var newDeaths = caseHistory['CaseHistory'][0]['NewDeaths'];
    var deathsChange = parseInt(newDeaths) - caseHistory['CaseHistory'][1]['NewDeaths']
    var deathsChangeIcon = neutral;

    if (deathsChange != 0){
        deathsChangeIcon = deathsChange > 0 ? upArrow : downArrow;
    }

    setElementContents('hosp_newDeaths',newDeaths);
    setElementContents('hosp_newDeathsChange',deathsChangeIcon + " " + Math.abs(deathsChange));

    // ATH // 
    var listHosp = caseHistory['CaseHistory'].map(item => parseInt(item.Hospitalizations)).filter(n => n);
    var hospATH = caseHistory['CaseHistory'].find(e => e.Hospitalizations === Math.max.apply(Math, listHosp.map(v => v)).toString());

    var listICU = caseHistory['CaseHistory'].map(item => parseInt(item.ICU)).filter(n => n);
    var ICUATH = caseHistory['CaseHistory'].find(e => e.ICU === Math.max.apply(Math, listICU.map(v => v)).toString());

    var listVent = caseHistory['CaseHistory'].map(item => parseInt(item.Ventilated)).filter(n => n);
    var ventATH = caseHistory['CaseHistory'].find(e => e.Ventilated === Math.max.apply(Math, listVent.map(v => v)).toString());

    var listDeath = caseHistory['CaseHistory'].map(item => parseInt(item.NewDeaths)).filter(n => n);
    var deathATH = caseHistory['CaseHistory'].find(e => e.NewDeaths === Math.max.apply(Math, listDeath.map(v => v)).toString());

    setElementContents('hosp_hospATH', hospATH['Hospitalizations'] + " on " + hospATH['DATE']);
    setElementContents('hosp_icuATH', ICUATH['ICU'] + " on " + ICUATH['DATE']);
    setElementContents('hosp_ventATH', ventATH['Ventilated'] + " on " + ventATH['DATE']);
    setElementContents('hosp_deathATH', deathATH['NewDeaths'] + " on " + deathATH['DATE']);

    // 7-DAY ROLLING AVERAGE // 
    var avgHosp = parseInt(caseHistory['CaseHistory'][0]['Hosp7dayaverage']);
    var avgHospChange = avgHosp - parseInt(caseHistory['CaseHistory'][1]['Hosp7dayaverage']);
    var avgHospChangeIcon = neutral;

    if (avgHospChange != 0){
        avgHospChangeIcon = avgHospChange > 0 ? upArrow : downArrow;
    }

    var avgICU = parseInt(caseHistory['CaseHistory'][0]['ICU7dayaverage']);
    var avgICUChange = avgICU - parseInt(caseHistory['CaseHistory'][1]['ICU7dayaverage']);
    var avgICUChangeIcon = neutral;

    if (avgICUChange != 0){
        avgICUChangeIcon = avgICUChange > 0 ? upArrow : downArrow;
    }

    var avgCases = parseInt(caseHistory['CaseHistory'][0]['SevenDayAverageNewCases']);
    var avgCasesChange = avgCases - parseInt(caseHistory['CaseHistory'][1]['SevenDayAverageNewCases']);
    var avgCasesChangeIcon = neutral;

    if (avgCasesChange != 0){
        avgCasesChangeIcon = avgCasesChange > 0 ? upArrow : downArrow;
    }

    setElementContents('hosp_avgHosp', avgHosp + " " + avgHospChangeIcon + " " + avgHospChange);
    setElementContents('hosp_avgICU', avgICU + " " + avgICUChangeIcon + " " + avgICUChange);
    setElementContents('hosp_avgCases', avgCases + " " + avgCasesChangeIcon + " " + avgCasesChange);

    // AGE GROUP INFO //

    var ageGroupList = ['hosp_u19','hosp_2029','hosp_3039','hosp_4049','hosp_5059','hosp_6069','hosp_7079','hosp_8089','hosp_90p'];
    var ageElements = ['Age0to19','Age20to29','Age30to39','Age40to49','Age50to59','Age60to69','Age70to79','Age80to89','Age90plus'];

    for (let i = 0 ; i < 9 ; i++){
        var divContentsHosp = "<div>" + covidHospitalAgeStats[ageElements[i]] + "</div>";
        var divContentsICU = "<div>" + covidICUAgeStats[ageElements[i]] + "</div>";

        var divContentsDeaths = "";

        if (i == 0){
            var combinedU19 = parseInt(covidNewDeathsAgeStats['CovidNewDeathsAgeStats'][0]['Age0to9']) + parseInt(covidNewDeathsAgeStats['CovidNewDeathsAgeStats'][0]['Age10to19']);
            divContentsDeaths = "<div>" + combinedU19 + "</div>";
        }
        else {
            divContentsDeaths = "<div>" + covidNewDeathsAgeStats['CovidNewDeathsAgeStats'][0][ageElements[i]] + "</div>";
        }

        var divContents = divContentsHosp + divContentsICU + divContentsDeaths;
        setElementContents(ageGroupList[i], divContents);
    }


    hideElement('loadingSpinner');
    showElement('bodyContainer');  
}
function GetMaxValue(inputArray){
    return inputArray.reduce((max, current) => Math.max(max, current[0]), -Infinity)
}

function itemMapper(arr){
    arr.map(function(item){
        return item.ICU;
    })
}
function arrayColumn(arr, n) {
    return arr.map(x=> x[n]);
}

function colBuilder(content){
    var col = 
    "<div class='col text-center'>" + 
        "<div class='fw-bold'>" + content + "</div>" +
    "</div>";
    
    return col;
}