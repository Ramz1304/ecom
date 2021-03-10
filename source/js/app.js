var product_data ;
var proincart;

//Password hide
function passwordhide() {
    if(this.checked){
        $("#password").prop('type',"text");
    } else {
        $("#password").prop('type',"password");
    }
}

//Get Product Data
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

//Add product
function Add(id){
    for(let i in product_data){ 
            if( id == Number(product_data[i].styleId)) { 
                let totalprice = $('#qty'+id).val() * product_data[i].mrp;
                let obj ={
                        "styleId": product_data[i].styleId,
                        "product": product_data[i].imageUrl,
                        "name": product_data[i].name,
                        "size": product_data[i].size,
                        "color": product_data[i].color,
                        "mrp" : product_data[i].mrp,
                        "Quantity": $('#qty'+id).val(),
                        "price": totalprice  
                }
                if(obj.Quantity <= 0){
                    let message = "Invalid quantity";
                    toast(message); 
                    return;
                }
                    try {
                        proincart =JSON.parse(localStorage.getItem('product')); 
                        let temp = proincart.find(e => e.styleId === obj.styleId)
                        if (temp != undefined) { 
                            let oldQuantity = Number(temp.Quantity);
                            let newQuantity = Number(obj.Quantity);
                            temp.Quantity = newQuantity + oldQuantity;
                            temp.price = temp.Quantity * temp.mrp;
                        } else {
                            proincart.push(obj);
                        }
                    }
                    catch (error) {
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
    $('#time').html(new Date());
}

//Log methods
function logdata(){
    if (window.location.pathname == '/index.html') {
        return;
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let name = user.name;
    $('#logname').html('Welcome ' + name + '...!');
}

function removelogdata(){
    localStorage.clear();
    let notification = "You Have logged out";
    localStorage.setItem('notification',(notification));
}

//Security
function usersecurity(){
    let user = localStorage.getItem('user');
    if (window.location.pathname == '/index.html') {
        return;
        }
    
    if(!user){
        let notification = "Please log in";
        localStorage.setItem('notification',(notification));
        location.href = '/index.html';
    }
    else{
        $('body').removeClass('d-none');
    }

} 

//Quantity methods for product
function plus(id){
    let value = $("#qty"+id).val();
    $("#qty"+id).val(++value);
}

function minus(id){
    let value = $("#qty"+id).val();
    if(value == 1){
        return;
    }
    else{
        $("#qty"+id).val(--value);
    }
}

//HELPER METHOD
function toJson($form) {
    let serialized = $form.serializeArray();  
    let s = '';
    let data = {};
    for (s in serialized) {
        data[serialized[s]['name']] = serialized[s]['value']
    }
    let json = JSON.stringify(data);
    return json;
}

$(document).ready(

    function (){

        usersecurity();

        getProduct();

        logdata();

        DateTime();

        $('#logout').click(removelogdata);
    }
)


