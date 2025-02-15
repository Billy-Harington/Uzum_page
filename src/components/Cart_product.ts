import { updateCart, updateCartOther } from "../utils/add_cart";
import { ApiClient } from "../utils/apiHandler";
import { calculateDiscountPrice } from "../utils/percentage_calc";
import { Product_data } from "../utils/types";


export function Cart_product(item: Product_data) {
    const cart_product = document.createElement('div');
    cart_product.classList.add('cart_product');

    cart_product.dataset.originalprice = String(item.price);
    cart_product.dataset.salepercentage = String(item.salePercentage);

    const img = document.createElement('img');
    const info = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const button = document.createElement('button');

    const counter = document.createElement("div");
    const minus = document.createElement("span");
    const amount = document.createElement("span");
    const plus = document.createElement("span");

    let count = 1;

    counter.classList.add("counter");
    minus.classList.add("minus");
    amount.classList.add("amount");
    plus.classList.add("plus");
    minus.innerText = "-";
    amount.innerText = String(count);
    plus.innerText = "+";

    // Начальная цена с учётом скидки * count
    p.innerText = `${Math.round(calculateDiscountPrice(item.price, item.salePercentage) * count)} сум`;

    minus.onclick = (e) => {
        e.stopPropagation();
        if (count > 1) {
            count--;
            amount.innerText = String(count);
            p.innerText = `${Math.round(calculateDiscountPrice(item.price, item.salePercentage) * count)} сум`;
            window.dispatchEvent(new Event("cartChanged"));
        }
    };

    plus.onclick = (e) => {
        e.stopPropagation();
        if (count < 99) {
            count++;
            amount.innerText = String(count);
            p.innerText = `${Math.round(calculateDiscountPrice(item.price, item.salePercentage) * count)} сум`;
            window.dispatchEvent(new Event("cartChanged"));
        }
    };

    info.classList.add('info');
    button.classList.add('delete_btn');
    h1.innerText = item.title;
    img.src = item.media[0];
    button.innerText = `Удалить`;

    // Обработчик удаления из корзины
    button.onclick = async (e) => {
        e.stopPropagation();
       
        await updateCartOther(item, false);
        
        cart_product.remove();
        
        window.dispatchEvent(new Event("cartChanged"));
    };

    cart_product.onclick = () => {
        location.assign(`/src/pages/product_page/?id=${item.id}`);
    };

    cart_product.append(img, info);
    info.append(h1, p, counter, button);
    counter.append(minus, amount, plus);

    return cart_product;
}
