//Product page loader
function Product(data){
    let baseUrl = (window.location).href; 
    let pageid = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

    let $probody = $('#productbox').find('#productdata');
    $probody.empty(); 
    for(let i in data){ 
        if( pageid == Number(data[i].styleId)) { 
    let obj = data[i];
    let id = parseInt(obj.styleId);
    let cell =$('<div/>',{ class : 'row no-gutters'}).append([ 
        $('<div/>',{ class : "col-md-5"}).append([
        $('<img/>',{ class : "card-img shadow-sm", src : obj.imageUrl , alt  : 'Image not Available'})
        ]),
        $('<div/>',{ class : "col-md-7"}).append([
        $('<div/>',{ class : "card-body text-justify"}).append([
            $('<h4/>',{ class : "card-title"}).text(obj.brandId),
            $('<p/>').text("Name : "+obj.name),
            $('<p/>').text("Categary : "+obj.category),
            $('<p/>').text("Size : "+obj.size),
            $('<p/>').text("Color : "+obj.color),
            $('<p/>').text("Price : "+obj.mrp),
            $('<p/>',{ class : "d-flex align-items-center"}).text("Quantity : ").append([
                $('<button/>',{ id : id, type :'button', class: 'btn', onClick : 'minus(id)'}).append([
                    $('<i/>',{class : "fa fa-minus text-danger"})
                ]),
                $('<input/>',{ id :"qty"+id, width : '15%',height:'30px' , type : 'number', class: 'qty' ,value : '1', min :'1'}),
                $('<button/>',{ id : id , type :'button', class: 'btn', onClick : 'plus(id)' }).append([
                    $('<i/>',{class : "fa fa-plus text-success"})
                ]),
            ]),
            $('<p/>').append([
                $('<button/>',{ text : "Add to cart ", id : id , type :'button', class: 'btn btn-warning', onClick : 'Add(id)' }).append([
                    $('<i/>',{class : "fa fa-cart-plus"})
                ])
            ]),
    ]),
        ]),
    
    ]);
    $probody.append(cell);
    return false;
} 
}

}
//ajax execution
function LoadProduct(){
    $.ajax({
        type: "Get",
        url: "/assets/product.json",
        dataType: "json",
        success: function(data) {
            Product(data);
        },
        error: function(){
            let message="product not found"
            toast(message);
        }
    });
    
}


$(document).ready(

    function (){

        LoadProduct();
    
    }

)