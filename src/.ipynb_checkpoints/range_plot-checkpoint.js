(async () => {

    // Load the dataset
    const data = await fetch(
        "https://revpeter.github.io/nba_championship_rings/data/allChPlayer_data.json"
    ).then(response => response.json());

    
    var dataProd = processData(data, "SEASON", "AGE"); 
    console.log(dataProd);
    const chart = Highcharts.stockChart('range_plot', {
        chart: {
            type: "scatter",
            zoomType: "xy",
            zooming: {
                mouseWheel: false
              }
        },

        rangeSelector: {
            selected: -1
        },
        yAxis: {
            opposite: false,
            title: {
                text: "Átlagos életkor",
                align: "middle"
            }
        },
        series: [{
            name: '',
            data: dataProd,
            threshold: null,
            label: {
                enabled: false
            }
        }],
        rangeSelector:{
            buttonTheme: {
                width: 50
            },
            buttons: [{
                type: 'year',
                count: 5,
                text: '5 év',
                title: 'View 5 years'
            }, {
                type: 'year',
                count: 10,
                text: '10 év',
                title: 'View 10 years'
            }, {
                type: 'year',
                count: 20,
                text: '20 év',
                title: 'View 20 years'
            }, {
                type: 'all',
                text: 'Teljes',
                title: 'View all'
            }]
        },
        tooltip: {
            shared: false,
            valueDecimals: 2,
            pointFormat: "{point.team_name} {point.season}<br>Átlagos életkor:<b>{point.y}</b>",
            headerFormat: '',
            positioner: function () {
                return { x: 60, y: 70 };
            },
            shadow: false,
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.8)'
        },


    });


})();