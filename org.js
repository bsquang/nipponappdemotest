document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
    
    //$(".wrapper").height($(window).height())
    calHeightSummary()
    
    
}, false);



var user = {
    'name':'',
    'score':10,
    'code':''
}
var db = []; createDB();
function createDB() {
    db.push({'name':'VATEX 39A-2P 17L','code':'893051670996890291','serial':'VTXC39A2PX-17L', 'point':10, 'status':0})
    db.push({'name':'VATEX 39A-2P 17L','code':'893051670996890292','serial':'VTXC39A2PX-17L', 'point':10, 'status':0})
    db.push({'name':'VATEX 39A-2P 17L','code':'893051670996890293','serial':'VTXC39A2PX-17L', 'point':10, 'status':0})
    db.push({'name':'VATEX 39A-2P 17L','code':'893051670996890294','serial':'VTXC39A2PX-17L', 'point':10, 'status':0})
    db.push({'name':'VATEX 39A-2P 17L','code':'893051670996890295','serial':'VTXC39A2PX-17L', 'point':10, 'status':0})
    
    db.push({'name':'VINILEX 120 A/P BASE (VP) 16L','code':'893042950439890001','serial':'V12XBASEVP-16L', 'point':5, 'status':0})
    db.push({'name':'VINILEX 120 A/P BASE (VP) 16L','code':'893042950439890002','serial':'V12XBASEVP-16L', 'point':5, 'status':0})
    db.push({'name':'VINILEX 120 A/P BASE (VP) 16L','code':'893042950439890003','serial':'V12XBASEVP-16L', 'point':5, 'status':0})
    db.push({'name':'VINILEX 120 A/P BASE (VP) 16L','code':'893042950439890004','serial':'V12XBASEVP-16L', 'point':5, 'status':0})
    db.push({'name':'VINILEX 120 A/P BASE (VP) 16L','code':'893042950439890005','serial':'V12XBASEVP-16L', 'point':5, 'status':0})
}

function login() {
    
    //scanner.startScanning(function(result){
    //    
    //    alert(result)
    //    
    //})
    
    
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        
        if (result.text == "8863366820017") {
            
            user.code = "8863366820017";
            $("#txtBarcodeMID").html("8863366820017")
            $("#txtUserScore").html(user.score);
            
            gotoPage(2)
            
            //navigator.notification.alert(
            //    'Login successful!',  // message
            //    function(){gotoPage(2)},         // callback
            //    'Login status',            // title
            //    'Done'                  // buttonName
            //);
            
            
        }else{
            navigator.notification.alert(
                'ID not exist!',  // message
                null,         // callback
                'Login status',            // title
                'Done'                  // buttonName
            );
        }
        
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
    ); 
    
}
    
function logout() {
    if(confirm("Are you really to logout ?"))
    {location.href = '';}
}

function scan() {
    
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        
        var nothing = true;
        var exist = false;

        for(var i=0;i<db.length;i++){
            if (db[i].code == result.text && db[i].status == 0) {
                user.score += db[i].point;
                
                $("#txtUserScore").html(user.score);
                $("#totalScore").html("Totalscore: " + user.score);
                
                db[i].status = 1;
                
                addToList(db[i].name);                
                
                nothing = false;
                break;
            }else if (db[i].code == result.text && db[i].status == 1)  {
                
                alert("Product has been scanned!")
                
                exist = true;
                
                nothing = false;
            
                break;
            }
        }
        
        
        if (nothing) {
            alert("Wrong product!")
        }
        else{
            if (exist == false) {
                gotoPage(3)
            }
            
        }
        
        
        
          //alert("We got a barcode\n" +
          //      "Result: " + result.text + "\n" +
          //      "Format: " + result.format + "\n" +
          //      "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
    
    
}

function addToList(name) {
    var temp = "<div class='group line animated fadeIn'><p class='title'>"+name+"</p><p class='value'>added</p></div>";
    $("#summary").append(temp);
    calHeightSummary()
    saveLocal();
}

function clearListSummary() {
    $("#summary").html('')
}

function calHeightSummary() {
    
    var a1 = $(".page[bsq-id=3]").find(".line").outerHeight()
    var a2 = $("#bottom-panel").height()
    var result = $(document).height() - (a1+a2);
    
    $("#summary").height(result);
}

function done() {
    gotoPage(2); clearListSummary();
}

var current = 0;
function gotoPage(id) {
    if (current != id) {
        $(".page").hide();
        $(".page[bsq-id="+id+"]").fadeIn(300);
        
        current = id;
    }
    
}

initLocal();
function initLocal() {
    if (localStorage.user != undefined) {
        user = JSON.parse(localStorage.user);
    }else{
        localStorage.user = user;
    }
}
function saveLocal() {
    localStorage.user = JSON.stringify(user);
}
function clearLocal() {
    localStorage.clear();
    location.href = '';
}

// Test Push Notification

document.addEventListener('deviceready', function(){
    initPushwoosh();
}, false);

document.addEventListener('push-notification', function(event) {
             var notification = event.notification;
             alert(notification.aps.alert);
             pushNotification.setApplicationIconBadgeNumber(0);
});

function initPushwoosh() {
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
 
    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
                                //get the notification payload
                                var notification = event.notification;
 
                                //display alert to the user for example
                                alert(notification.aps.alert);
                               
                                //clear the app badge
                                pushNotification.setApplicationIconBadgeNumber(0);
                            });
 
    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"98353-6E5FA"});
     
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );
     
    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
}
