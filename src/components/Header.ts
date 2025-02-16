import { user } from "../components/Product";
import { ApiClient } from "../utils/apiHandler";
import { catalog } from "../utils/catalog";
import { Product_data, User_data } from "../utils/types";


const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const goods = await apiCall.read('/goods/') as Array<Product_data>;


const uniqueTypes = new Set<string>();

goods.forEach((product) => {
  uniqueTypes.add(product.type);
});


const typesArray = Array.from(uniqueTypes);
console.log(typesArray);

const typeCounts = goods.reduce((acc: Record<string, number>, product) => {
    
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {});
  
  console.log(typeCounts);


const updatedUser = await apiCall.read<User_data>(`/users/${user?.id}`);

export function Header(item: string) {
    const header = document.createElement("header");
    
    
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
    
    
    deletedCount.textContent = updatedUser?.cart.length.toString();

  
    window.addEventListener("cartUpdated", async () => {
        const newUser = await apiCall.read<User_data>(`/users/${user?.id}`);
        deletedCount.textContent = newUser?.cart.length.toString();
    });

   
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

   
    catalogBtn.onclick = () => {
        catalog(typeCounts)
    };

   
    userLink.onclick = () => {
        localStorage.clear();
        location.assign("/src/pages/signin/");
    };


  // ============= ЛОГИКА ПОИСКА =============
 
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("search_suggestions");
  inputBox.appendChild(suggestionsContainer);

 
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

   
    if (!query) {
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
      return;
    }

   
    const results = goods.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    suggestionsContainer.innerHTML = "";

    // Если результатов нет
    if (results.length === 0) {
      const p = document.createElement("p");
      p.textContent = "Ничего не найдено";
      suggestionsContainer.appendChild(p);
    } else {
      
      results.forEach((product) => {
        const p = document.createElement("p");
        p.textContent = product.title;
       
        p.onclick = () => {
          location.assign(`/src/pages/product_page/?id=${product.id}`);
        };
        suggestionsContainer.appendChild(p);
      });
    }
 
    suggestionsContainer.style.display = "block";
  });

    return header;
}
