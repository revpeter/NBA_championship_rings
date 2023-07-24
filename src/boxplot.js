(async () => {

    // Load the dataset
    const data = await fetch(
        "./data/boxplotData.json"
    ).then(response => response.json());


    var yAxisName = document.querySelector("input[name=yAxis]:checked").value;
    
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
                      return (params.value+1) + " gyűrű";
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
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                datasetIndex: 1,
                tooltip: {
                    formatter: function(params) {
                      const sum = data[group][params.dataIndex].reduce((a, b) => a + b, 0);
                      const avg = (sum / data[group][params.dataIndex].length) || 0;
                      return `Max: <b>${params.data[5].toFixed(1)}</b><br>
                            Q3: <b>${params.data[4].toFixed(1)}</b><br>
                            Medián: <b>${params.data[3].toFixed(1)}</b><br>
                            Q1: <b>${params.data[2].toFixed(1)}</b><br>
                            Min: <b>${params.data[1].toFixed(1)}</b> ${avg.toFixed(1)}`;
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


    var container = document.getElementById('boxplot');
    var chart = echarts.init(container);
    chart.setOption(createPlotOptions(yAxisName));
    
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
        // Print name in console
        console.log(params);
      });

})();