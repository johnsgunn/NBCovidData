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
                    text: 'New Brunswick Daily Case History',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    }, 
                subtitle: {
                    display: true,
                    text: 'Case History Beginning March 9, 2020',
                    color: '#a6a6a6'
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

    var dpsFirstDose = [];
    var dpsSecondDose = [];
    var dpsBoosterDose = [];
    
    var prevFirstDose = 0;
    var prevSecondDose = 0;
    var prevBoosterDose = 0;

    for (var i=arr[name].length-1 ; i > -1  ; i--){
        if (i > 0 && i < arr[name].length-1) {
            if (!isNaN(parseInt(arr[name][i]['FirstDose'])) && parseInt(arr[name][i]['FirstDose']) > prevFirstDose){
                dpsFirstDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['FirstDose']});  
                prevFirstDose = parseInt(arr[name][i]['FirstDose']);       
            }
            else {
                dpsFirstDose.push({ x: arr[name][i]['Date'], y: prevFirstDose});
            }

            if (!isNaN(parseInt(arr[name][i]['SecondDose'])) && parseInt(arr[name][i]['SecondDose']) > prevSecondDose){
                dpsSecondDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['SecondDose']});      
                prevSecondDose = parseInt(arr[name][i]['SecondDose']); 
            }
            else {
                dpsSecondDose.push({ x: arr[name][i]['Date'], y: prevSecondDose});
            }

            if (!isNaN(parseInt(arr[name][i]['BoosterDose'])) && parseInt(arr[name][i]['BoosterDose']) > prevBoosterDose){
                dpsBoosterDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['BoosterDose']}); 
                prevBoosterDose = parseInt(arr[name][i]['BoosterDose']); 
            }
            else {
                dpsBoosterDose.push({ x: arr[name][i]['Date'], y: prevBoosterDose});                
            }
        }
        else if (i == 0) {
            dpsFirstDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['FirstDose']});   
            dpsSecondDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['SecondDose']});
            dpsBoosterDose.push({ x: arr[name][i]['Date'], y: arr[name][i]['BoosterDose']});
        }
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
                label: "Booster",
                data:dpsBoosterDose,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#3389FF",
                backgroundColor: "#3389FF",
                tension: 0.1,            
                yAxisID: 'y'
            },
            {
                type: "line",
                label: "Second Doses",
                data:dpsSecondDose,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#A933FF",
                backgroundColor: "#A933FF",
                tension: 0.1,            
                yAxisID: 'y'
            },{
                type: "line",
                label: "First Doses",
                data:dpsFirstDose,
                borderWidth: 4,
                pointRadius: 0,
                fill: false,
                borderColor: "#33EFFF",
                backgroundColor: "#33EFFF",
                tension: 0.1,            
                yAxisID: 'y'
            }]
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
                    text: 'New Brunswick Vaccination History',
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
                // filler: {
                //     propagate: true
                // }
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
function showCaseTrendsChart_VaccStatus(json,name,loc) {
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
    for (var i=7 ; i < arr[name].length  ; i++){
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
            // borderColor: "#00ffff",
            // backgroundColor: "#00ffff",
            borderColor: "#00ff66",
            backgroundColor: "#00ff66",
            tension: 0.1,            
            yAxisID: 'y'
        },
        {
            type: "line",
            label: "Partially Vaccinated",
            data:dps2,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            // borderColor: "#00cc00",
            // backgroundColor: "#00cc00",
            borderColor: "#ff9900",
            backgroundColor: "#ff9900",
            tension: 0.1,            
            yAxisID: 'y' 
        },
        {
            type: "line",
            label: "Unvaccinated",
            data:dps3,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            // borderColor: "#ff9900",
            // backgroundColor: "#ff9900",
            borderColor: "#ff0000",
            backgroundColor: "#ff0000",
            tension: 0.1,            
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

function showCaseTrendsChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var checkType = "New Cases";
    var titleText = "NB Covid-19 New Case Trend Rate, 7-Day Average";

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=arr[name].length -1 ; i > -1  ; i--){
        dps1.push({ x: arr[name][i]['DATE'], y: arr[name][i]['SevenDayAverageNewCases']});
        dps2.push({ x: arr[name][i]['DATE'], y: arr[name][i]['NewToday']});
    }

    var ctx = document.getElementById(loc);
    if (largeChart) largeChart.destroy();
    const data = {
        datasets: [
        {
            type: "line",
            label: "New Case Trend",
            data:dps1,
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            borderColor: "#00ff66",
            backgroundColor: "#00ff66",
            tension: 0.1,            
            yAxisID: 'y'
        },
        {
            type: "line",
            label: "New Case Daily",
            data:dps2,
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            borderColor: "#ff9900",
            backgroundColor: "#ff9900",
            tension: 0.1,            
            yAxisID: 'y1' 
        },
        ]
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
                    text: '7 Day Average New Cases',
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

function showHospitalTrendsChart(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);

    var checkType = "New Brunswick Hospital Trends";
    var titleText = "Covid-19 Hospital Trends, 7-Day Average";

    var dps1 = [];
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];
    for (var i=7 ; i < arr[name].length  ; i++){
        dps1.push({ x: arr[name][i]['Date'], y: arr[name][i]['Hospitalizations']});
        dps2.push({ x: arr[name][i]['Date'], y: arr[name][i]['ICU']});        
        dps3.push({ x: arr[name][i]['Date'], y: arr[name][i]['Hosp7dayaverage']});
        dps4.push({ x: arr[name][i]['Date'], y: arr[name][i]['ICU7dayaverage']});
        
        
    }

    var ctx = document.getElementById(loc);
    if (largeChart) largeChart.destroy();
    const data = {
        datasets: [
        {
            type: "line",
            label: "Hospital 7 Day Trend",
            data:dps3,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#0000cc",
            backgroundColor: "#0000cc",
            tension: 0.1,            
            yAxisID: 'y'
        },
        {
            type: "line",
            label: "ICU 7 Day Trend",
            data:dps4,
            borderWidth: 4,
            pointRadius: 0,
            fill: false,
            borderColor: "#ff0000",
            backgroundColor: "#ff3300",
            tension: 0.1,            
            yAxisID: 'y' 
        },
        {
            type: "bar",
            label: "Hospital Admissions",
            data:dps1,
            borderWidth: 1,
            pointRadius: 1,
            fill: false,
            borderColor: "#0000cc",
            backgroundColor: "#1177bb",      
            yAxisID: 'y'
        },            
        {
            type: "bar",
            label: "ICU Admissions",
            data:dps2,
            borderWidth: 1,
            pointRadius: 1,
            fill: false,
            borderColor: "#ff3300",
            backgroundColor: "#993333",
            yAxisID: 'y'
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
                    text: 'Admissions',
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

    // build proper sort order 
    var population = [];// agePopulation;
    var sortOrder = [];
    agePopulation['agePopulation'].forEach(function (item, index) {
        population[item['ageGroup']] = item['populationSize'];
        sortOrder[item['ageGroup']] = item['sortIndex'];
    })

    var labels = [
        '0-4',
        '5-11',
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

    arr['vaccineAgeGroups'].forEach(function (item, index) {
        var ageGroup = item['StatGroup'];
        var secondDose = parseFloat(item['SecondDose']);
        var firstDose = parseFloat(item['FirstDose']-secondDose);
        
        var sortIndex = sortOrder[ageGroup];

        dps1[sortIndex] = firstDose;
        dps2[sortIndex] = secondDose;
    })

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
        ['Covid-19 Death Rate', 'Since August 1, 2021']
    ];

    var statusGroups = [
        'Fully Vaccinated',
        'Partially Vaccinated',
        'Unvaccinated',
        // 'Unvaccinated 12+'
    ];

    var dpsFullyVaccinated = []; 
    var dpsPartiallyVaccinated = []; 
    var dpsUnvaccinated = [];
    var dpsChildren = [];
    var dpsUnvaccinatedEligible = [];

    dataLabels.forEach(function (item,index) {
        
        var fullyVaccinated = parseFloat(arr['dailyCaseRates'][0][item]);
        var partiallyVaccinated = parseFloat(arr['dailyCaseRates'][1][item]);
        var unvaccinated = parseFloat(arr['dailyCaseRates'][2][item]);

        // var children = parseFloat(arr['dailyCaseRates'][4][item]);
        // var unvaccinatedEligible = parseFloat(arr['dailyCaseRates'][3][item]);

        dpsFullyVaccinated.push(fullyVaccinated);
        dpsPartiallyVaccinated.push(partiallyVaccinated);
        dpsUnvaccinated.push(unvaccinated);
        // dpsChildren.push(children);
        // dpsUnvaccinatedEligible.push(unvaccinatedEligible);
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
                backgroundColor: "#ff9900",
            },
            {
                label: 'Unvaccinated',
                data: dpsUnvaccinated,
                backgroundColor: "#ff0000"
            }//,
            // {
            //     label: 'Children',
            //     data: dpsChildren,
            //     backgroundColor: "#aa0000"
            // },
            // {
            //     label: 'Unvaccinated (12+)',
            //     data: dpsUnvaccinatedEligible,
            //     backgroundColor: "#ff0000"
            // }
                     
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
            subtitle: {
                display: true,
                text: '*Unvaccinated group results only include those also ineligible due to age',
                color: '#a6a6a6'
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

function showCurrentHospitalStatus(json,name,loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.

    var titleFontSize = getChartTitleSize(loc);
    var nbHospitalBeds = [];
    var nbICUBeds = [];
    var nbHospitals = [];
    var nbICUs = [];

    nbHospitalBeds['Count'] = arr['hospitalStatus'][0].HospitalCount;
    nbHospitalBeds['TotalBeds'] = arr['hospitalStatus'][0].HospitalBedCount;
    nbHospitalBeds['AvailableBeds'] = arr['hospitalStatus'][0].AvailableBeds;
    nbHospitalBeds['CovidBeds'] = arr['hospitalStatus'][0].BedCovidUse;
    nbHospitalBeds['NonCovidBeds'] = nbHospitalBeds['TotalBeds'] - nbHospitalBeds['AvailableBeds'] - nbHospitalBeds['CovidBeds'];
    nbHospitalBeds['AtCapacity'] = arr['hospitalStatus'][0].HospitalsAtCapacity;

    nbHospitalBeds['NonCovidBedsPercent'] = nbHospitalBeds['NonCovidBeds'] / nbHospitalBeds['TotalBeds'] * 100;
    nbHospitalBeds['CovidBedsPercent'] = nbHospitalBeds['CovidBeds'] / nbHospitalBeds['TotalBeds'] * 100 ;
    nbHospitalBeds['AvailableBedsPercent'] = nbHospitalBeds['AvailableBeds'] / nbHospitalBeds['TotalBeds'] *100;

    nbICUBeds['Count'] = arr['hospitalStatus'][0].ICUCount;
    nbICUBeds['TotalBeds'] = arr['hospitalStatus'][0].ICUBedCount;
    nbICUBeds['AvailableBeds'] = arr['hospitalStatus'][0].AvailableICU;
    nbICUBeds['CovidBeds'] = arr['hospitalStatus'][0].ICUCovidUse;
    nbICUBeds['NonCovidBeds'] = nbICUBeds['TotalBeds'] - nbICUBeds['AvailableBeds'] - nbICUBeds['CovidBeds'];
    nbICUBeds['AtCapacity'] = arr['hospitalStatus'][0].ICUsAtCapacity;

    nbICUBeds['NonCovidBedsPercent'] = nbICUBeds['NonCovidBeds'] / nbICUBeds['TotalBeds'] * 100;
    nbICUBeds['CovidBedsPercent'] = nbICUBeds['CovidBeds'] / nbICUBeds['TotalBeds'] * 100 ;
    nbICUBeds['AvailableBedsPercent'] = nbICUBeds['AvailableBeds'] / nbICUBeds['TotalBeds'] *100;


    nbHospitals['Count'] = arr['hospitalStatus'][0].HospitalCount;
    nbHospitals['AtCapacity'] = arr['hospitalStatus'][0].HospitalsAtCapacity;
    nbHospitals['AtCapacityPercent'] = nbHospitals['AtCapacity'] / nbHospitals['Count'] * 100 ;
    nbHospitals['AtCapacityList'] = arr['hospitalStatus'][0].HospitalsAtCapacityList;

    nbICUs['Count'] = arr['hospitalStatus'][0].ICUCount;
    nbICUs['AtCapacity'] = arr['hospitalStatus'][0].ICUsAtCapacity;
    nbICUs['AtCapacityPercent'] = nbICUs['AtCapacity'] / nbICUs['Count'] * 100 ;
    nbICUs['AtCapacityList'] = arr['hospitalStatus'][0].ICUsAtCapacityList;

    var nbICUList = ['ICUs At Capacity:'];
    nbICUList.push("");
    
    for (let i = 0; i < nbICUs['AtCapacityList'].length ; i++){
        nbICUList.push(nbICUs['AtCapacityList'][i]);
    }


    var casesArr = JSON.parse(caseSummaryJSON);
    var lastUpdate = casesArr['CaseSummary'][0].LastUpdateText;

    var labels = [
        'Hospital Capacity',
        'ICU Capacity',
        ['Hospitals'],//, '(Total Hospitals in NB: ' + nbHospitals['Count'] + ')'],        
        ['ICUs']//, '(Hospitals with ICU: ' + nbICUs['Count'] + ')']
    ];

    var dpsBedsAvailable = []; 
    var dpsCovidPts = []; 
    var dpsOtherPts = [];
    var dpsAtCapacity = [];
    var dpsNotAtCapacity = [];

    dpsBedsAvailable[0] = nbHospitalBeds['AvailableBedsPercent'];
    dpsCovidPts[0] = nbHospitalBeds['CovidBedsPercent'];
    dpsOtherPts[0] = nbHospitalBeds['NonCovidBedsPercent'];
    dpsAtCapacity[0] = 0;
    dpsNotAtCapacity[0] = 0;

    dpsBedsAvailable[1] = nbICUBeds['AvailableBedsPercent'];
    dpsCovidPts[1] = nbICUBeds['CovidBedsPercent'];
    dpsOtherPts[1] = nbICUBeds['NonCovidBedsPercent'];
    dpsAtCapacity[1] = 0;
    dpsNotAtCapacity[1] = 0;

    dpsBedsAvailable[2] = 0;
    dpsCovidPts[2] = 0;
    dpsOtherPts[2] = 0;
    dpsAtCapacity[2] = nbHospitals['AtCapacityPercent'];
    dpsNotAtCapacity[2] = 100 - nbHospitals['AtCapacityPercent'];

    dpsBedsAvailable[3] = 0;
    dpsCovidPts[3] = 0;
    dpsOtherPts[3] = 0;
    dpsAtCapacity[3] = nbICUs['AtCapacityPercent'];
    dpsNotAtCapacity[3] = 100 - nbICUs['AtCapacityPercent'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: '% Other Patients',
                data: dpsOtherPts,
                backgroundColor: "#ff9900"
            },
            
            {
                label: '% Covid-19 Patients',
                data: dpsCovidPts,
                backgroundColor: "#ff0000",
            },
            {
                label: '% Available',
                data: dpsBedsAvailable,
                backgroundColor: "#00ff66",
            },
            {
                label: '% At Capacity',
                data: dpsAtCapacity,
                backgroundColor: "#990000",
            } ,
            {
                label: '% Available',
                data: dpsNotAtCapacity,
                backgroundColor: "#009900",
            } ,
            {
                label: "ICUs At Capacity: " + nbICUs['AtCapacityList'].toString(),//nbICUList,
                data: null,
                backgroundColor: "#4D4D4D",
                fillOpacity: 0
            } ,
            
                     
        ]
    };

    var ctx = document.getElementById(loc);
    if (hospitalStatusChart) hospitalStatusChart.destroy();
    hospitalStatusChart = new Chart(ctx, {
        plugins: [canvasBG],
        type: 'bar',
        data: data,
        options: {
            plugins: {
            label: {
                render: 'value'
            },
            title: {
                    display: true,
                    text: 'New Brunswick Hospital Status',
                    color: chartTextColor,
                    font: {
                        size: titleFontSize
                    },    
                },
            subtitle: {
                display: true,
                text: 'Updated ' + lastUpdate,
                color: '#a6a6a6'
            },
                legend: {
                    display: true,
                    position:'bottom',
                    fullWidth: true,
                    labels: {
                        color: chartTextColor,
                    },
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
                        display: false,
                        text: '% of Total',
                        color: chartTextColor,
                        font: {
                            size: titleFontSize
                        },                       
                    },
                    ticks: {
                        precision: 0,
                        color: chartTextColor,  
                        mirror: true         
                    },
                    beginAtZero: true
                }
              }            
        }
    });
    hospitalStatusChart.render();
}

function showVaccineAgeCountChart(json, name, loc) {
    var arr = [];
    arr = JSON.parse(json); 	// Convert JSON to array.
    console.log(arr);

    var titleFontSize = getChartTitleSize(loc);

    // build proper sort order 
    var population = [];// agePopulation;
    var sortOrder = [];
    agePopulation['agePopulation'].forEach(function (item, index) {
        population[item['ageGroup']] = item['populationSize'];
        sortOrder[item['ageGroup']] = item['sortIndex'];
    })

    console.log(arr);

    var labels = [
        '0-4',
        '5-11',
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

    arr[name].forEach(function (item, index) {
        var ageGroup = item['Age Group'];

        var fullyVaccinated = parseFloat(item['Fully Vaccinated']);
        var partiallyVaccinated = parseFloat(item['Partially Vaccinated']);
        var unvaccinated = parseFloat(item['Unvaccinated']);
        
        var sortIndex = sortOrder[ageGroup];

        dps1[sortIndex] = partiallyVaccinated;
        dps2[sortIndex] = fullyVaccinated;
        dps3[sortIndex] = unvaccinated;
    })

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
                subtitle: {
                    display: true,
                    text: '*Estimated based on GNB vaccination % and Population Projections',
                    color: '#a6a6a6'
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