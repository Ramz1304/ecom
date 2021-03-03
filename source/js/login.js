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




    function login() {
        
        let email = $("#email").val();
        let password = $("#password").val();
        let logname;
        for(i=0;i< user_data.length;i++){
            if(email == user_data[i].email && password == user_data[i].password){
                logname = user_data[i].name
                let obj = {
                    "name": logname,
                    "email": email,
                    "password": password
                };
                localStorage.setItem('user', JSON.stringify(obj));
                location.href = '/source/home.html';
                return;  
            }
            let message = "Enter Correct User details";
            toast(message);
        }
        
    }

// form submit
// toast verify during security check



    $(document).ready(

        function () {
    
            $('#showpassword').click(passwordhide);
            
            validation();
        
            getUser();
        
            refresh();
        
            $('#login').click(login);
            
        }

    );