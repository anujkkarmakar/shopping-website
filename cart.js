let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("shopItem")) || [];

let generateBill = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItems.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y, 0);
        console.log(amount);
    }
    else return;
};

generateBill();

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    generateBill();
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItems.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
                
                <img width="150" height="175" src="${search.img}" alt="T-Shirt ${search.name}" />

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="remove(${x.id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                        <div id="${x.id}" class="quantity">${item}</div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>                 
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>

            </div>
            `
        }).join("")
        );
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="back-button">Back to home</button>
        </a>
        `;
    }
};

generateCartItems();

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
    generateCartItems();
};

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        return;
    } else if(search.item === 0) {
        return;
    }  else {
        search.item -= 1;
        update(selectedItem.id);
        basket = basket.filter((x) => x.item !== 0);
    }
    generateCartItems();
    localStorage.setItem("shopItem", JSON.stringify(basket));

};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let remove = (id) => {
    let selectedItem = id;
    
    let search = basket.find((x) => x.id === selectedItem.id);
    search.item = 0;
    update(selectedItem.id);
    
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    localStorage.setItem("shopItem", JSON.stringify(basket));
};
