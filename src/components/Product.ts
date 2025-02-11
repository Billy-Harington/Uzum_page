import { setCartStyle, updateCart } from "../utils/add_cart";
import { setFavoriteIcon, updateFavorites } from "../utils/add_favorites";
import { ApiClient } from "../utils/apiHandler";
import { calculateDiscountPrice } from "../utils/percentage_calc";
import { Product_data, User_data } from "../utils/types";

// Предполагаем, что экземпляр ApiClient и текущий пользователь уже созданы
const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const localed = JSON.parse(localStorage.getItem('user') as string);
const users = await apiCall.read('/users') as Array<User_data>;
export const user = users.find(u => u.id === localed.id);

export function Product(item: Product_data): HTMLElement {
    // Создание элементов (код не изменяется)
    const product = document.createElement('div');
    const productImg = document.createElement('div');
    const saveLink = document.createElement('a');
    const saveIcon = document.createElement('img');
    const productName = document.createElement('p');
    const productFooter = document.createElement('div');
    const price = document.createElement('div');
    const originalPrice = document.createElement('p') as HTMLElement;
    const salePrice = document.createElement('p');
    const purchaseLink = document.createElement('a');
    const purchaseIcon = document.createElement('img');
    const rating_place = document.createElement('div');
    const rating_Icon = document.createElement('img');
    const rating = document.createElement('h1');

    purchaseIcon.classList.add('purch_icon');

    product.classList.add('product');
    productImg.classList.add('product_img');
    saveLink.classList.add('save');
    productName.classList.add('p_name');
    productFooter.classList.add('product_footer');
    price.classList.add('price');
    originalPrice.classList.add('original');
    salePrice.classList.add('sale');
    rating_place.classList.add('rating_place');
    saveIcon.classList.add('saveIcon')
    purchaseIcon.classList.add('purchaseIcon')


    productImg.style.background = `url(${item.media[0]}) no-repeat center / contain`;
    saveIcon.setAttribute('alt', '');
    purchaseIcon.setAttribute('src', '/purchase_icon.png');
    purchaseIcon.setAttribute('alt', '');
    rating.innerHTML = `${String(item.rating)} оценка`;
    rating_Icon.src = "/star.png";

    

    productName.innerText = item.title;
    if (item.salePercentage === 0) {
        price.innerHTML = "";
    } else {
        originalPrice.innerHTML = `${item.price.toString()} сум`;
    }

   
    const discountedPrice = calculateDiscountPrice(item.price, item.salePercentage);
    salePrice.innerHTML = ` ${discountedPrice.toFixed()} сум`;

    productImg.appendChild(saveLink);
    saveLink.appendChild(saveIcon);
    price.appendChild(originalPrice);
    price.appendChild(salePrice);
    productFooter.appendChild(price);
    productFooter.appendChild(purchaseLink);
    purchaseLink.appendChild(purchaseIcon);
    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(rating_place);
    rating_place.append(rating_Icon, rating);
    product.appendChild(productFooter);

    
 setFavoriteIcon(saveIcon,item)
    saveIcon.onclick = (event) => {
        event.stopPropagation();
        if (user && user.favorites && user.favorites.some(fav => fav.id === item.id)) {
            updateFavorites(item, false,saveIcon);
          
            
        } else {
            updateFavorites(item, true,saveIcon);
        }
    };

    setCartStyle(purchaseIcon,item)
    purchaseIcon.onclick = (event) => {
        event.stopPropagation();
        if (user && user.cart && user.cart.some(fav => fav.id === item.id)) {
            updateCart(item, false,purchaseIcon);
          
            
        } else {
            updateCart(item, true,purchaseIcon);
            
        }
    };

    product.onclick = () => {
        location.assign(`/src/pages/product_page/?id=${item.id}`);
    };

    return product;
}
