//product method
function getProduct(){
    $.ajax({
        type: "Get",
        url: "/assets/product.json",
        dataType: "json",
        success: function(data) {
            setProduct(data);
            product_data = data;
            let message="products loaded"
            toast(message);
        },
        error: function(){
            let message="product not found"
            toast(message);
        }
    });
    
}



function setProduct(data){
    let $probody = $("#productbox").find('#productbody');
    $probody.empty();
    for (let i in data){
        let e = data[i];
        let id = e.styleId;
        let cell =  $('<div/>',{ class : "col-lg-3 col-md-4 col-sm-6 mb-4"}).append([
            $('<div/>',{ class : "card mb-4 shadow-sm"}).append([
            $('<img/>',{ class : "card-img-top shadow-sm", id : id, src : e.imageUrl, onClick : 'View(id)' , alt  : 'Image not Available'}),
            $('<div/>',{ class : "card-body text-center"}).append([
                $('<h5/>',{ class : "mb-3"}).text(e.name),
                $('<p/>').text("Price : "+e.mrp),
                $('<p/>').text("Size : "+e.size),
                $('<p/>',{ class : "d-flex justify-content-center"}).text("Quantity : ").append([
                    $('<button/>',{ id : id , type :'button', class: 'btn', onClick : 'minus(id)' }).append([
                        $('<i/>',{class : "fa fa-minus text-danger"})
                    ]),
                    $('<input/>',{ id :"qty"+id, width : '20%',height:'30px' , type : 'number', class: 'qty' ,value : '1', min :'1'}),
                    $('<button/>',{ id : id, type :'button', class: 'btn', onClick : 'plus(id)' }).append([
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
    }
    
}


$(document).ready(

    function (){

        localStorage.removeItem('productdata');
    
        getProduct();

        logdata();
    
    }
)