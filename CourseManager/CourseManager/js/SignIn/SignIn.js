function getUserName() {
    var userName = $("#username").val();
    sessionStorage.setItem("username", userName);
    return true;
  }

$('#username').blur(function()
{
    if(!$(this).val()) {
          $(this).addClass('warning');
    }
});

$('#password').blur(function()
{
    if(!$(this).val()) {
          $(this).addClass('warning');
    }
});

if(!$('#password').val() || ('#username').val() ){
  $('button-login').prop( "disabled", true );
}