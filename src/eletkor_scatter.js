// Load the CSV file using AJAX
readJsonFile("https://revpeter.github.io/nba_championship_rings/data/allChPlayer_data.json", function(text){
    var data = JSON.parse(text);
    
    var ringColors = {
        1:"red",
        2:"blue",
        3:"navy",
        4:"orange",
        5:"black",
        6:"purple",
        7:"pink",
        8:"aqua"
    };

    var uniqueGroupsScatter = [];

    data.forEach(function(point) {
      if (uniqueGroupsScatter.indexOf(point.ring) === -1) {
        uniqueGroupsScatter.push(point.ring);
      }
    });

    var seriesDataScatter = [];
    uniqueGroupsScatter.forEach(function(group) {
      var groupDataScatter = data.filter(function(point) {
        return point.ring === group;
      });
  
      var seriesScatter = {
        name: group,
        label: group,
        data: groupDataScatter.map(function(point) {
          return {x:point.AGE, y:point.SEASON, playerName:point.PLAYER, playerRing:point.ring, teamName:point.team_name};
        })
      };
  
      seriesDataScatter.push(seriesScatter);
    });

    // Create the scatter plot chart
    var chartScatter = Highcharts.chart('eletkor_scatter', {
      chart: {
        type: 'scatter',
        height: 700,
        width: 700,
        zooming: {
          mouseWheel: false
        }
      },
      plotOptions: {
        scatter: {
          jitter: {
            x: 0.5, // Adjust the jitter range for x-axis
            y: 0.5  // Adjust the jitter range for y-axis
          }
        }
      },
      series: seriesDataScatter.map(function(series, index) {
        return {
            name:series.name,
            label:series.label,
            data:series.data,
            color: ringColors[series.name],
            marker: {
                symbol: "circle"
            }
        };
      }),
  
      title: {
        text: 'Bajnokok életkora szezonok szerint'
      },
      xAxis: {
        title: {
          text: 'Játékosok életkora'
        },
      },
      yAxis: {
        title: {
          text: 'Évszám'
        }
      },
      tooltip: {
        headerFormat: "",
        formatter: function() {
            return "<b>" + this.point.y + "-" + (parseInt(this.point.y )+1) + "</b><br>" + this.point.playerName + " <b>" + this.point.x + "</b> évesen<br>Összesen <b>" + this.point.playerRing + "</b> bajnoki cím<br>" + this.point.teamName;
          }
        //pointFormat: '<b>${point.y + 1 }</b><br>{point.playerName} <b>{point.x}</b> évesen'
      },
      legend: {
        enabled: true 
      }
    });
    
    // Update data based on the filt

    var buttons = document.querySelectorAll('#checkAllButton');
    buttons.forEach(function(button) {
      button.addEventListener('click', filterScatterData);
    });

    document.getElementById('myForm').addEventListener('change', filterScatterData);

    function filterScatterData() {
      var checkFilterData = data.filter(function(item){
        return checkValues.includes( item.ring);
      });

      var uniqueGroupsScatter = [];

      checkFilterData.forEach(function(point) {
        if (uniqueGroupsScatter.indexOf(point.ring) === -1) {
          uniqueGroupsScatter.push(point.ring);
        }
      });

      var seriesDataScatter = [];
      uniqueGroupsScatter.forEach(function(group) {
        var groupDataScatter = data.filter(function(point) {
          return point.ring === group;
        });
    
        var seriesScatter = {
          name: group,
          label: group,
          data: groupDataScatter.map(function(point) {
            return {x:point.AGE, y:point.SEASON, playerName:point.PLAYER, playerRing:point.ring, teamName:point.team_name};
          })
        };
    
        seriesDataScatter.push(seriesScatter);
      });
      console.log(seriesDataScatter.map(function(series, index) {
        return {
            name:series.name,
            label:series.label,
            data:series.data,
            color: ringColors[series.name],
            marker: {
                symbol: "circle"
            }
        };
      }));


      
      chartScatter.update({
        series: seriesDataScatter.map(function(series, index) {
          return {
              name:series.name,
              label:series.label,
              data:series.data,
              color: ringColors[series.name],
              marker: {
                  symbol: "circle"
              }
          };
        })
      }, true, true);
    };
  

  
  });