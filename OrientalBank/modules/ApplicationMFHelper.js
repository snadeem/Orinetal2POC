


if (typeof(MFHelper) === 'undefined' || typeof(MFHelper) === string  || typeof(MFHelper) === number   || typeof(MFHelper) === boolean ) {
  MFHelper = {};
}

//Type your code here
var isMFinitDone = false;
var konyObject = {};

MFHelper.Utils ={

  /**
   * @function
   *
   * @param callFunctionName 
   */
  verifyMFinitAndCall: function(callFunctionName){
    Application.Utils.Dlog("MFHelper verifyMFinitAndCall:: kony:: ==>");
    if(kony.sdk.isInitialized){
      Application.Utils.Dlog("yes sdk is initialized");
      konyObject = kony.sdk.getCurrentInstance();
      isMFinitDone = true;
      if(typeof (callFunctionName) === "function"){
        // callFunctionName();
      }else{

        callFunctionName = function(){ 
          kony.print("Callbackfunc is called");
        };
      }
    }
    if(!isMFinitDone){
      Application.Utils.Dlog("sdk init not done...so do sdk init.");
      MFHelper.Utils.initiateMobileFabric(callFunctionName, function(){ });
    }
  },
  /**
   * @function
   *
   * @param initSuccesscallback 
   * @param initErrorcallback 
   */
  initiateMobileFabric:function(initSuccesscallback,initErrorcallback){
    Application.Utils.Dlog("initiateMobileFabric:: kony:: ==>");


    var commonInitSuccesscallback = function commonInitSuccesscallback(response) {
      try {
        Application.Utils.Dlog("response of commonInitSuccesscallback" + JSON.stringify(response));
        /** VERY IMP ***/	
        isMFinitDone = true;
        /** VERY IMP ***/
        if(typeof (initSuccesscallback) === "function"){
          initSuccesscallback();
        }

      } catch (e) {
        Application.Utils.Dlog("exception in commonInitSuccesscallback" + e);
      }
    };

    var commonInitErrorcallback =  function commonInitErrorcallback(response) {
      try {
        Application.Utils.Dlog("response of commonInitErrorcallback  " + JSON.stringify(response));
        if(response.opstatus==1011){
          Application.alert.showOkAlert("The Network is unreachable at this time. Terminating Application.", function(){
            Application.Utils.exit();
          });
        } else {
          Application.alert.showOkAlert("Sorry something went wrong. Please try again later. Terminating Application.", function(){
            Application.Utils.exit();
          });
        }
      } catch (e) {
        Application.Utils.Dlog("exception in commonInitSuccesscallback" + e);
      }
    };


    try{
      konyObject = new kony.sdk();
      konyObject.init(gblMFServerConfig.appKey, gblMFServerConfig.appSecret, gblMFServerConfig.appConfigURL, commonInitSuccesscallback, commonInitErrorcallback);

    }catch(err){
      Application.Utils.Dlog("initiateMobileFabric:: kony:: ==>"+JSON.stringify(err));
    }
  },

  /**
   * @function
   *
   * @param serviceName 
   * @param operationName 
   * @param headers 
   * @param inputParams 
   * @param successCallBack 
   * @param failureCallBack 
   */
  commonMFServiceCall:function(serviceName, operationName, headers, inputParams, successCallBackfunc, failureCallBackfunc){

    Application.Utils.Dlog("commonMFServiceCall::--->");
    Application.Utils.Dlog("serviceName::: "+serviceName);
    Application.Utils.Dlog("operationName::: "+operationName);
    Application.Utils.Dlog("inputParams::: "+ JSON.stringify(inputParams));
    var isTokenExpired= true;

    var konyRef = kony.sdk.getCurrentInstance();
    Application.Utils.Dlog("konyRef. "+konyRef);
    Application.Utils.Dlog("konyRef.claimTokenExpiry "+konyRef.claimTokenExpiry);

    //Success Callback for integration services
    var successCallBack = function successCallBack(resultset) {
      //Application.Utils.Dlog("commonMFServiceCall_successCallBack:::==>");
      //Application.Utils.Dlog("commonMFServiceCall_successCallBack"+JSON.stringify(resultset));
      successCallBackfunc(resultset);
    };
    //Failure Callback for integration services
    var failureCallBack = function failureCallBack(resultset) {
      //Application.Utils.Dlog("commonMFServiceCall_failureCallBack:::==>");
      //Application.Utils.Dlog("commonMFServiceCall_failureCallBack"+JSON.stringify(resultset));
      if(resultset !== null && resultset !== undefined && resultset !=="" && resultset !=="null"){
        if(resultset.hasOwnProperty("opstatus")){
          var opstatus = resultset.opstatus;
          if(undefined !== opstatus && null !== opstatus && ("1011" == opstatus|| 1011 == opstatus)){
            Application.alert.showOkAlert("The Network is unavailable at this time.",null);
          }else{
            failureCallBackfunc(resultset);
          }
        }else{
          failureCallBackfunc(resultset);
        }
      }else{
        Application.alert.showOkAlert("Sorry something went wrong. Please try again later..",null);
      }
      Application.loader.dismissLoader();
    };

    //Success Callback for refreshing claimstoken 

    var claimRefreshSuccessCB = function(resultset){
      try
      {
        Application.Utils.Dlog("claimRefreshSuccessCB:: kony:: ==>"+JSON.stringify(resultset));
        konyObject = kony.sdk.getCurrentInstance();
        var integrationObject = konyObject.getIntegrationService(serviceName);
        integrationObject.invokeOperation(operationName, headers, inputParams,
                                          successCallBack, failureCallBack);
        Application.Utils.Dlog("konyRef.claimTokenExpiry_claimRefreshSuccessCB "+konyObject.claimTokenExpiry);
      }
      catch(err)
      {
        Application.Utils.Dlog("Error claimRefreshSuccessCB:: kony:: ==>"+JSON.stringify(err));
      }

    };
    //Failure Callback for refreshing claimstoken 

    var claimRefreshFailureCB = function(resultset){
      try
      {
        Application.Utils.Dlog("claimRefreshFailureCB:: kony:: ==>"+JSON.stringify(resultset));
        Application.loader.dismissLoader();
        reAssignGlobalVariable();
        kony.application.destroyForm("frmDashBoard");
        Application.alert.showOkAlert("Sorry Session has been expired.Please Login again.",null);

        var params ={};
        var showForm= new kony.mvc.Navigation("frmLogin");
        showForm.navigate(params);
        if (konyRef.currentClaimToken === null) {
          isTokenExpired = true;    // Token Expired
        }else if (konyRef.claimTokenExpiry && new Date().getTime() > konyRef.claimTokenExpiry) {
          isTokenExpired = true;  // Token Expired
        }else{
          Application.Utils.Dlog("token is not expired");
          isTokenExpired = false;


        }
      }
      catch(err)
      {
        Application.Utils.Dlog("Error claimRefreshFailureCB:: kony:: ==>"+JSON.stringify(err));
      }

    };

    try{

      // Call Claims refresh and then invoke service
      kony.sdk.claimsRefresh(claimRefreshSuccessCB, claimRefreshFailureCB);

    }catch(err){
      Application.Utils.Dlog("Error commonMFServiceCall:: kony:: ==>"+JSON.stringify(err));
      //Application.loader.dismissLoader();
    }

  },

  commonMFServiceCallWithAuth:function(serviceName, operationName, headers, inputParams, successCallBackfunc, failureCallBackfunc,controller){
    MFHelper.Utils.commonMFServiceCall(serviceName, operationName, headers, inputParams, successCallBackfunc, failureCallBackfunc);
    return "";
    var authClient = null;
    var errMsg =  "No Internet connection available";
    Application.Utils.Dlog("commonMFServiceCall::--->");
    Application.Utils.Dlog("serviceName::: "+serviceName);
    Application.Utils.Dlog("operationName::: "+operationName);
    Application.Utils.Dlog("controller::: "+controller);
    Application.Utils.Dlog("inputParams::: "+ JSON.stringify(inputParams));

    var successCallBack = function successCallBack(resultset) {
      successCallBackfunc(resultset);
    };

    var failureCallBack = function failureCallBack(resultset) {
      if(resultset !== null && resultset !== undefined && resultset !=="" && resultset !=="null"){
        if(resultset.hasOwnProperty("opstatus")){
          var opstatus = resultset.opstatus;
          if(undefined !== opstatus && null !== opstatus && ("1011" == opstatus|| 1011 == opstatus)){
            Application.alert.showOkAlert("The Network is unavailable at this time.",null);
          }else{
            failureCallBackfunc(resultset);
          }
        }else{
          failureCallBackfunc(resultset);
        }
      }else{
        Application.alert.showOkAlert("Sorry something went wrong. Please try again later..",null);
      }
      Application.loader.dismissLoader();
    };


    if(Application.Utils.isNetworkAvailable() === true){
      konyObject = kony.sdk.getCurrentInstance();
      authClient = konyObject.getIdentityService(gblMFServerConfig.providerName);
      var loginOptions ={};
      if(gblMFServerConfig.providerName === "userstore"){
        loginOptions ={
          "userid": gblMFServerConfig.username,
          "password": gblMFServerConfig.password
        };
      }else{
        loginOptions ={
          "username": gblMFServerConfig.username,
          "password": gblMFServerConfig.password
        };
      }

      authClient.login(
        loginOptions,
        function(response) {  // Success Callback
          Application.Utils.Dlog("Auth Login success:: " + JSON.stringify(response));
          //inputparams.httpheaders = {};

          var integrationObject = konyObject.getIntegrationService(serviceName);
          integrationObject.invokeOperation(operationName, headers, inputParams,
                                            successCallBack, failureCallBack); 
        }, 
        function(error) { // error  Callback
          Application.Utils.Dlog("MF Auth Login Failure:: " + JSON.stringify(error));


          Application.loader.dismissLoader();
          if(!Application.Utils.isNullUndefinedObj(controller.view)){
            if(!Application.Utils.isNullUndefinedObj(controller.view.lblErrorMsgInfo)){
              controller.view.lblErrorMsgInfo.text = kony.i18n.getLocalizedString("err_invalid_credentials");
              controller.view.lblErrorMsgInfo.isVisible = true;
              controller.view.forceLayout();
            }
          }else{
            Application.alert.showOkAlert("Invalid Credentials",null);
          }



        }
      );
    }else{
      Application.Utils.Dlog("MF Auth Login Failure:: " + errMsg);
    }
  },

  commonObjectServiceWithAuth:function(objectServiceName, objectName, query, headers, successCallBackfunc, failureCallBackfunc,methodType){
    var authClient = null;
    var errMsg =  "No Internet connection available";
    Application.Utils.Dlog("commonObjectServiceWithAuth::--->");
    Application.Utils.Dlog("objectServiceName::: "+objectServiceName);
    Application.Utils.Dlog("objectName::: "+objectName);
    Application.Utils.Dlog("query::: "+query);


    var successCallBack = function successCallBack(resultset) {
      successCallBackfunc(resultset);
    };

    var failureCallBack = function failureCallBack(resultset) {
      if(resultset !== null && resultset !== undefined && resultset !=="" && resultset !=="null"){
        if(resultset.hasOwnProperty("opstatus")){
          var opstatus = resultset.opstatus;
          if(undefined !== opstatus && null !== opstatus && ("1011" == opstatus|| 1011 == opstatus)){
            Application.alert.showOkAlert("The Network is unavailable at this time.",null);
          }else{
            failureCallBackfunc(resultset);
          }
        }else{
          failureCallBackfunc(resultset);
        }

      }else{
        Application.alert.showOkAlert("Sorry something went wrong. Please try again later..",null);
      }
      Application.loader.dismissLoader();
    };


    if(Application.Utils.isNetworkAvailable() === true){
      konyObject = kony.sdk.getCurrentInstance();
      authClient = konyObject.getIdentityService(gblMFServerConfig.providerName);
      var loginOptions ={};
      if(gblMFServerConfig.providerName === "userstore"){
        loginOptions ={
          "userid": gblMFServerConfig.username,
          "password": gblMFServerConfig.password
        };
      }else{
        loginOptions ={
          "username": gblMFServerConfig.username,
          "password": gblMFServerConfig.password
        };
      }
      authClient.login(
        loginOptions,
        function(response) {  // Success Callback
          Application.Utils.Dlog("Auth Login success on object:: " + JSON.stringify(response));

          var serviceType = "online";
          var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {"access": serviceType});
          //var objectName = "Country";
          var dataObject = new kony.sdk.dto.DataObject(objectName);
          //ex: dataObject.odataUrl = "$filter=ORDER_NUM eq 10001,$expand=ORDER_ITEM";
          var options = {};
          if(methodType === "get")
          {
            dataObject.odataUrl = query;
            options = {"dataObject":dataObject}; 
          }
          else if(methodType === "create")
          {
            for (var key in query)
            {
              if (query.hasOwnProperty(key)) {
                var tempKey = ""+key;
                dataObject.addField(tempKey, query[key]);
              }
            }
            options = {"dataObject":dataObject};
          }

          objSvc.fetch(options, successCallBack, failureCallBack);

        }, 
        function(error) { // error  Callback
          Application.Utils.Dlog("MF Auth Login Failure on object:: " + JSON.stringify(error));
          Application.loader.dismissLoader();
        }
      );
    }else{
      Application.Utils.Dlog("MF Auth Login Failure on object:: " + errMsg);
    }
  },
  idendityLogout:function(){
    Application.loader.showLoader("");
  
    //clear the kony store remember me

    konyObject = kony.sdk.getCurrentInstance();
    var identityClient = konyObject.getIdentityService(gblMFServerConfig.providerName);
    var options = {};
    options["slo"] = true;
    options["logout"] = true;
    identityClient.logout(function(result){
      //kony.net.clearCookies();
      //window.location.reload(true);
      kony.print("kony identity logout success");
    }, function(result){
      kony.print("kony identity logout failed");

    }, options);
    var showForm ; 
    var params ={};
    kony.store.clear();
    kony.net.clearCookies();
    Application.loader.dismissLoader();

  }

};
