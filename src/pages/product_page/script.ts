import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { createProductPage } from "../../components/Product_page";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data } from "../../utils/types";

const localed = JSON.parse(localStorage.getItem('user') as string);
document.body.prepend(Header(localed.name));

const pageId = location.search.split('=').slice(-1)[0]; 



const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const goods = await apiCall.read('goods') as Array<Product_data>;
const page_place = document.querySelector('.important') as HTMLElement;
const popular_place = document.querySelector('.popular_products_container') as HTMLElement;

goods.find((item) => {
    if (item.id == +pageId) { // Сравнение чисел
        console.log(item);
        
        createProductPage(item, page_place);
        return true;
    }
    return false; // Для остальных элементов
});

reload<Product_data>({
    arr: goods.slice(0,5),
    commponent: Product,
    place: popular_place,
});
