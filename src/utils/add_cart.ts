import { ApiClient } from "../utils/apiHandler";
import { Product_data } from "../utils/types";
import { user } from "../components/Product"; // если пользователь уже экспортируется оттуда

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);

export function setCartStyle(purchaseIcon:HTMLElement,item:Product_data) {
    if (user && user.cart && user.cart.some(fav => fav.id === item.id)) {
      purchaseIcon.style.background = "#7000FF"
    } else {
        
          purchaseIcon.style.background = "transparent"
    }
}

export async function updateCart(productData: Product_data, add: boolean,purchaseIcon:HTMLElement) {
    if (user) {
        let cart: Product_data[] = user.cart || [];
        if (add) {

            // Если товара еще нет в корзине, добавляем его
            if (!cart.some(item => item.id === productData.id)) {
                cart.push(productData);
            }
        } else {
            console.log("works");
            
            // Удаляем товар из корзины с приведением id к строке для корректного сравнения
            cart = cart.filter(item => item.id.toString() !== productData.id.toString());
        }
        try {
            const updatedUser = await apiCall.update(`/users/${user.id}`, { cart });
            user.cart = updatedUser.cart;
            setCartStyle(purchaseIcon,productData)
            window.dispatchEvent(new CustomEvent("cartUpdated"));
        } catch (error) {
            console.error("Ошибка обновления корзины:", error);
        }
    }
}
export async function updateCartOther(productData: Product_data, add: boolean) {
    if (user) {
        let cart: Product_data[] = user.cart || [];
        if (add) {

            // Если товара еще нет в корзине, добавляем его
            if (!cart.some(item => item.id === productData.id)) {
                cart.push(productData);
            }
        } else {
            console.log("works");
            
            // Удаляем товар из корзины с приведением id к строке для корректного сравнения
            cart = cart.filter(item => item.id.toString() !== productData.id.toString());
        }
        try {
            const updatedUser = await apiCall.update(`/users/${user.id}`, { cart });
            user.cart = updatedUser.cart;
            
            window.dispatchEvent(new CustomEvent("cartUpdated"));
        } catch (error) {
            console.error("Ошибка обновления корзины:", error);
        }
    }
}
