console.log('Loaded!');
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

var counter = 0;
var button = document.getElementById("counter");

button.onclick = function(){
    counter = counter + 1;
    var span = documennt.getElementById("count");
    span.innerHTML = counter.toString();
}
 