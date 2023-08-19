fetch("https://smcqv7b7ty2tw4vknuadbqmrgu0bzize.lambda-url.eu-central-1.on.aws/")
.then(data => {
   console.log(data);
})


window.addEventListener('DOMContentLoaded', () => {

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const id = entry.target.getAttribute('id');
				if (entry.intersectionRatio > 0) {
					document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
				} else {
					document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
				}
		});
	});

	// Track all sections that have an `id` applied
	document.querySelectorAll('section[id]').forEach((section) => {
		observer.observe(section);
	});
	
});

function checkAllCheckboxes() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"][name="rfile"]');
	checkboxes.forEach(function (checkbox) {
	  checkbox.checked = true;
	});
};
function unCheckAllCheckboxes() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"][name="rfile"]');
	checkboxes.forEach(function (checkbox) {
	  checkbox.checked = false;
	});
};

document.addEventListener('DOMContentLoaded', function() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"][name="rfile"]');
	checkboxes.forEach(function(checkbox) {
	  checkbox.addEventListener('change', getCheckboxValues);
	});
  });
  
var checkValues = [1,2,3,4,5,6,7,8];
function getCheckboxValues() {
	var form = document.getElementById('myForm');
	var checkboxes = form.querySelectorAll('input[type="checkbox"][name="rfile"]:checked');
	checkValues = [];

	checkboxes.forEach(function(checkbox) {
		checkValues.push(parseInt(checkbox.value));
	});
	
};


function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};

function processData(data, columnA, columnB) {
	const dataArray = Object.values(data);
  
	const groupedData = dataArray.reduce((acc, obj) => {
	  const key = obj[columnA];
  
	  if (!acc[key]) {
		acc[key] = {"AGE":[], "TEAM":[]};
	  }
  
	  acc[key]["AGE"].push(obj[columnB]);

	  if (acc[key]["TEAM"].length < 1){
		acc[key]["TEAM"].push(obj["team_name"]);
	  }
	  
	  
	  return acc;
	}, {});
	//console.log(groupedData);
	const accMean = Object.entries(groupedData).reduce((acc, [key, values]) => {
	  //console.log(values);
	  const mean = values["AGE"].reduce((sum, value) => sum + value, 0) / values["AGE"].length;
	  acc[key] = {meanVal:mean, team_name:values["TEAM"][0]};

	  return acc;
	}, {});
	//console.log(accMean);
	var result = [];
	for (const [key, value] of Object.entries(accMean)) {

		result.push({x:Math.floor(new Date(key).getTime()), y:value["meanVal"], season:`${key}-${parseInt(key)+1}`, team_name:value["team_name"]});
	}
	return result;
};
  