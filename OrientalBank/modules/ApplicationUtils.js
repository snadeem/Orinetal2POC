//Type your code here

if (typeof(Application) === 'undefined' || typeof(Application) === string  || typeof(Application) === number   || typeof(Application) === boolean ) {
  Application = {};
}


// Utils : It is an object which includes function name of various
Application.Utils = {

  enableDebugLog:true,  // enable Debugger Log or kony Print statements

  /**
   * Dlog :: To Print Statements in Debug mode 
   * 
   * @param printLog 
   */
  Dlog:function(printLog){
    // Debugger Log
    if(Application.Utils.enableDebugLog){
      kony.print("::KonyLog:: "+printLog);
    }
  },

  /**
   * Global Exception :: Throws exception and Print exception where  it is happened 
   *
   * @param moduleName {String}
   * @param functionName  {String}
   * @param error  {String}
   */
  globalException: function (moduleName,functionName,error){

    if(Application.Utils.enableDebugLog){
      Application.Utils.Dlog("Error in module ["+moduleName+"] - fn - ["+functionName+"] : "+(error)); 
    }
    Application.loader.dismissLoader();
  },
  // Check Network availability
  /**
   * isNetworkAvailable :: Check Network availability
   *
   */

  isNetworkAvailable:function (){

    Application.Utils.Dlog("isNetworkAvailable ::kony:: ==>");

    if(Application.Utils.getOSType() !== "Windows"){
      return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
    }else{
      return false;
    }


  },
  // Set Application Behaviours
  /**
   * setApplicationBehaviors :: Set Application Behaviours
   *
   */
  setApplicationBehaviors:function(){

    //Controlling the behaviours by setting invokePreshowPostShow
    //EventsOnDeviceBack as true,isPopupModel as true,and retainSpaceOnHide as true.
    Application.Utils.Dlog("setApplicationBehaviors ::kony:: ==>");
    var obj =  {
      windows7: {
        backOnEsc:true,
        minWidth:300,
        maxWidth:1000,
        minHeight:400,
        maxHeight:800,
        popupAsDialog:true,
        saveState:true,
      }
    };
    var Objectbehaviors  ={
      invokePreshowPostShowEventsOnDeviceBack:true,
      //isPopupModel:false,
      // retainSpaceOnHide:true,
      // restoreformstateondeviceback :false,
      "hideDefaultLoadingIndicator":true,
      //fontScaleFactor :2.25,
      // enableSplashScreen :true,
      // hideStatusBar:false,
      // prefersHomeIndicatorAutoHidden :true,
      //skipEscapeHTML : true ,
      //useNativeMSG :false
    };

    kony.application.setApplicationBehaviors(Objectbehaviors);
  },
  // Set Application Callbacks for foreground and background mode
  /**
   * setApplicationCallbacks :: Set Application Callbacks for foreground and background mode
   *
   */
  setApplicationCallbacks:function(){

    Application.Utils.Dlog("setApplicationCallbacks ::kony:: ==>");
    var appCallbacks={
      onactive:function(){ Application.Utils.Dlog("App is in on active mode ::kony::");},
      oninactive: function(){ Application.Utils.Dlog("App is on  Inactive mode ::kony::");},
      onlowmemory : function(){ Application.Utils.Dlog("App is received low memeory warnings ::kony::");},
      onbackground : function(){Application.Utils.Dlog("App is on background mode ::kony::");},
      onforeground :function(){ Application.Utils.Dlog("App is on foreground mode ::kony::");},
      onappterminate: function(){ Application.Utils.Dlog("App is going to terminate ::kony::");},
      onkeyboardchange: function(){ Application.Utils.Dlog("AppKeyboard is changed ::kony::");},
      onpowersourcechange : function(){ Application.Utils.Dlog("AppPower source is changed ::kony::");},
      onmultiwindowmodechanged:function(){ Application.Utils.Dlog("AppMultiwindow changed  is changed ::kony::");},
      onnetworkchange :function(){ Application.Utils.Dlog("App Network is changed ::kony::");},
      onapplicationopenurl : function( sourceApplicaion, url, annotation){Application.Utils.Dlog("App is opened by other running app ::kony::");}
    };
    kony.application.setApplicationCallbacks(appCallbacks);
  }, 
  /**
   * @function
   *
   */
  setApplicationProperties:function(){

    kony.application.setApplicationProperties({
      "statusBarColor": "f4811f",
      "statusBarForegroundColor": "f4811f",
      "statusBarHidden": false,
      "statusBarStyle": constants.STATUS_BAR_STYLE_LIGHT_CONTENT,
      "navigationBarColor" : "f4811f",
      "systemUiConfig" : constants.HIDE_SYSTEM_BARS
    });	
  },
  // Check Locaton Services enabled or Not
  checkLocationPermission:function(){
    Application.Utils.Dlog("checkLocationPermission ::kony:: ==>");
    var options = {isAccessModeAlways:true};
    var result = kony.application.checkPermission(kony.os.RESOURCE_LOCATION,options);
    if(result.status == kony.application.PERMISSION_DENIED){
      if(result.canRequestPermission){
        kony.application.requestPermission(kony.os.RESOURCE_LOCATION, Application.Utils.permissionStatusCallback, options);
      }else{

        var msg ="Please enable the permission in Device Settings to proceed. Do you want to open settings?";
        Application.alert.showOkAlert(msg, Application.Utils.permissionAlertHandler);
        /*
        var basicConfig = {
          alertType : constants.ALERT_TYPE_CONFIRMATION,
          message : "Please enable the permission in Device Settings to proceed. Do you want to open settings?",
          alertHandler : Application.Utils.permissionAlertHandler
        };
        kony.ui.Alert(basicConfig);
        */
      }
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      return false;
    }else if(result.status == kony.application.PERMISSION_GRANTED){
      // kony.location.getCurrentPosition();
      Application.Utils.Dlog("Application Permission is granted ::kony::");
      return true;
    }else if(result.status == kony.application.PERMISSION_RESTRICTED){
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      alert("Resource Aceess Restricted for User");
      return false;
    }
  },

  checkCameraPermission:function(){
    Application.Utils.Dlog("checkCameraPermission ::kony:: ==>");
    var options = {isVideoCapture :true, isAccessModePublic : true};
    var result = kony.application.checkPermission(kony.os.RESOURCE_CAMERA,options);
    if(result.status == kony.application.PERMISSION_DENIED){
      if(result.canRequestPermission){
        kony.application.requestPermission(kony.os.RESOURCE_CAMERA, Application.Utils.permissionStatusCallback, options);
      }else{

        var msg ="Please enable the permission in Device Settings to proceed. Do you want to open settings?";
        Application.alert.showOkAlert(msg, Application.Utils.permissionAlertHandler);
        /*
        var basicConfig = {
          alertType : constants.ALERT_TYPE_CONFIRMATION,
          message : "Please enable the permission in Device Settings to proceed. Do you want to open settings?",
          alertHandler : Application.Utils.permissionAlertHandler
        };
        kony.ui.Alert(basicConfig);
        */
      }
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      return false;
    }else if(result.status == kony.application.PERMISSION_GRANTED){
      // kony.location.getCurrentPosition();
      Application.Utils.Dlog("Application Permission is granted ::kony::");
      return true;
    }else if(result.status == kony.application.PERMISSION_RESTRICTED){
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      alert("Resource Aceess Restricted for User");
      return false;
    }
  },

  checkGalleryPermission:function(){
    Application.Utils.Dlog("checkGalleryPermission ::kony:: ==>");
    var options = {};
    var result = kony.application.checkPermission(kony.os.RESOURCE_PHOTO_GALLERY ,options);
    if(result.status == kony.application.PERMISSION_DENIED){
      if(result.canRequestPermission){
        kony.application.requestPermission(kony.os.RESOURCE_PHOTO_GALLERY, Application.Utils.permissionStatusCallback, options);
      }else{

        var msg ="Please enable the permission in Device Settings to proceed. Do you want to open settings?";
        Application.alert.showOkAlert(msg, Application.Utils.permissionAlertHandler);
        /*
        var basicConfig = {
          alertType : constants.ALERT_TYPE_CONFIRMATION,
          message : "Please enable the permission in Device Settings to proceed. Do you want to open settings?",
          alertHandler : Application.Utils.permissionAlertHandler
        };
        kony.ui.Alert(basicConfig);
        */
      }
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      return false;
    }else if(result.status == kony.application.PERMISSION_GRANTED){
      // kony.location.getCurrentPosition();
      Application.Utils.Dlog("Application Permission is granted ::kony::");
      return true;
    }else if(result.status == kony.application.PERMISSION_RESTRICTED){
      Application.Utils.Dlog("Application Permission is denied ::kony::");
      alert("Resource Aceess Restricted for User");
      return false;
    }
  },
  permissionAlertHandler :function(resp){
    if(resp){
      Application.Utils.Dlog("permissionAlertHandler ::kony:: ==>");
      kony.application.openApplicationSettings();
    }
  },
  // open application settings

  openApplicationSettings:function(){
    Application.Utils.Dlog("openApplicationSettings ::kony:: ==>");
    kony.application.openApplicationSettings();
  }, 
  /**
   * @function
   *
   * @param response 
   */
  permissionStatusCallback  :function(response){
    Application.Utils.Dlog("permissionStatusCallback ::kony:: ==>");
    if(response.status == kony.os.PERMISSION_GRANTED){
      Application.Utils.Dlog("OS Permission is granted ::kony::");
    }else{
      Application.Utils.Dlog("OS Permission is denied ::kony::");
      var msg ="Please enable the permission in Device Settings to proceed. Do you want to open settings?";
      Application.alert.showOkAlert(msg, Application.Utils.permissionAlertHandler);
    }
  },
  // enable Application timeout

  /**
   * @function
   *
   * @param callBackFunc 
   */
  registerApplicationTimeOut: function( callBackFunc){

    Application.Utils.Dlog("registerApplicationTimeOut ::kony:: ==>");
    kony.application.registerForIdleTimeout(30,callBackFunc);
  },
  // set Application Locale

  /**
   * @function
   *
   * @param locale 
   * @param callBackSuccessFunc 
   * @param callBackFailureFunc 
   */
  setLocaleForTheApp:function(locale,callBackSuccessFunc,callBackFailureFunc){

    Application.Utils.Dlog("setLocaleForTheApp ::kony:: ==>");
    kony.i18n.setCurrentLocaleAsync(locale, callBackSuccessFunc, callBackFailureFunc);
  },
  // get Application Locale

  /**
   * @function
   *
   */
  getDeviceLocale:function(){

    return kony.i18n.getCurrentDeviceLocale();
  },
  // Set Device Locale
  /**
   * @function
   *
   * @param locale 
   * @param callBackSuccessFunc 
   * @param callBackFailureFunc 
   */
  setDeviceLocale:function(locale,callBackSuccessFunc,callBackFailureFunc){
    Application.Utils.Dlog("setDeviceLocale ::kony:: ==>");
    var deviceLocale = kony.i18n.getCurrentDeviceLocale();
    kony.i18n.setCurrentLocaleAsync("en", callBackSuccessFunc, callBackFailureFunc);
  },
  // Set Application theme
  /**
   * @function
   *
   * @param theme 
   * @param callBackSuccessFunc 
   * @param callBackFailureFunc 
   */
  setAppTheme:function(theme,callBackSuccessFunc,callBackFailureFunc){
    Application.Utils.Dlog("setAppTheme ::kony:: ==>");
    kony.theme.setCurrentTheme (theme, callBackSuccessFunc,callBackFailureFunc);
  },
  // check whether the given  object is undefined or not
  /**
   * @function
   *
   * @param value 
   */
  isNullUndefinedObj:function(value){
    //  Application.Utils.Dlog("isNullUndefinedObj ::kony:: ==>");
    if((null !== value && undefined !== value && "" !== value && value !== "null")){
      return false;
    }else{
      return true;
    }
  },
  // get index of string from an array
  /**
   * @function
   *
   * @param obj 
   * @param list 
   */
  getIndexOfStringArray:function(obj, list){
    Application.Utils.Dlog("getIndexOfStringArray ::kony:: ==>");
    var i;
    var listLength = list.length;
    for (i = 0; i < listLength; i++) {
      if (list[i].toUpperCase() === obj) {
        return i;
      }
    }
    return -1;
  },
  /**
   * @function
   *
   */
  getOSType:function(){
    Application.Utils.Dlog("getOSType ::kony:: ==>");
    var osprops = kony.os.deviceInfo();
    Application.Utils.Dlog("OS Details::" + JSON.stringify(osprops));
    var ostype = osprops.name;
    if (kony.string.startsWith(ostype, "iph", true) === true) {
      gblPlatform = "iphone";
      return "iphone";
    } else if (kony.string.startsWith(ostype, "ipo", true) === true) {
      gblPlatform = "iphone";
      return "ipod";
    } else if (kony.string.startsWith(ostype, "ipa", true) === true) {
      gblPlatform = "ipad";
      return "ipad";
    } else if (kony.string.startsWith(ostype, "android", true) === true) {
      gblPlatform = "android";
      return "android";
    } else if (kony.string.startsWith(ostype, "black", true) === true) {
      return "blackberry";
    } else if (kony.string.startsWith(ostype, "Win", true) === true) {
      gblPlatform = "windows";
      /*
      if (ostype === "WindowsPhone") {
        return "windows";
      }
      */
      return "windows";

    } else if (kony.string.startsWith(ostype, "thinclient", true) === true || gblChannel === "desktop") {
      return "desktop";
    }
  },

  // destroying the form data by giving form name
  /**
   * @function
   *
   * @param formName 
   */
  destroyForm:function(formName){
    Application.Utils.Dlog("destroyForm ::kony:: ==>");
    kony.application.destroyForm(formName);
  },
  // Exit the application
  exit:function(){
    kony.application.exit();
  }

};
// String Manipluation

Application.Utils.String ={
  // Replace all occurance of string from a string by given string
  /**
   * @function
   *
   * @param find 
   * @param replace 
   * @param str 
   */
  replaceAll:function(find, replace, str){
    Application.Utils.Dlog("replaceAll ::kony:: ==>");
    while( str.indexOf(find) > -1)
    {
      str = str.replace(find, replace);
    }
    return str;
  },
  // Remove all HTML excape code from a string
  /**
   * @function
   *
   * @param value 
   */
  unescapeHTMLString:function(value){
    Application.Utils.Dlog("unescapeHTMLString ::kony:: ==>");
    if((null!== value && undefined!== value && "" !==value)){
      value=Application.Utils.String.replaceAll("&apos;","'",value); 
      value=Application.Utils.String.replaceAll("&quot;","\"",value);
      value=Application.Utils.String.replaceAll("&amp;","&",value);
      value=Application.Utils.String.replaceAll("&lt;","<",value);
      value=Application.Utils.String.replaceAll("&gt;",">",value);
      value=Application.Utils.String.replaceAll("&#255;","ÿ",value);
      value=Application.Utils.String.replaceAll("&#254;","þ",value);
      value=Application.Utils.String.replaceAll("&#153;","™",value);
      value=Application.Utils.String.replaceAll("&#154;","š",value);
      value=Application.Utils.String.replaceAll("&#169;","©",value);
      value=Application.Utils.String.replaceAll("&#174;","®",value);
      value=Application.Utils.String.replaceAll("&#188;","¼",value);
      value=Application.Utils.String.replaceAll("&#189;","½",value);
      value=Application.Utils.String.replaceAll("&#190;","¾",value);
      value=Application.Utils.String.replaceAll("&#190;","$",value);
      value=Application.Utils.String.replaceAll("™","",value);
      return value;
    }else{
      return "" ;
    }
  },
  // Remove all HTML Tags from a string
  /**
   * @function
   *
   * @param value 
   */
  unescapeHTMLTags:function(value){
    Application.Utils.Dlog("unescapeHTMLTags ::kony:: ==>");
    if((null!== value && undefined !== value && ""!== value)){
      var str=value;
      str=str.replace(/<\/?(span|div|img|strong|b|p|i|li|Class|style...)\b[^<>]*>/g,"");
      value=Application.Utils.String.unescapeHTMLString(str);	     
    }else{
      return "" ;
    }
  },
  // Capitaise a first letter of string
  /**
   * @function
   *
   * @param string 
   */
  capitaliseFirstLetter:function(string){
    Application.Utils.Dlog("capitaliseFirstLetter ::kony:: ==>");
    if((null!== value && undefined!== value && "" !==value)){
      return   kony.string.trim(string.charAt(0).toUpperCase() + string.slice(1));
    }else{
      return string;
    }
  },
  // Converta string to decimal
  /**
   * @function
   *
   * @param str 
   */
  convertStringToDecimal:function(str){
    Application.Utils.Dlog("convertStringToDecimal ::kony:: ==>");
    if(str !== "null" && str !== null && str !== undefined && str !== "" && str !== "null"){
      var numberStr = parseFloat(str);
      if(numberStr % 1 === 0){
        return numberStr.toFixed(2);
      }else{
        return numberStr;
      }
    }else{
      str = "";
    }
    return str;
  },

  /**
   * @function
   *
   * @param str 
   */
  convertStringToHex:function(str){
    var hex = '';
    for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
  },
  /**
   * @function
   *
   * @param hexStr 
   */
  convertStringFromHex:function(hexStr){
    var hex = hexStr.toString(); //force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  },
  // Remove all emojis from a string
  /**
   * @function
   *
   * @param string 
   */
  removeEmojis:function(string){
    Application.Utils.Dlog("removeEmojis ::kony:: ==>");
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '(emojis)');
  },
  // Get all emojis from a string
  /**
   * @function
   *
   * @param str 
   */
  emojiStringToArray:function(str){
    Application.Utils.Dlog("emojiStringToArray ::kony:: ==>");
    var arr = [];
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    if(str !== null && str !== undefined && str !=="" ){
      var splited = str.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);

      if(splited !== null && splited !== undefined && splited !=="" ){
        var i;
        var lenth = splited.length;
        for (i=0; i<lenth; i++) {
          var  charterStr = splited[i];
          if (charterStr !== "") {
            arr.push(charterStr);
          }
        } 
      }
    }
    return arr;
  },
  // Convert a string to unicode string
  /**
   * @function
   *
   * @param theString 
   */
  toUnicode:function(theString){
    Application.Utils.Dlog("toUnicode ::kony:: ==>");
    var unicodeString = '';
    var i;
    var lenth = theString.length;
    for (i=0; i < lenth; i++) {
      var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
      while (theUnicode.length < 4) {
        theUnicode = '0' + theUnicode;
      }
      theUnicode = '\\u' + theUnicode;
      unicodeString += theUnicode;
    }
    return unicodeString;
  },
  // Check the given string is a valid URL
  /**
   * @function
   *
   * @param str 
   */
  isValidURL:function(str){
    Application.Utils.Dlog("isValidURL ::kony:: ==>");
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  },
  /**
   * @function
   *
   * @param str 
   */
  convertExtenstion:function(str){
    Application.Utils.Dlog("convertExtenstion ::kony:: ==>");
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if(regex.test(str)){
      kony.print("return empty extension");
      return "";
    }else{
      kony.print("return .png extension");
      return ".png";
    }
  }

};

//************************************* Date Objects******************************************





Application.Utils.Date={
  // Convert timestamp string to Date object
  /**
   * @function
   *
   * @param timestamp 
   */
  convertTimestampToDate:function (timestamp){
    Application.Utils.Dlog("convertTimestampToDate ::kony:: ==>");
    var date = new Date(timestamp*1000);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return  date.toLocaleDateString();
  },
  // 
  /**
   * @function
   *
   * @param dateOne 
   * @param dateTwo 
   */
  getDaysBetWeenTwoDates:function(dateOne,dateTwo){
    Application.Utils.Dlog("getDaysBetWeenTwoDates ::kony:: ==>");

    var tempdateOne= new Date(dateOne);
    var tempdateTwo= new Date(dateTwo);
    var curdate = new Date();
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds 
    var diffDays = Math.round(Math.abs((tempdateOne.getTime() - tempdateTwo.getTime())/(oneDay)));
    Application.Utils.Dlog("diffDays :::::::::::"+diffDays);
    return diffDays;
  },
  // check whetther the date object is past or not
  /**
   * @function
   *
   * @param expiryDate 
   */
  isPastDate:function(expiryDate){
    Application.Utils.Dlog("isPastDate ::kony:: ==>");
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var expiry = new Date(expiryDate);
    if (expiry >= yesterday) {
      Application.Utils.Dlog("Not a Past Date" );
      return false;
    } else {
      Application.Utils.Dlog("Past Date" );
      return true;
    }
  },
  // Convert a date string  to Date object
  /**
   * @function
   *
   * @param _date 
   * @param _format 
   * @param _delimiter 
   */
  stringToDate:function(_date,_format,_delimiter){
    Application.Utils.Dlog("stringToDate ::kony:: ==>");
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
  }
};

// *************************** Loader *****************************************************
Application.loader = {
  // show Application loader

  showLoader: function (loaderText){
    Application.Utils.Dlog("Showing Loding Screen::: ");

    kony.application.showLoadingScreen(
      "block",
      loaderText,
      constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
      true,
      true,
      {enableMenuKey:true,enableBackKey:true,progressIndicatorColor : "fffffff"}
    );
  },
  // dismiss Application loader
  dismissLoader:function (){
    Application.Utils.Dlog("Loader dismissed::: ");
    kony.application.dismissLoadingScreen();
  }
};

// *************************** Alert Types *****************************************************
Application.alert = {
  // show Alert for information
  showOkAlert: function (msg,handler){
    var alertConf = {
      message: msg,
      alertType: constants.ALERT_TYPE_INFO,
      alertTitle:"Oriental Bank",
      yeslabel: "OK",
      nolabel: null,
      alertIcon: null,
      alertHandler: handler
    };
    var pspConf = {};
    kony.ui.Alert(alertConf, pspConf);
    Application.loader.dismissLoader();
  },
  // show Alert for confirmation
  showOkCancelAlert: function (msg,handler){
    var alertConf = {
      message: msg,
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      alertTitle:"AppName",
      yeslabel: "OK",
      nolabel: "Cancel",
      alertIcon: null,
      alertHandler: function(){ }
    };
    var pspConf = {};
    kony.ui.Alert(alertConf, pspConf);
  }


};

// *************************** KPNS & KMS Push Notifications *****************************************************

var gblKMSConfig ={
  appID:"",
  appName:"",
  androidConfig:{
    senderid: "konykmspush"   // Google Project ID or Sender ID of Android App
  },
  iOSConfig: [0, 1, 2],    // badges, sounds, alerts
  windowsConfig:{
    remoteimageurls:["http://www.kony.com/publishingimages/newlogo.jpg","http://www.kony.com/publishingimages/newlogo.jpg"],
    enableraw:true,
    enabletile:false,
    enabletoast:true
  },
  blackBerryConfig:{ 
    appid:"4575-s5B6359ee2651IM7y53r1D114cy84012338",
    port:34560,
    bpasurl:"http://cp4575.pushapi.eval.blackberry.com",
    appicon:"icon.png",
    starappicon:"starappicon.png",
    statusbaricon:"statusicon.png"
  },
  androidGMSServerAPIKey:"AIzaSyD3Lh4lY1w_z2L2AstJG9fHIA7PUhmm-JI",
  subscriberID:"",
  subscriberListIDs:[],
  ksid:"",
  uid:"",
  registerID:"",
  messageToSend:""
};

Application.KonyPush ={

  /**
   * @function
   *
   * @param callbackRegisterSuccess 
   * @param callbackRegisterFailure 
   * @param callbackOnlineNotification 
   * @param callbackOfflineNotification 
   * @param callbackDeregisterSuccess 
   * @param callbackDeregisterFailure 
   */
  iniWithCallbacks: function (callbackRegisterSuccess,callbackRegisterFailure,callbackOnlineNotification,callbackOfflineNotification,callbackDeregisterSuccess,callbackDeregisterFailure){

    var callbacks = {
      onsuccessfulregistration: callbackRegisterSuccess,
      onfailureregistration: callbackRegisterFailure,
      onlinenotification: callbackOnlineNotification,
      offlinenotification: callbackOfflineNotification,
      onsuccessfulderegistration: callbackDeregisterSuccess,
      onfailurederegistration: callbackDeregisterFailure
    };

    kony.push.setCallbacks(callbacks);
  },
  /**
   * @function
   *
   */
  register:function(){
    var config;
    var osType = Application.Utils.getOSType();
    switch (osType) {
      case "iphone":
      case "ipad":
      case "ipod":
        config = gblKMSConfig.iOSConfig;
        break;
      case "androidgcm":
      case "android":
        config = gblKMSConfig.androidConfig;
        break;
      case "blackberry":
        config = gblKMSConfig.blackBerryConfig;
        break;
      case "windows":
        config = gblKMSConfig.windowsConfig;
        break;

    }
    kony.print("config: " + JSON.stringify(config));
    kony.push.register(config);
  },
  /**
   * @function
   *
   */
  deRegister:function(){
    var emptyHash = {};
    kony.push.deRegister(emptyHash);
  },
  /**
   * @function
   *
   */
  getGCM:function(){
    var osprops = kony.os.deviceInfo();
    var ostype = osprops.name;
    if (kony.string.startsWith(ostype, "ip", true) === true) {
      return "false";
    } else if (kony.string.startsWith(ostype, "android", true) === true) {
      return "true";
    } else if (kony.string.startsWith(ostype, "black", true) === true) {
      return "false";
    } else if (kony.string.startsWith(ostype, "Win", true) === true) {
      return "false";
    }
  },
  getOStypeForPush:function(){
    Application.Utils.Dlog("getOStypeForPush ::kony:: ==>");
    var osprops = kony.os.deviceInfo();
    Application.Utils.Dlog("OS Details::" + JSON.stringify(osprops));
    var ostype = osprops.name;
    if (kony.string.startsWith(ostype, "iph", true) === true) {
      return "iphone";
    } else if (kony.string.startsWith(ostype, "ipo", true) === true) {
      return "ipod";
    } else if (kony.string.startsWith(ostype, "ipa", true) === true) {
      return "ipad";
    } else if (kony.string.startsWith(ostype, "android", true) === true) {
      return "android";
    } else if (kony.string.startsWith(ostype, "black", true) === true) {
      return "blackberry";
    } else if (kony.string.startsWith(ostype, "Win", true) === true) {

      if (ostype === "WindowsPhone") {
        return "windows";
      }
      return "windows";
    } else if (kony.string.startsWith(ostype, "thinclient", true) === true || gblChannel === "desktop") {
      return "desktop";
    }
  }

};




// *************************** Local Notifications *****************************************************

var gblLocalNotificationConfig ={
  appID:"",
  appName:"",
  androidConfig:{
    senderid: "konykmspush"   // Google Project ID or Sender ID of Android App
  },
  iOSConfig: [0, 1, 2],    // badges, sounds, alerts
  windowsConfig:{
    remoteimageurls:["http://www.kony.com/publishingimages/newlogo.jpg","http://www.kony.com/publishingimages/newlogo.jpg"],
    enableraw:true,
    enabletile:false,
    enabletoast:true
  },
  notificationID:"",
  date:"",
  format :"dd MMM yyyy HH:mm:ss Z",
  registerID:"",
  notificationMsg:"Local notification Received",
  notificationTitle :"title",
  notificationCategoryId:"calendar",
  notificationBadgeNo:1,
  notificationIDArray:[]
};
Application.LocalNotifcation ={
  /**
   * @function
   *
   */
  iniWithCallbacks: function (callBackOfflinefunc,callBackOnlineFunc){
    gblLocalNotificationConfig.notificationIDArray =[];
    var callbacks = {
      "offlinenotification": callBackOfflinefunc,
      "onlinenotification": callBackOnlineFunc
    };

    kony.localnotifications .setCallbacks(callbacks);
  },
  /**
   * @function
   *
   */
  registerActions :function(){
    var accept = kony.notificationsettings.createAction({
      "id": "Accept",
      "label": "Accept",
      "pspConfig": {
        "authenticationRequired": true,
        "destructive": true,
        "activationMode":kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
        "visibleOn": kony.notificationsettings.BOTH
      }
    }); 

    var reject  = kony.notificationsettings.createAction({
      "id": "Reject",
      "label": "Reject",
      "pspConfig": {
        "authenticationRequired": false,
        "destructive": false,
        "activationMode":kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
        "visibleOn": kony.notificationsettings.BOTH
      }
    }); 

    var decline = kony.notificationsettings.createAction({
      "id": "Decline",
      "label": "Decline",
      "pspConfig": {
        "activationMode": kony.notificationsettings.ACTIVATION_MODE_BACKWARDS,
        "authenticationRequired": true,
        "destructive": false,
        "visibleOn": kony.notificationsettings.BOTH
      }
    });


    var defaultActionContextArr = [accept, reject, decline];
    var minimalActionContextArr = [accept, reject];

    var categoryObj = kony.notificationsettings.createCategory({
      "categoryId": gblLocalNotificationConfig.notificationCategoryId,
      "actions": defaultActionContextArr,
      "pspConfig": {
        "minimalActions":minimalActionContextArr 
      }
    });


    //Using kony.notificationsettings.registerCategory 

    var categoryArr = [categoryObj];
    var registerCategory = kony.notificationsettings.registerCategory({
      "categories": categoryArr,
      "pspConfig": {
        "types": [0, 1, 2]
      }
    });

  },
  /**
   * @function
   *
   */
  create:function(){
    //#ifdef iphone
    Application.LocalNotifcation.registerActions();
    //#endif
    kony.localnotifications.create({
      "id": gblLocalNotificationConfig.notificationID,
      "dateTime": {
        "date": gblLocalNotificationConfig.date,
        "format": gblLocalNotificationConfig.format
      },
      "message": gblLocalNotificationConfig.notificationMsg,
      "title": gblLocalNotificationConfig.notificationTitle,
      "categoryId": gblLocalNotificationConfig.notificationCategoryId,
      "pspConfig":{
        "badge":gblLocalNotificationConfig.notificationBadgeNo,
        "sound": kony.localnotifications.DEFAULT_SOUND
      }
    });
    gblLocalNotificationConfig.notificationIDArray.push(gblLocalNotificationConfig.notificationID);

  },
  /**
   * @function
   *
   */
  cancel:function(){
    var notificationIdArray =  gblLocalNotificationConfig.notificationIDArray;
    //notificationIdArray.push("01");
    kony.localnotifications.cancel(notificationIdArray);
  }

};


// *************************** Custom Network APIS *****************************************************
var client = null;
var gblMFServerConfig ={
  appName:"",
  appID:"DNCustomerPortal",
  appKey: "f7603363181a1918f35fe7f159e61d8c", //"testconnectivity",	//
  appSecret: "9cded1134d2c1ca97471f9ebd68c5668", 
  appAuthServiceURL:"https://100022106.auth.konycloud.com/appconfig",
  appConfigURL:"https://100022106.auth.konycloud.com/appconfig", 
  providerName:  "DnCustomLogin",   //"DnCustomLogin", //userstore",
  password: "",
  userid: "",
  username: ""
};

Application.Network = {

  getIdentityAuthForMFServer:function(){
    client = new kony.sdk();
    client.init(gblMFServerConfig.appKey, gblMFServerConfig.appSecret, gblMFServerConfig.appConfigURL, 
                function(response) {
      Application.Utils.Dlog("Mobile Fabric Server initialization sucess.");
      var konyObject = kony.sdk.getCurrentInstance();
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

        }, 
        function(error) { // error  Callback
          Application.Utils.Dlog("Auth Login Failure:: " + JSON.stringify(error));
        }
      );

    }, function(error) {
      Application.Utils.Dlog("Mobile Fabric Server initialization failure.Please check again later");
    });
  },

  /**
   * @function
   *
   */
  callGenericFabricServiceAsyncWithAuth:function(inputparams,servicename,operationname,callBackAsync){
    var authClient = null;
    var errMsg =  "No Internet connection available";
    if(Application.Utils.isNetworkAvailable() === true){
      var konyObject = kony.sdk.getCurrentInstance();
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
          var serviceName = servicename;
          var operationName = operationname;
          //inputparams.httpheaders = {};
          mfintegrationsecureinvokerasync(inputparams, serviceName, operationName, callBackAsync);
        }, 
        function(error) { // error  Callback
          Application.Utils.Dlog("Auth Login Failure:: " + JSON.stringify(error));
        }
      );
    }else{
      Application.Utils.Dlog("Auth Login Failure:: " + errMsg);
    }
  },
  callGenericFabricServiceAsync:function(inputparams,servicename,operationname,callBackAsync){

    var errMsg =  "No Internet connection available";
    if(Application.Utils.isNetworkAvailable() === true){
      mfintegrationsecureinvokerasync(inputparams, serviceName, operationName, callBackAsync);
    }else{
      Application.Utils.Dlog("" + errMsg);
    }
  },
  /**
   * @function
   *
   */
  callGenericHttpService:function(requestUrl,method,headers,postdata,callBackSuccessfunc,callBackFaliurefunc){
    var request = new kony.net.HttpRequest();// Only supported in Native. Not supported on Mobile web, SPA, Windows.
    var response=[];
    request.timeout = 10000; 
    //method-constants.HTTP_METHOD_GET
    request.open(method, requestUrl, false); 	 //Available on all platforms except BlackBerry 10,Windows Platforms and SPA.	
    // request.onReadyStateChange = callBackfunc;
    request.onReadyStateChange = function(){
      Application.Utils.Dlog("\n--------in ready state------------>");
      Application.Utils.Dlog("statusText = " + this.statusText + " Number  " + this.status);
      if(this.statusText == "server error")
      {
        var basicProperties = { message: "Unable to reach Host.",alertType: constants.ALERT_TYPE_ERROR,alertHandler: function() {}};
        kony.ui.Alert(basicProperties, {});
      }
      if (this.readyState == constants.HTTP_READY_STATE_DONE){
        Application.Utils.Dlog("Status = " + this.statusText + " Number  " + this.status);
        Application.Utils.Dlog("\n:--RESPONSE HEADERS-->" + JSON.stringify(request.getAllResponseHeaders()));
        Application.Utils.Dlog("1\n:--JS Received response--> " + this.response);
        if(this.response !== null && this.response !== "" && this.response !== undefined && this.response !=="null") {
          response = JSON.parse(this.response);
        }
      }
    };

    request.send();	

  }

};


function clearRemeberMeStore(){

  try{
    kony.store.removeItem("rememberMe");
    kony.store.removeItem("userInfo");
  } catch(err){
    kony.print("error in clearing the rememberMe flag from store");
  }


}



//-------------------------------------------------- CSV creation and download functionality-------------------------------------
Application.Utils.Export = {
  // convert json array to CSV format.
  convertArrayOfObjectsToCSV: function(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data === null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;

  },
  // Downloading CSV after creating CSV format. 
  downloadCSVFile: function(json_object,filename) {  
    var data, link;
    var csv = Application.Utils.Export.convertArrayOfObjectsToCSV({
      data: json_object
    });
    if (csv === null) return;

    //  filename = 'export.csv'; 

    filename = filename+".csv";


    if(navigator.msSaveBlob) { // IE 10+

      var blob = new Blob([csv], { "type": "text/csv;charset=utf8;"});
      navigator.msSaveBlob(blob, filename);

    }else{

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);

      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    }



    //     if (!csv.match(/^data:text\/csv/i)) {
    //       csv = 'data:text/csv;charset=utf-8,' + csv;
    //     }
    //     data = encodeURI(csv);

    //     link = document.createElement('a');
    //     link.setAttribute('href', data);
    //     link.setAttribute('download', filename);
    //     link.click();
  }
};
Application.Utils.exportJSON= {
  toPrint : function(jsonData,filename){

    var htmlcontent="<head><title>"+filename+"</title><style>table, th, td {margin:10px 0;border:solid 1px #333;padding:2px 4px;font:15px Verdana;}th {font-weight:bold;}</style></head><body><div id='showData'></div></body>";
    var printPage=window.open('','','width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
    var body =document.body.innerHTML;
    printPage.document.write(htmlcontent); 


    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
      for (var key in jsonData[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    // CREATE DYNAMIC TABLE.
    var table =  printPage.document.createElement("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
      var th =  printPage.document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonData.length; i++) {
      tr = table.insertRow(-1);
      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = jsonData[i][col[j]];
      }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer =  printPage.document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    Application.Utils.Dlog("dExport to Hml ::"+divContainer.innerHTML);
    printPage.document.close();
    printPage.focus();
    printPage.print();
    printPage.close();


    //return divContainer.innerHTML;
  }
};
Application.Utils.Print = {
  onClickPrint : function()
  {

    var css = '@page { size: landscape; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    window.print();

  }
};

//--------------------------Array object Utils -------------------------

Application.Utils.Array ={
  /**
   * @function
   *
   * @param obj 
   */
  removeDublicateObjects:function(obj){
    Application.Utils.Dlog("removeDublicateObjects ::kony:: ==>");
    var uniques=[];
    var stringify={};
    for(var i=0;i<obj.length;i++){
      var keys=Object.keys(obj[i]);
      keys.sort(function(a,b) {return a-b;});
      var str='';
      for(var j=0;j<keys.length;j++){
        str+= JSON.stringify(keys[j]);
        str+= JSON.stringify(obj[i][keys[j]]);
      }
      if(!stringify.hasOwnProperty(str)){
        uniques.push(obj[i]);
        stringify[str]=true;
      }
    }
    return uniques;
  }
};






