define({ 
  isBackNavigation:false,

  productData : {},
  selectedProductFeatures : [],

  onNavigate : function(params, isBackNavigation ){
    Application.Utils.Dlog(this.view.id +"onNavigate");

    this.selectedProductFeatures =[];


    if(! Application.Utils.isNullUndefinedObj(params)){
      Application.Utils.Dlog("onNavigate ====>> "+JSON.stringify(params));
      this.productData = params;
      this.isBackNavigation = params.isBackNavigation;

    }

    if(this.isBackNavigation === false){
      this.onBindEvents();
    }
  },
  /**
   * @function onBindEvents
   * This function contains all methods in this controller to initiate function call in onNavigate Event
   */
  onBindEvents : function(){
    this.view.preShow = this.setProductSegmentData;
    this.view.flxBack.onClick = this.onDeviceBack;
    this.view.onDeviceBack = this.onDeviceBack;
    this.view.btnProceed.onClick = this.proceedButtonOnclick;
    this.view.btnOk.onClick = this.successOkButtonOnClick;
  },
  onDeviceBack:function(event){
    Application.Utils.Dlog("onDeviceBack ====>>");


    try{
      var params ={};
      var showForm = new kony.mvc.Navigation("frmMatchingProductList");
      params.isBackNavigation = true;
      showForm.navigate(params);
      kony.application.destroyForm(""+this.view.id); 
    }catch(err){
      Application.Utils.globalException(this.view.id, "onClickBack", err);
    }

  },
  onDestroy:function(event){
    Application.Utils.Dlog("onDestroy checkout controller ====>>");
  },

  setProductSegmentData : function(){
    try{
      this.view.flxProductsubcontainer.isVisible = true;
      this.view.flxBack.isVisible = true;
      this.view.btnProceed.isVisible = true;
      this.view.flxSuccessMsg.isVisible = false;
      this.view.btnProceed.skin = "sknBtnGreyBgFont120";
      this.view.btnProceed.focusSkin = "sknBtnGreyBgFont120";
      var segmentData  = this.productData.currentProductData.ProductFeatures;
      this.view.segCheckList.widgetDataMap = {
        "flx1":"flx1",
        "lblAmount1":"lblAmount1",
        "lblCheckTypeName1":"lblCheckTypeName1",
        //"btnLearnMore1" : "btnLearnMore1",
        "lblIcon1":"lblIcon1",
        "lblTopBgOrange1":"lblTopBgOrange1",
        "flx2":"flx2",
        "lblAmount2":"lblAmount2",
        "lblCheckTypeName2":"lblCheckTypeName2",
        //"btnLearnMore2" : "btnLearnMore2",
        "lblIcon2":"lblIcon2",
        "lblTopBgOrange2":"lblTopBgOrange2"
      };
      var productFeatures = [];
      var icons = ["w","v","m","u","x","p","s","w","v","m","u","x","p","s"];
      for(var i = 0; i < segmentData.length; i++){
        if(segmentData.length % 2 === 0){
          productFeatures.push({
            "lblTopBgOrange1": {isVisible : false},
            "lblIcon1" : icons[i],
            "flx1" : {skin: "sknFlxGreyRoundCorner",onClick : this.productTypeSegRadioFlxClick}, // sknFlxBorderOrange
            "lblAmount1" : "$"+segmentData[i].FeatureCost,
            "lblCheckTypeName1": segmentData[i].ProductFeature,
            "flx2" : {skin: "sknFlxGreyRoundCorner",isVisible : true,onClick : this.productTypeSegRadioFlxClick},
            "lblTopBgOrange2" : {isVisible : false},
            "lblIcon2" : icons[i+1],
            "lblAmount2" : "$"+segmentData[i+1].FeatureCost,
            "lblCheckTypeName2" : segmentData[i+1].ProductFeature,
          });
          i += 1;
        }else{
          if(i === segmentData.length -1){
            productFeatures.push({
              "lblTopBgOrange1": {isVisible : false},
              "lblIcon1" : icons[i],
              "flx1" : {skin: "sknFlxGreyRoundCorner",onClick : this.productTypeSegRadioFlxClick}, // sknFlxBorderOrange
              "lblAmount1" : "$"+segmentData[i].FeatureCost,
              "lblCheckTypeName1": segmentData[i].ProductFeature,
              "flx2" : {skin: "sknFlxGreyRoundCorner",isVisible : false,onClick : this.productTypeSegRadioFlxClick}, //
            });
          }else{
            productFeatures.push({
              "lblTopBgOrange1": {isVisible : false},
              "lblIcon1" : icons[i],
              "flx1" : {skin: "sknFlxGreyRoundCorner", onClick : this.productTypeSegRadioFlxClick}, // sknFlxBorderOrange
              "lblAmount1" : "$"+segmentData[i].FeatureCost,
              "lblCheckTypeName1": segmentData[i].ProductFeature,
              "flx2" : {skin: "sknFlxGreyRoundCorner",isVisible : true, onClick : this.productTypeSegRadioFlxClick},
              "lblTopBgOrange2" : {isVisible : false},
              "lblIcon2" : icons[i+1],
              "lblAmount2" : "$"+segmentData[i+1].FeatureCost,
              "lblCheckTypeName2" : segmentData[i+1].ProductFeature,
            });
            i += 1;
          }
        }
      }
      this.view.segCheckList.setData(productFeatures);
    }catch(err){
      Application.Utils.globalException(this.view.id,"setProductSegmentData", err);

    }
  },
  /**
   * @function productTypeRadioFlxClick
   * This event will fire when clicking on particular item in the segment(segCheckList). This call back
   defined in flxSegTempCheckOutController template
   */
  productTypeSegRadioFlxClick : function(eventObj){
    try{
      var rowIndex = this.view.segCheckList.selectedIndex[1];
      var selectedData = this.view.segCheckList.selectedRowItems[0];
      //alert("eventObj"+eventObj);
      // alert("context"+JSON.stringify(context));
      // alert("param"+param);
      if(eventObj.id === "flx1"){ // flex 1 onclick in a row
        if(selectedData.lblTopBgOrange1.isVisible === false){
          selectedData.lblTopBgOrange1.isVisible = true;
          selectedData.flx1.skin = "sknFlxBorderOrange";
          this.selectedProductFeatures.push({"ProductFeature": selectedData.lblCheckTypeName1});
        }
        else{
          selectedData.lblTopBgOrange1.isVisible = false;
          selectedData.flx1.skin = "sknFlxGreyRoundCorner";
          for( var i = 0; i < this.selectedProductFeatures.length; i++){ 
            if ( this.selectedProductFeatures[i].ProductFeature === selectedData.lblCheckTypeName1) {
              this.selectedProductFeatures.splice(i, 1); 
              break;
            }
          }
        }

      }else{ //flex 2 onclick in a row
        if(selectedData.lblTopBgOrange2.isVisible === false){
          selectedData.lblTopBgOrange2.isVisible = true;
          selectedData.flx2.skin = "sknFlxBorderOrange";
          this.selectedProductFeatures.push({"ProductFeature": selectedData.lblCheckTypeName2});
        }
        else{
          selectedData.lblTopBgOrange2.isVisible = false;
          selectedData.flx2.skin = "sknFlxGreyRoundCorner";
          for( var j = 0; j < this.selectedProductFeatures.length; j++){ 
            if ( this.selectedProductFeatures[j].ProductFeature === selectedData.lblCheckTypeName2) {
              this.selectedProductFeatures.splice(j, 1);
              break;
            }
          }
        }
      }
      if(this.selectedProductFeatures.length !== 0){
        this.view.btnProceed.skin = "sknBtnPurplsBgFont120";
        this.view.btnProceed.focusSkin = "sknBtnPurplsBgFont120";
      }else{
        this.view.btnProceed.skin = "sknBtnGreyBgFont120";
        this.view.btnProceed.focusSkin = "sknBtnGreyBgFont120";
      }
      this.view.segCheckList.setDataAt(selectedData, rowIndex, 0);
    }
    catch(err){
      Application.Utils.globalException(this.view.id,"productTypeSegRadioFlxClick", err);
    }
  },

  proceedButtonOnclick : function(){
    var controller = this;

    if(!Application.Utils.isNetworkAvailable()){
      Application.alert.showOkAlert("Please check internet connectivity", null);
      return false;
    }

    Application.loader.showLoader("");
    try{
      var request = new kony.net.HttpRequest();// Only supported in Native. Not supported on Mobile web, SPA, Windows.
      var response=[];
      // request.timeout = 15000; 
      request.open(constants.HTTP_METHOD_POST, gblPegaObj.authServiceURL, true,gblPegaObj.authUsername,gblPegaObj.authPassword); 	 //Available on all platforms except BlackBerry 10,Windows Platforms and SPA.
      request.onReadyStateChange = function(){
        Application.loader.dismissLoader();
        Application.Utils.Dlog("\n--------in ready state------------>");
        Application.Utils.Dlog("statusText = " + this.statusText + " Number  " + this.status);
        if(this.statusText == "server error")
        {
          // Application.alert.showOkAlert("Service Connection Error .Please try after some time", null);
          Application.loader.dismissLoader();
        }
        if (this.readyState == constants.HTTP_READY_STATE_DONE){
          Application.Utils.Dlog("\n:--JS Received response--> " + JSON.stringify(this.response));
          Application.Utils.Dlog("Status = " + this.statusText + " Number  " + this.status);
          Application.Utils.Dlog("\n:--RESPONSE HEADERS-->" + JSON.stringify(request.getAllResponseHeaders()));
          Application.Utils.Dlog("\n:--JS Received response--> " + this.response);
          
          if(this.response !== null && this.response !== "" && this.response !== undefined && this.response !=="null") {
            if(this.status === "200" || this.status === 200 || this.statusText === "OK"){
              Application.Utils.Dlog("\n:Case service response--> " + this.response);
              controller.view.flxProductsubcontainer.isVisible = false;
              controller.view.btnProceed.isVisible = false;
              controller.view.flxSuccessMsg.isVisible = true;
              controller.view.flxBack.isVisible = false;
              controller.view.lblSuccessMsg.text = "Case ID : "+this.response.PegaCaseID+"\n"+this.response.PegaCaseMessage;
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

      var inputParams = {
        "MethodName": "CreateOFGCase",
        "ProductCategory": this.productData.selectedCatogory,
        "ProductSelected": {
          "ProductType": this.productData.currentProductData.ProductType,
          "ProductName": this.productData.currentProductData.ProductName,
          "ProductFeatures": this.selectedProductFeatures
        }
      };
      Application.Utils.Dlog("proceedButtonOnclick  ====>> " +JSON.stringify(inputParams));
      request.send(inputParams);

    }catch(err){
      Application.Utils.globalException(this.view.id,"proceedButtonOnclick", err);

    }
  },
  /**
   * @function successOkButtonOnClick
   *
   */
  successOkButtonOnClick : function(){
    try{
      var params ={};
      var showForm = new kony.mvc.Navigation("frmHome");
      params.isBackNavigation = true;
      showForm.navigate(params);
      kony.application.destroyForm(""+this.view.id); 
    }catch(err){
      Application.Utils.globalException(this.view.id, "successOkButtonOnClick", err);
    }

  }
});