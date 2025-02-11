import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data, User_data } from "../../utils/types";

const localed = JSON.parse(localStorage.getItem('user') as string);
document.body.prepend(Header(localed.name));

const savedPlace = document.querySelector('.furniture_products_container') as HTMLElement;
const section = document.querySelector('.popular') as HTMLElement;

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const goods = await apiCall.read('/users') as Array<User_data>;


export const user = goods.find(u => u.id === localed.id);


export function renderFavorites(): void {
  if (!user || !user.cart || user.cart.length === 0) {
    section.innerHTML = "";
    const img = document.createElement('img');
    img.classList.add('empty_page');
    img.src = "/empty_cart.png";
    section.append(img);
  } else {
    // favorites в user имеет тип Product_data[]
    reload<Product_data>({
      arr: user.cart,
      commponent: Product,
      place: savedPlace
    });
  }
}

 renderFavorites();
 
