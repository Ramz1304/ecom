var product_data ='';
var proincart;

    function refresh() {
        let elements = $("input");
        for (var ii = 0; ii < elements.length; ii++) {
            if (elements[ii].type === "text","password","email") {
                elements[ii].value = "";
            }
    }
}


    function passwordhide() {
        if(this.checked){
            $("#password").prop('type',"text");
        } else {
            $("#password").prop('type',"password");
        }
    }

    function Add(id){
        for(let i in product_data){ 
            if( id == product_data[i].styleId) { 
                let totalprice = $('#qty'+id).val() * product_data[i].mrp;
            let obj ={
                    "styleId": product_data[i].styleId,
                    "product": product_data[i].imageUrl,
                    "name": product_data[i].name,
                    "size": product_data[i].size,
                    "mrp" : product_data[i].mrp,
                    "Quantity": $('#qty'+id).val(),
                    "price": totalprice  
            }
            if(obj.Quantity <= 0){
                let message = "Invalid quantity";
                toast(message); 
                return;
            }
            else{
            try {
            proincart =JSON.parse(localStorage.getItem('product')); 
            let temp = proincart.find(e => e.styleId === obj.styleId)
            if (temp != undefined) { 
                let oldQuantity = parseInt(temp.Quantity);
                let newQuantity = parseInt(obj.Quantity);
            temp.Quantity = newQuantity + oldQuantity;
            temp.price = temp.Quantity * temp.mrp;
            } else {
                proincart.push(obj);
            }
            
            } catch (error) {
            proincart = [];
                localStorage.setItem('product', JSON.stringify(proincart));
                proincart.push(obj);
            }
            localStorage.setItem('product', JSON.stringify(proincart));
            let message = "Item Added To Cart";
            toast(message);
            return;
        }
    }
    }
}


function View(id){
    for(let i in product_data){ 
        location.href = '/source/product.html';
        if( id == product_data[i].styleId) {
        let obj = product_data[i];
        localStorage.setItem('productdata', JSON.stringify(obj));
        
    }

    }
    
}

function getProduct(){
    $.ajax({
        type: "Get",
        url: "/assets/product.json",
        dataType: "json",
        success: function(data) {
            product_data = data;
        },
        error: function(){
            let message="product not found"
            toast(message);
        }
    });
    
}



    //toast
    function toast(message){
        $('#message').html(message);
        $('.toast').toast('show');
    }



    //validation method

    function validation(){
            
            let forms = $('.form');
            
            let validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('click', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                },);
            
            });
            }

    //Date and time
    function DateTime(){
        let today = new Date();
        $('#time').html(today);
    }

    function logdata(){
        let user = JSON.parse(localStorage.getItem('user'));
        let name = user.name;
        $('#logname').html('Welcome ' + name + '...!');
    }

    function removelogdata(){
        let message = "You Have Logged out";
        toast(message);
        localStorage.clear();
    }

    function usersecurity(){
        if (window.location.pathname == '/index.html') {
            return;
        }
        else{
        let user = localStorage.getItem('user');
        if(!user){
            let message = "Please Log in";
            toast(message);
            location.href = '/index.html';
        }
    }
    } 
    //call in doc ready and skip check for window login url

    function plus(id){
         value = $("#qty"+id).val();
          value++;
          $("#qty"+id).val(value); 
    }

    function minus(id){
        value = $("#qty"+id).val();
        if(value == 1){
            return;
        }
        else{
            value--;
          $("#qty"+id).val(value); 
        }
    }

    $(document).ready(

        function (){

            usersecurity();

            getProduct();

            DateTime();
        
            $('#logout').click(removelogdata);
        }
    )
    

