(async () => {

    // Load the dataset
    const data = await fetch(
        "https://revpeter.github.io/nba_championship_rings/data/allChPlayer_data.json"
    ).then(response => response.json());

    
    var dataProd = processData(data, "SEASON", "AGE"); 
    console.log(dataProd);
    const chart = Highcharts.stockChart('range_plot', {
        chart: {
            height: 500
        },

        title: {
            text: 'Bajnok csapatok játékosainak az átlagos életkora'
        },

        rangeSelector: {
            selected: -1
        },

        series: [{
            name: '',
            data: dataProd,
            type: 'scatter',
            threshold: null,
            label: {
                enabled: false
            }
        }],
        rangeSelector:{
            buttons: [{
                type: 'year',
                count: 5,
                text: '5y',
                title: 'View 5 years'
            }, {
                type: 'year',
                count: 10,
                text: '10y',
                title: 'View 10 years'
            }, {
                type: 'year',
                count: 20,
                text: '20y',
                title: 'View 20 years'
            }, {
                type: 'all',
                text: 'All',
                title: 'View all'
            }]
        },
        tooltip: {
            shared: false,
            valueDecimals: 2,
            pointFormat: "Szezon:<b>{point.season}</b>  Átlagos életkor:<b>{point.y}</b>",
            headerFormat: '',
            positioner: function () {
                return { x: 0, y: 80 };
            },
            shadow: false,
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.8)'
        }
    });
})();