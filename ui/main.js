


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
 