"use strict";
process.stdin.resume();
process.stdin.setEncoding("utf-8");
function print(x){
   console.log(x);
}
let inputString = "";
let currentLine = 0;
process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});
process.stdin.on("end", () => {
  inputString = inputString.split("\n");
  main();
});
function read() {
   return inputString[currentLine++].replace('\r','');
}



function main(){
  let input = read();
  
  print(input);
}