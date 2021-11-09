// Render case history chart to specified location on page
// Data source: GNB API
function showCaseHistoryChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['DATE'], y: arr[name][i]['NewToday']});
        dps2.push({ x: arr[name][i]['DATE'], y: arr[name][i]['Active']});
    }
    var titleFontSize = getChartTitleSize(loc);

    var ctx = document.getElementById(loc);    
    if (caseHistoryChart) caseHistoryChart.destroy();

    caseHistoryChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
                {
                    label: "New Cases",
                    data:dps1,
                    borderWidth: 0,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: "#ff6347"
                },
                {
                    label: "Active Cases",
                    data:dps2,
                    borderWidth: 0,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: "#0099ff" 
                }
            ]
        },
        options: {                        
            scales: {
                yAxes: {
                    grid: {                        
                        color: chartGridColor
                    },
                    title: {
                        display: true,
                        text: 'Cases',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                xAxes: {
                    grid: {
                        drawOnChartArea: false,
                        color: chartGridColor
                    },
                    title: {
                        display: false,
                        text: 'Date',
                        color: chartTextColor,
                        font: {
                            size: 15
                        }
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Daily Case History',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                },
                legend: {
                    display: true,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        },
        type: "line"        
    });
    caseHistoryChart.render();
}

// Render vaccine history chart to specified location on page
// Data source: GNB API
function showVaccineHistoryChart(json,name,loc) {    
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    for (var i=arr[name].length-1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['DoseAdminEng']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['FirstDose']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['SecondDose']});
    }
    
    var titleFontSize = getChartTitleSize(loc);


    var ctx = document.getElementById(loc);
    if (vaccineHistoryChart) vaccineHistoryChart.destroy();
    vaccineHistoryChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
            {
                type: "line",
                label: "Second Doses",
                data:dps3,
                borderWidth: 1,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#9966ff"
            },{
                type: "line",
                label: "First Doses",
                data:dps2,
                borderWidth: 0,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#66ffcc"
            },{
                type: "line",
                label: "Total Doses",
                data:dps1,
                borderWidth: 1,
                pointRadius: 1,
                fill: true,
                backgroundColor: "#0066ff"
            }
            
        ]
        },

        options: {                        
            scales: {
                yAxes: {
                    grid: {
                        color: chartGridColor
                    },
                    title: {
                        display: true,
                        text: 'Doses',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                xAxes: {
                    grid: {
                        drawOnChartArea: false,
                        color: chartGridColor
                    },
                    title: {
                        display: false,
                        text: 'Date',
                        color: chartTextColor,
                        font: {
                            size: titleFontSize
                        }, 
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Vaccination History',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                },
                legend: {
                    display: true,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        }
    });
    vaccineHistoryChart.render();
}

// Render health zone chart to specified location on page
// Data source: GNB API
function showHealthZoneChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var chartLabels = [];
    var cases = [];
    for (var i=0 ; i < arr[name].length ; i++){
        chartLabels.push(arr[name][i]['HealthZnEng']);
        cases.push(arr[name][i]['ActiveCases']);
    }

    var ctx = document.getElementById(loc);
    if (healthZoneChart) healthZoneChart.destroy();    

    healthZoneChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                chartLabels[0],
                chartLabels[1],
                chartLabels[2],
                chartLabels[3],
                chartLabels[4],
                chartLabels[5],
                chartLabels[6]
            ],
            datasets: [{
                label: "Cases by Health Zone",
                data: cases,
                backgroundColor: [
                     '#9966ff',
                     '#99ffcc',
                     '#ff9966',
                     '#00ccff',
                     '#ff3399',
                     '#ffff99',
                     '#003300'
                ]
            }]
        },
        plugins: [canvasBG],
        options: {   
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                title: {
                    display: true,
                    text: 'Active Cases By Health Zone',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                },
                legend: {
                    display: true,
                    position:'left',
                    fullWidth: false,
                    labels: {
                        color: chartTextColor
                    }
                },
                filler: {
                    propagate: true
                }
            }
        },
    });
    healthZoneChart.render();
}

// Render health zone chart to specified location on page
// Data source: GNB API
function showCaseTrendsChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var checkType = "";
    var titleText = "";

    switch (name){
        case "caseRates":
            checkType = "New Cases";
            titleText = "NB Covid-19 New Case Trend Rate, 7-Day Average";
            break;
        case "hospitalRates":
            checkType = "Admitted";
            titleText = "NB Covid-19 Hospital Trend Rate, 7-Day Average";
            break;
        case "icuRates":
            checkType = "Admitted";
            titleText = "NB Covid-19 ICU Trend Rate, 7-Day Average";
            break;
    }

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=0 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Fully Vaccinated Trend']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['Partially Vaccinated Trend']});        
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Unvaccinated Trend']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i][checkType]});
        
        
    }

    var ctx = document.getElementById(loc);
    if (largeChart) largeChart.destroy();
    const data = {
        datasets: [
        {
            type: "line",
            label: "Fully Vaccinated",
            data:dps1,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#00ffff",
            tension: 0.1,
            backgroundColor: "#00ffff",
            yAxisID: 'y'
        },
        {
            type: "line",
            label: "Partially Vaccinated",
            data:dps2,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#00cc00",
            tension: 0.1,
            backgroundColor: "#00cc00",
            yAxisID: 'y' 
        },
        {
            type: "line",
            label: "Unvaccinated",
            data:dps3,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#ff9900",
            tension: 0.1,
            backgroundColor: "#ff9900",
            yAxisID: 'y'
        },            
        {
            type: "bar",
            label: checkType,
            data:dps4,
            borderWidth: 1,
            pointRadius: 1,
            fill: false,
            backgroundColor: "#000066",
            yAxisID: 'y1'
        }]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false, 
        },
        scales: {
            y: {
                grid: {
                    color: chartGridColor
                },
                display: true,
                type: 'linear',
                position: 'left',
                color: chartTextColor,
                title: {
                    display: true,
                    text: 'Cases (Per 100,000)',
                    color: chartTextColor,
                    font: {
                        size: 15
                    },                        
                },
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
            }, 
            y1: {
                grid: {
                    drawOnChartArea: false,
                    color: chartGridColor
                },
                title: {
                    display: true,
                    text: checkType,
                    color: chartTextColor,
                    font: {
                        size: 15
                    },                        
                },
                display: true,
                type: 'linear',
                position: 'right',
                color: chartTextColor,
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
                
            },   
            x: {
                grid: {
                    drawOnChartArea: false,
                    color: chartGridColor
                },
                ticks: {
                    precision: 0,
                    color: chartTextColor,           
                }
            }             
        },   
        plugins: {
            title: {
                display: true,
                text: titleText,
                color: chartTextColor,
                font: {
                    size: titleFontSize
                }, 
            },
            legend: {
                display: true,
                position:'top',
                fullWidth: false,
                labels: {
                    color: chartTextColor
                }
            },
            filler: {
                propagate: true
            }
        }
    };

    largeChart = new Chart(ctx, {
        stacked: false, 
        data: data,
        options: options,
        plugins: [canvasBG]
    });
    largeChart.render();
}

function showPedCasesChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=1 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['New Cases < 10']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend < 10']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['New Cases 10-19']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 10-19']});
    }

    var ctx = document.getElementById(loc);
    if (pedCasesChart) pedCasesChart.destroy();
    pedCasesChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
            {
                type: "line",
                label: "7 Day Trend (Age < 10)",
                data:dps2,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ff0000",
                tension: 0.1,
                backgroundColor: "#ff0000" 
            },
            {
                type: "line",
                label: "7 Day Trend (Age 10-19)",
                data:dps4,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#00cc00",
                backgroundColor: "#00cc00" 
            },
            {
                type: "bar",
                label: "Cases Age < 10",
                data:dps1,
                borderWidth: 1,
                pointRadius: 1,
                fill: false,
                backgroundColor: "#ffbbbb"
            },            
            {
                type: "bar",
                label: "Cases Age 10-19",
                data:dps3,
                borderWidth: 1,
                pointRadius: 1,
                fill: false,
                backgroundColor: "#b3ffb3"
            }
            
        ]
        },

        options: {
            scales: {
                y: {
                    grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Cases',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    },
                    beginAtZero: true
                },
                x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Pediatric Case Trends',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: false,
                    labels: {
                        color: chartTextColor
                    }
                }
            }
            
        }
    });
    pedCasesChart.render();
}

function showAgeCaseChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var dps0 = [];
    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    var dps5 = [];
    var dps6 = [];
    var dps7 = [];
    var dps8 = [];
    var dps9 = [];    

    for (var i=30 ; i < arr[name].length  ; i++){
        dps0.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend < 10']});
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 10-19']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 20-29']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 30-39']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 40-49']});
        dps5.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 50-59']});
        dps6.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 60-69']});
        dps7.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 70-79']});
        dps8.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 80-89']});
        dps9.push({ x: arr[name][i]['Date'], y: arr[name][i]['Trend 90+']});
    }    

    var ctx = document.getElementById(loc);
    if (caseAgeChart) caseAgeChart.destroy();
    caseAgeChart = new Chart(ctx, {
        plugins: [canvasBG],
        data: {
            datasets: [
            {
                type: "line",
                label: "Trend < 10",
                data:dps0,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ff0000",
                tension: 0.1,
                backgroundColor: "#ff0000" 
            },
            {
                type: "line",
                label: "Trend 10-19",
                data:dps1,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#00cc00",
                tension: 0.1,
                backgroundColor: "#00cc00"
            },
            {
                type: "line",
                label: "Trend 20-29",
                data:dps2,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#0000ff",
                tension: 0.1,
                backgroundColor: "#0000ff" 
            },
            {
                type: "line",
                label: "Trend 30-39",
                data:dps3,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#cc66ff",
                tension: 0.1,
                backgroundColor: "#cc66ff" 
            },
            {
                type: "line",
                label: "Trend 40-49",
                data:dps4,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ccff33",
                tension: 0.1,
                backgroundColor: "#ccff33" 
            },
            {
                type: "line",
                label: "Trend 50-59",
                data:dps5,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ff6600",
                tension: 0.1,
                backgroundColor: "#ff6600" 
            },
            {
                type: "line",
                label: "Trend 60-69",
                data:dps6,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#333300",
                tension: 0.1,
                backgroundColor: "#333300" 
            },
            {
                type: "line",
                label: "Trend 70-79",
                data:dps7,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ff00ff",
                tension: 0.1,
                backgroundColor: "#ff00ff" 
            },
            {
                type: "line",
                label: "Trend 80-89",
                data:dps8,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#336699",
                tension: 0.1,
                backgroundColor: "#336699" 
            },
            {
                type: "line",
                label: "Trend 90+",
                data:dps9,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#ffffff",
                tension: 0.1,
                backgroundColor: "#ffffff" 
            }
        ]
        },

        options: {
            scales: {
                y: {
                    grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Cases',
                        color: chartTextColor,
                        font: {
                            size: 15
                        },                        
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    },
                    beginAtZero: true
                },
                x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Case Trends By Age Group',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: false,
                    labels: {
                        color: chartTextColor
                    }
                }
            }
            
        }
    });
    caseAgeChart.render();
}

function getChartTitleSize(loc){
    var titleFontSize = 12;
    if (loc == "largeChart") {titleFontSize = 20};

    return titleFontSize;
}

function showVaccineAgeChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var labels = [
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

    var dps1 = []; // first dose
    var dps2 = []; // second dose

    labels.forEach(function (item,index) {
        
        var secondDose = parseFloat(arr['vaccineAgeGroups'][index]['SecondDose']);
        var firstDose = parseFloat(arr['vaccineAgeGroups'][index]['FirstDose']) - secondDose;

        dps1.push(firstDose);
        dps2.push(secondDose);

    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Two Doses',
                data: dps2,
                backgroundColor: "#3399ff"
            },
            {
                label: 'One Dose',
                data: dps1,
                backgroundColor: "#ff9966",
            }            
        ]
    };

    var ctx = document.getElementById(loc);
    if (vaccineAgeGroupsChart) vaccineAgeGroupsChart.destroy();
    vaccineAgeGroupsChart = new Chart(ctx, {
        plugins: [canvasBG],
        type: 'bar',
        data: data,
        options: {
            plugins: {
            title: {
                    display: true,
                    text: 'Vaccination By Age Group',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    },    
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: true,
                    labels: {
                        color: chartTextColor
                    }
                }
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                  grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                y: {
                  stacked: true,
                  grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Percent',
                        color: chartTextColor,
                        font: {
                            size: titleFontSize
                        },                       
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    },
                    beginAtZero: true
                }
              }            
        }
    });
    vaccineAgeGroupsChart.render();
}

function showDailyCaseRatesChart(json,name,loc) {
    console.log (json);
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var casesArr = JSON.parse(caseSummaryJSON);
    var lastUpdate = casesArr['CaseSummary'][0].LastUpdateText;

    var dataLabels = [
        'NewCaseRate',
        'ActiveHospRate',
        'ActiveICURate',
        'DeceasedRate'
    ];

    var labels = [
        'New Case Rate',
        'Active Hospital Rate',
        'Active ICU Rate',
        ['Covid-19 Death Rate','Total Population']
    ];

    var statusGroups = [
        'Fully Vaccinated',
        'Partially Vaccinated',
        'Unvaccinated'
    ];

    var dpsFullyVaccinated = []; 
    var dpsPartiallyVaccinated = []; 
    var dpsUnvaccinated = [];

    dataLabels.forEach(function (item,index) {
        
        var fullyVaccinated = parseFloat(arr['dailyCaseRates'][0][item]);
        var partiallyVaccinated = parseFloat(arr['dailyCaseRates'][1][item]);
        var unvaccinated = parseFloat(arr['dailyCaseRates'][2][item]);

        dpsFullyVaccinated.push(fullyVaccinated);
        dpsPartiallyVaccinated.push(partiallyVaccinated);
        dpsUnvaccinated.push(unvaccinated);
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Fully Vaccinated',
                data: dpsFullyVaccinated,
                backgroundColor: "#00ff66",
            } ,
            {
                label: 'Partially Vaccinated',
                data: dpsPartiallyVaccinated,
                backgroundColor: "#ff6600",
            },
            {
                label: 'Unvaccinated',
                data: dpsUnvaccinated,
                backgroundColor: "#ff0000"
            }
                     
        ]
    };

    var ctx = document.getElementById(loc);
    if (caseRateChart) caseRateChart.destroy();
    caseRateChart = new Chart(ctx, {
        plugins: [canvasBG],
        type: 'bar',
        data: data,
        options: {
            plugins: {
            title: {
                    display: true,
                    text: 'New Brunswick Covid-19 Case Rate - ' + lastUpdate,
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    },    
                },
                legend: {
                    display: true,
                    position:'top',
                    fullWidth: true,
                    labels: {
                        color: chartTextColor
                    }
                }
              },
              responsive: true,
              scales: {
                x: {
                  stacked: false,
                  grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    }
                },
                y: {
                  stacked: false,
                  grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Cases Per 100,000',
                        color: chartTextColor,
                        font: {
                            size: titleFontSize
                        },                       
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,           
                    },
                    beginAtZero: true
                }
              }            
        }
    });
    caseRateChart.render();
}

function showVaccineAgeCountChart(json, name, loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var labels = [
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

    var dps1 = []; // first dose
    var dps2 = []; // second dose
    var dps3 = []; // unvaccinated

    labels.forEach(function (item, index) {
        var fullyVaccinated = parseFloat(arr['vaccineAgeGroupCount'][index]['Fully Vaccinated']);
        var partiallyVaccinated = parseFloat(arr['vaccineAgeGroupCount'][index]['Partially Vaccinated']);
        var unvaccinated = parseFloat(arr['vaccineAgeGroupCount'][index]['Unvaccinated']);

        dps1.push(partiallyVaccinated);
        dps2.push(fullyVaccinated);
        dps3.push(unvaccinated);
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Fully Vaccinated',
                data: dps2,
                backgroundColor: "#009933"
            },
            {
                label: 'Partially Vaccinated',
                data: dps1,
                backgroundColor: "#ff9900",
            },
            {
                label: 'Unvaccinated',
                data: dps3,
                backgroundColor: "#cc0000",
            }
        ]
    };

    var ctx = document.getElementById(loc);
    if (vaccineAgeCountsChart) vaccineAgeCountsChart.destroy();
    vaccineAgeCountsChart = new Chart(ctx, {
        plugins: [canvasBG],
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Vaccination Count By Age Group',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    },
                },
                legend: {
                    display: true,
                    position: 'top',
                    fullWidth: true,
                    labels: {
                        color: chartTextColor
                    }
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        color: chartGridColor
                    },
                    display: true,
                    type: 'linear',
                    position: 'left',
                    color: chartTextColor,
                    title: {
                        display: true,
                        text: 'Population',
                        color: chartTextColor,
                        font: {
                            size: titleFontSize
                        },
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,
                    },
                    beginAtZero: true
                }
            }
        }
    });
    vaccineAgeCountsChart.render();
}