$(document).ready(function(){

    

    let active = localStorage.getItem("activeuser");
    $("#email").val(active).prop("readonly",true);

    $("#btnLogOut").click(function (){

        localStorage.removeItem("activeuser");
        location.href="index.html";
      });

    let obj = {
        type: "get",
        url: "/chk-if-present",
        data: {
            email: $("#email").val()
        }
    }

    $.ajax(obj).done(function(resp){

        // alert(resp);
        if(resp == "record found")
        {
            $("#btnSearch").prop("disabled",false);
            $("#btnSub").prop("disabled",true);
            $("#btnUpd").prop("disabled",false);
        }
        
    }).fail(function(err){
        alert(err.statusText);
    });


    $("#txtMob").blur(function(){
              
        var regularExpression = /(0|91)?[6-9][0-9]{9}/;
      let phone=$(this).val();

      if(regularExpression.test(phone)!=true)
         $("#spnMob").html("* Not a valid phone number. *");
      else
      $("#spnMob").html("");
  });
    
    $("#ppic").change(function(event){

        const [file] = event.target.files;

        if(file)
            $("#imgPrev").attr("src",URL.createObjectURL(file));
    });

    $("#btnSearch").click(function(){
        
        // alert("Helo");
        let obj={
            type:"get",
            url:"/find-user-details",
            data:{
                email:$("#email").val(),
            }
        }
        $.ajax(obj).done(function(jsonAry)
        {
            //alert(JSON.stringify(jsonAry));
            $("#txtName").val(jsonAry[0].iname);
            $("#dateDob").val(jsonAry[0].dob);
            $("#imgPrev").prop("src","uploads/"+jsonAry[0].picpath);
            $("#hdn").val(jsonAry[0].picpath);
            $("#inputGender").val(jsonAry[0].gender);
            $("#txtAdd").val(jsonAry[0].address);
            $("#selCity").val(jsonAry[0].city);
            $("#txtMob").val(jsonAry[0].mob);
            $("#txtInsta").val(jsonAry[0].insta);
            $("#txtYT").val(jsonAry[0].yt);
            $("#txtFB").val(jsonAry[0].fb);
            $("#txtOther").val(jsonAry[0].other);
            $("#selField").val(jsonAry[0].field.split(","));
            


        }).fail(function(err)
        {
            alert(err.statusText);
        });

    });

});
