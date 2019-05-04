define({ 

  /**
   * @function productTypeRadioFlx1OnClick
   * This function used to call onclcik of row radio flexContainer 
   */
  productTypeRadioFlxOnClick : function(eventObj,context){
    var param = eventObj;
      alert("eventObj"+eventObj);
      alert("context"+JSON.stringify(context));
      alert("param"+param);
    this.executeOnParent("productTypeSegRadioFlxClick",eventObj,context,param);
  }

 });