//ADD URL DATA COMING IN FROM app.py
var dataURL = "http://127.0.0.1:5000/results"; 
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

d3.json(dataURL).then(function(data) {
    console.log(data)
    //WRITE CODE HERE FOR DISPLAYING DATA ON index.html
    
});

