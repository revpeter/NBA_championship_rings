// Load the CSV file using AJAX
$.get("./data/allChPlayer_data.json", function (data) {

 
  var allAge = data.map(function(item){
    return item.AGE
  });

  const counts = {};
  for (const num of allAge) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  };

  var countsArray = [];
  for (const key in counts) {
    countsArray.push({x:parseInt(key), y:counts[key]})
  };

  const meanAge = allAge.reduce((a, b) => a + b, 0) / allAge.length; 
  //console.log(allAge.reduce((a, b) => a + b, 0) / allAge.length);
  
  // Create the scatter plot chart
  var chart = Highcharts.chart('eletkor_hist', {
    chart: {
      type: 'column',
      height: 700,
      width: 500,
      zooming: {
        mouseWheel: false
      }
    },

    series: [{
      data: countsArray,
    }],

    title: {
      text: 'Életkor eloszlása'
    },
    xAxis: {
      title: {
        text: 'Életkor a bajnokság megnyerésekor'
      },
      plotLines: [{
        color:"orange",
        dashStyle: "dash",
        value: meanAge,
        width: 3,
        zIndex: 33,
        label: {
          zIndex: 1,
          text:"Átlagos életkor " + Math.round(meanAge *10) /10,
          textAlign: "left",
          verticalAlign: 'top',
          rotation: 0,
          y:20,
          style: {
            color: "orange",
            fontSize: "16px",
            fontWeight: "bold"
          }
        }
      }]
    },
    yAxis: {
      title: {
        text: 'Játékosok száma'
      }
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "Játékosok száma:<b>{point.y}</b><br>Életkor:<b>{point.x} év</b>"
    },
    legend: {
      enabled: false 
    }
  });
  
  // Update data based on the filter
  var buttons = document.querySelectorAll('#checkAllButton');
  buttons.forEach(function(button) {
    button.addEventListener('click', filterHistData);
  });
  
  document.getElementById('myForm').addEventListener('change', filterHistData);
  
  function filterHistData() {
    var checkFilterData = data.filter(function(item){
      return checkValues.includes( item.ring);
    });

    var allAge = checkFilterData.map(function(item){
      return item.AGE
    });
  
    const counts = {};
    for (const num of allAge) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    };
    
    var countsArray = [];
    for (const key in counts) {
      countsArray.push({x:parseInt(key), y:counts[key]})
    };

    const meanAge = allAge.reduce((a, b) => a + b, 0) / allAge.length;
    //console.log(chart.xAxis[0].options.plotLines[0].label.text);
    chart.series[0].setData(countsArray);
    chart.xAxis[0].plotLinesAndBands[0].options.value = meanAge;
    chart.xAxis[0].options.plotLines[0].label.text = "Átlagos életkor " + Math.round(meanAge *10) /10;

    chart.xAxis[0].update();
  };




});