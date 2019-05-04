//Type your code here


// Global variables

var gblAppInfo={
  appVer:1
};

var gblPlatform="";
var gblChannel="";
var gblProductDetails={};

var gblPegaObj ={
  authServiceURL:"https://pega-training-na.eastus.cloudapp.azure.com/prweb/PRRestService/beEBp4uRVTogorRwSwWqbIXWg-2ML_BwywJj5QiBlERzca9l2XDoHA%5B%5B*/OFGpocpkg/v1/ofg/mobile",
  authUsername:"KonyOFGSvcUser",
  authPassword:"K@ny5X3#",
  authBase64Credentials: "S29ueU9GR1N2Y1VzZXI6S0BueTVYMyM="
};


function reAssignGlobalVariable(){
  gblChannel = "";
}

function removeDuplicates(arr){
  var unique_array = [];
  for(let i = 0;i < arr.length; i++){
    if(unique_array.indexOf(arr[i]) == -1){
      unique_array.push(arr[i]);
    }
  }
  return unique_array;
}

