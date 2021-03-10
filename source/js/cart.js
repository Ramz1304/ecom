//Cart Loader
function cart(){
    let cartProduct = JSON.parse(localStorage.getItem('product'));
    let $tbody = $('#cartTable').find('tbody');
    $tbody.empty();
    for(let i in cartProduct) {
        let f = cartProduct[i];
        let id = f.styleId;
            let buttonhtml= $('<button/>',{text : 'Delete', id : id, type :'button', class: 'btn btn-secondary', onClick : 'deleteProduct(id)' }).append([
                $('<i/>',{class : "fa fa-trash ml-1"})]);
        let row = $('<tr/>').append([
            $('<td/>').append([
                $('<a/>',{href : '/source/product.html?id='+id}).append([
                $('<img/>',{ class : 'cartimg' ,src : f.product ,width : '100px',height :'100px' , alt  : 'Image not Available'})
                ]),
            ]),
            $('<td/>').text(f.name),
            $('<td/>').text(f.size),
            $('<td/>',{id : "price"+id}).text(f.mrp),
            
            $('<td/>',{ class : "d-flex justify-content-center border-bottom-0"}).append([
                $('<button/>',{ id : id,  type :'button', class: 'btn', onClick : 'decrease(id)' }).append([
                    $('<i/>',{class : "fa fa-minus text-danger"})
                ]),
                $('<input/>',{ id : id  ,type : 'number', min : '1', width : '50px',height:'30px' ,class: 'qty'+id, onChange : 'update(id)',onkeydown : 'return false'}).val(f.Quantity),
                $('<button/>',{ id : id , type :'button', class: 'btn', onClick : 'increase(id)' }).append([
                    $('<i/>',{class : "fa fa-plus text-success"})
                ]),
            ]),
            $('<td/>').text(f.price),
            $('<td/>').html(buttonhtml)
        ]);
        $tbody.append(row);
        }
        grandtotal();
    }

//Total calculator    
function grandtotal(){
    let cartProduct = JSON.parse(localStorage.getItem('product'));
    let $total = $('#cartTable').find('#grandtotal');
    let total = 0;
    $total.empty();
    for(let i in cartProduct) {
        let f = cartProduct[i];
        let value = Number(f.price);
        total += value;
        
        } 
        $total.append(total);
}
    
//Product delete
function deleteProduct(styleId){
    let product = JSON.parse(localStorage.getItem('product'));
    localStorage.removeItem('product');
    for(let i in product){
            if(styleId == product[i].styleId){
                product.splice(i,1);
                
                localStorage.setItem('product', JSON.stringify(product));
            }
            
            let message = "Items Removed";
            toast(message);
            cart();
            
    }

}
//Quantity methods for cart
function increase(id){
    let value = $(".qty"+id).val();
    $(".qty"+id).val(++value); 
    update(id);
}

function decrease(id){
    let value = $(".qty"+id).val();
        if(value == 1){
            deleteProduct(id);
        }
        else{
            $(".qty"+id).val(--value); 
            update(id);
        }
}

//Change maker
function update(id){
    let cartProduct = JSON.parse(localStorage.getItem('product'));
    let temp = cartProduct.find(e => e.styleId === id)
    if (temp != undefined) {
        temp.Quantity = $(".qty"+id).val();
        temp.price = temp.Quantity * temp.mrp;
    }
    else{
        return;
    }
    localStorage.setItem('product', JSON.stringify(cartProduct));
    cart();
}

//Clear cart
function cancelcart(){
    localStorage.removeItem('product');
    cart();
    let message = "Cart Cleared"
    toast(message);
}

//Download order csv
function order(){
    let order = JSON.parse(localStorage.getItem('product'));
    if(!order?.length){
        let message = 'Please add something to Cart';
        toast(message);
    }
    else{
        let product = [];
        for(let i in order){
            let arr = {
                'Product-Id' : order[i].styleId,
                Name : order[i].name,
                Color : order[i].color,
                Size : order[i].size,
                Quantity : order[i].Quantity,
                Price : order[i].price
            }
            product.push(arr); 
        } 
        var config = {
            quoteChar: '',
            escapeChar: '',
            delimiter: ","
        };
        let data = Papa.unparse(product, config);
        let blob = new Blob([data], {type: 'text/csv;'});
        let url = window.URL.createObjectURL(blob);
        let a = $('<a/>',{class:'d-none'}).attr({href : url,download : 'order.csv'});
        a.appendTo($('body'));
        a[0].click();
        a.remove();
        localStorage.removeItem('product');
        cart();  
        $('#popup').modal('toggle');
    }
}


$(document).ready(

    function(){

        cart();

        $('#cancel').click(cancelcart);

        $('#order').click(order);
        
        logdata();

    }
);
//varaible hositing
//