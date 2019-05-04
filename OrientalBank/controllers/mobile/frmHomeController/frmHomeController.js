define({ 

  //Type your controller code here 

  /**
    * @function
    *
    * @param params 
    */
  isBackNavigation:false,

  onNavigate:function(params,isBackNavigation ){

    Application.Utils.Dlog(this.view.id +"onNavigate");
    if(! Application.Utils.isNullUndefinedObj(params)){
      Application.Utils.Dlog("onNavigate ====>> "+JSON.stringify(params));
      this.isBackNavigation = params.isBackNavigation;
    }
    if(this.isBackNavigation === false){
      this.bindEvents();
    }
  },

  /**
   * @function
   *
   */
  bindEvents:function(){


    this.view.preShow = this.onPreShow;
    this.view.postShow = this.onPostShow;
    this.view.onHide = this.onHide;
    this.view.onDestroy = this.onDestroy;
    this.view.onDeviceBack = this.onDeviceBack;

    this.view.txtMessage.text ="";
    this.view.txtMessage.placeholder = "Type your question here";
    this.view.txtMessage.onDone = this.onDoneTxtMessage;

    this.view.flxBookApt.onClick = this.onClickHomeOptionsMenus;
    this.view.flxLocate.onClick = this.onClickHomeOptionsMenus;
    this.view.flxSupport.onClick = this.onClickHomeOptionsMenus;
    this.view.flxBrowseProduct.onClick = this.onClickHomeOptionsMenus;
    this.view.flxOpenProduct.onClick = this.onClickHomeOptionsMenus;
    this.view.flxMakePayment.onClick = this.onClickHomeOptionsMenus;

    this.view.flxLang.onClick = this.onClickOtherBtnGrp;
    this.view.btnAddFav.onClick = this.onClickOtherBtnGrp;
    this.view.btnSend.onClick = this.onClickOtherBtnGrp;
    this.view.flxMessageIconRound.onClick = this.onClickOtherBtnGrp;


  },

  //  Form Life Cycle Methods

  onPreShow:function(event){
    Application.Utils.Dlog("onPreShow ====>>");
  },

  onPostShow:function(event){
    Application.Utils.Dlog("onPostShow ====>>");
  },
  onHide:function(event){
    Application.Utils.Dlog("onHide ====>>");
  },
  onDestroy:function(event){
    Application.Utils.Dlog("onDestroy ====>>");
  },
  onDeviceBack:function(event){
    Application.Utils.Dlog("onDeviceBack ====>>");
  },



  onDoneTxtMessage:function(event){
    Application.Utils.Dlog("onDoneTxtMessage ====>>");
  },
  onClickHomeOptionsMenus:function(event){
    Application.Utils.Dlog("onClickHomeOptionsMenus ====>>");

    var eventObjID = "";
    if(! Application.Utils.isNullUndefinedObj(event)){
      if(! Application.Utils.isNullUndefinedObj(event)){
        eventObjID =""+event.id;
      }
    }


    var params ={};

    switch(eventObjID){
      case "flxBookApt":
        break;
      case "flxLocate":
        break;
      case "flxSupport":
        break;
      case "flxBrowseProduct":
        if(Application.Utils.isNetworkAvailable()){
          this.callSerivceForCategory();
        }else{
          Application.alert.showOkAlert("Please check internet connectivity", null);
        }

        // this.callOtherService();
        break;
      case "flxOpenProduct":
        break;
      case "flxMakePayment":
        break;
      default:
        break;
    }


  },
  onClickOtherBtnGrp:function(event){
    Application.Utils.Dlog("onClickOtherBtnGrp ====>>");
    var eventObjID = "";
    if(! Application.Utils.isNullUndefinedObj(event)){
      if(! Application.Utils.isNullUndefinedObj(event)){
        eventObjID =""+event.id;
      }
    }


    switch(eventObjID){
      case "flxLang":
        break;
      case "btnAddFav":
        break;
      case "btnSend":
        break;
      case "flxMessageIconRound":
        break;
      default:
        break;
    }

  },

  /**
   * @function
   *
   */
  callSerivceForCategory: function(){
    Application.Utils.Dlog("callSerivceForCategory = " );
    Application.loader.showLoader("");

    try{
      var request = new kony.net.HttpRequest();// Only supported in Native. Not supported on Mobile web, SPA, Windows.
      var response=[];
      // request.timeout = 15000; 
      //method- constants.HTTP_METHOD_GET,constants.HTTP_METHOD_POST
      request.open(constants.HTTP_METHOD_GET, gblPegaObj.authServiceURL, true,gblPegaObj.authUsername,gblPegaObj.authPassword); 	 //Available on all platforms except BlackBerry 10,Windows Platforms and SPA.
      //  request.open(constants.HTTP_METHOD_GET, requestUrl,true); 	 //Available on all platforms except BlackBerry 10,Windows Platforms and SPA.
      // request.onReadyStateChange = callBackfunc;

      request.onReadyStateChange = function(){
        Application.loader.dismissLoader();
        Application.Utils.Dlog("\n--------in ready state------------>");
        Application.Utils.Dlog("statusText = " + this.statusText + " Number  " + this.status);
        if(this.statusText == "server error"){
          // Application.alert.showOkAlert("Service Connection Error .Please try after some time", null);
        }
        if (this.readyState == constants.HTTP_READY_STATE_DONE){
          Application.Utils.Dlog("\n:--JS Received response--> " + JSON.stringify(this.response));
          Application.Utils.Dlog("Status = " + this.statusText + " Number  " + this.status);
          Application.Utils.Dlog("\n:--RESPONSE HEADERS-->" + JSON.stringify(request.getAllResponseHeaders()));
          Application.Utils.Dlog("\n:--JS Received response--> " + this.response);

          if(this.response !== null && this.response !== "" && this.response !== undefined && this.response !=="null") {
            if(this.status === "200" || this.status === 200 || this.statusText === "OK"){
              var params ={};
              params.productCategories = this.response;
              var showForm = new kony.mvc.Navigation("frmProductType");
              params.isBackNavigation = false;
              showForm.navigate(params);
            }else{
              Application.alert.showOkAlert("Technical Error.Please try again later,Errocode: "+this.status, null);
            }
          }else{
            Application.alert.showOkAlert("Technical Error.Please try again later,Errocode: "+this.status, null);
          }
        }else if (this.readyState == constants.HTTP_READY_STATE_UNSENT ){
        }else if (this.readyState == constants.HTTP_READY_STATE_OPENED  ){
        }else if (this.readyState == constants.HTTP_READY_STATE_HEADERS_RECEIVED){
        }else if (this.readyState == constants.HTTP_READY_STATE_LOADING   ){
        }else{

        }

      };

      request.setRequestHeader("content-type", "application/json");
      //request.setRequestHeader("content-type", "application/json;charset=UTF-8");
      // request.setRequestHeader("Authorization", "Basic " + base64Credentials);
      request.send();	
    }catch(err){
      Application.Utils.globalException(this.view.id,"callSerivceForCategory", err);

    }

  },
  /**
   * @function
   *
   */
  //   callOtherService:function(){
  //      alert( "callOtherService::");
  //     // New XMLHTTPRequest
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //       if (this.readyState == 4 && this.status == 200) {
  //         Application.Utils.Dlog("Response::"+ this.responseText);
  //         alert( "Response::"+ this.responseText)
  //       }
  //     };
  //     xhttp.open("GET", "https://pega-training.eastus.cloudapp.azure.com/prweb/PRRestService/beEBp4uRVTogorRwSwWqbIXWg-2ML_BwywJj5QiBlERzca9l2XDoHA%5B%5B*/OFGpocpkg/v1/ofg/mobile", true);
  //     xhttp.setRequestHeader("Authorization","Basic S29ueU9GR1N2Y1VzZXI6S0BueTVYMyM=");  
  //     xhttp.send();
  //   }


});