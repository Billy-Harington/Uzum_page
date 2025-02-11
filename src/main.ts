import { Header } from "./components/Header";
import { Product } from "./components/Product";
import { ApiClient } from "./utils/apiHandler";
import { reload } from "./utils/reload";
import { Product_data } from "./utils/types";

export const localed = JSON.parse(localStorage.getItem('user')as any) 
document.body.prepend(Header(localed.name));

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const goods = await apiCall.read('/goods') as Array<Product_data>;

const places = {
  popular: document.querySelector('.popular_products_container'),
  furniture: document.querySelector('.furniture_products_container'),
  pc: document.querySelector('.pc_products_container'),
  tv: document.querySelector('.tv_products_container'),
  kitchen: document.querySelector('.kitchen_products_container'),
} as Record<string, HTMLElement>;

const showMoreBtn = document.querySelector('#show_more') as HTMLButtonElement ;
let popularLimit = 20; 


const getProductsByType = (type: string, limit: number) =>
  goods.filter(item => item.type === type).slice(0, limit);


const renderProducts = () => {
  const productConfig = [
    { type: "popular", limit: popularLimit, place: places.popular },
    { type: "мебель", limit: 5, place: places.furniture },
    { type: "ПК", limit: 5, place: places.pc },
    { type: "ТВ", limit: 5, place: places.tv },
    { type: "кухня", limit: 5, place: places.kitchen }
  ];

  productConfig.forEach(({ type, limit, place }) => {
    if (place) {
      reload<Product_data>({
        arr: type === "popular" ? goods.slice(0, limit) : getProductsByType(type, limit),
        commponent: Product,
        place
      });
    }
  });
};


renderProducts();




showMoreBtn.onclick = () => {
  popularLimit += 20;
  renderProducts(); 
};
