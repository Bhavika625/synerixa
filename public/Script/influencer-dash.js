$(document).ready(function(){

    let active = localStorage.getItem("activeuser");
    $("#wel").html("Welcome "+active).css("font-weight","bold").css("text-decoration","underline");
    $("#setEmail").val(active).prop("readonly",true);
    $("#txtEmail").val(active).prop("readonly",true);

    $("#btnLogOut").click(function (){

        localStorage.removeItem("activeuser");
        location.href="index.html";
      });


    $("#newPwd").keydown(function(){

        if($(this).val() == "")
            return;

        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        let pwd=$(this).val();

        if(regularExpression.test(pwd)!=true)
            $("#spnNew").html("Not a valid Password.");
        else
            $("#spnNew").html("Valid Password.").css("color","green");

    });
    

    $("#btnPostBookings").click(function(){

        // alert("WOrking");
        let txtEvent=$("#txtEvent").val();
        let timeEvent= $("#timeEvent").val();
        let txtCity= $("#txtCity").val();

        if(timeEvent == "" || txtEvent =="" || txtCity == "")
        {
            $("#bookingStatus").html("Please fill the required fields.").css("color","red");
            return;
        }

        let obj = {
            type: "get",
            url: "/inf-post-events",
            data: {
                txtEmail: $("#txtEmail").val(),
                txtEvent: $("#txtEvent").val(),
                dateEvent: $("#dateEvent").val(),
                timeEvent: $("#timeEvent").val(),
                txtCity:  $("#txtCity").val(),
                txtVenue: $("#txtVenue").val()
            }
        }

        $.ajax(obj).done(function(resp){
            if(resp == "booked")
            {
                $("#bookingStatus").html("Event Added to the Records.").css("color","green");
                $("#txtEvent").val("");
 
 $("#dateEvent").val("");
 $("#timeEvent").val("");
$("#txtCity").val("");
  
$("#txtVenue").val("");

            }
            else    
                $("#bookingStatus").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    });

    $("#confPwd").blur(function(){
        $("#spnFin").html("");
    });

    $("#oldPwd").blur(function(){
        $("#spnOld").html("");
    });

    $("#dash-btnUpdate").click(function(){

        // alert("WOrking");
        if($("#newPwd").val() == "")
            {
              $("#spnNew").html("*Required Field*");
              return;
            }
        let obj = {
            type: "get",
            url: "/inf-update",
            data: { 
                setEmail: $("#setEmail").val(),
                oldPwd: $("#oldPwd").val(),
                newPwd: $("#newPwd").val(),
                confPwd: $("#confPwd").val()
            }
        }

        $.ajax(obj).done(function(resp){
            
            if(resp == "invalid")
                $("#spnOld").html("*Password is incorrect.*");
            else if(resp == "success")
            {
                $("#spnFin").html("Password Updated Successfully.").css("color","green");
                $("#oldPwd").val("");

                $("#newPwd").val("");
                
                 $("#confPwd").val("");
                 $("#spnNew").html(""); 
            }

            else
            {
                $("#spnOld").html("");
                $("#spnFin").html("*"+resp+"*").css("color","red");
            }
        }).fail(function(err){
            alert(err.statusText);
        })

    });

});