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
          dogNames.push(res[1].slice(0, -1).substring(2),res[4].slice(0, -1).substring(2), res[7].slice(0, -1).substring(2))
          dogValues.push((res[2].slice(0, -1))*100, (res[5].slice(0, -1))*100, (res[8].slice(0, -3))*100)
          //console.log(dogNames, dogValues)
          // createChart(newData)
          //createChart(dogNames, dogValues)
          
          var array1 = dogNames 
          var array2 = dogValues
          combined = array1.map(function(v, k, a){ return {dogName: v, dogValue: array2[k]}; });
          //console.log(combined);
          createChart(combined)
           
          //createData(dogNames, dogValues)
        });
     
    // };
    // console.log(newData)
    // createChart(newData)

  });

//   function createData(dataA, dataB) {

//     // var result = [];
//     // for (var i = 0; i < dataA.length; i++) {
//     //   var val1 = dataA[i];
//     //   var val2 = dataB[i]
//     //   var obj = {
//     //     dogName: val1,
//     //     dogValue: val2
//     //   };
//     //   result.push(obj);
//     //   console.log(result)

//     var array1 = dataA 
//     array2 = dataB
//     combined = array1.map(function(v, k, a){ return {dogName: v, dogValue: array2[k]}; });
    
//     //console.log(combined);
//       createChart(combined)
//       return(combined)
      
  
// }
//https://stackoverflow.com/questions/42448966/combine-the-values-of-two-arrays-into-object

  function createChart(result) {
    
    // d3.select('ul')
    //   .selectAll('li')
    //   .data(dataB)
    //   .enter()
    //   .append('li')
    // console.log(dataB)
    // var finalData = dataA.map(function(e, i) {
    //   return [e, dataB[i]];
    // });
    // console.log(finalData[0])
   
   
  //  test = finalData.map(function(d) { return d[0]; })
  //  test2= dataA.forEach(function(d) { return d; });
  //  test3= dataA.map(function(d) { return d; });
  //  test4= dataB.map(function(d) { return d; });
  //  test5= finalData.map(function(d) { return d[1]; })
  //  console.log(test)
  //  console.log(test2)
  //  console.log(test3)  
  //  console.log(test4)
  //  console.log(test5)
    //console.log(result)
    test6 = result.map(function(d) { return d.dogName; });
    test7 = result.map(function(d) { return d.dogValue; });
    test8= test6.forEach(function(d) { return d.dogName; });
    console.log(test6)
    console.log(test7)
    console.log(test8)

   
  const sample = [
      {
        dogName: 'red_fox',
        dogValue: 35.6,
        color: '#000000'
      },
      {
        dogName: 'coyote',
        dogValue: 13.5,
        color: '#00a2ee'
      },
      {
        dogName: 'red_wolf',
        dogValue: 8.3,
        color: '#fbcb39'
      }
  ]
    
  const svg = d3.select('svg');
  const svgContainer = d3.select('#container');
  
  const margin = 80;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(result.map((s) => s.dogName))
    .padding(0.4)
  
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  // vertical grid lines
  // const makeXLines = () => d3.axisBottom()
  //   .scale(xScale)

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  // vertical grid lines
  // chart.append('g')
  //   .attr('class', 'grid')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(makeXLines()
  //     .tickSize(-height, 0, 0)
  //     .tickFormat('')
  //   )

  chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(result)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.dogName))
    .attr('y', (g) => yScale(g.dogValue))
    .attr('height', (g) => height - yScale(g.dogValue))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
      d3.selectAll('.value')
        .attr('opacity', 0)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
        .attr('x', (a) => xScale(a.dogName) - 5)
        .attr('width', xScale.bandwidth() + 10)

      const y = yScale(actual.dogValue)

      line = chart.append('line')
        .attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)

      barGroups.append('text')
        .attr('class', 'divergence')
        .attr('x', (a) => xScale(a.dogName) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.dogValue) + 30)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text((a, idx) => {
          const divergence = (a.dogValue - actual.dogValue).toFixed(1)
          
          let text = ''
          if (divergence > 0) text += '+'
          text += `${divergence}%`

          return idx !== i ? text : '';
        })

    })
    .on('mouseleave', function () {
      d3.selectAll('.value')
        .attr('opacity', 1)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (a) => xScale(a.dogName))
        .attr('width', xScale.bandwidth())

      chart.selectAll('#limit').remove()
      chart.selectAll('.divergence').remove()
    })

  barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.dogName) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.dogValue) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.dogValue}%`)
  
  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Prediction meter (%)')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Dog Types')

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Predictions by Computer')

  svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'start')
    .text('Source: Stack Overflow, 2018')



    // //set the dimensions and margins of the graph
    //   var margin = {top: 20, right: 20, bottom: 30, left: 40},
    //   width = 960 - margin.left - margin.right,
    //   height = 500 - margin.top - margin.bottom;

    //   // set the ranges
    //   var x = d3.scaleBand()
    //         .range([0, width])
    //         .padding(0.1);
    //   var y = d3.scaleLinear()
    //         .range([height, 0]);
            
    //   // append the svg object to the body of the page
    //   // append a 'group' element to 'svg'
    //   // moves the 'group' element to the top left margin
    //   var svg = d3.select("body").append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", 
    //         "translate(" + margin.left + "," + margin.top + ")");
          
    //   // The following code was contained in the callback function.
    //     x.domain(result.map(function(d) { return d.dogNamee; }));
    //     y.domain([0, d3.max(data, function(d) { return d.dogValue; })]);

        
    //   // append the rectangles for the bar chart
    //   svg.selectAll(".bar")
    //   .data(sample)
    //   .enter().append("rect")
    //   .attr("class", "bar")
    //   //.attr("x", result.map(function(d) { return x(d.dogName); } ))
    //   //.attr("x", test6)
    //   //.attr("x", test6.forEach(function(d) { return x(d);}))
    //   .attr("x", (d) => x(d.dogName))
    //   .attr("width", x.bandwidth())
    //   //.attr("y", result.map(function(d) { return y(d.dogValue); }))
    //   //.attr("y", test7)
    //   //.attr("y", test7.forEach(function(d) { return y(d); }))
    //   .attr("y", (d) => y(d.dogValue))
    //   //.attr("height", height-test7);
    //   //.attr("height", test7.forEach(function(d){return height-y(d); }));
    //   .attr('height', (d) => height - y(d.dogValue));
    //   //.attr("height", result.map(function(d) { return height - y(dogValue); }));   
     
      

    // // add the x Axis
    //   svg.append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(d3.axisBottom(x));

    // // add the y Axis
    // svg.append("g")
    //   .call(d3.axisLeft(y));


      //https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
      //https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
      //https://stackoverflow.com/questions/21639305/d3js-take-data-from-an-array-instead-of-a-file




//     var svgWidth = 500;  
//     var svgHeight = 300;

//      // Scale the range of the data
//      // set the ranges
//     var x = d3.scaleBand()
//      .range([0, svgWidth]);
//     var y = d3.scaleLinear()
//      .range([svgHeight, 0]);

//     var svg = d3.select('svg')  
//       .attr("width", svgWidth)  
//       .attr("height", svgHeight)  
//       .attr("class", "bar-chart");
    
//     var barPadding = 5;  
//     var barWidth = (svgWidth / dataB.length);
//     // 500 /3 = 166.67

// var svg = d3.select("svg")
    
// var barChart = svg.selectAll("g")  
//     .data(dataB)  
//     .enter()  
//     .append("rect")  
//     .attr("y", function(d) {  
//         return (svgHeight - (d*4)) 
//     })  
//     .attr("height", function(d) {  
//         return d*4;  
//     })  
//     .attr("width", barWidth - barPadding)  
//     .attr("transform", function (d, i) {  
//          var translate = [barWidth * i, 0];  
//          return "translate("+ translate +")";  
//     })
//     .attr("fill", "teal")
  
  // svg.append("text")
  //       .data(dataA)
  //       .enter()
  //       .append("p")
  //       .attr("x", barWidth / 2)
  //       .attr("y", svgHeight / 2)
  //       .attr("dy", ".35em")
  //       .attr("fill", "black")
  //       .style("text-anchor", "middle")
  //       .text(function(d) { return d; });
    
       




    // barChart.append("g")
    //   .attr("transform", "translate(0," + svgHeight + ")")
    //   .call(d3.axisBottom(x));

    // barChart.append("g")
    //   .call(d3.axisLeft(y));
    
    //https://www.kdnuggets.com/2018/03/simple-bar-chart-d3.html

     // text label for the y axis
      // barChart.append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 0 - margin.left)
      // .attr("x",0 - (height / 2))
      // .attr("dy", "1em")
      // .style("text-anchor", "middle")
      // .text(function(data, i) { return dataA[i]; });
      // .text("Value");      
      // barChart.append("text")
      //   .attr("x", function(data) { return (data) - 3; })
      //   .attr("y", svgHeight / 2)
      //   .attr("dy", ".35em")
      //   .attr("fill", "black")
      //   .style("text-anchor", "middle")
      //   .text(function(data, i) { return dataA[i]; });

 


 }
  
// Helpful websites:
// https://www.freecodecamp.org/news/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386/
// https://alignedleft.com/tutorials/d3/making-a-bar-chart




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
