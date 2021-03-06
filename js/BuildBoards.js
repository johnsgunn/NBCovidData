function buildBoardTable(header,body){
    var table = 
    "<table class='table table-bordered'>"+
    "<thead>"+
        "<tr class='table-primary'>"+
            "<td colspan=2><h2>"+header+"</h2></td>"+
            "</tr>"+
        "</thead>"+
        "<tbody class='board-table'>";


    for (var i = 0; i < body.length ; i++){
        table += 
        "<tr>"+
            "<td><h3>"+body[i]["title"]+"</span></h3></td>"+
            "<td><span class='badge bg-info text-start' style='font-size:130%'>"+body[i]["value"]+"</span></td>"+
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

    hospitalArr = JSON.parse(covidHospitalJSON);
    console.log(covidHospitalJSON);

    var inHospital = parseInt(hospitalArr['CovidHospitalSummary'][0]['HospWithC19']) + parseInt(hospitalArr['CovidHospitalSummary'][0]['HospForC19']);
    var inICU = parseInt(hospitalArr['CovidHospitalSummary'][0]['ICUWithC19']) + parseInt(hospitalArr['CovidHospitalSummary'][0]['ICUForC19']);
    var vent = parseInt(hospitalArr['CovidHospitalSummary'][0]['Ventilated']);

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
    // "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='pediatricCases' onclick='showDashboardChart(\"pediatricCases\")'>Pediatric Cases</button>&nbsp;" +
    "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='caseTrends' onclick='showDashboardChart(\"caseTrends\")'>Case Trends</button>&nbsp;" +
    "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='caseHistory' onclick='showDashboardChart(\"caseHistory\")'>Case History</button></div></div>";
    var tableBody = [];

    var totNewCases = parseInt(arr[name][0]['NewToday']) + parseInt(arr[name][0]['NewPOCT']);
    var totCases = parseInt(arr[name][0]['TotalCases']) + parseInt(arr[name][0]['TotalPOCT']);

    tableBody.push(//{title: "New Cases", value: arr[name][0]['NewToday']},
                    {title: "New Cases", value: totNewCases + "</span> (<small>PCR+POCT</small>)"},
                    {title: "Tot Cases", value: totCases + "</span> (<small>PCR+POCT</small>)"}, 
                    {title: "New PCR: ", value: arr[name][0]['NewToday']},
                    {title: "New POCT: ", value: arr[name][0]['NewPOCT']},
                    
                    {title: "Tot POCT Cases", value: arr[name][0]['TotalPOCT']},
                    );

    var cases = document.createElement("p");
    cases.innerHTML = buildBoardTable(tableHeader,tableBody);

    tableHeader = "<div class='d-flex  justify-content-between'>In Hospital" +
    "<div class='d-flex justify-content-end'>" ;//+
    // "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='caseTrends' onclick='showDashboardChart(\"icuTrends\")'>ICU Trends</button>&nbsp;" +
    // "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='caseTrends' onclick='showDashboardChart(\"hospitalTrends\")'>Hospital Trends</button></div></div>";
    tableBody = [];

    tableBody.push({title: "In Hospital", value: inHospital},
                    {title: "In ICU", value: inICU},
                    {title: "Ventilator", value: vent},
                    {title: "Tot. Deaths", value: arr[name][0]['Deaths']},
                    {title: "Tot. Hospitalized", value: arr[name][0]['TtlHospitald']},
                    // {title: "Tot. Discharged", value: arr[name][0]['DischHosp']},
                    
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
    "<div class='d-flex justify-content-end'>" +
    "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='schoolList' onclick='showDashboardChart(\"VaccineAgeGroups\")'>Age Groups</button>&nbsp;" ;//+
    // "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='VaccineHistory' onclick='showDashboardChart(\"VaccineHistory\")'>View History</button></div>";
    var tableBody = [];

    tableBody.push({title: "1st Dose", value: arr[name][0]['PopOneDose']+" <span class='badge bg-secondary'>" + arr[name][0]['PercentOneDose'] + "%</span>"},
                    {title: "2nd Dose", value: arr[name][0]['PopSecondDose']+" <span class='badge bg-secondary'>" + arr[name][0]['PercentSecondDose'] + "%</span>"},
                    {title: "3rd Dose", value: arr[name][0]['PopBoosterDose']+" <span class='badge bg-secondary'>" + arr[name][0]['PercentBoosterDose'] + "%</span>"},
                    {title: "New Doses", value: "<span class='badge bg-secondary'>1)</span>&nbsp" + arr[name][0]['NewFirstDose'] + "<br />" + 
                                          "<span class='badge bg-secondary'>2)</span>&nbsp" + arr[name][0]['NewSecondDose'] + "<br />" + 
                                          "<span class='badge bg-secondary'>3)</span>&nbsp" + arr[name][0]['NewBoosterDose'] },
                    // {title: "New Second", value: arr[name][0]['NewSecondDose']},
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
    "<button type='button' class='btn btn-charts btn-outline-primary d-none d-lg-block' id='schoolList' onclick='showDashboardChart(\"schoolList\")'>View Exposures</button></div>";
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

    hideElement(loc);

    var tableHeader = ["School","District","City","Status","New Cases","Prev. Impacted"];
    var tableIndexes = ['strnm','strdst','strcm','SchoolStatus','NewCases','TotalSchoolsImpacted'];

    var tableTextColor = "text-dark";

    // Create a dynamic table.
    var table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('display');
    table.classList.add('dataTable');
    table.classList.add(tableTextColor);

    // Remove previously rendered table
    var checkTable = document.getElementById('schoolListTable');
    if (checkTable) checkTable.parentNode.removeChild(checkTable);

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
            language: {
                searchPlaceholder: "Search exposures",
                search: "",
            },
            "order": [[ 3, "asc" ],[ 4, "desc"]],
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