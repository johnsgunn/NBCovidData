function showExportButton(){
    let x = document.getElementById("export_row");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function GetVaccinationByAgeGroup() {
    const dbParam = JSON.stringify({table:"features",limit:20});
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);
        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
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

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>StatGroup</th>" +
            "<th>PostiveTests1</th>" +
            "<th>TotalTests1</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.Date);

            text += "<tr>" +
                "<td>" + myObj['features'][x].attributes.StatGroup + "</td>" +
                "<td>" + myObj['features'][x].attributes.PostiveTests1 + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalTests1 + "</td>" +
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

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
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

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
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

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
        text += "<tr>" +
            "<th>Date</th>" +
            "<th>TotalCases</th>" +
            "<th>NewToday</th>" +
            "<th>ActiveCases</th>" +
            "<th>Recovered</th>" +
            "<th>Deaths</th>" +
            "<th>TotalTests</th>" +
            "<th>Hospitalized</th>" +
            "<th>ICU</th>" +
            "</tr>";
        for (let x in myObj['features']) {
            reportDate = new Date(myObj['features'][x].attributes.LastUpdateText);
            displayReportDate = reportDate.toISOString();
            displayReportDate = displayReportDate.substring(0, displayReportDate.indexOf('T'));

            text += "<tr>" +
                "<td>" + displayReportDate + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalCases + "</td>" +
                "<td>" + myObj['features'][x].attributes.NewToday + "</td>" +
                "<td>" + myObj['features'][x].attributes.ActiveCases + "</td>" +
                "<td>" + myObj['features'][x].attributes.Recovered + "</td>" +
                "<td>" + myObj['features'][x].attributes.Deaths + "</td>" +
                "<td>" + myObj['features'][x].attributes.TotalTests + "</td>" +
                "<td>" + myObj['features'][x].attributes.Hospitalised + "</td>" +
                "<td>" + myObj['features'][x].attributes.ICU + "</td>" +
                "</tr>";


        }
        text += "</table>"

        document.getElementById("showData").innerHTML = text;
    }
    xmlhttp.open("GET", "https://services5.arcgis.com/WO0dQcVbxj7TZHkH/arcgis/rest/services/HealthZones/FeatureServer/0/query?where=HealthZone%3D%27Province%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=0&resultRecordCount=50&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
    xmlhttp.send("x=" + dbParam);

    showExportButton();
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

        let text = "<table class=\"table table-striped table-bordered\" id='tblData'>"
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
