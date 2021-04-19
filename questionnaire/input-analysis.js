var offsetResult = 2;
function checkInputVal(x0,x1,x2,x3,x4,x5,x6,x7){
  let y = inputValList;
  return (y[0] == x0 && y[1] == x1 && y[2] == x2 && y[3] == x3 && 
          y[4] == x4 && y[5] == x5 && y[6] == x6 && y[7] == x7)
}
function checkOffsetDiff(x0,x1,x2,x3,x4,x5,x6,x7){
  let y = inputValList;
  let v = offsetResult;
  return (Math.abs(y[0] - x0) <= v  &&  Math.abs(y[1] - x1) <= v  &&  Math.abs(y[2] - x2) <= v && 
          Math.abs(y[3] - x3) <= v  &&  Math.abs(y[4] - x4) <= v  && Math.abs(y[5] - x5) <= v  &&
          Math.abs(y[6] - x6) <= v  &&  Math.abs(y[7] - x7) <= v )
}



function analysisLocation(){

  let resultLocation = "none.html";


  if(checkInputVal(5,2,5,3,2,4,2,3)){
    resultLocation = "engineer.html";
  }
  else if(checkInputVal(3,5,2,4,2,3,1,2)){
    resultLocation = "doctor.html";  
  }
  else if(checkInputVal(4,0,0,0,5,5,3,5)){
    resultLocation = "business.html";
  }
  else if(checkInputVal(5,5,5,5,4,5,3,4)){
    resultLocation = "scientist.html";
  }
  else if(checkInputVal(0,0,0,0,5,5,5,5)){
    resultLocation = "human.html";
  }
  else if(checkInputVal(2,0,0,0,4,4,0,5)){
    resultLocation = "lawyer.html";
  }
  else if(checkInputVal(2,0,0,0,5,2,5,5)){
    resultLocation = "art.html";
  }
  else{
    if(checkOffsetDiff(5,2,5,3,2,4,2,3)){
      resultLocation = "engineer.html";
    }
    else if(checkOffsetDiff(3,5,2,4,2,3,1,2)){
      resultLocation = "doctor.html";  
    }
    else if(checkOffsetDiff(4,0,0,0,5,5,3,5)){
      resultLocation = "business.html";
    }
    else if(checkOffsetDiff(5,5,5,5,4,5,3,4)){
      resultLocation = "scientist.html";
    }
    else if(checkOffsetDiff(0,0,0,0,5,5,5,5)){
      resultLocation = "human.html";
    }
    else if(checkOffsetDiff(2,0,0,0,4,4,0,5)){
      resultLocation = "lawyer.html";
    }
    else if(checkOffsetDiff(2,0,0,0,5,2,5,5)){
      resultLocation = "art.html";
    }
  }
  window.location.replace(resultLocation)
}