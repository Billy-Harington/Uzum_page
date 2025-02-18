import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data, User_data } from "../../utils/types";

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);

// Извлекаем параметр "type" из URL
const params = new URLSearchParams(window.location.search);
const typeParam = params.get('type');

let user: User_data | undefined;

const h1 = document.querySelector('h1') as HTMLElement
if (typeParam) {
  h1.innerText = typeParam.charAt(0).toUpperCase()+ typeParam.slice(1)
}
// Функция для загрузки данных пользователя
async function loadUser(): Promise<void> {
  try {
    const localed = JSON.parse(localStorage.getItem("user") || "{}");
    // Добавляем Header с именем пользователя
    document.body.prepend(Header(localed.name));
    const users = await apiCall.read<User_data[]>("/users");
    user = users.find(u => u.id === localed.id);
  } catch (error) {
    console.error("Ошибка загрузки данных пользователя:", error);
  }
}

// Функция для загрузки товаров и их фильтрации по type
async function loadGoods(): Promise<void> {
  try {
    const goods = await apiCall.read("/goods/") as Array<Product_data>;
    let filteredGoods = goods;
    if (typeParam) {
      // Фильтруем товары по типу (без учета регистра)
      filteredGoods = goods.filter(product => 
        product.type.toLowerCase() === typeParam.toLowerCase()
      );
    }
    // Отрисовываем товары через reload
    reload<Product_data>({
      arr: filteredGoods,
      commponent: Product,
      place: document.querySelector(".furniture_products_container") as HTMLElement,
    });
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
  }
}

// Инициализация страницы: сначала загружаем пользователя, затем товары
async function initPage() {
  await loadUser();
  await loadGoods();
}

initPage();
