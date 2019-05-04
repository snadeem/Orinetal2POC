define({ 

  //Type your controller code here 
  // Declare local variable here
  inputData:{},
  cartItemsCount:0,
  selectedFacilities:[],
  productCategories:[],
  productData:{},
  productFacilities:[],
  productDetails:[],
  isBackNavigation:false,


  /**
    * @function
    *
    * @param params 
    */
  onNavigate:function(params, isBackNavigation ){
    this.inputData.MethodName = "ProductDetails";
    Application.Utils.Dlog(this.view.id +"onNavigate");
    if(! Application.Utils.isNullUndefinedObj(params)){
      Application.Utils.Dlog("onNavigate ====>> "+JSON.stringify(params));

      this.isBackNavigation = params.isBackNavigation;
      if(this.isBackNavigation === false){
        this.inputData.ProductCategory = params.ProductCategory ;
        this.productCategories = params.productCategories;
        this.bindEvents();
      }
    }


    //this.bindEvents();
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

    this.view.flxPopupContainer.isVisible = false;

    //Popup Events
    this.view.btnClose.onClick = this.onClickOtherBtnGrp;
    this.view.btnContinue.onClick = this.onClickOtherBtnGrp;
    this.view.btnYes.onClick = this.onClickOtherBtnGrp;
    this.view.btnContinue.onClick = this.onClickOtherBtnGrp;


    this.view.flxBack.onClick = this.onClickOtherBtnGrp;
    this.view.flxCart.onClick = this.onClickOtherBtnGrp;

    this.view.flxCircleIcon1.onClick = this.onClickSubBtnGrp;
    this.view.flxCircleIcon2.onClick = this.onClickSubBtnGrp;
    this.view.flxCircleIcon3.onClick = this.onClickSubBtnGrp;
    this.view.flxCircleIcon4.onClick = this.onClickSubBtnGrp;

    this.view.flxTabSubType1.onClick = this.onClickTabBtnGrp;
    this.view.flxTabSubType2.onClick = this.onClickTabBtnGrp;
    this.view.flxTabSubType3.onClick = this.onClickTabBtnGrp;

    /* var defaultSkin = "sknFlxRoundPurpleBorderThickSize1px";
    this.view.flxCircleIcon1.skin = defaultSkin;
    this.view.flxCircleIcon2.skin = defaultSkin;
    this.view.flxCircleIcon3.skin = defaultSkin;
    this.view.flxCircleIcon4.skin = defaultSkin;

    this.view.lblNotificationCount.text ="0";
    this.view.lblNotificationCount.isVisible = false;

    this.view.richTxtCartItems.text = "<ol><li>Direct Deposit</li><li>Daily Use</li></ol>";
    this.view.richTxtCartItems.text = "";
  */
    this.resetPage();
    this.view.flxProductFacilities.isVisible = false;


    this.callSerivceForFacilities(this.inputData,this);



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
    var params ={};
    params.productCategories = this.productCategories;
    params.ProductCategory = this.inputData.ProductCategory;
    var showForm = new kony.mvc.Navigation("frmProductType");
    params.isBackNavigation = true;
    showForm.navigate(params);
    kony.application.destroyForm(""+this.view.id); 

  },
  onClickBack:function(event){
    Application.Utils.Dlog("onClickBack ====>>");
    var params ={};
    params.productCategories = this.productCategories;
    params.ProductCategory = this.inputData.ProductCategory;
    var showForm = new kony.mvc.Navigation("frmProductType");
    params.isBackNavigation = true;
    showForm.navigate(params);
    kony.application.destroyForm(""+this.view.id); 


  },

  /**
   * @function
   *
   * @param event 
   */
  onClickTabBtnGrp:function(event){
    try{
      Application.Utils.Dlog("onClickTabBtnGrp ====>>");
      var eventObjID = "";
      if(! Application.Utils.isNullUndefinedObj(event)){
        if(! Application.Utils.isNullUndefinedObj(event)){
          eventObjID =""+event.id;
        }
      }


      switch(eventObjID){
        case "flxTabSubType1":
          this.inputData.ProductCategory = "Save my Money" ;

          break;
        case "flxTabSubType2":
          this.inputData.ProductCategory = "Manage my day to day needs" ;


          break;
        case "flxTabSubType3":
          this.inputData.ProductCategory = "Borrow Money" ;


          break;
        default:
          break;
      }

      this.resetPage();
      this.callSerivceForFacilities(this.inputData,this);

    } catch(err){
      Application.Utils.globalException(this.view.id,"onClickTabBtnGrp", err);
    }

  },
  /**
   * @function
   *
   * @param event 
   */
  onClickSubBtnGrp:function(event){
    try{
      Application.Utils.Dlog("onClickSubBtnGrp ====>>");
      var eventObjID = "";
      if(! Application.Utils.isNullUndefinedObj(event)){
        if(! Application.Utils.isNullUndefinedObj(event)){
          eventObjID =""+event.id;
        }
      }
      this.selectedFacilities =[];
      this.cartItemsCount = 0;
      switch(eventObjID){
        case "flxCircleIcon1":
          break;
        case "flxCircleIcon2":
          break;
        case "flxCircleIcon3":
          break;
        case "flxCircleIcon4":
          /* if(this.view.flxSubtype1.skin === ""){
          this.view.flxSubtype1.skin = "sknflxCircleIcon";  // set Focus skin
          this.cartItemsCount = this.cartItemsCount +1;
        }else{
          this.view.flxSubtype1.skin = "sknflxCircleIcon";  // set Normal skin
          this.cartItemsCount = this.cartItemsCount -1;
        }*/
          break;

        default:
          break;
      }

      if(event.skin === "sknFlxRoundPurpleBorderThickSize1px"){
        event.skin = "sknFlxRoundOrangeBorderThickSize1px";  // set Focus skin
      }else{
        event.skin = "sknFlxRoundPurpleBorderThickSize1px";  // set Normal skin
      }

      var selectedSkin = "sknFlxRoundOrangeBorderThickSize1px";
      if(this.view.flxCircleIcon1.skin === selectedSkin){
        this.selectedFacilities.push(this.productFacilities[0]);
      }
      if(this.view.flxCircleIcon2.skin === selectedSkin){
        this.selectedFacilities.push(this.productFacilities[1]);
      }
      if(this.view.flxCircleIcon3.skin === selectedSkin){
        this.selectedFacilities.push(this.productFacilities[2]);
      }
      if(this.view.flxCircleIcon4.skin === selectedSkin){
        this.selectedFacilities.push(this.productFacilities[3]);
      }

      this.cartItemsCount = this.selectedFacilities.length;
      if(this.cartItemsCount > 0){
        this.view.lblNotificationCount.text =""+this.cartItemsCount ;
        this.view.lblNotificationCount.isVisible = true;
      }else{
        this.view.lblNotificationCount.text ="0";
        this.view.lblNotificationCount.isVisible = false;

      }
      Application.Utils.Dlog("this.selectedFacilities ====>>" +JSON.stringify(this.selectedFacilities));


    } catch(err){
      Application.Utils.globalException(this.view.id,"onClickSubBtnGrp", err);
    }
  },

  /**
   * @function
   *
   * @param event 
   */
  onClickOtherBtnGrp:function(event){
    try{
      Application.Utils.Dlog("onClickOtherBtnGrp ====>>");
      var eventObjID = "";
      if(! Application.Utils.isNullUndefinedObj(event)){
        if(! Application.Utils.isNullUndefinedObj(event)){
          eventObjID =""+event.id;
        }
      }

      switch(eventObjID){
        case "btnClose":
          this.view.flxPopupContainer.isVisible = false;

          break;
        case "btnContinue":
          this.view.flxPopupContainer.isVisible = false;
          var params ={};
          params.productCategories = this.productCategories;
          params.ProductCategory = this.inputData.ProductCategory;
          params.productDetails = this.productDetails;
          params.selectedFacilities = this.selectedFacilities;
          params.selectedProductTypes = [];
          var showForm = new kony.mvc.Navigation("frmMatchingProductList");
          params.isBackNavigation = false;
          showForm.navigate(params);

          break;
        case "btnYes":
          this.view.flxPopupContainer.isVisible = false;

          break;
        case "flxCart":
          this.view.flxPopupContainer.isVisible = true;
          Application.Utils.Dlog("this.selectedFacilities ====>>" +JSON.stringify(this.selectedFacilities));



          if(this.selectedFacilities.length>0){
            /*
            var rchtxt ="<ol>";
            this.view.richTxtCartItems.text = "<ol><li>Direct Deposit</li><li>Daily Use</li></ol>";
            for(var i=0;i<this.selectedFacilities.length;i++){
              var facilityName = this.selectedFacilities[i].ProductFacility;
              var facilityDesc = this.selectedFacilities[i].FacilityDescription;
              var item = "<li>"+facilityName+"</li>";
              rchtxt = rchtxt+item;
            }

            rchtxt = rchtxt+"</ol>";
            */
            /*
            var rchtxt ="";
            this.view.richTxtCartItems.text = "";
            for(var i=0;i<this.selectedFacilities.length;i++){
              var facilityName = this.selectedFacilities[i].ProductFacility;
              var facilityDesc = this.selectedFacilities[i].FacilityDescription;
              var item = "<label style='color:#414141'>"+(i+1)+". "+facilityName+"</label></br>";
              rchtxt = rchtxt+item;
            }
            rchtxt = rchtxt+"";
            */

            var rchtxt ="";
            this.view.richTxtCartItems.text = "";
            for(var i=0;i<this.selectedFacilities.length;i++){
              var facilityName = this.selectedFacilities[i].ProductFacility;
              var facilityDesc = this.selectedFacilities[i].FacilityDescription;
              var item = (i+1)+". "+facilityName+"\n";
              rchtxt = rchtxt+item;
            }
            rchtxt = rchtxt+"";

            Application.Utils.Dlog("rchtxt ====>>" +rchtxt);

            this.view.richTxtCartItems.text = rchtxt;

            this.view.lblTitle.text = "Great!";
            this.view.lblNeeds.isVisible = true;
            this.view.richTxtCartItems.isVisible = true;
            this.view.lblMsg.text = "Do you want to include something else?";
            this.view.flxPopupFooterBtnGrp.isVisible = true;
          }else{
            this.view.lblTitle.text = "Oops!";
            this.view.lblNeeds.isVisible = false;
            this.view.richTxtCartItems.isVisible = false;
            this.view.lblMsg.text = "Please select any item to add cart";
            this.view.flxPopupFooterBtnGrp.isVisible = false;
          }


          break;
        case "flxBack":
          this.view.flxPopupContainer.isVisible = false;

          var params ={};
          params.productCategories = this.productCategories;
          params.ProductCategory = this.inputData.ProductCategory;
          var showForm = new kony.mvc.Navigation("frmProductType");
          params.isBackNavigation = true;
          showForm.navigate(params);
          kony.application.destroyForm(""+this.view.id); 

          break;
        default:
          break;
      }
    } catch(err){
      Application.Utils.globalException(this.view.id,"onClickOtherBtnGrp", err);
    }
  },

  /**
   * @function
   *
   */
  loadFacilitiesMenus:function(){
    Application.Utils.Dlog("loadFacilitiesMenus  ====>> \n "+ JSON.stringify(this.productFacilities));
    try{

      this.view.flxProductFacilities.isVisible = true;
      var length = 4; //this.productFacilities.length;
      for(var i=0; i<4; i++){
        var facilityName = this.productFacilities[i].ProductFacility;
        var facilityDesc = this.productFacilities[i].FacilityDescription;
        var lblKey = "lblSubTypeName"+(i+1);
        this.view[""+lblKey].text = facilityName;


        //      this.view.lblSubTypeName1.text = this.productFacilities[0].ProductFacility;
        //       this.view.lblSubTypeName2.text = this.productFacilities[1].ProductFacility;
        //       this.view.lblSubTypeName3.text = this.productFacilities[2].ProductFacility;
        //       this.view.lblSubTypeName4.text = this.productFacilities[3].ProductFacility;

      }


      var imgName = this.inputData.ProductCategory.toLowerCase();
      imgName = Application.Utils.String.replaceAll(" ", "_", imgName);
      imgName = imgName+".png";
      this.view.imgCategory.src = imgName;

    } catch(err){
      Application.Utils.globalException(this.view.id,"onClickOtherBtnGrp", err);
    }
  },

  /**
   * @function
   *
   * @param inputData 
   * @param controller 
   */
  callSerivceForFacilities: function(inputData,controller){
    Application.Utils.Dlog("callSerivceForFacilities  ====>> " +JSON.stringify(inputData));


    if(!Application.Utils.isNetworkAvailable()){
      Application.alert.showOkAlert("Please check internet connectivity", null);
      return false;
    }
    Application.loader.showLoader("");


    try{

      var categoryType =  this.inputData.ProductCategory;
      switch(categoryType){
        case "Save my Money":
          this.view.lblCategory.text = "SAVINGS NEEDS";
          this.view.lblProductDesc.text = "Some of my savings needs are:";
          break;
        case "Manage my day to day needs":
          this.view.lblCategory.text = "DAY TO DAY NEEDS" ;
          this.view.lblProductDesc.text = "Some of my day to day needs are:";
          break;
        case "Borrow Money":
          this.view.lblCategory.text = "BORROWINGS NEEDS" ;
          this.view.lblProductDesc.text = "Some of my borrowing needs are:";
          break;
        default:
          break;
      }




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
          //Application.alert.showOkAlert("Service Connection Error .Please try after some time", null);
          Application.loader.dismissLoader();
        }
        if (this.readyState == constants.HTTP_READY_STATE_DONE){
          Application.Utils.Dlog("\n:--JS Received response--> " + JSON.stringify(this.response));
          Application.Utils.Dlog("Status = " + this.statusText + " Number  " + this.status);
          Application.Utils.Dlog("\n:--RESPONSE HEADERS-->" + JSON.stringify(request.getAllResponseHeaders()));
          Application.Utils.Dlog("\n:--JS Received response--> " + this.response);
         

          if(this.response !== null && this.response !== "" && this.response !== undefined && this.response !=="null") {
            if(this.status === "200" || this.status === 200 || this.statusText === "OK"){
              Application.Utils.Dlog("\n:Categories--> " + this.response);
              controller.productData = this.response;
              controller.productDetails = controller.productData.ProductDetails;
              controller.productFacilities = controller.productData.ProductFacilities;
              controller.loadFacilitiesMenus();

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

      var postdata = {
        "MethodName": "ProductDetails",
        "ProductCategory": "Manage my day to day needs"   
      };

      // postdata = inputData;
      request.send(inputData);





    }catch(err){
      Application.Utils.globalException(this.view.id,"callSerivceForFacilities", err);

    }

  },

  /**
   * @function
   *
   */
  loadProductType:function(){
    try{
      Application.Utils.Dlog("loadProductType  ====>> \n");
      Application.Utils.Dlog("productDetails = "+ JSON.stringify(this.productDetails));

      var selectedProducttype =[];
      Application.Utils.Dlog("this.selectedFacilities.length ::: "+this.selectedFacilities.length);
      Application.Utils.Dlog("this.productDetails.length ::: "+this.productDetails.length);

      for(var i=0;i<this.selectedFacilities.length;i++){
        var facilityName = this.selectedFacilities[i].ProductFacility;
        var facilityDesc = this.selectedFacilities[i].FacilityDescription;
        for(var j=0;j<this.productDetails.length; j++){
          var productType = this.productDetails[j].ProductType;
          var productName = this.productDetails[j].ProductName;
          var produtFeatures = this.productDetails[j].ProductFeatures;
          var minimumBalance = this.productDetails[j].MinimumBalance;

          for(var k=0;k<produtFeatures.length;k++){
            var featureObj = produtFeatures[k];
            if(facilityName === featureObj.ProductFacility){
              Application.Utils.Dlog("found = "+ facilityName);

              var obj = {};
              obj.ProductType = productType;
              obj.ProductName = productName;
              obj.MinimumBalance = minimumBalance;
              selectedProducttype.push(obj);
              break;
            }
          }
        }
      }




      //var unique_array = this.arrUnique(selectedProducttype);


      var unique_array =[];


      Application.Utils.Dlog("selectedProducttype = "+ JSON.stringify(selectedProducttype));


      //Application.Utils.Dlog("unique_array = "+ JSON.stringify(unique_array));

    } catch(err){
      Application.Utils.globalException(this.view.id,"loadProductType", err);
    }
  },
  /**
   * @function
   *
   */
  resetPage:function(){
    var defaultSkin = "sknFlxRoundPurpleBorderThickSize1px";
    this.view.flxCircleIcon1.skin = defaultSkin;
    this.view.flxCircleIcon2.skin = defaultSkin;
    this.view.flxCircleIcon3.skin = defaultSkin;
    this.view.flxCircleIcon4.skin = defaultSkin;

    this.view.lblNotificationCount.text ="0";
    this.view.lblNotificationCount.isVisible = false;

    this.view.richTxtCartItems.text = "";
    this.selectedFacilities=[];
    this.cartItemsCount = this.selectedFacilities.length;
  },
  /**
   * @function
   *
   * @param arr 
   */
  arrUnique:function(arr){
    try{
      Application.Utils.Dlog("arrUnique  ====>> \n");

      var cleaned = [];
      arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
          if (_.isEqual(itm, itm2)) unique = false;
        });
        if (unique)  cleaned.push(itm);
      });
      return cleaned;



    } catch(err){
      Application.Utils.globalException(this.view.id,"arrUnique", err);
    }
  }



});