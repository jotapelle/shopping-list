let items = [];
const templateCollection = "<li class='collection-item'><div>{item} <span class='font-size-10'>x</span> {quantity}<span class='new badge reset-float' data-badge-caption='{price} €'>Price</span><a id='{id}' onclick='deleteItem(this)' class='secondary-content cursor-pointer'><i class='material-icons'>delete</i></a></div></li>";

const guidGenerator = () => {
    var S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const removeAll = () => {
    items = [];
    printCollection();
}

const validateItem = () => {
    const item = $('#item').val();
    const quantity = $('#quantity').val();
    const price = $('#price').val();
    if (validateString(item) && validateNumber(quantity) && validateNumber(price)) {
        addItem(item, quantity, price);
    }
    else {
        M.toast({html: 'Please enter a valid values!'})
    }
}

const validateString = (text) => typeof text == "string" && text != "";
const validateNumber = (number) => $.isNumeric(number) && number > 0;

const addItem = (item, quantity, price) => {
    const element = {
        "id": guidGenerator(),
        "item": item,
        "quantity": quantity,
        "price": price
    };
    items.push(element);
    resetItem();
    printCollection();
}

const resetItem = () => {
    $('#item').val('');
    $('#quantity').val('');
    $('#price').val('');
    $('#item').removeClass('valid');
    $('#quantity').removeClass('valid');
    $('#price').removeClass('valid');
    $("[for='item']").removeClass('active');
    $("[for='quantity']").removeClass('active');
    $("[for='price']").removeClass('active');
}

const printCollection = () => {
    $("#collection-container").html('');
    if (items.length == 0) {
        $( "#collection-container" ).append("<li class='collection-item'><div>No items found.</div></li>");
    }
    else {
        $.each(items, function(index, value) {
            var replacedCollection = templateCollection.replace("{price}", value.price)
                                                       .replace("{quantity}", value.quantity)
                                                       .replace("{item}", value.item)
                                                       .replace("{id}", value.id);
            $( "#collection-container" ).append(replacedCollection);
        });
    }
}

const deleteItem = (event) => {
    const id = event.id;
    items = items.filter(function(element) {
        return element.id !== id;
    });
    printCollection();
}