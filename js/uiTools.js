document.addEventListener("DOMContentLoaded", function(){
    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {
    
      // close all inner dropdowns when parent is closed
      document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
        everydropdown.addEventListener('hidden.bs.dropdown', function () {
          // after dropdown is hidden, then find all submenus
            this.querySelectorAll('.submenu').forEach(function(everysubmenu){
              // hide every submenu as well
              everysubmenu.style.display = 'none';
            });
        })
      });
    
      document.querySelectorAll('.dropdown-menu a').forEach(function(element){
        element.addEventListener('click', function (e) {
            let nextEl = this.nextElementSibling;
            if(nextEl && nextEl.classList.contains('submenu')) {	
              // prevent opening link if link needs to open dropdown
              e.preventDefault();
              if(nextEl.style.display == 'block'){
                nextEl.style.display = 'none';
              } else {
                nextEl.style.display = 'block';
              }
    
            }
        });
      })
    }
    // end if innerWidth
    });


function hideAll(){
    let elementList = [
        'bodyRow',
        'summaryDashboard',
        'large_chart',
        'dashboard',
        'loadingSpinner',
        'dataTableContainer',
        'dataTableSmall'
    ];

    // Reset divs
    for (var i = 0; i < elementList.length ; i++){
        let x = document.getElementById(elementList[i]);
        if (x) {x.classList.add('hidden')};
    }

    destroyCharts();
}

function destroyCharts(){
    // Destroy charts 
    if (caseHistoryChart) caseHistoryChart.destroy();
    if (vaccineHistoryChart) vaccineHistoryChart.destroy();
    if (healthZoneChart) healthZoneChart.destroy();
    if (pedCasesChart) pedCasesChart.destroy();
    if (largeChart) largeChart.destroy();
    if (vaccineAgeGroupsChart) vaccineAgeGroupsChart.destroy();
    if (caseAgeChart) caseAgeChart.destroy();
    if (vaccineAgeCountsChart) vaccineAgeCountsChart.destroy();
    if (caseRateChart) caseRateChart.destroy();
    if (hospitalStatusChart) hospitalStatusChart.destroy();
}

function showElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.remove('hidden');
}

function hideElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.add('hidden');
}

function setElementContents(elementName,contents){
  let x = document.getElementById(elementName);
  x.innerHTML = contents;
}

async function showDashboard(firstLoad=false){
  if (firstLoad){
      // Preload data needed for dashboard
      await preloadData();
  }

  hideAll();
  
  showElement("summaryDashboard");

  showCaseSummaryBoard(caseSummaryJSON,'CaseSummary');
  showVaccineSummaryBoard(vaccinationSummaryJSON, "VaccinationSummary");
  showSchoolSummaryBoard(schoolsSummaryJSON,'SchoolsSummary');
  // showCaseHistoryChart(caseHistoryJSON,'CaseHistory',"chart1");   
  showDashboardChart('hospitalStatus');
  
  var tableBody = document.getElementsByTagName("tbody");
  var tableHead = document.getElementsByTagName("thead");
  if (darkMode){
      for (let i = 0 ; i < tableBody.length ; i++){
          tableBody[i].classList.remove('text-dark');
          tableBody[i].classList.add('text-light');
      } 
      for (let i = 0 ; i < tableHead.length ; i++){
          tableHead[i].classList.remove('text-dark');
          tableHead[i].classList.add('text-light');
      } 
  }
  else{
      for (let i = 0 ; i < tableBody.length ; i++){            
          tableBody[i].classList.add('text-dark');
          tableBody[i].classList.remove('text-light');
      } 
      for (let i = 0 ; i < tableHead.length ; i++){            
          tableHead[i].classList.add('text-dark');
          tableHead[i].classList.remove('text-light');
      } 
  }    
  backgroundLoadData();
}

function showMore (pageName) {
  hideAll();
  showElement("bodyRow");    

  pageName = pageName + ".html";
  var displayPage = document.createElement("p");
  
  displayPage.innerHTML = "<div class='.embed-responsive col-xs-12 text-center'><object type='text/html' width=900 height=800 data='more/" + pageName + "' ></object></div>";
  var dataDisplay = document.getElementById("bodyRow");
  dataDisplay.innerHTML = "";
  dataDisplay.appendChild(displayPage);
}

function toggleDarkMode(){
  var body = document.querySelector('body');
  var navbar = document.getElementById('nav');
  var table = document.getElementsByClassName("board-table");
  var h4 = document.getElementsByTagName("h4");
  var labels = document.getElementsByTagName("label");
  var tblData_info = document.getElementById("tblData_info");

  if (darkMode){
      darkMode = false;
      body.style.backgroundColor = 'white';
      navbar.classList.remove('bg-secondary');
      navbar.classList.add('bg-dark');

      if(tblData_info) {
        tblData_info.classList.remove("text-light");
        tblData_info.classList.add("text-dark");
      }

      for (let i = 0 ; i < table.length ; i++){
        table[i].classList.remove('text-light');
        table[i].classList.add('text-dark');
      }
      for (let i = 0 ; i < labels.length ; i++){
          labels[i].classList.remove('text-light');
          labels[i].classList.add('text-dark');
      }

      for (let i = 0 ; i < h4.length ; i++){
          h4[i].classList.remove('text-light');
          h4[i].classList.add('text-dark');
      }  
      
  }
  else {
      
      darkMode = true;
      body.style.backgroundColor = '#292b2c';
      navbar.classList.remove('bg-dark');
      navbar.classList.add('bg-secondary');

      if(tblData_info) {
        tblData_info.classList.add("text-light");
        tblData_info.classList.remove("text-dark");
      }

      for (let i = 0 ; i < table.length ; i++){
        table[i].classList.remove('text-dark');
        table[i].classList.add('text-light');
      } 
      for (let i = 0 ; i < labels.length ; i++){
        labels[i].classList.add('text-light');
        labels[i].classList.remove('text-dark');
    }
      
      for (let i = 0 ; i < h4.length ; i++){
          h4[i].classList.remove('text-dark');
          h4[i].classList.add('text-light');
      }   
       
  }
}

var triggerTabList = [].slice.call(document.querySelectorAll('#navTab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})