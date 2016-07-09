document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

$(".wrapper").height($(window).height())

function login() {
    gotoPage(2)
}

function logout() {
    localStorage.clear();
    location.href = '';
}

function scan() {
    gotoPage(3)
}

function done() {
    gotoPage(2)
}

function gotoPage(id) {
    $(".page").hide();
    $(".page[bsq-id="+id+"]").show();
}