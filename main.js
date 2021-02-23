const input = document.querySelector("#add");
const  btn = document.querySelector("#btn");
const list = document.querySelector("#list");
var el = document.getElementsByTagName('li');

var imgENG = document.getElementById("imgENG");
    imgDOC = document.getElementById("imgDOC");
    imgBUS = document.getElementById("imgBUS");
    imgSCI = document.getElementById("imgSCI");
    imgTEA = document.getElementById("imgTEA");
    imgLAW = document.getElementById("imgLAW");
    imgACT = document.getElementById("imgACT");

ENG.onmouseover = function(){
    imgENG.style.display = "block";
    }

ENG.onmouseout = function(){
    imgENG.style.display = "none";
    }

DOC.onmouseover = function(){
    imgDOC.style.display ="block";
    }

DOC.onmouseout = function(){
    imgDOC.style.display ="none";
    }

BUS.onmouseover = function(){
    imgBUS.style.display ="block";
    }

BUS.onmouseout = function(){
    imgBUS.style.display ="none";
    }

SCI.onmouseover = function(){
    imgSCI.style.display ="block";
    }

SCI.onmouseout = function(){
    imgSCI.style.display ="none";
    }

TEA.onmouseover = function(){
    imgTEA.style.display ="block";
    }

TEA.onmouseout = function(){
    imgTEA.style.display ="none";
    }

LAW.onmouseover = function(){
    imgLAW.style.display ="block";
    }

LAW.onmouseout = function(){
    imgLAW.style.display ="none";
    }

ACT.onmouseover = function(){
    imgACT.style.display ="block";
    }

ACT.onmouseout = function(){
    imgACT.style.display ="none";
    }

list.onclick = function(ev){
    if(ev.target.tagName == 'LI'){
         ev.target.classList.toggle('checked');
    }
    };


// News feed slide
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

