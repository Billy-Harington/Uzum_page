import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data, User_data } from "../../utils/types";

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);

let user: User_data | undefined;

async function loadUser() {
    try {
        const localed = JSON.parse(localStorage.getItem("user") || "{}");
        document.body.prepend(Header(localed.name));

        const goods = await apiCall.read("/users") as User_data[];
        user = goods.find(u => u.id === localed.id);

        renderFavorites();
    } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
    }
}

const savedPlace = document.querySelector(".furniture_products_container") as HTMLElement;
const section = document.querySelector(".popular") as HTMLElement;

export function renderFavorites(): void {
    if (!user || !user.favorites || user.favorites.length === 0) {
        section.innerHTML = "";
        const img = document.createElement("img");
        img.classList.add("empty_page");
        img.src = "/if_emptyPic.png";
        section.append(img);
    } else {
        reload<Product_data>({
            arr: user.favorites,
            commponent: Product,
            place: savedPlace
        });
    }
}

// Загружаем пользователя перед рендером
loadUser();
