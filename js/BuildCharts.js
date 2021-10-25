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
            plugins: {
                title: {
                    display: true,
                    text: 'Active Cases By Health Zone',
                    color: chartTextColor
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
        },
    });
    healthZoneChart.render();
}

// Render health zone chart to specified location on page
// Data source: GNB API
function showCaseTrendsChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=0 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Fully Vaccinated Trend']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['Partially Vaccinated Trend']});        
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Unvaccinated Trend']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['New Cases']});
    }

    var ctx = document.getElementById(loc);
    if (largeChart) largeChart.destroy();
    const data = {
        datasets: [
        {
            type: "line",
            label: "Vaccinated Average",
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
            label: "Partially Vaccinated Average",
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
            label: "Unvaccinated Average",
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
            label: "New Cases",
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
                    text: 'Case Average',
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
                    text: 'New Cases',
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
                text: 'NB Covid-19 Case Rate, 7-day Average',
                color: chartTextColor
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