import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { createProductPage } from "../../components/Product_page";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data } from "../../utils/types";

async function Page_load () {
    const localed = JSON.parse(localStorage.getItem("user") || "{}");
    document.body.prepend(Header(localed.name));

    const pageId = location.search.split("=").slice(-1)[0];

    const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
    const goods = await apiCall.read("goods") as Product_data[];

    const page_place = document.querySelector(".important") as HTMLElement;
    const popular_place = document.querySelector(".popular_products_container") as HTMLElement;

    const foundProduct = goods.find(item => String(item.id) === pageId);
    
    
    if (foundProduct) {
       
        createProductPage(foundProduct, page_place);
    }

    reload<Product_data>({
        arr: goods.slice(0, 5),
        commponent: Product,
        place: popular_place,
    });
}
Page_load();
