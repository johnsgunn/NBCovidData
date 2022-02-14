// Takes raw API data from GNB Dashboard and Displays to DataTable //


// Converts json object to a table
function createTableFromJSON(jsonData,name,sortOrder="asc",elementLoc="bodyRow",container="bodyContainer") {
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
            "order": [[ 0, sortOrder]],
    });
    } );    

    showElement(elementLoc);
}

function createTableFromArray(arr,name,sortOrder="asc",elementLoc="bodyRow",container="bodyContainer") {
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
            "order": [[ 0, sortOrder]],
    });
    } );    

    showElement(elementLoc);
}

function csv_To_Array(str, delimiter = ",") {
    const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
    const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = row_data.map(function (row) {
        const values = row.split(delimiter);
        const el = header_cols.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
        }, {});
        return el;
    });

    // return the array
    return arr;
}
