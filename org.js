document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

$(".wrapper").height($(window).height())

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
            
            navigator.notification.alert(
                'Login successful!',  // message
                function(){gotoPage(2)},         // callback
                'Login status',            // title
                'Done'                  // buttonName
            );
            
            
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
    
       
//}

function logout() {
    localStorage.clear();
    location.href = '';
}

function scan() {
    
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        
        var nothing = true;

        for(var i=0;i<db.length;i++){
            if (db[i].code == result.text && db[i].status == 0) {
                user.score += db[i].point;
                $("#totalScore").html("Totalscore: " + user.score);
                
                db[i].status = 1;
                
                addToList(db[i].name);                
                
                nothing = false;
                break;
            }else if (db[i].code == result.text && db[i].status == 1)  {
                
                alert("Product has been scanned!")
                
                nothing = false;
            
                break;
            }
        }
        
        
        if (nothing) {
            alert("Wrong product!")
        }
        else{
            gotoPage(3)
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
    var temp = "<div class='group line'><p class='title'>"+name+"</p></div>";
    $("#summary").append(temp);
}

function done() {
    gotoPage(2)
}

function gotoPage(id) {
    $(".page").hide();
    $(".page[bsq-id="+id+"]").show();
}