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
          // new1 = res[1].slice(0, -1)
          // new2 = res[2].slice(0, -1)
          // new4 = res[4].slice(0, -1)
          // new5 = res[5].slice(0, -1)
          // new7 = res[7].slice(0, -1)
          // new8 = res[8].slice(0, -1)

          newData.push(res[1].slice(0, -1), res[2].slice(0, -1), res[4].slice(0, -1), res[5].slice(0, -1), res[7].slice(0, -1), res[8].slice(0, -3))
          console.log(newData)
        });
    //  return(newData)
    // };
    

  });

// d3.(function(data) {
//     console.log("in the d3.js")
//     //WRITE CODE HERE FOR DISPLAYING DATA ON index.html
    
// });

