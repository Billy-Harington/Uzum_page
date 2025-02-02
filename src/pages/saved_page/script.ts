import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data } from "../../utils/types";


document.body.prepend(Header("Billy Harington"));

const saved_place = document.querySelector('.furniture_products_container') as HTMLElement
const section = document.querySelector('.popular') as HTMLElement

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const goods = await apiCall.read('/saved') as Array<T>;




if (saved_place.innerHTML === "") {
    section.innerHTML = ""
    const img = document.createElement('img')

    img.classList.add('empty_page')

    img.src = "/if_emptyPic.png"
}else{
    reload<Product_data<T>>({
        arr: goods.slice(0,20),
        commponent: Product,
        place: saved_place,
    });
}
