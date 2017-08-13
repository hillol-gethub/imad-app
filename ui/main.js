console.log('Loaded!');
var tag = document.getElementById("main-id");
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
};
 