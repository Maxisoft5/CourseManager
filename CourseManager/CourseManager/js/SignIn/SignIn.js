function getUserName() {
    var userName = $("#username").val();
    var password = $("#password").val();
    sessionStorage.setItem("username", userName);
    var regexName=/^([a-zA-Z]{3,16})$/;
    var regexPasword=/^([a-zA-Z0-9]{6,16})$/;
    
    if (!userName.match(regexName) || !password.match(regexPasword)) {
      // there is a mismatch, hence show the error message
        $('.message').css("display","inline");
    } else {
        // else, do not display message
        $('.message').css("display","none");
        window.location.href='manager.html';
      }
  }


