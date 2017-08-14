console.log('Loaded!');
var element=document.getElementById("sub-text");
element.innerHTML="wohooooo....first app.....xcited a lot....";
var img=document.getElementById("madi") ;
var marginLeft=0;
function moveRight() {
    marginLeft=marginLeft +1;
    img.style.marginLeft=marginLeft+'px';
}

img.onclick = function() {
   var interval=setInterval(moveRight,20);
    };