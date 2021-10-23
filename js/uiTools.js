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
        'export_row',
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
}

function showElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.remove('hidden');
}

function hideElement(elementName){
    let x = document.getElementById(elementName);
    x.classList.add('hidden');
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
  showCaseHistoryChart(caseHistoryJSON,'CaseHistory',"chart1");   
  
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
  var tableBody = document.getElementsByTagName("tbody");
  var footer = document.getElementById('footer');
  var h4 = document.getElementsByTagName("h4");
  var tableHead = document.getElementsByTagName("thead");

  if (darkMode){
      darkMode = false;
      body.style.backgroundColor = 'white';
      navbar.classList.remove('bg-secondary');
      navbar.classList.add('bg-dark');
    //   footer.classList.remove('text-light');
    //   footer.classList.add('text-dark');

      for (let i = 0 ; i < tableBody.length ; i++){
          tableBody[i].classList.remove('text-light');
          tableBody[i].classList.add('text-dark');
      }
      for (let i = 0 ; i < tableHead.length ; i++){            
          tableHead[i].classList.add('text-dark');
          tableHead[i].classList.remove('text-light');
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
    //   footer.classList.remove('text-dark');
    //   footer.classList.add('text-light');

      for (let i = 0 ; i < tableBody.length ; i++){
          tableBody[i].classList.remove('text-dark');
          tableBody[i].classList.add('text-light');
      } 
      for (let i = 0 ; i < tableHead.length ; i++){
          tableHead[i].classList.remove('text-dark');
          tableHead[i].classList.add('text-light');
      } 
      
      for (let i = 0 ; i < h4.length ; i++){
          h4[i].classList.remove('text-dark');
          h4[i].classList.add('text-light');
      }   
       
  }
}