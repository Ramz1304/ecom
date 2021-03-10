//login method

var user_data = '';

function getUser(){
    $.ajax({
    type: "Get",
    url: "/assets/user.json",
    dataType: "json",
    success: function(data) {
        user_data = data;

    },
    error: function(){
        alert("json not found");
    }
    });

}




function login(event) {
    let data = JSON.parse(toJson($('#loginform')));
    let logname;
    for(i=0;i< user_data.length;i++){
        if(data.email == user_data[i].email && data.password == user_data[i].password){
        logname = user_data[i].name
        let obj = {
            "name": logname,
            "email": data.email,
            "password": data.password
        };
        localStorage.setItem('user', JSON.stringify(obj));
        location.href = '/source/home.html'; 
        return false; 
        }

    }

    let message = "Enter Correct User details";
    toast(message);

}

function session(){
    let user = localStorage.getItem('user');
    if(user){
    location.href = '/source/home.html';
    }
    else{
        $('body').removeClass('d-none');
    }
}



$(document).ready(

    function () {

        session();

        $('#showpassword').click(passwordhide);

        validation();

        getUser();

        $('#loginform').submit(login);

        let message = localStorage.getItem('notification');
        if(!message){
            return;
        }
        else{
        toast(message);
        localStorage.removeItem('notification');
        }
        
    }

);