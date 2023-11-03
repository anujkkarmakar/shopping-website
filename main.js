let shop = document.getElementById("shop");
console.log(shop);

let shopItems = [{
    id: "first",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "/images/image (1).jpg"
}, {
    id: "second",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "/images/image (2).jpg"
}, {
    id: "third",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "/images/image (3).jpg"
}, {
    id: "fourth",
    name: "Suit",
    price: 50,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "/images/image (4).jpg"
}];

let basket = JSON.parse(localStorage.getItem("shopItem")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItems.map((x) => {
        let {id} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${x.id} class="item">
        <img width="220" height="275" src="${x.img}" alt="">
        <div class="details">
            <h3>${x.name}</h3>
            <p>${x.desc}</p>
            <div class="price-quantity">
                <h3>$ ${x.price}</h3>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                        <div id="${x.id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>                 
                    </div>
                </div>
            </div>
        </div>
    `
    }).join("")
    );
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("shopItem", JSON.stringify(basket));
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        return;
    } else {
        search.item -= 1;
        update(selectedItem.id);
        if(search.item === 0)
            basket.pop(id = search.id);
    }
    localStorage.setItem("shopItem", JSON.stringify(basket));

};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0);
};

calculation();