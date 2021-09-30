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

function GetVaccinationByAgeGroup() {
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);
        let text = "<table class=\"table table-striped table-hover table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>Age Group</th>" +
            "<th>First Dose</th>" +
            "<th>Second Dose</th></tr>";
        for (let x in myObj['features']) {
            text += "<tr>" +
                "<td>" + myObj['features'][x].attributes.StatGroup + "</td>" +
                "<td>" + myObj['features'][x].attributes.FirstDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.SecondDose + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineAge/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetDailyTesting() {
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "<table class=\"table table-striped table-hover table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>StatGroup</th>" +
            "<th>PostiveTests1</th>" +
            "<th>TotalTests1</th>" +
            "<th>TestingRate1</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.Date);

            text += "<tr>" +
                "<td>" + myObj['features'][x].attributes.StatGroup + "</td>" +
                "<td>" + myObj['features'][x].attributes.PostiveTests1 + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalTests1 + "</td>" +
                "<td>" + myObj['features'][x].attributes.TestingRate1 + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19TestStatistics/FeatureServer/0/query?where=Category%3D%27Age%27&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetVaccinationSummary() {
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);
        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>LastUpdateText</th>" +
            "<th>TotalAdmin</th>" +
            "<th>TotalDoseWeek</th>" +
            "<th>PopOneDose</th>" +
            "<th>PercentOneDose</th>" +
            "<th>PopSecondDose</th>" +
            "<th>PercentSecondDose</th>";

        text += " </tr>";
        for (let x in myObj['features']) {
            LastUpdateText = new Date(myObj['features'][x].attributes.LastUpdateText);
            displayReportDate = LastUpdateText.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<tr>" +
                "<td>" + displayReportDate + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalAdmin + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalDoseWeek + "</td>" +
                "<td>" + myObj['features'][x].attributes.PopOneDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.PercentOneDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.PopSecondDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.PercentSecondDose + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19VaccineData/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&sqlFormat=none&f=pjson&token=");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetVaccinationHistory() {
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "<table class=\"table table-hover table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>Date</th>" +
            "<th>TotalReceivedENG</th>" +
            "<th>TotalExpectedENG</th>" +
            "<th>DoseAdminEng</th>" +
            "<th>FirstDose</th>" +
            "<th>SecondDose</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.Date);
            displayReportDate = reportDate.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<tr>" +
                "<td>" + displayReportDate+ "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalReceivedENG + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalExpectedENG + "</td>" +
                "<td>" + myObj['features'][x].attributes.DoseAdminEng + "</td>" +
                "<td>" + myObj['features'][x].attributes.FirstDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.SecondDose + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyVaccineStats/FeatureServer/0/query?where=SecondDose%3E0&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=Date+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetCaseHistory(){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "<table class=\"table table-hover table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>Date</th>" +
            "<th>Total</th>" +
            "<th>NewToday</th>" +
            "<th>Active</th>" +
            "<th>Recovered</th>" +
            "<th>Deaths</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.DATE);
            displayReportDate = reportDate.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<tr>" +
                "<td>" + displayReportDate + "</td>" +
                "<td>" + myObj['features'][x].attributes.Total + "</td>" +
                "<td>" + myObj['features'][x].attributes.NewToday + "</td>" +
                "<td>" + myObj['features'][x].attributes.Active + "</td>" +
                "<td>" + myObj['features'][x].attributes.Recovered + "</td>" +
                "<td>" + myObj['features'][x].attributes.Deaths + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyCaseStats2/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=DATE+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetProvincialSummary(){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let x = 0; // this report returns 1 row
        reportDate = new Date(myObj['features'][x].attributes.LastUpdateText);
        displayReportDate = reportDate.toISOString();
        displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

        let text = "<table class=\"table table-hover table-bordered\" id='tblData'>"
        text += "<tr><th>HealthZoneEng</th>" +"<td>" + myObj['features'][x].attributes.HealthZnEng + "</td></tr>" +
            "<tr><th>HealthZoneFr</th>" +"<td>" + myObj['features'][x].attributes.HealthZnFre + "</td></tr>" +
            "<tr><th>Date</th>" + "<td>" + displayReportDate + "</td></tr>" +
            "<tr><th>TotalCases</th>" + "<td>" + myObj['features'][x].attributes.TotalCases + "</td></tr>" +
            "<tr><th>NewToday</th>" + "<td>" + myObj['features'][x].attributes.NewToday + "</td></tr>" +
            "<tr><th>ActiveCases</th>" + "<td>" + myObj['features'][x].attributes.ActiveCases + "</td></tr>" +
            "<tr><th>Recovered</th>" + "<td>" + myObj['features'][x].attributes.Recovered + "</td></tr>" +
            "<tr><th>Deaths</th>" + "<td>" + myObj['features'][x].attributes.Deaths + "</td></tr>" +
            "<tr><th>TotalHospitalized</th>" +"<td>" + myObj['features'][x].attributes.TtlHospitald + "</td></tr>" +
            "<tr><th>Hospitalized</th>" +"<td>" + myObj['features'][x].attributes.Hospitalised + "</td></tr>" +
            "<tr><th>ICU</th>" +"<td>" + myObj['features'][x].attributes.ICU + "</td></tr>" +
            "<tr><th>Discharged</th>" +"<td>" + myObj['features'][x].attributes.DischHosp + "</td></tr>" +
            "<tr><th>TotalTests</th>" + "<td>" + myObj['features'][x].attributes.TotalTests + "</td></tr>" +
            "<tr><th>CloseContacts</th>" +"<td>" + myObj['features'][x].attributes.ClsContct + "</td></tr>" +
            "<tr><th>CommunityTransmission</th>" +"<td>" + myObj['features'][x].attributes.CommTrnsmsn + "</td></tr>" +
            "<tr><th>TravelRelated</th>" +"<td>" + myObj['features'][x].attributes.TravelRel + "</td></tr>" +
            "<tr><th>UnderInvestigation</th>" +"<td>" + myObj['features'][x].attributes.UnderInves + "</td></tr>" +
            "<tr><th>NonCovidDeaths</th>" + "<td>" + myObj['features'][x].attributes.NonCovidDeath + "</td></tr>"             
        ;

        text += "</table>"

        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3D%27Province%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetZoneSummary(){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "";

        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.LastUpdateText);
            displayReportDate = reportDate.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<table class=\"table table-hover table-bordered \" id='tblData" + x + "'>";

            text += "<tr><th width='30px'>HealthZoneEng</th>" + "<td>" + myObj['features'][x].attributes.HealthZnEng + "</td></tr>" +
                "<tr><th>HealthZoneFr</th>" + "<td>" + myObj['features'][x].attributes.HealthZnFre + "</td></tr>" +
                "<tr><th>Date</th>" + "<td>" + displayReportDate + "</td></tr>" +
                "<tr><th>TotalCases</th>" + "<td>" + myObj['features'][x].attributes.TotalCases + "</td></tr>" +
                "<tr><th>NewToday</th>" + "<td>" + myObj['features'][x].attributes.NewToday + "</td></tr>" +
                "<tr><th>ActiveCases</th>" + "<td>" + myObj['features'][x].attributes.ActiveCases + "</td></tr>" +
                "<tr><th>Recovered</th>" + "<td>" + myObj['features'][x].attributes.Recovered + "</td></tr>" +
                "<tr><th>Deaths</th>" + "<td>" + myObj['features'][x].attributes.Deaths + "</td></tr>" +
                "<tr><th>TotalTests</th>" + "<td>" + myObj['features'][x].attributes.TotalTests + "</td></tr>" +
                "<tr><th>NonCovidDeaths</th>" + "<td>" + myObj['features'][x].attributes.NonCovidDeath + "</td></tr>"                 
            ;

            text += "</table>" + 
            "<button type=\"button\" id=\"export_button" + x + "\" onclick=\"html_table_to_excel('tblData" + x + "')\" class=\"btn btn-success btn-sm\">Export To Excel</button>" + 
            "<br /><br />";

        }
        
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3C%3E%27Province%27+AND+HealthZone%3C%3E%27Outside+NB%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=HealthZnEng+asc&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    hideExportButton();
}

function GetCaseOrigin(){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>TravelRelated</th>" +
            "<th>CloseContact</th>" +
            "<th>CommunityTransmission</th>" +
            "<th>UnderInvestigation</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            text += "<td>" + myObj['features'][x].attributes.TravelRel + "</td>" +
                "<td>" + myObj['features'][x].attributes.ClsContct + "</td>" +
                "<td>" + myObj['features'][x].attributes.CommTrnsmsn + "</td>" +
                "<td>" + myObj['features'][x].attributes.UnderInves + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZnEng%3D%27New+Brunswick%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=%5B%7B%22onStatisticField%22%3A%22TravelRel%22%2C%22outStatisticFieldName%22%3A%22TravelRel%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22ClsContct%22%2C%22outStatisticFieldName%22%3A%22ClsContct%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22CommTrnsmsn%22%2C%22outStatisticFieldName%22%3A%22CommTrnsmsn%22%2C%22statisticType%22%3A%22avg%22%7D%2C%7B%22onStatisticField%22%3A%22UnderInves%22%2C%22outStatisticFieldName%22%3A%22UnderInves%22%2C%22statisticType%22%3A%22avg%22%7D%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetVaccineTimetable(){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let text = "<table class=\"table table-hover table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>Date</th>" +
            "<th>TotalReceived</th>" +
            "<th>DosesAdministered</th>" +
            "<th>FirstDose</th>" +
            "<th>SecondDose</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.Date);
            displayReportDate = reportDate.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<td>" + displayReportDate + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalReceivedENG + "</td>" +
                "<td>" + myObj['features'][x].attributes.DoseAdminEng + "</td>" +
                "<td>" + myObj['features'][x].attributes.FirstDose + "</td>" +
                "<td>" + myObj['features'][x].attributes.SecondDose + "</td>" +
                "</tr>";
        }
        text += "</table>"
        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Covid19DailyVaccineStats/FeatureServer/0/query?where=%28TotalReceivedENG+IS+NOT+NULL+OR+TotalExpectedENG+IS+NOT+NULL%29&objectIds=&time=&resultType=standard&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=true&orderByFields=Date+DESC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=32000&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
}

function GetHospitalStatusAll(){
    var baseHospitalCall = "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/Hospitals/FeatureServer/0/query?where=1%3D1&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=102100&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=true&returnM=true&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&objectIds=";
    var invalidHospitalIDs = [5,23,24];

    hideExportButton();
    document.getElementById("showData").innerHTML = "";

    for (let i = 1; i <= 25; i++) {
        if (!invalidHospitalIDs.includes(i)){
            var thisHospitalCall = baseHospitalCall + i;
            GetHospitalStatusSingle(thisHospitalCall,i);
        }
    }
}

function GetHospitalStatusSingle(url,id,text){
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);

        let x = 0;
        let text = "";

        let reportDate = new Date(myObj['features'][x].attributes.UpdateRecord);
        let displayReportDate = reportDate.toISOString();
        displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

        let englabel = myObj['features'][x].attributes.englabel;
        let frelabel = myObj['features'][x].attributes.frelabel;
        let TotalBedCount = myObj['features'][x].attributes.TotalBedCount;
        let OccupiedBed = myObj['features'][x].attributes.OccupiedBed;
        let TotICUBedCount = myObj['features'][x].attributes.TotICUBedCount;
        let TotICUBedOCC = myObj['features'][x].attributes.TotICUBedOCC;

        let PercentOccupied = (OccupiedBed/TotalBedCount) * 100;
        let PercentICUOccupied = 0;
        if (TotICUBedCount > 0){
            PercentICUOccupied = (TotICUBedOCC/TotICUBedCount) * 100;
        } 

        text += "<table class=\"table table-hover table-bordered \" id='tblData" + id + "'>";

        text += "<tr><th width='30px'>englabel</th>" + "<td>" + englabel + "</td></tr>" +
            "<tr><th>frelabel</th>" + "<td>" + frelabel + "</td></tr>" +
            "<tr><th>UpdateRecord</th>" + "<td>" + displayReportDate + "</td></tr>" +
            "<tr><th>TotalBedCount</th>" + "<td>" + TotalBedCount + "</td></tr>" +
            "<tr><th>OccupiedBed</th>" + "<td>" + OccupiedBed + "</td></tr>" +
            "<tr><th>TotICUBedCount</th>" + "<td>" + TotICUBedCount + "</td></tr>" +
            "<tr><th>TotICUBedOCC</th>" + "<td>" + TotICUBedOCC + "</td></tr>" +
            "<tr><th>Occupied %</th>" + "<td>" + Math.round(PercentOccupied) + "</td></tr>" +
            "<tr><th>ICU Occupied %</th>" + "<td>" + Math.round(PercentICUOccupied) + "</td></tr>" ;

        text += "</table>" + 
        "<button type=\"button\" id=\"export_button" + x + "\" onclick=\"html_table_to_excel('tblData" + id + "')\" class=\"btn btn-success btn-sm\">Export To Excel</button>" + 
        "<br /><br />";

        document.getElementById("showData").innerHTML += text;
    }
    xmlhttp.open("GET", url);
    xmlhttp.send("x=" + dbParam);
}
