function GetURLParameter(parameter){
var data = ''
var url = window.location.toString()
//url = "https://h.ml/?year=100"
if(url.indexOf('?')>=0){
url = url.substr(url.indexOf('\?'))
//console.log(url)
let searchParams = new URLSearchParams(url);
if(searchParams.has(parameter)){
data = searchParams.get(parameter)
//console.log(data)
}
}
return data;
}

let menuBtnStatus = true;
	function OpenMenu(){
	if(menuBtnStatus){
	document.body.style.position = "fixed";
	menuDiv.style.display = "inline";
	menu.style.left = "0";
	menuBtnStatus = false;
	}
	else{
	document.body.style.position = "";
	menuDiv.style.display = "";
	menu.style.left = "";
	menuBtnStatus = true;
	
	}
	}

if(GetURLParameter('p')!=''){

var form = new FormData();
    form.append("url", GetURLParameter('p'));
    var url = "php/content.php";
    fetch(url,{
      method: "POST",
      mode: "no-cors",
      header:{
      'Content-Type': 'application/json'
      },
      body:  form
    })
    .then(res => res.text())
    .then(text => {
    //console.log(text)
problem.innerHTML = text.replace(/<meta/g,'<').replace(/<!DOCTYPE/, '<').replace(/<html/,'<').replace('<body','<')
problem.innerHTML = document.getElementsByClassName("problem-statement")[0].innerHTML
container.style.display = "block";
loader.style.display = "none";
let pc = document.createElement('div');
pc.setAttribute('style','margin: 20px 10px; font: 700 15px Monospace; border-left: 5px solid #000; background: #eee; color: 555; padding: 5px; width: 120px;');
pc.innerText = 'CF-'+GetURLParameter('p').replace(/https:\/\/codeforces.com\//,'').replace('contest/','').replace('problem/','').replace('/','');
CFsubmitForm['submittedProblemCode'].value = GetURLParameter('p').replace(/https:\/\/codeforces.com\//,'').replace('contest/','').replace('problem/','').replace('/','');
link.appendChild(pc)
test.style.display='inline';

MathJax = {
options: {enableMenu: false,},
tex: {inlineMath: [['$$$','$$$']], displayMath: [['$$$$$$','$$$$$$']]},
svg: {fontCache: 'global'}
};
let js = document.createElement('script')
js.src = "../mathjax/es5/tex-svg.js"
container.appendChild(js)
})
.catch(err=>{
alert(err)
}
);
}
else{
container.style.display = "block";
loader.style.display = "none"
}

function textarea(data, area){
  let arr = []
  for(let k=0; k<data.length; k++){
  if(data[k]!==""){
  arr.push(data[k].length)
  }
  }
  arr.sort(function(a, b){return b-a})
  cols = arr[0]
  if(cols>30){
  area.cols = cols
  }
  else{
  area.cols = 30
  }
}


function cftest(i){
if(i<=document.getElementsByClassName("input").length-1){
  codeInputArea.value = document.getElementsByClassName("input")[i].childNodes[1].innerText;
  run()
  
  let CFoutput = document.getElementsByClassName("output")[i].childNodes[1].innerText.split('\n');
  let Uoutput = codeOutputArea.value.split('\n');
  let again = true;
  if(CFoutput.length===Uoutput.length){
    for(let i=0; i<CFoutput.length; i++){
     console.log(again)
      if(CFoutput[i]!==Uoutput[i]){
        console.log(i + " line "+CFoutput[i]+" != "+Uoutput[i]);
        again = false;
        break;
      }
    }
  }
  
  else{
  console.log(again)
    console.log('length : WA');
    again = false;
  }
  if(again) cftest(i+1);
}

else{
  test.removeAttribute('onclick');
  test.innerText = "Run";
  test.setAttribute('onclick', 'run()');
  cfsubmit.style.display='inline';
}
}

function run(){
  codeOutputArea.value= '';
  let io = `line=0
  function read(){
  let val = codeInputArea.value.split('\\n')[line++]
  return val;
  }
  
  function print(x){
  codeOutputArea.value += x + "\\n"
  }
  `
  
  runDiv.innerHTML = '';
  let script = document.createElement('script');
  script.innerHTML = io + editor.childNodes[0].value ;
  runDiv.appendChild(script)
  main();
}

function cfSubmit(){
   let stdio = `
   "use strict";
   process.stdin.resume();
   process.stdin.setEncoding("utf-8");
   
   function print(x) {
   console.log(x);
   }
   let inputString = "";
   let currentLine = 0;
   
   process.stdin.on("data", (inputStdin) => {
   inputString += inputStdin;
   });
   process.stdin.on("end", () => {
   inputString = inputString.split("\\n");
   main();
   });
   function read() {
   return inputString[currentLine++].replace('\\r','');
   }
   `;
   //CFsubmitForm['source'].value = 
   let str = stdio + editor.childNodes[0].value;
   //CFsubmitForm.submit();
   CFsubmitForm['source'].select();
   //CFsubmitForm['source'].setSelectionRange(0, 99999); 
   let el = document.createElement('textarea');
   el.value = str;
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
   
   document.execCommand('copy')
   
   alert("Copied Code");
}

