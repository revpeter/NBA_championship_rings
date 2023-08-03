(async () => {

    // Load the dataset
    const data = await fetch(
        "https://revpeter.github.io/nba_championship_rings/data/boxplotData.json"
    ).then(response => response.json());

    const dataScatter = await fetch(
      "https://revpeter.github.io/nba_championship_rings/data/boxplotScatterData.json"
    ).then(response=> response.json());

    //console.log(dataScatter);
  
    var yAxisName = document.querySelector("input[name=yAxis]:checked").value;
    var rings = "8";
    var colorList = ["#e01f54", "#001852", "#41aa74", "#5a2a27", "#a06cd5", "#004e89", "black", "#dc602e"];

    function createPlotOptions(group) {
        return {
            dataset: [
              {
                // prettier-ignore
                source: data[group]
              },
              {
                transform: {
                  type: 'boxplot',
                  config: {
                    itemNameFormatter: function (params) {
                      return (params.value+1) ;
                    }
                  }
                }
              },
              {
                fromDatasetIndex: 1,
                fromTransformResult: 1
              }
            ],
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%'
            },
            tooltip: {
                trigger: "item",
                axisPointer: {
                    type: "shadow"
                }
            },
            xAxis: {
              type: 'category',
              name: "Bajnoki címek száma",
              nameLocation: "middle",
              boundaryGap: true,
              nameGap: 30,
              splitArea: {
                show: false
              },
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
              name: group,
              splitArea: {
                show: true
              }
            },
            color: colorList,
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                colorBy: "data",
                datasetIndex: 1,
                tooltip: {
                    formatter: function(params) {
                      const sum = data[group][params.dataIndex].reduce((a, b) => a + b, 0);
                      const avg = (sum / data[group][params.dataIndex].length) || 0;
                      return `Max: <b>${params.data[5].toFixed(1)}</b><br>
                            Q3: <b>${params.data[4].toFixed(1)}</b><br>
                            Medián: <b>${params.data[3].toFixed(1)}</b><br>
                            Q1: <b>${params.data[2].toFixed(1)}</b><br>
                            Min: <b>${params.data[1].toFixed(1)}</b><br>
                            Átlag: <b>${avg.toFixed(1)}</b>`;
                    }
                  },
              },
              {
                name: 'outlier',
                type: 'scatter',
                datasetIndex: 2,
                color:"black",
                tooltip: {
                    formatter: function(params) {
                        return `${group}: <b>${params.data[1].toFixed(1)}</b>`;
                    }
                }
              }
            ],
        }

    };

    function createScatterOptions(rings) {
      return {
        title: {
          text: `Játékosok ${rings} bajnoki címmel`
        },
        xAxis: {
          type:"value",
          scale:true,
          name: "MIN - Összes játszott perc a bajnok szezonokban",
          nameLocation: "middle",
          nameGap: 35
        },
        yAxis: {
          type:"value",
          scale:true,
          name: "GP - Összes mérkőzés száma a bajnoki szezonokban",
          nameLocation: "middle",
          nameRotation: "y",
          nameGap: 40
        },
        series: [
          {
            type: "scatter",
            data: dataScatter[rings],
            color: colorList[rings-1],
            emphasis:{
              scale: 1.5
            }
          }
        ],
        tooltip: {
          type: "item",
          formatter: function(params) {
            //console.log(params);
            return `<b>${params.data[2]}</b><br>
                    MIN/GP: ${(params.data[0]/params.data[1]).toFixed(1)}<br>
                    GP/#CHAMP: ${(params.data[1]/rings).toFixed(1)}`;
          },
          axisPointer: {
            type: 'cross'
          }
        },

      }
    };

    // Create default charts
    var container = document.getElementById('boxplot');
    var chart = echarts.init(container);
    chart.setOption(createPlotOptions(yAxisName));
    
    var containerScatter = document.getElementById('boxplotScatter');
    var chartScatter = echarts.init(containerScatter);
    chartScatter.setOption(createScatterOptions(rings));

    // Update data based on the filter
    var buttons = document.querySelectorAll('#op1, #op2, #op3');
    buttons.forEach(function(button) {
        button.addEventListener('change', updateBoxplot);
    });

    function updateBoxplot() {
        yAxisName = document.querySelector("input[name=yAxis]:checked").value;
        chart.setOption(createPlotOptions(yAxisName));
    };


    chart.on('click', function(params) {
        chartScatter.setOption(createScatterOptions(params.dataIndex+1));
        //console.log(params.dataIndex+1);
      });
  
    // Responsive chart
    window.addEventListener('resize',function(){
        chart.resize();
    })
    // Responsive chart
    window.addEventListener('resize',function(){
      chartScatter.resize();
    })
    
})();