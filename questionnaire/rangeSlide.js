var inputValList = [];
var tempValList = [];
const position = "beforeend";

var data = [
	{
	  "key": "คะแนนแบบประเมิน",
	  "values": [
		{
		  "subject": "คณิตศาสตร์",
		  "point": 0
		},
		{
		  "subject": "ฟิสิกส์",
		  "point": 0
		},
		{
		  "subject": "เคมี",
		  "point": 0
		},
		{
		  "subject": "ชีวะ",
		  "point": 0
		},
		{
		  "subject": "ภาษาอังกฤษ",
		  "point": 0
		},
		{
		  "subject": "ภาษาไทย",
		  "point": 0
		},
		{
		  "subject": "ศิลปะ",
		  "point": 0
		},
    {
		  "subject": "สังคม",
		  "point": 0
		}
	  ]
	}
  ]

function addHTMLSubjuct(){
  const list = document.getElementById("rangeInput-field");

  
  data[0].values.forEach(function(value,index){
    dictData = data[0].values[index]; // equivalent value parameter
    dictData.point = 0;
    inputValList[index] = 0
    const text = `<div class="range">
                    <div class="slider-value">
                      <span class="span-show"></span>
                    </div>
                    <div class="field">
                      <div class="value text">${value.subject}</div>
                      <div class="value left">0</div>
                      <input type="range" min="0" max="5" value="0" steps="1"> 
                      <div class="value right">5</div>
                      <div class="value output">0</div>
                    </div>
                  </div>`;
    list.insertAdjacentHTML(position,text);
   
  })
  console.log(inputValList)
  // console.log(data[0].values);
}
function addInputRange(){
    const slideValue = document.querySelectorAll("span.span-show");
  const inputSlider = document.querySelectorAll("input");
  const showValue = document.getElementsByClassName("output");

  
  inputSlider.forEach(function(eachSlider, index){
    
    eachSlider.oninput = function(){
      
         
      let value = eachSlider.value;

      dictData = data[0].values[index];
      dictData.point = Number(value);
      inputValList[index] =  Number(value);

      slideValue[index].textContent = value;
      showValue[index].innerHTML =value;
  
      newValue = Number((value - eachSlider.min) *100 / (eachSlider.max - eachSlider.min))
      const newPosition = 10 - (newValue * 0.2)
      slideValue[index].style.left = `calc(${newValue}% + (${newPosition}px))`;
      slideValue[index].classList.add("show");
      // console.log(data[0].values);
      RadarChart(".radarChart", data, Option1);
    };
    eachSlider.onblur = (() =>{
      slideValue[index].classList.remove("show");
    });
    
  })
  
}

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
 


    // for(let i = 0; i<= 5; i++){
    //   inputValList[7] = i;
    //   for(let j = 0; j<= 5; j++){
    //     inputValList[6] = j;
    //     for(let k = 0; k<= 5; k++){
    //       inputValList[5] = k;
    //       for(let l = 0; l<= 5; l++){
    //         inputValList[4] = l;
    //         for(let m = 0; m<= 5; m++){
    //           inputValList[3] = m;
    //           for(let n = 0; n<= 5; n++){
    //             inputValList[2] = n;
    //             for(let o = 0; o<= 5; o++){
    //               inputValList[1] = o;
    //               for(let p = 0; p<= 5; p++){
    //                 inputValList[0] = p;
    //                 console.log(inputValList)
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  
  // }

  // inputValList.forEach(function(value,i){
  //   inputValList[i] =  Math.floor(Math.random() * 6);
  // });
  // tempValList.forEach(function(value,i) {
  //   // if(value != inputValList){
  //   //   tempValList.push(inputValList)
  //   // }
  // });
  // console.log(tempValList.length);
  // if(tempValList.length == 0){
  //   tempValList.push(inputValList);
  //   }

  // console.log(inputValList);
  // console.log(tempValList);

  let resultLocation = "none.html";
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
  // console.log(inputValList)
  // console.log(resultLocation)
  // resultLocation = "engineer.html";
  // resultLocation = "result.html"
  window.location.replace(resultLocation)
}


addHTMLSubjuct();
addInputRange();



// inputSlider[0].oninput = (() =>{
//   console.log("first :"+inputSlider[0].value)
//   // let value = inputSlider.value;
//   // slideValue.textContent = value;
//   // newValue = Number((value - inputSlider.min) *100 / (inputSlider.max - inputSlider.min))
//   // const newPosition = 10 - (newValue * 0.2)
//   // slideValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
//   // slideValue.classList.add("show");

// });

// inputSlider[1].oninput = (() =>{
//   console.log("second :"+inputSlider[1].value)
//   // let value = inputSlider.value;
//   // slideValue.textContent = value;
//   // newValue = Number((value - inputSlider.min) *100 / (inputSlider.max - inputSlider.min))
//   // const newPosition = 10 - (newValue * 0.2)
//   // slideValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
//   // slideValue.classList.add("show");

// });


