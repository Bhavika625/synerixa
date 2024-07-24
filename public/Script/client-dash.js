$(document).ready(function () {

    if(localStorage.getItem("activeuser")==null){
      location.href="index.html";
      return;
    }

    let active=localStorage.getItem("activeuser");
    $("#cdash").html("Welcome "+active).css("font-weight","bold").css("text-decoration","underline");

    $("#cSetEmail").val(active).prop("readonly",true);

    $("#btnLogOut").click(function (){

      localStorage.removeItem("activeuser");
      location.href="index.html";
    });

    $("#cNewPwd").keydown(function(){

        if($(this).val() == "")
            return;

        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        let pwd=$(this).val();

        if(regularExpression.test(pwd)!=true)
            $("#CspnNew").html("*Use a Strong Password*").css("color","red");
        else
            $("#CspnNew").html("Strong Password").css("color","green");

    });

    $("#cConfPwd").blur(function(){
        $("#CspnFin").html("");
    });

    $("#cOldPwd").blur(function(){
        $("#CspnOld").html("");
    });

    
  $("#Cbtnsettings").click(function () {

   // alert("Working");
    //   alert($("#cSetEmail").val());

    if($("#cNewPwd").val() == "")
    {
      $("#CspnNew").html("*Required Field*");
      return;
    }


    let obj = {
      type: "get",
      url: "/client-update",
      data: {
        cSetEmail: $("#cSetEmail").val(),
        cOldPwd: $("#cOldPwd").val(),
        cNewPwd: $("#cNewPwd").val(),
        cConfPwd: $("#cConfPwd").val()
      }
    }

    $.ajax(obj).done(function(resp){
          
          if(resp == "invalid")
              $("#CspnOld").html("*Password is incorrect.*");
          else if(resp == "success")
          {
              $("#CspnFin").html("Password Updated Successfully.").css("color","green");
              $("#cOldPwd").val("");

$("#cNewPwd").val("");

 $("#cConfPwd").val("");
 $("#CspnNew").html(""); 
          }

          else
          {
              $("#CspnOld").html("");
              $("#CspnFin").html("*"+resp+"*").css("color","red");
          }
      }).fail(function(err){
          alert(err.statusText);
      })
  
  });
});