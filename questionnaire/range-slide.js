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
      RadarChart(".radarChart", data, Option1);
    };
    eachSlider.onblur = (() =>{
      slideValue[index].classList.remove("show");
    });
    
  })
  
}




addHTMLSubjuct();
addInputRange();


