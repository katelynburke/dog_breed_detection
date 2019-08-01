//ADD URL DATA COMING IN FROM app.py
// var dataURL = "http://127.0.0.1:5000/results"; 
// url: "{{url_for('results')}}"
// function subForm(){
//     // alert("hello")
//     $.ajax({
//         url: "/results",
//         // type:'post',
//         // data: JSON.stringify(data, null, "/t"),
//         // contentType: "application/json; charset=UTF=8",
//         success:function(result){
//             alert(result);
//         }
//     });
// }

// alert("outside document load")

$(document).ready(function () {
  //  alert("in javascript")
    // function getData() {
      $( "#target" ).click(function() {
          // alert("in click")
          var str = $( "#data" ).text();
          var res = str.split(",");
          var newData = []
          var dogNames = []
          var dogValues = []
          // newData.push(res[1].slice(0, -1), res[2].slice(0, -1), res[4].slice(0, -1), res[5].slice(0, -1), res[7].slice(0, -1), res[8].slice(0, -3))
          dogNames.push(res[1].slice(0, -1),res[4].slice(0, -1), res[7].slice(0, -1))
          dogValues.push((res[2].slice(0, -1))*100, (res[5].slice(0, -1))*100, (res[8].slice(0, -3))*100)
          console.log(dogNames, dogValues)
          // createChart(newData)
          createChart(dogNames, dogValues)
        });
     
    // };
    // console.log(newData)
    // createChart(newData)

  });

  function createChart(dataA, dataB) {
    d3.select('ul')
    .selectAll('li')
    .data(data)
    .enter()
    .append('li')

    var svgWidth = 500;  
    var svgHeight = 300;

    var svg = d3.select('svg')  
      .attr("width", svgWidth)  
      .attr("height", svgHeight)  
      .attr("class", "bar-chart");
    
      var barPadding = 5;  
      var barWidth = (svgWidth / dataset.length);
      
      var barChart = svg.selectAll("rect")  
          .data(dataB)  
          .enter()  
          .append("rect")  
          .attr("y", function(d) {  
              return svgHeight - d  
          })  
          .attr("height", function(d) {  
              return d;  
          })  
          .attr("width", barWidth - barPadding)  
          .attr("transform", function (d, i) {  
               var translate = [barWidth * i, 0];  
               return "translate("+ translate +")";  
          });
              
    

 }
  
//  https://www.freecodecamp.org/news/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386/
