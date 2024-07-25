let express = require("express");
let mysql2 = require("mysql2");
let fileuploader = require("express-fileupload");
const nodemailer = require('nodemailer');

let app = express();


app.use(express.static("public"));
app.use(fileuploader());
app.use(express.urlencoded(true));

app.listen("2005", function () {
    console.log("Server Started.");
});

// let config = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "Sid@$bh123",
//     database: "project",
//     dateStrings : true,
// }

let config = {
    host: "bg7vihwvs6s6azaxd1xs-mysql.services.clever-cloud.com",
    user: "uxvfxcbpwelegspj",
    password: "PLwsPo5Opug9u59sQKHs",
    database: "bg7vihwvs6s6azaxd1xs",
    dateStrings : true,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
}

let mysql = mysql2.createConnection(config);

mysql.connect(function (err) {
    if (err)
        console.log(err.message);
    else
        console.log("Database Connection is Successful.");
})


app.get("/", function (req, resp) {

    let path = __dirname + "/public/index.html";

    resp.sendFile(path);

});

app.get("/sign-up-process", function (req, resp) {

    console.log(req.query);

    let email = req.query.signupEmail;
    let pwd = req.query.signupPwd;
    let utype = req.query.utype;

    mysql.query("insert into users values(?,?,?,?)", [email, pwd, utype, 1], function (err) {
        if (err)
            resp.send(err.message);
        else
            resp.send("Successful");
    });


});

app.get("/check-user-existance", function (req, resp) {
    let email = req.query.signupEmail;

    mysql.query("select * from users where email=?", [email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        if (resultJsonAry.length != 0)
            resp.send("There is already a registered user with this email id.");
        else
            resp.send("");
    });

});

app.get("/login-process", function (req, resp) {

    let email = req.query.loginEmail;
    let pwd = req.query.loginPwd;

    // console.log(req.query);

    mysql.query("select * from users where email=? and pwd=?", [email, pwd], function (err, resultJsonAry) {

        if (err != null) {
            resp.send(err.message);
            return;
        }

        // console.log(resultJsonAry);

        if (resultJsonAry.length == 1) {
            // console.log("affected rows == 1");
            if (resultJsonAry[0].ustatus == 1)
                resp.send(resultJsonAry[0].utype);
            else
                resp.send("You are Blocked..");
        }
        else
            resp.send("Invalid ID and Password.");

    });

});
app.get("/inf-dash", function (req, resp) {
    let path = __dirname + "/public/influencer-dash.html";

    resp.sendFile(path);
})

app.get("/influencer-profile", function (req, resp) {

    let path = __dirname + "/public/influencer-profile.html";

    resp.sendFile(path);

});

app.post("/inf-profile-process", function (req, resp) {

    let fileName = "";

    if (req.files != null) {
        fileName = req.files.ppic.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.ppic.mv(path);
    }
    else
        fileName = "nopic";

    let email = req.body.email;
    let name = req.body.txtName;
    let gender = req.body.inputGender;
    let dob = req.body.dateDob;
    let add = req.body.txtAdd;
    let city = req.body.selCity;
    let mob = req.body.txtMob;
    let insta = req.body.txtInsta;
    let yt = req.body.txtYT;
    let fb = req.body.txtFB;
    let other = req.body.txtOther;
    let ary = req.body.selField;

    let str;
    if (Array.isArray(ary)) {
        str = "";
        for (i = 0; i < ary.length; i++) {
            str += ary[i] + ",";
        }
        let str1 = str.substring(0, str.length-1);
        str = str1;
        // console.log(str);
    }
    else
        str = ary;


    mysql.query("insert into IProfile values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, gender, dob, add, city, mob, insta, yt, fb, other, str, fileName], function (err) {
        if (err)
            resp.send(err.message);
        else
        {
            resp.redirect("result.html");
        }
    });

});

app.get("/chek-user",function(req,resp){

    let email = req.query.email;

    mysql.query("select * from iprofile where email=?",[email],function(err,res){
        if(err)
        {
            resp.send(err.message);
        
            }    else    
            resp.send(res);
    })

})

app.get("/find-user-details", function (req, resp) {

    let email = req.query.email;

    mysql.query("select * from iprofile where email=?", [email], function (err, jsonAry) {

        if (err != null) {
            resp.send(err.message);
            return;
        }
            resp.send(jsonAry);

    });

});

app.post("/inf-profile-update", function(req, resp){

    //console.log(req.body);

    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
    // console.log(fileName);
    
    let email = req.body.email;
    let name = req.body.txtName;
    let gender = req.body.inputGender;
    let dob = req.body.dateDob;
    let add = req.body.txtAdd;
    let city = req.body.selCity;
    let mob = req.body.txtMob;
    let insta = req.body.txtInsta;
    let yt = req.body.txtYT;
    let fb = req.body.txtFB;
    let other = req.body.txtOther;
    let ary = req.body.selField;

    let str;
    if (Array.isArray(ary)) {
        str = "";
        for (i = 0; i < ary.length; i++) {
            str += ary[i] + ",";
        }
        // console.log(str);
    }
    else
        str = ary;
        

    mysql.query("update iprofile set iname=?, gender=? , dob=?, address=?, city=?,mob=?,insta=?,yt=?,fb=?,other=?,field=?,picpath=? where email=?",[name, gender, dob, add, city, mob, insta, yt, fb, other, str, fileName,email],function(err,result)
    {
        if(err==null)//no error
        {
               if(result.affectedRows>=1) 
               {
                resp.redirect("result.html");
               }
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

});

app.get("/inf-post-events",function(req,resp){

    // console.log(req.query);
    
    let email = req.query.txtEmail;
    let event = req.query.txtEvent;
    let date = req.query.dateEvent;
    let time = req.query.timeEvent;
    let city = req.query.txtCity;
    let venue = req.query.txtVenue;

    mysql.query("insert into events values(null,?,?,?,?,?,?)",[email,event,date,time,city,venue],function(err,result){

        if(err != null)
            resp.send(err.message);
        else
            resp.send("booked");

    });

});

app.get("/inf-update",function(req,resp){

    let email = req.query.setEmail;
    let oldPwd = req.query.oldPwd;
    let newPwd = req.query.newPwd;
    let confPwd = req.query.confPwd;

    if(newPwd != confPwd)
    {
        resp.send("New Password and confirm password don't match.");
        return;
    }

    mysql.query("update users set pwd=? where email=? and pwd=?",[newPwd,email,oldPwd],function(err,res){

        if(err)
            resp.send(err.message);
        else
        {
            if(res.affectedRows == 0)
            {
                resp.send("invalid");
            }
            else
                resp.send("success");
            
        }
    });

});

app.get("/forgot-password",function(req,resp){

    let email = req.query.loginEmail;

    // console.log(email);

    mysql.query("select * from users where email=?",[email],function(err,result)
    {
        // console.log(result);

        if(err)
            resp.send(err.message);

        else if(result.length == 0)
            resp.send("Invalid ID");

        else
        {
            // console.log(result);

            const transporter = nodemailer.createTransport({
                service: 'gmail', // Use Gmail as the email service
                auth: {
                  user: 'mehtatrisha46@gmail.com', // Your Gmail email address
                  pass: 'xnex pyhv dgdv mnyt' // Your Gmail password
                },
                tls: {
                  rejectUnauthorized: false
                }
              });

              const mailOptions = {
                from: "mehtatrisha46@gmail.com", // Sender's email address
                to: email, // Recipient's email address
                subject: "Forgot Password", // Subject line
                text: "Your Password is "+ result[0].pwd+". Use this to Login into your account." // Plain text body
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  resp.send(error.message);
                } else {
                    console.log(info.response);
                  resp.send('Email sent');
                }
              });
        }

    });

});

app.get("/admin-dash",function(req,resp){

    let path = __dirname+"/public/admin-dash.html";
    resp.sendFile(path);

});

app.get("/admin-user",function(req,resp){

    let path = __dirname+"/public/admin-users.html";
    resp.sendFile(path);

});

app.get("/fetch-all",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

})
app.get("/del-one",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })
});

app.get("/block-one",function(req,resp)
{
    mysql.query("update users set ustatus=? where email=?",[0, req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            // console.log(resultJsonAry);
            resp.send("User is Blocked");
       
    })
});

app.get("/resume-one",function(req,resp)
{
    mysql.query("update users set ustatus=? where email=?",[1, req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            // console.log(resultJsonAry);
            resp.send("User is Unblocked");
       
    })
});

app.get("/inf-console",function(req,resp){
    let path = __dirname+"/public/admin-all-influ.html";
    resp.sendFile(path);
});

app.get("/fetch-all-inf",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

});

app.get("/find-influ",function(req,resp){
    let path = __dirname+"/public/influ-finder.html";
    resp.sendFile(path);
});

app.get("/get-city", function(req,resp)
{
    let field = "%"+req.query.txtField+"%";
    // console.log(field);

    mysql.query("select distinct city from iprofile where field like ?",[field],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        resp.send(res);
    });

});

app.get("/get-inf", function(req,resp)
{
    mysql.query("select * from iprofile",[],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        resp.send(res);
    });

});

app.get("/get-inf-by-field", function(req,resp)
{
    let field = "%"+req.query.txtField+"%";

    // console.log(field);

    mysql.query("select * from iprofile where field like ?",[field],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});
app.get("/get-inf-by-name", function(req,resp)
{
    let name = req.query.txtName;

    // console.log(field);

    mysql.query("select * from iprofile where iname=?",[name],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});
app.get("/get-inf-by-city", function(req,resp)
{
    let city = req.query.selCity;

    // console.log(field);

    mysql.query("select * from iprofile where city=?",[city],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});
app.get("/get-inf-by-field-city", function(req,resp)
{
    let field = "%"+req.query.txtField+"%";
    let city = req.query.selCity;

    // console.log(field);

    mysql.query("select * from iprofile where field like ? and city = ?",[field, city],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});
app.get("/get-inf-by-field-name", function(req,resp)
{
    let field = "%"+req.query.txtField+"%";
    let name = req.query.txtName;

    // console.log(field);

    mysql.query("select * from iprofile where field like ? and iname = ?",[field, name],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});
app.get("/get-inf-by-name-city", function(req,resp)
{
    let name = req.query.txtName;
    let city = req.query.selCity;

    mysql.query("select * from iprofile where iname = ? and city=?",[name,city],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});

app.get("/get-inf-by-field-city-name", function(req,resp)
{
    let field = "%"+req.query.txtField+"%";
    let city = req.query.selCity;
    let name = req.query.txtName;

    // console.log(field);

    mysql.query("select * from iprofile where field like ? and city = ? and iname = ?",[field,city, name],function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        // console.log(res);
        resp.send(res);
    });

});




app.get("/event-manager",function(req,resp){

    let path = __dirname+"/public/events-manager.html";

    resp.sendFile(path);

});

app.get("/fetch-all-events",function(req,resp)
{
    let email = req.query.emailTxt;
    // console.log(email);

    mysql.query("select * from events where doe >= current_date() and email = ?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

});

app.get("/update-one-event",function(req,resp){

    mysql.query("update events set ievents=?, doe=?,tos=?, city=?, venue=? where rid=?",[req.query.name, req.query.date, req.query.time, req.query.city, req.query.venue, req.query.rid],function(err,resultArray){

        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");

    });

});

app.get("/del-one-event",function(req,resp)
{
    mysql.query("delete from events where rid=?",[req.query.rid],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })
});

// ----------------------------------------------------------------------------
app.get("/client-profile",function(req,resp)
{
    let path=__dirname+"/public/client-profile.html";
    resp.sendFile(path);
})


app.post("/cli-profile-process",function(req,resp){
    
    console.log(req.body);


    let email = req.body.cliEmail;
    let name = req.body.cliName;
    let city = req.body.cliCity;
    let state = req.body.cliState;
    let mob1 = req.body.cliMob;
    let mob2 = req.body.cliMob2;
    let add = req.body.cliAdd;
    let type = req.body.cliType;

    mysql.query("insert into cprofile values(?,?,?,?,?,?,?,?)", [email, name,city,add, mob1, mob2,state,type ], function (err) {
        if (err)
           resp.send(err.message);
        else
            resp.redirect("result.html");
    });

})

app.get("/find-client-details",function(req,resp)
{
    let email= req.query.email;
   
    mysql.query("select * from cprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

});

app.get("/client-update",function(req,resp){

    console.log(req.query);
    let email = req.query.cSetEmail;
    let oldPwd = req.query.cOldPwd;
    let newPwd = req.query.cNewPwd;
    let confPwd = req.query.cConfPwd;

    if(newPwd != confPwd)
    {
        resp.send("New Password and confirm password don't match.");
        return;
    }

    mysql.query("update users set pwd=? where email=? and pwd=?",[newPwd,email,oldPwd],function(err,res){

        if(err)
            resp.send(err.message);
        else
        {
            if(res.affectedRows == 0)
            {
                resp.send("invalid");
            }
            else
                resp.send("success");
            
        }
    });

});

app.get("/chk-if-present",function(req,resp){
    // console.log(req.query.email);

    mysql.query("select * from iprofile where email=?",[req.query.email], function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        if(res.length == 1)
            resp.send("record found");

    });

});

app.get("/chk-if-cli-present",function(req,resp){
    // console.log(req.query.email);

    mysql.query("select * from cprofile where email=?",[req.query.email], function(err,res){

        if(err)
        {
            resp.send(err.message);
            return;
        }

        if(res.length == 1)
            resp.send("record found");

    });

});


app.post("/cli-profile-update", function(req, resp){

    console.log(req.body);

    let email = req.body.cliEmail;
    let name = req.body.cliName;
    let city = req.body.cliCity;
    let state = req.body.cliState;
    let mob1 = req.body.cliMob;
    let mob2 = req.body.cliMob2;
    let add = req.body.cliAdd;
    let type = req.body.cliType;


    mysql.query("update cprofile set cname=?, city=? , state=?, mob1=?, mob2=?,address=?,ctype=? where email=?",[name, city, state, mob1, mob2, add, type,email],function(err,result)
    {
        if(err==null)//no error
        {
               if(result.affectedRows>=1) 
               {
                resp.redirect("result.html");
               }
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

});

app.get("/get-pre-event",function(req,resp){

    // console.log(req.query.email);

    mysql.query("select * from events where email = ? and doe < current_date()",[req.query.email],function(err,res){

        if(err)
        {
            // console.log(err.message);
            resp.send(err.message);
            return;
        }
            resp.send(res);

    });

});
app.get("/get-upcoming-event",function(req,resp){

    // console.log(req.query.email);

    mysql.query("select * from events where email = ? and doe >= current_date()",[req.query.email],function(err,res){

        if(err)
        {
            // console.log(err.message);
            resp.send(err.message);
            return;
        }
            resp.send(res);

    });

});