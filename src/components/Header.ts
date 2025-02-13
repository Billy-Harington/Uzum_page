import { user } from "../components/Product";
import { ApiClient } from "../utils/apiHandler";
import { User_data } from "../utils/types";


const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);

// Предварительный запрос для получения актуальных данных пользователя
const updatedUser = await apiCall.read<User_data>(`/users/${user?.id}`);

export function Header(item: string) {
    const header = document.createElement("header");
    
    // Создаем элементы header
    const logoLink = document.createElement("a");
    const logoImg = document.createElement("img");
    const catalogBtn = document.createElement("button");
    const inputBox = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchIcon = document.createElement("img");
    const nav = document.createElement("nav");
    const menu = document.createElement("div");
    const userData = document.createElement("div");
    const userLink = document.createElement("a");
    const userImg = document.createElement("img");
    const userName = document.createElement("a");
    const savedLink = document.createElement("a");
    const deletedBox = document.createElement("div");
    const deletedLink = document.createElement("a");
    const deletedCount = document.createElement("p");

    // Настройка атрибутов и классов
    logoLink.href = "/";
    logoImg.src = "/logo.png";
    logoImg.alt = "Логотип";
    
    catalogBtn.classList.add("header_btn");
    catalogBtn.id = "catalog";
    catalogBtn.textContent = "Каталог";

    inputBox.classList.add("input_box");
    searchInput.type = "text";
    searchInput.placeholder = "Искать товар";
    searchIcon.classList.add("search");
    searchIcon.src = "/search_icon.png";
    searchIcon.alt = "Поиск";

    menu.classList.add("menu");
    userData.classList.add("user_data");
    userLink.href = "#";
    userImg.src = "/user_icon.png";
    userImg.alt = "Пользователь";
    userName.textContent = item;

    savedLink.textContent = "Избранное";
    savedLink.onclick = () => {
        location.assign('/src/pages/saved_page/');
    };

    deletedBox.classList.add("deleted");
    deletedLink.textContent = "Корзина";
    deletedLink.onclick = () => {
        location.assign('/src/pages/cart_page/');
    };
    deletedCount.classList.add("deleted_count");
    
    // Первоначальное значение количества товаров в корзине
    deletedCount.textContent = updatedUser?.cart.length.toString();

    // Добавляем слушатель глобального события для обновления количества товаров в корзине
    window.addEventListener("cartUpdated", async () => {
        const newUser = await apiCall.read<User_data>(`/users/${user?.id}`);
        deletedCount.textContent = newUser?.cart.length.toString();
    });

    // Сборка структуры header
    logoLink.appendChild(logoImg);
    inputBox.appendChild(searchInput);
    inputBox.appendChild(searchIcon);
    userLink.appendChild(userImg);
    userData.appendChild(userLink);
    userData.appendChild(userName);
    deletedBox.appendChild(deletedLink);
    deletedBox.appendChild(deletedCount);
    menu.appendChild(userData);
    menu.appendChild(savedLink);
    menu.appendChild(deletedBox);
    nav.appendChild(menu);
    header.appendChild(logoLink);
    header.appendChild(catalogBtn);
    header.appendChild(inputBox);
    header.appendChild(nav);

    // Пример диалога для каталога (опционально)
    catalogBtn.onclick = () => {
        const dialog = document.createElement("dialog");
        dialog.classList.add("catalog");

        const exit = document.createElement('h1');
        exit.textContent = "X";
        exit.classList.add("exit");
        exit.onclick = () => {
            dialog.close();
            dialog.remove();
        };

        const title = document.createElement("p");
        title.textContent = "Категории товаров";

        const container = document.createElement("div");
        container.classList.add("container");

        const categories = ["Бытовая техника", "Одежда", "Электроника", "Книги"];
        categories.forEach(categoryName => {
            const category = document.createElement("div");
            category.classList.add("category");

            const h1 = document.createElement("h1");
            h1.textContent = categoryName;

            const h2 = document.createElement("h2");
            h2.textContent = "33 товара";

            category.appendChild(h1);
            category.appendChild(h2);
            container.appendChild(category);
        });

        dialog.append(title, exit, container);
        document.body.appendChild(dialog);
        dialog.showModal();

        const rect = catalogBtn.getBoundingClientRect();
        dialog.style.top = `${rect.bottom + window.scrollY}px`;
        dialog.style.left = `${rect.left + window.scrollX}px`;
    };

    // Обработчик клика для выхода (авторизации)
    userLink.onclick = () => {
        localStorage.clear();
        location.assign("/src/pages/signin/");
    };

    return header;
}
