document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

$(".wrapper").height($(window).height())

function login() {
    
    scanner.startScanning()
    
    //cordova.plugins.barcodeScanner.scan(
    //  function (result) {
    //    
    //    if (result.text == "8863366820017") {
    //        
    //        navigator.notification.alert(
    //            'Login successful!',  // message
    //            function(){gotoPage(2)},         // callback
    //            'Login status',            // title
    //            'Done'                  // buttonName
    //        );
    //        
    //        
    //    }else{
    //        navigator.notification.alert(
    //            'ID not exist!',  // message
    //            null,         // callback
    //            'Login status',            // title
    //            'Done'                  // buttonName
    //        );
    //    }
    //    
    //  }, 
    //  function (error) {
    //      alert("Scanning failed: " + error);
    //  }
    //);    
}

function logout() {
    localStorage.clear();
    location.href = '';
}

function scan() {
    
    
    
    
   // cordova.plugins.barcodeScanner.scan(
   //   function (result) {        
   //       alert("We got a barcode\n" +
   //             "Result: " + result.text + "\n" +
   //             "Format: " + result.format + "\n" +
   //             "Cancelled: " + result.cancelled);
   //   }, 
   //   function (error) {
   //       alert("Scanning failed: " + error);
   //   }
   //);
    
    
}

function done() {
    gotoPage(2)
}

function gotoPage(id) {
    $(".page").hide();
    $(".page[bsq-id="+id+"]").show();
}