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

    // Define SVG area dimensions
    var svgWidth = 960;
    var svgHeight = 660;

    // Define the chart's margins as an object
    var chartMargin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
      
    var barSpacing = 10; // desired space between each bar
    var scaleY = 10; // 10x scale on rect height
    
    
    // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
    var barWidth = (chartWidth - (barSpacing * (dataB.length - 1))) / dataB.length;
    // Create code to build the bar chart using the tvData.
    chartGroup.selectAll(".bar")
      .data(dataB)
      .enter()
      .append("rect")
      .classed("bar", true)
      // .attr("width", d => barWidth)
      // .attr("height", d => d.hours * scaleY)
      // .attr("x", (d, i) => i * (barWidth + barSpacing))
      // .attr("y", d => chartHeight - d.hours * scaleY);
      
 }
  

