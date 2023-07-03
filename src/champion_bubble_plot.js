// Plot data
readJsonFile("https://revpeter.github.io/nba_championship_rings/data/chDf_data.json", function(text){
  var data = JSON.parse(text);
  
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
        return {x:point.x, y:point.y, z:point.size, name:point.label, fullname:point.fullname, gpr:point.group};
      })
    };

    seriesData.push(series);
  });


  // Create the bubble chart
  Highcharts.chart('bubble-chart', {
    chart: {
      type: 'bubble',
      height: 700,
      width: 950,
      zooming: {
        mouseWheel: false
      }
    },
    
    series: seriesData.map(function(series, index) {
      return {
        name: series.name,
        data: series.data,
        label: series.label,
        color: bubbleColors[series.name]["border"],
        marker: {
          fillColor: bubbleColors[series.name]["fill"],
          symbol: "square",
          lineWidth: 4,
          fillOpacity: 1
        },
      };
    }),
    tooltip: {
      positioner: function() {
          return {
            x: this.chart.plotLeft,
            y: this.chart.plotTop-3
          };
        },
      shadow: true,
      borderWidth: 0,
      pointFormat: "{point.fullname}"
      },
    title: {
      text: ''
    },
    xAxis: {
      tickLength: 0,
      labels: {
        enabled: false
      },
      lineWidth: 0,
      lineColor: 'transparent'
    },
    yAxis: {
      tickLength: 0,
      labels: {
        enabled: false
      },
      title:{
        text:""
      },
      gridLineWidth: 0
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'horizontal',
      alignColumns: false,
      width: 100
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.gpr}<br>{point.name}',
          style: {
            fontSize:"15px",
            color:"white"
          }
        }
      },
      bubble: {
        minSize: 70, // minimum bubble size
        maxSize: 70 // maximum bubble size
      }
    }
  });

});
