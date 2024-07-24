$(document).ready(function(){

    let active = localStorage.getItem("activeuser");
    $("#cliEmail").val(active).prop("readonly",true);

    let obj = {
        type: "get",
        url: "/chk-if-cli-present",
        data: {
            email: $("#cliEmail").val()
        }
    }

    $.ajax(obj).done(function(resp){

        // alert(resp);
        if(resp == "record found")
        {
            $("#cliSearch").prop("disabled",false);
            $("#cliSub").prop("disabled",true);
            $("#cliUpd").prop("disabled",false);
        }
        
    }).fail(function(err){
        alert(err.statusText);
    });


    $("#btnLogOut").click(function (){

        localStorage.removeItem("activeuser");
        location.href="index.html";
      });

    $("#cliMob").blur(function(){
              
        var regularExpression = /(0|91)?[6-9][0-9]{9}/;
      let phone=$(this).val();

      if(regularExpression.test(phone)!=true)
         $("#cliSpnMob").html("Not a valid phone number.");
      else
      $("#cliSpnMob").html("");
  });

  $("#cliMob2").blur(function(){
              
    var regularExpression = /(0|91)?[6-9][0-9]{9}/;
  let phone=$(this).val();

  if(regularExpression.test(phone)!=true)
     $("#cliSpnMob2").html("Not a valid phone number.");
  else
  $("#cliSpnMob2").html("");
});
    
    
    $("#cliSearch").click(function(){
        
        // alert("Helo");
        let obj={
            type:"get",
            url:"/find-client-details",
            data:{
                email:$("#cliEmail").val(),
            }
        }
        $.ajax(obj).done(function(jsonAry)
        {
            //alert(JSON.stringify(jsonAry));
            $("#cliName").val(jsonAry[0].cname);
            $("#cliAdd").val(jsonAry[0].address);
            $("#cliCity").val(jsonAry[0].city);
            $("#cliMob").val(jsonAry[0].mob1);
            $("#cliMob2").val(jsonAry[0].mob2);
            $("#cliState").val(jsonAry[0].state);
            $("#cliType").val(jsonAry[0].ctype);

        }).fail(function(err)
        {
            alert(err.statusText);
        });

    });

});




























$(document).ready(function () {

    let active = localStorage.getItem("activeuser");
    $("#cemail").val(active).prop("readonly", true);


    $("#cbtnSearch").click(function () {
        let obj = {
            type: "get",
            url: "/find-client-details",
            data: {
                email: $("#cemail").val()
            }
        }
        $.ajax(obj).done(function (jsonAry) {
            if (jsonAry.length == 0) {
                alert("Invalid ID");
                return;
            }
            //  alert(JSON.stringify(jsonAry));
            $("#cname").val(jsonAry[0].cname);//table colu. wale
            $("#ccity").val(jsonAry[0].ccity);
            $("#cContact").val(jsonAry[0].cContact);
            $("#cstatus").val(jsonAry[0].cstatus);
            $("#other").val(jsonAry[0].other);

        }).fail(function (err) {
            alert(err.statusText);
        })

    });
});