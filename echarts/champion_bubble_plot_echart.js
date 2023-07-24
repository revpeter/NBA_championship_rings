(async () => {

    // Load the dataset
    const data = await fetch(
        "https://revpeter.github.io/nba_championship_rings/data/chDf_data.json"
    ).then(response => response.json());

    
    var bubbleColors = {
        DEN:{"border":"#FEC524", "fill":"#0E2240"},
        BOS:{"border":"white", "fill":"green"},
        GSW:{"border":"#FDB927", "fill":"#006BB6"},
        LAL:{"border":"gold", "fill":"purple"},
        MIL:{"border":"#00471B", "fill":"#EEE1C6"},
        TOR:{"border":"#000000", "fill":"#BA0C2F"},
        SAS:{"border":"#000000", "fill":"#c4ced4"},
        DAL:{"border":"#B8C4CA", "fill":"#00538C"},
        DET:{"border":"#C8102E", "fill":"#002D62"},
        HOU:{"border":"#BA0C2F", "fill":"white"},
        SEA:{"border":"#00653a", "fill":"#ffc200"},
        POR:{"border":"#E03A3E", "fill":"black"},
        CLE:{"border":"#FDBB30", "fill":"#860038"},
        MIA:{"border":"black", "fill":"#98002E"},
        CHI:{"border":"black", "fill":"#CE1141"},
        PHL:{"border":"#006bb6", "fill":"#ed174c"},
        WAS:{"border":"#002B5C", "fill":"#e31837"},
        NYK:{"border":"#006BB6", "fill":"#F58426"},
    };

      // Iterate over the data to find unique groups
    var uniqueGroups = [];
    data.forEach(function(point) {
        if (uniqueGroups.indexOf(point.group) === -1) {
        uniqueGroups.push(point.group);
        }
    });

    // Create an array to store series data
    var seriesData = [];
    uniqueGroups.forEach(function(group) {
        var groupData = data.filter(function(point) {
        return point.group === group;
        });

        var series = {
        name: group,
        label: groupData.map(function(point) {
            return [point.label]
        }),
        data: groupData.map(function(point) {
            return [point.x, point.y, point.size, point.label, point.fullname, point.group];
        })
        };

        seriesData.push(series);
    });

    console.log(seriesData);

    var container = document.getElementById('bubble-chart');
    var chart = echarts.init(container);
    chart.setOption({
    xAxis: {
        show: false
    },
    yAxis: {
        show: false
    },
    series: seriesData.map(function(series, index) {
        return {
          name: series.name,
          type: "scatter",
          data: series.data,
          symbol: "rectangle",
          symbolSize: 60,
          color: bubbleColors[series.name]["fill"],
          itemStyle: {
            borderColor: bubbleColors[series.name]["border"],
            borderWidth: 5
          },
          label: {
            show: true,
            position: 'inside',
            color: "white",
            fontSize: 12,
            formatter: series.name + "\n" + '{@[3]}',
            fontWeight: "bold",
            textBorderColor: "black",
            textBorderWidth: 2
          },
          emphasis: {
            focus: 'series'
          },
        };
      }),
    tooltip: {
        position: [30, 0],
        borderWidth: 0,
        backgroundColor: "rgba(255,255,255,0)",
        shadow: false,
        formatter: function (params) {
            return `<b>${params.data[4]}</b> - ${params.data[3]}`;
          }
    },
    legend: {
        orient: 'vertical',
        right: "right",
        top: "center"
    },
    grid: { 
        right: '15%',
        top: "13%"
    },

    });
    
    // Responsive chart
    window.addEventListener('resize',function(){
      chart.resize();
    })

})();