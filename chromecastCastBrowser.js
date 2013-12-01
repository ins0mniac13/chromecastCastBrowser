// changes the url of the contentFrame
function changeFrame()
{
    var url = document.getElementById("addressForm").urlbox.value;
    var patt = new RegExp(/http:\/\/|https:\/\/|file:\/\//);
    var result = patt.test(url);
    if(!result)
    {
        url = "http://"+url;
    }
    document.getElementById("contentFrame").src = url;
    return false;
}

// resize iFrame on load and resize to fit browser
$(window).on('load resize', function(){
    $window = $(window);
    $('#contentFrame').height(function(){
        return $window.height() -$(this).offset().top;
    });
});

// Show/hide addressBar on hover
$(document).ready(function(){

$(".wrapper").hover(
        function(){
            $("#addressForm").show();
        },
        function() {
            $("#addressForm").hide();
        }
    );
});
