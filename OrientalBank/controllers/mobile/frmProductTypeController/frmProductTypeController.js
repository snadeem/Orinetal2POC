define({ 

  //Type your controller code here 

  // Declare local variable here
  productCategories:{

  },

  isBackNavigation:false,
  onNavigate:function(params, isBackNavigation ){

    Application.Utils.Dlog(this.view.id +"onNavigate");
    if(! Application.Utils.isNullUndefinedObj(params)){
      Application.Utils.Dlog("onNavigate ====>> "+JSON.stringify(params));

      this.isBackNavigation = params.isBackNavigation;
      if(this.isBackNavigation === false){
        this.productCategories = params.productCategories;
        this.bindEvents();
      }
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

    this.view.flxBack.onClick = this.onClickBack;
    this.view.segProductType.onRowClick = this.onClickSegProductType;

    if(!Application.Utils.isNullUndefinedObj(this.productCategories)){
      var tempProducts= this.productCategories.ProductCategories;

      var  rowData ={};
      var segData = [];
      var altrenateRow = 0;

      for (var i=0; i<tempProducts.length;i++){
        var productName = tempProducts[i].ProductCategory;
        Application.Utils.Dlog("productName:::->"+productName);
        var imgName = productName.toLowerCase();
        imgName = Application.Utils.String.replaceAll(" ", "_", imgName);
        imgName = imgName+".png";


        rowData =    { 
          //"flxlblTypeBg":{skin:"sknFlxBgOrangeRCBorder",focusSkin:"sknFlxBgOrangeRCBorder"},
          "lblTypeName":""+productName,
          // "flxInnerCircle":{isvisible:true},
          "imgType":imgName,
          "template" : altrenateRow === 0 ?"flxSegTempProductTypeR":"flxSegTempProductTypeL"
        };
        segData.push(rowData);
        if(altrenateRow === 0){
          altrenateRow = 1;
        }else{
          altrenateRow = 0;
        }


      }
      this.view.segProductType.setData(segData);

    }

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
    var showForm = new kony.mvc.Navigation("frmHome");
    params.isBackNavigation = true;
    showForm.navigate(params);
    kony.application.destroyForm(""+this.view.id); 

  },
  onClickBack:function(event){
    Application.Utils.Dlog("onClickBack ====>>");
    var params ={};
    var showForm = new kony.mvc.Navigation("frmHome");
    params.isBackNavigation = true;
    showForm.navigate(params);
    kony.application.destroyForm(""+this.view.id); 

  },

  onClickSegProductType:function(event){
    Application.Utils.Dlog("onClickSegProductType ====>>");


    try{
      var selectedIndex= this.view.segProductType.selectedIndex[1]; //row index
      Application.Utils.Dlog("selectedIndex ::>"+selectedIndex);

      var selectedIndices=this.view.segProductType.selectedIndices;
      Application.Utils.Dlog("selectedIndices ::>"+selectedIndices);

      var segData = this.view.segProductType.data; //section & its row data
      Application.Utils.Dlog("segData ::>"+JSON.stringify(segData));

      var selectedRowData = this.view.segProductType.data[selectedIndex]; //row data
      Application.Utils.Dlog("selectedRowData ::>"+JSON.stringify(selectedRowData));

      var rowData = this.view.segProductType.selectedRowItems;
      Application.Utils.Dlog("rowData ::>"+JSON.stringify(rowData));




      var params ={};
      params.ProductCategory = selectedRowData.lblTypeName;
      gblProductDetails.selectedCategory = selectedRowData.lblTypeName;
      params.productCategories =   this.productCategories ;
      var showForm = new kony.mvc.Navigation("frmProductSubType");
      params.isBackNavigation = false;
      showForm.navigate(params);
    }catch(err){
      Application.Utils.globalException(this.view.id, "onClickSegProductType", error);
    }

  },

  checkNullOrUndefinedObj:function(obj){
    if(Application.Utils.isNullUndefinedObj(obj)){
      return "";
    }else{
      return obj;
    }
  },


  onClickOtherBtnGrp:function(event){
    Application.Utils.Dlog("onClickOtherBtnGrp ====>>");

  },

});