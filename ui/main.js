//console.log('Loaded!');
/*var tag = document.getElementById("main-id");
 tag.innerHTML = "helo its over";
 
 // move the image
 var img = document.getElementById("madi");
 var marginLeft = 0;
 function moveRight(){
     marginLeft = marginLeft + 1;
     img.style.marginLeft = marginLeft + 'px';
     
 }
 
 img.onclick = function(){
     var interval = setInterval(moveRight,100);
};*/


var button = document.getElementById("counter");
var counter = 0;
button.onclick = function(){
    
    //create a request object
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some actrion
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
        
        
    };
    
    //RENDER THE VARIABLE IN THE CORRECT SPAN
    request.open('GET', 'http://majumdar123hillol.imad.hasura-app.io/counter', true);
    request.send(null);
};

// capture the input
var inputName = document.getElementById("name");
var name = inputName.value;
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
    //make a request to the server and send the name
    
    //compute a list of names and render it as a list
    
    
}
























