$(document).ready(function()
{

    $("#signupEmail").blur(function(){

        if($(this).val() == "")
        {
            $("#spnEmail").html("*Required field*");
            return;
        }
        else
            $("#spnEmail").html("");
    
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        let email=$(this).val();

        if(pattern.test(email)!=true)
        {
            $("#spnEmail").html("* Write in correct email format.*");
            return;
        }
        let obj = {
            type: "get",
            url: "/check-user-existance",
            data: {
                signupEmail: $(this).val()
            }
        }

        $.ajax(obj).done(function(resp){
            $("#spnEmail").html(resp);

        }).fail(function(err){
            alert(err.statusText);
        })

        
    });

    $("#signupPwd").blur(function(){

        if($(this).val() == "")
            {
                $("#spnPwd").html("*Required field*");
                return;
            }
            else
                $("#spnPwd").html("");

        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        let pwd=$(this).val();

        if(regularExpression.test(pwd)!=true)
            $("#spnPwd").html("Use a strong passwoed");
        else
            $("#spnPwd").html("");

    });

    $("#btnSignup").click(function(){

        // alert();

        let eml = $("#signupEmail").val();
        let pwd = $("#signupPwd").val();

        if(eml == "")
        {
            $("#spnEmail").html("*Required field*");
            return;
        }
        if(pwd == "")
            {
                $("#spnPwd").html("*Required field*");
                return;
            }
        
            if( $("#spnEmail").html()!="" || $("#spnPwd").html()!="")
                return;


        let obj = {
            type: "get",
            url: "/sign-up-process",
            data: {
                signupEmail: $("#signupEmail").val(),
                signupPwd: $("#signupPwd").val(),
                utype: $("#utype").val()
            }
        }

        $.ajax(obj).done(function(resp){
            
            if(resp == "Successful")
            {
                // alert($("#utype").val());
                if ($("#utype").val() === "Influencer")
                    {
                        location.href = "influencer-dash.html"
                        localStorage.setItem("activeuser",$("#signupEmail").val());
                    }
    
                else if (($("#utype").val() === "Client"))
                    {
                        location.href = "client-dash.html";
                        localStorage.setItem("activeuser",$("#signupEmail").val());
                    }
            }
            else
                    $("#spnResLog").html(resp);

        }).fail(function(err){
            alert(err.statusText);
        })

    });

    
    
    $("#btnLogin").click(function(){

        let obj = {
            type: "get",
            url: "/login-process",
            data: {
                loginEmail: $("#loginEmail").val(),
                loginPwd: $("#loginPwd").val()
            }
        }

        $.ajax(obj).done(function(resp){
            
            if (resp === "Influencer")
                {
                    location.href = "influencer-dash.html"
                    localStorage.setItem("activeuser",$("#loginEmail").val());
                }

            else if (resp === "Client")
                {
                    location.href = "client-dash.html";
                    localStorage.setItem("activeuser",$("#loginEmail").val());
                }
                else if (resp === "admin")
                    {
                        location.href = "admin-dash.html";
                    }

            else
                $("#spnResLog").html(resp);

            

        }).fail(function(err){
            alert(err.statusText);
        })

    });

    $("#forgot-password").click(function(){

        // alert("forgot password");
        if($("#loginEmail").val() == "")
        {
            $("#spnResLog").html("First Enter the Email.");
            return;
        }
        
        let obj={
            type: "get",
            url: "/forgot-password",
            data:{
                loginEmail: $("#loginEmail").val()
            }
        }
       

        $.ajax(obj).done(function(res){
            
            $("#spnResLog").html(res).css("color", "green");


        }).fail(function(err){

            alert(err.statusText);
        })


    });

});