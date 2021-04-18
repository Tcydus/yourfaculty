const input = document.querySelector("#add");
const  btn = document.querySelector("#btn");
const list = document.querySelector("#list");
var el = document.getElementsByTagName('li');

var imgENG = document.getElementById("imgENG"),
    imgDOC = document.getElementById("imgDOC"),
    imgBUS = document.getElementById("imgBUS"),
    imgSCI = document.getElementById("imgSCI"),
    imgTEA = document.getElementById("imgTEA"),
    imgLAW = document.getElementById("imgLAW"),
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