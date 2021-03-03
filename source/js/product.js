
$(document).ready(

function (){

    let obj = JSON.parse(localStorage.getItem('productdata'));
    let $probody = $('#productbox').find('#productdata');
    let id = obj.styleId;
    $probody.empty(); 
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
            $('<p/>',{ class : "d-flex"}).text("Quantity : ").append([
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

            logdata();
}

)