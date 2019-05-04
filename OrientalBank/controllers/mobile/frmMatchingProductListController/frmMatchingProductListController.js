define({ 

  //Type your controller code here 

  // Declare local variable here
  isBackNavigation:false,

  productCategories:{},
  selectedCatogory:"",
  productDetails:[],
  selectedFacilities:[],
  selectedProductTypes:[],
  selectedPageIndex:0,
  onNavigate:function(params, isBackNavigation ){
    try{
      Application.Utils.Dlog(this.view.id +"  onNavigate");
      if(! Application.Utils.isNullUndefinedObj(params)){
        Application.Utils.Dlog("onNavigate ====>> "+JSON.stringify(params));

        this.isBackNavigation = params.isBackNavigation;
        if(this.isBackNavigation === false){
          this.productCategories = params.productCategories;
          this.selectedCatogory = params.ProductCategory;
          this.productDetails = params.productDetails  ;
          this.selectedFacilities = params.selectedFacilities ;
          this.selectedProductTypes =  params.selectedProductTypes;


          this.bindEvents();
        }
      }
      Application.Utils.Dlog("frmMatchngProduct this.selectedCatogory ====>> "+JSON.stringify(this.selectedCatogory));


    }catch(err){
      Application.Utils.globalException("", "onNavigate", err);
    }
    // this.bindEvents();
    // this.pauseNavigation();
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

    this.view.flxBack.onClick = this.onClickBack;
    this.view.btnNext.onClick =  this.onClickOtherBtnGrp;
    this.view.btnLeftArrow.onClick = this.onClickOtherBtnGrp;
    this.view.btnRightArrow.onClick = this.onClickOtherBtnGrp;


    this.view.lblCardHeading.text = "";
    // this.view.lblProductTypeImg.text="";
    this.view.lblExpenseAmount.text = "";
    this.view.segProductTypes.pageSkin = "sknSegTransparent";
    this.view.sldrExpense.setEnabled(true);
    this.view.sldrExpense.onSlide = this.onSlideChange;
    this.view.segProductTypes.onSwipe = this.onSwipeCallBck;
    this.loadProductType();

  },

  //  Form Life Cycle Methods

  onPreShow:function(event){
    Application.Utils.Dlog("onPreShow ====>>");
    this.view.segProductTypes.pageSkin = "sknSegTransparent";

  },

  onPostShow:function(event){
    Application.Utils.Dlog("onPostShow ====>>");
    this.view.segProductTypes.selectedRowIndex = [0,this.selectedPageIndex];
  },
  onHide:function(event){
    Application.Utils.Dlog("onHide ====>>");
  },
  onDestroy:function(event){
    Application.Utils.Dlog("onDestroy  frmMatchingcontroller ====>>");
  },
  onDeviceBack:function(event){
    Application.Utils.Dlog("onDeviceBack ====>>");
    try{
      var params ={};
      // params.ProductCategory = this.selectedCatogory ;
      // params.productCategories = this.productCategories;
      var showForm = new kony.mvc.Navigation("frmProductSubType");
      params.isBackNavigation = true;
      showForm.navigate(params);
      kony.application.destroyForm(""+this.view.id); 
    }catch(err){
      Application.Utils.globalException(this.view.id, "onClickBack", err);
    }

  },
  onClickBack:function(event){
    Application.Utils.Dlog("onClickBack ====>>");
    try{
      var params ={};
      // params.ProductCategory = this.selectedCatogory ;
      // params.productCategories = this.productCategories;
      var showForm = new kony.mvc.Navigation("frmProductSubType");
      params.isBackNavigation = true;
      showForm.navigate(params);
      kony.application.destroyForm(""+this.view.id); 
    }catch(err){
      Application.Utils.globalException(this.view.id, "onClickBack", err);
    }


  },

  onClickSegProductType:function(event){
    Application.Utils.Dlog("onClickSegProductType ====>>");



  },

  checkNullOrUndefinedObj:function(obj){
    if(Application.Utils.isNullUndefinedObj(obj)){
      return "";
    }else{
      return obj;
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
          Application.Utils.Dlog("eventObjID ====>>"+eventObjID);

        }
      }
      //var rowIndex;
      switch(eventObjID){
        case "btnNext":
          var params ={};



          // params.productDetails = this.productDetails;  
          params.selectedCatogory = this.selectedCatogory ;
          //  params.selectedFacilities = this.selectedFacilities ;
          //  params.selectedProductTypes = this.selectedProductTypes ;
          Application.Utils.Dlog("this.selectedCatogory ====>>"+this.selectedCatogory);

          var tempProdData = this.getProductFeatures();
          params.currentProductData = tempProdData;
          var showForm = new kony.mvc.Navigation("frmCheckout");
          params.isBackNavigation = false;
          showForm.navigate(params);

          break;
        case "btnLeftArrow":
          //rowIndex = this.selectedPageIndex;
          //  rowIndex = this.view.segProductTypes.selectedIndex[1];
          Application.Utils.Dlog("this.selectedPageIndex "+this.selectedPageIndex);
          Application.Utils.Dlog("this.selectedPageIndex "+  parseInt(this.selectedPageIndex));

          if(this.selectedPageIndex>0 && this.selectedPageIndex < this.view.segProductTypes.data.length){
            this.selectedPageIndex = this.selectedPageIndex-1;
            // this.view.segProductTypes.selectedIndices = [[0,[rowIndex]]]

            this.view.segProductTypes.selectedRowIndex =[0,this.selectedPageIndex];

            this.view.lblCardHeading.text = ""+this.selectedProductTypes[this.selectedPageIndex].ProductType;
            // this.view.lblProductTypeImg.text="z";
            this.view.lblExpenseAmount.text = "$"+this.selectedProductTypes[this.selectedPageIndex].MinimumBalance;
            this.view.sldrExpense.selectedValue = parseFloat(this.selectedProductTypes[this.selectedPageIndex].MinimumBalance);
          }else{
            Application.Utils.Dlog("else ====>>");

          }
          break;
        case "btnRightArrow":
          //rowIndex = this.selectedPageIndex;
          //  rowIndex = this.view.segProductTypes.selectedIndex[1];
          Application.Utils.Dlog("this.selectedPageIndex "+this.selectedPageIndex);
          Application.Utils.Dlog("this.selectedPageIndex "+  parseInt(this.selectedPageIndex));
          if(this.selectedPageIndex>=0 && this.selectedPageIndex < this.view.segProductTypes.data.length-1){
            this.selectedPageIndex = this.selectedPageIndex+1;
            // this.view.segProductTypes.selectedIndices = [[0,[rowIndex]]]
            this.view.segProductTypes.selectedRowIndex =[0,this.selectedPageIndex];

            this.view.lblCardHeading.text = ""+this.selectedProductTypes[this.selectedPageIndex].ProductType;
            this.view.lblProductTypeImg.text="z";
            this.view.lblExpenseAmount.text = "$"+this.selectedProductTypes[this.selectedPageIndex].MinimumBalance;
            this.view.sldrExpense.selectedValue = parseFloat(this.selectedProductTypes[this.selectedPageIndex].MinimumBalance);
          }else{
            Application.Utils.Dlog("else ====>>");

          }
          break;
        default:
          break;
      }
    }catch(err){
      Application.Utils.globalException(this.view.id, "onClickOtherBtnGrp", err);
    }
  },

  loadProductType:function(){
    try{
      Application.Utils.Dlog("loadProductType  ====>> \n");
      Application.Utils.Dlog("productDetails = "+ JSON.stringify(this.productDetails));
      Application.loader.showLoader("");

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






      this.selectedProductTypes =Application.Utils.Array.removeDublicateObjects(selectedProducttype) ;

      Application.Utils.Dlog("selectedProducttype = "+ JSON.stringify(selectedProducttype));

      // loading data to segments

      var segData =[];
      if(this.selectedProductTypes.length>0){
        for(var l=0; l<this.selectedProductTypes.length; l++ ){
          var obj = this.selectedProductTypes[l];
          var productType =  obj.ProductType ;
          var productName =  obj.ProductName ;
          var minimumBalance =  obj.MinimumBalance;

          var rowData = {
            "lblProductNameimg" :"y",
            "lblProductName" :productName,
            "lblProductDesc": "Lorem ipsum dolor sit amet, consectetur adip iscing elit. Curabitur aliquet urna ullamcorper sem auctor posuere.",
            "imgProductName":"",
            "lblproductType":productType,
            "lblminimumBalance":minimumBalance,
            "template" : "flxMatchingProductTemp"
          };
          segData.push(rowData);
        }


        this.view.lblCardHeading.text = ""+this.selectedProductTypes[0].ProductType;
        // this.view.lblProductTypeImg.text="z";
        this.view.lblExpenseAmount.text = "$"+this.selectedProductTypes[0].MinimumBalance;
        this.view.sldrExpense.selectedValue = parseFloat(this.selectedProductTypes[0].MinimumBalance);

      }else{

      }

      this.view.segProductTypes.setData(segData);
      this.view.segProductTypes.selectedRowIndex = [0,0];


      Application.loader.dismissLoader();
      // this.resumeNavigation();

      //Application.Utils.Dlog("unique_array = "+ JSON.stringify(unique_array));

    } catch(err){
      Application.Utils.globalException(this.view.id,"loadProductType", err);
    }
  },


  /**
   * @function
   *
   * @param segObj 
   * @param sectionIndex 
   * @param rowIndex 
   */
  onSwipeCallBck: function(segObj,sectionIndex,rowIndex){
    try{
      Application.Utils.Dlog("onSwipeCallBck  ====>> \n"+ JSON.stringify(segObj));
      Application.Utils.Dlog("sectionIndex  ====>> \n"+ sectionIndex);
      Application.Utils.Dlog("rowIndex  ====>> \n"+ rowIndex);

      //  var selectedIndex= this.view.segProductTypes.selectedIndex[1]; //row index

      var selectedIndex= rowIndex;
      Application.Utils.Dlog("selectedIndex ::>"+selectedIndex);
      this.selectedPageIndex  = rowIndex;

      var selectedRowData = this.view.segProductTypes.data[selectedIndex]; //row data
      Application.Utils.Dlog("selectedRowData ::>"+JSON.stringify(selectedRowData));

      var rowData = this.view.segProductTypes.selectedRowItems;
      Application.Utils.Dlog("rowData ::>"+JSON.stringify(rowData));


      this.view.lblCardHeading.text = ""+selectedRowData.lblproductType;
      // this.view.lblProductTypeImg.text="z";
      this.view.lblExpenseAmount.text = "$"+selectedRowData.lblminimumBalance;
      this.view.sldrExpense.selectedValue = parseFloat(selectedRowData.lblminimumBalance);
    }catch(err){
      Application.Utils.globalException(this.view.id, "onSwipeCallBck", err);
    }

  },
  getProductFeatures:function(){
    Application.Utils.Dlog("getProductFeatures  ====>> \n");
    try{

      // Application.loader.showLoader("");



      var prodData =[];
      Application.Utils.Dlog("this.selectedPageIndex  ::>"+this.selectedPageIndex );
      var selectedRowData = this.view.segProductTypes.data[this.selectedPageIndex ]; //row data
      var tempProdType = ""+selectedRowData.lblproductType;
      var tempProdName = ""+selectedRowData.lblProductName;
      Application.Utils.Dlog("tempProdType ::>"+tempProdType);

      Application.Utils.Dlog("tempProdName ::>"+tempProdName);

      for(var i=0;i<this.productDetails.length;i++){
        var obj = this.productDetails[i];
        var prodType = ""+obj.ProductType;
        var prodName = ""+obj.ProductName;
        var prodFeatures = obj.ProductFeatures;
        Application.Utils.Dlog("prodType ::>"+prodType);

        Application.Utils.Dlog("prodName ::>"+prodName);
        if(tempProdType == prodType && tempProdName == prodName){
          Application.Utils.Dlog("Match found  ====>> \n");
          prodData = obj;
          break;
        }
      }
      //  Application.loader.dismissLoader();
      return prodData;

    }catch(err){
      Application.Utils.globalException(this.view.id, "getProductFeatures", err);
    }


  },
  /**
   * @function
   *
   */
  onSlideChange:function(mySlider){
    Application.Utils.Dlog("onSlideChange  ====>> \n");
    try{
      this.view.lblExpenseAmount.text ="$"+this.view.sldrExpense.selectedValue;
    }catch(err){
      Application.Utils.globalException(this.view.id, "onSlideChange", err);
    }

  },
  onSelectionSlider:function(mySlider){
    Application.Utils.Dlog("onSelectionSlider  ====>> \n");
    try{
    }catch(err){
      Application.Utils.globalException(this.view.id, "onSelectionSlider", err);
    }
  },


});