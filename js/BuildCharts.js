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
                    color: chartTextColor
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
                    text: 'Vaccination History',
                    color: chartTextColor
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

    console.log(arr);

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
                    color: chartTextColor
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

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=0 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Cases Age < 10']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['7 Day Trend (Age < 10)']});
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Cases Age 10-19']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['7 Day Trend (Age 10-19)']});
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
                    color: chartTextColor
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
                            size: 15
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