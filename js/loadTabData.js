
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

async function LoadVaccinationData() {
    hideElement('bodyContainer');
    showElement('loadingSpinner');

    var vaccinationHistory = [];
    var vaccineAgeGroups = [];

    const NBPOPULATION = 790000;

    var upArrow = "<i class='fas fa-arrow-up'></i>";
    var downArrow = "<i class='fas fa-arrow-down'></i>";
    var neutral = "<i class='fas fa-minus'></i>";

    try {
        vaccinationHistoryJSON = await checkGetDataJSON('VaccinationHistory',VaccineTimetableURL,true);
        vaccineAgeGroupsJSON = await checkGetDataJSON('VaccineAgeGroups',VaccinesByAgeGroupURL, true);

        vaccinationHistory = JSON.parse(vaccinationHistoryJSON);
        vaccineAgeGroups = JSON.parse(vaccineAgeGroupsJSON);
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
    }

    console.log(vaccinationHistory);

    // UPDATE DATE // 
    setElementContents('vacc_dateStamp','Updated On: ' + vaccinationHistory['VaccinationHistory'][0]['Date']);

    // FULLY VACCINATED //
    var fullyVaccPerc = parseFloat(vaccinationHistory['VaccinationHistory'][0]['PercentSecondDose']);
    var fullyVaccNum = parseInt(vaccinationHistory['VaccinationHistory'][0]['SecondDose']);
    var newFullyVacc = parseInt(vaccinationHistory['VaccinationHistory'][0]['NewSecondDose']);

    var newFullyVaccIcon = neutral;

    if (newFullyVacc != 0){
        newFullyVaccIcon = newFullyVacc > 0 ? upArrow : downArrow;
    }

    setElementContents('vacc_percFullyVacc',fullyVaccPerc + "%");
    setElementContents('vacc_numFullyVacc',"Pop: " + fullyVaccNum);
    setElementContents('vacc_newFullyVacc',newFullyVaccIcon + " " + newFullyVacc);

    // PARTIALLY VACCINATED //
    var fistDosePerc = parseFloat(vaccinationHistory['VaccinationHistory'][0]['PercentFirstDose']);
    var firstDoseNum = parseInt(vaccinationHistory['VaccinationHistory'][0]['FirstDose']);
    var partiallyVaccPerc = (parseFloat(vaccinationHistory['VaccinationHistory'][0]['PercentFirstDose']) - fullyVaccPerc).toFixed(1);
    var partiallyVaccNum = parseInt(vaccinationHistory['VaccinationHistory'][0]['FirstDose']) - fullyVaccNum;
    var newPartiallyVacc = parseInt(vaccinationHistory['VaccinationHistory'][0]['NewFirstDose']);

    var newPartiallyVaccIcon = neutral;

    if (newPartiallyVacc != 0){
        newPartiallyVaccIcon = newPartiallyVacc > 0 ? upArrow : downArrow;
    }

    setElementContents('vacc_percPartVacc',partiallyVaccPerc + "%");
    setElementContents('vacc_numPartVacc',"Pop: " + partiallyVaccNum);
    setElementContents('vacc_newPartVacc',newPartiallyVaccIcon + " " + newPartiallyVacc);

    // BOOSTED //
    var boostedVaccPerc = parseFloat(vaccinationHistory['VaccinationHistory'][0]['PercentBoosterDose']) ;
    var boostedVaccNum = parseInt(vaccinationHistory['VaccinationHistory'][0]['BoosterDose']) ;
    var newBoostedVacc = parseInt(vaccinationHistory['VaccinationHistory'][0]['NewBoosterDose']);

    var newBoostedVaccIcon = neutral;

    if (newBoostedVacc != 0){
        newBoostedVaccIcon = newBoostedVacc > 0 ? upArrow : downArrow;
    }

    setElementContents('vacc_percBoost',boostedVaccPerc + "%");
    setElementContents('vacc_numBoost',"Pop: " + boostedVaccNum);
    setElementContents('vacc_newBoost',newBoostedVaccIcon + " " + newBoostedVacc);

    // UNVACCINATED //
    var unVaccPerc = (100.0 - fistDosePerc).toFixed(1);
    var unVaccNum = NBPOPULATION - firstDoseNum;
    var newUnVacc = 0;

    var newUnVaccIcon = neutral;

    if (newUnVacc != 0){
        newUnVaccIcon = newUnVacc > 0 ? upArrow : downArrow;
    }

    setElementContents('vacc_percUnvacc',unVaccPerc + "%");
    setElementContents('vacc_numUnvacc',"Pop: " + unVaccNum);

    // FIRST DOSE //
    var unVaccPerc = (100.0 - fistDosePerc).toFixed(1);
    var unVaccNum = NBPOPULATION - firstDoseNum;
    var newUnVacc = 0;

    var newUnVaccIcon = neutral;

    if (newUnVacc != 0){
        newUnVaccIcon = newUnVacc > 0 ? upArrow : downArrow;
    }

    setElementContents('vacc_percUnvacc',unVaccPerc + "%");
    setElementContents('vacc_numUnvacc',"Pop: " + unVaccNum);

    // SUMMARY //
    setElementContents('vacc_SumFirstDosePerc',fistDosePerc + "% (" + firstDoseNum + ")");
    setElementContents('vacc_SumSecondDosePerc',fullyVaccPerc + "% (" + fullyVaccNum + ")");
    setElementContents('vacc_SumBoosterPerc',boostedVaccPerc + "% (" + boostedVaccNum + ")");
    setElementContents('vacc_SumUnvaccPerc',unVaccPerc + "% (" + unVaccNum + ")");

    // AGE GROUPS //
    var statGroupList = ['vacc5_11','vacc12_19','vacc20_29','vacc30_39','vacc40_49','vacc50_59','vacc60_64','vacc65_69','vacc70_74','vacc75_79','vacc80_84','vacc85'];
    var statGroupElements = ['5-11','12-19','20-29','30-39','40-49','50-59','60-64','65-69','70-74','75-79','80-84','85+'];


    for (let i = 0 ; i < statGroupList.length ; i++){
        var firstDosePerc = parseFloat(vaccineAgeGroups['VaccineAgeGroups'][i]['FirstDose']).toFixed(1);
        var secondDosePerc = parseFloat(vaccineAgeGroups['VaccineAgeGroups'][i]['SecondDose']).toFixed(1);
        var boosterDosePerc = parseFloat(vaccineAgeGroups['VaccineAgeGroups'][i]['BoosterDose']).toFixed(1);
        var unvaccPerc = (100 - firstDosePerc).toFixed(1);

        var firstDoseNum = ((firstDosePerc/100) * agePopulation['agePopulation'][i+1].populationSize).toFixed(0);
        var secondDoseNum = ((secondDosePerc/100) * agePopulation['agePopulation'][i+1].populationSize).toFixed(0);
        var boosterDoseNum = ((boosterDosePerc/100) * agePopulation['agePopulation'][i+1].populationSize).toFixed(0);
        var unvaccNum = ((unvaccPerc/100) * agePopulation['agePopulation'][i+1].populationSize).toFixed(0);

        var divFirstDosePerc  = "<div>" + firstDosePerc + "%</div>";
        var divSecondDosePerc = "<div>" + secondDosePerc + "%</div>";
        var divBoosterPerc = "<div>" + boosterDosePerc + "%</div>";
        var divUnvaccPerc = "<div>" + unvaccPerc + "%</div>";
        var divContentsPerc = divFirstDosePerc + divSecondDosePerc + divBoosterPerc + divUnvaccPerc;

        var divFirstDoseNum  = "<div>" + firstDoseNum + "</div>";
        var divSecondDoseNum = "<div>" + secondDoseNum + "</div>";
        var divBoosterNum = "<div>" + boosterDoseNum + "</div>";
        var divUnvaccNum = "<div>" + unvaccNum + "</div>";
        var divContentsNum = divFirstDoseNum + divSecondDoseNum + divBoosterNum + divUnvaccNum;
        
        setElementContents(statGroupList[i],divContentsPerc);
        setElementContents(statGroupList[i]+"Num",divContentsNum);
    }
   

    hideElement('loadingSpinner');
    showElement('bodyContainer');  
}

async function LoadRawData(name,data){
    hideElement('raw_data_display');
    showElement('loadingSpinner');  

    try {
        var dataJSON = await checkGetDataJSON(name,data,true);

        await createTableFromJSON(dataJSON, name, 'desc', 'raw_data_display','raw_data_display');
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
        return;
    }

    hideElement('loadingSpinner');
    showElement('raw_data_display');  
}

async function LoadOCRawData(name,url){ // OpenCovid.ca Raw Data Loader
    hideElement('raw_data_display');
    showElement('loadingSpinner');  

    try {
        var dataJSON = await getDataJSON(url);
        // console.log(dataJSON);

        await createTableFromJSON_OC(dataJSON, 'active', 'desc', 'raw_data_display','raw_data_display');
        // await createTableFromOCJSON(dataJSON,'active');
    }
    catch(err) {
        hideElement('loadingSpinner');
        document.getElementById("bodyContainer").innerHTML = err.message;
        return;
    }

    hideElement('loadingSpinner');
    showElement('raw_data_display');  
}

async function getDataJSON(url){
    return new Promise((resolve,reject)=>{
            var json = Get(url);
            resolve(json);
        });
        
}

async function createTableFromOCJSON(dataJSON,name){
    var arr = [];

    arr = JSON.parse(dataJSON); 	// Convert JSON to array.

    var col = []; // Contains our headers 

    for (var i = 0; i < arr[name].length; i++) {
        for (var key in arr[name][i]) {
            col.push(key);
        }
    }  

    var tableTextColor = "text-dark";

    // Create a dynamic table.
    var table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('display');
    table.classList.add('nowrap');
    table.classList.add(tableTextColor);

    table.id = 'tblData';
    
    // Create table header.
    var header = table.createTHead();    
    var tr = header.insertRow(-1);                   // Table row.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // Table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    var body = table.createTBody();

    // Add JSON to the table rows.
    for (var i = 0; i < arr[name].length; i++) {

        tr = body.insertRow(-1);  

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);        

            // if (col[j].includes("date") || col[j].includes("Date") || col[j].includes("DATE"))// Fixing inconsistent date formats
            // { 
            //     reportDate = new Date(arr[name][i][col[j]]);
            //     displayReportDate = reportDate.toISOString();

            //     tabCell.innerHTML = displayReportDate;
            // }
            // else {
                tabCell.innerHTML = arr[name][i][col[j]];
            // }
        }
    }

    table.classList.add(tableTextColor);

    // Finally, add the dynamic table to a container.
    var divContainer = document.getElementById(container);
    divContainer.innerHTML = "<h4 class='" + tableTextColor + "'>Data: " + name + "</h4>";
    divContainer.appendChild(table);

    $(document).ready(function() {
        $('#tblData').DataTable({
            scrollX:        true,
            scrollCollapse: true,
            autoWidth:         true,  
            paging: true, 
            "pageLength": 15,
             dom: 'Bfrtip',
             buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            // "order": [[ 0, sortOrder]],
    });
    } );    

    showElement(raw_data_display);
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