const selectElement = document.getElementById("selector");
console.log(selectElement.value);
selectElement.addEventListener("change", function () {
  if (selectElement.value == "none") {
    document.querySelector("#lambda").value = "";
    document.querySelector("#Pt").value = "80";
    document.querySelector("#Gt").value = "2";
    document.querySelector("#distance").value = "2";

    document.querySelector("#frequency").value = "";
    document.getElementById("lambda").setAttribute("disabled", "true");
    document.getElementById("frequency").setAttribute("disabled", "true");
    document.querySelector("#answer").value = "";
  } else if (selectElement.value == "freq") {
    document.querySelector("#Pt").value = "80";
    document.querySelector("#Gt").value = "2";
    document.querySelector("#distance").value = "2";
    document.querySelector("#lambda").value = "";
    document.querySelector("#frequency").value = "";
    document.getElementById("lambda").setAttribute("disabled", "true");
    document.getElementById("frequency").removeAttribute("disabled");
    document.querySelector("#answer").value = "";
  } else if (selectElement.value == "lamb") {
    
    console.log(selectElement.value);
    document.querySelector("#frequency").value = "";
    document.querySelector("#lambda").value = "";
    document.querySelector("#answer").value = "";
    document.getElementById("frequency").setAttribute("disabled", "true");
    document.getElementById("lambda").removeAttribute("disabled");
  }
});

function calc() {
  var frequency, lambda;
  var Pt = parseFloat(document.getElementById("Pt").value);
  var distance = parseFloat(document.getElementById("distance").value);
  var Gt = parseFloat(document.getElementById("Gt").value);
  
  if (selectElement.value == "freq") {
    frequency = parseFloat(document.getElementById("frequency").value);
    document.getElementById("lambda").value = 300000000 / frequency;
    var output =
      (Pt * Gt )/
      (frequency * frequency * distance * distance);
    document.getElementById("answer").value = output;
  } else if (selectElement.value == "lamb") {
    lambda = parseFloat(document.getElementById("lambda").value);
    document.getElementById("frequency").value = 300000000 / lambda;
    var output =
      (Pt * Gt * (lambda * lambda) * 0.00633257397) /
      (distance * distance);
    document.getElementById("answer").value = output;
  }

  console.log(output);
  var frequency=2, lambda;
  var Pt = parseFloat(document.getElementById("Pt").value);
  var distance = parseFloat(document.getElementById("distance").value);
  var Gt = parseFloat(document.getElementById("Gt").value);
  
  // graph 1
  const xValues =[10,20,30,50,60,70,80,90,100];
  const ctx = document.getElementById("myChart1");
  let cosdata = [];
  let ydata = [];
  var amplitude = Math.sqrt(Pt);
  for(let i=0;i<10;i++){
    cosdata.push((Gt*Pt)/(frequency*frequency*xValues[i]*xValues[i]));
   }
  for (var i = 0; i <10; i ++) {
   // cosdata.push(amplitude * Math.cos(i));
    var temp = i;
    ydata.push(xValues[i]);
  }

  const labels = ydata;
  const data = {
    labels,
    datasets: [
      {
        data: cosdata,
        label: "Pt v/s time",
        // fill:true,
        tension: 0.35,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      radius: 0,
      responsive: true,
    },
  };

  const myChart = new Chart(ctx, config);

  // graph 2
  const ctx1 = document.getElementById("myChart2");
    let cosdata2 = [];
    let ydata2 = [];
    var amplitude=Math.sqrt(output);
    console.log(amplitude);
    for (var i = 0; i <= 4 * Math.PI; i += Math.PI / 4) {
        cosdata2.push(amplitude * Math.cos(i));
        var temp = i;
        ydata2.push(temp.toFixed(2));
        
    }
    
    const labels2 = ydata2;
    const data2 = {
        labels2,
        datasets: [
            {     
                data: cosdata2,
                label: "Pr v/s time",
                // fill:true,
                tension: 0.35,
            },
        ],
    };
    
    const config2 = {
        type: "line",
        data: data2,
        options: {
            radius: 0,
            responsive: true,
        },
    };

    const myChart2 = new Chart(ctx1,config2);
    
   /*const xValues =[10,20,30,50,60,70,80,90,100];
   const yValues =[];
   for(let i=0;i<10;i++){
    yValues.push((Gt*Pt)/(f*f*2*2));
   }
   
new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(255,0,0,0.5)",
        data: yValues
      }]
    },
    
  });
  */
}