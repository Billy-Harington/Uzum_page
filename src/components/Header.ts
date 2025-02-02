export function Header(item:string) {
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
 


    logoLink.href = "#";
    logoImg.src = "/logo.png";
    logoImg.alt = "Логотип";
    catalogBtn.classList.add("header_btn");
    
    catalogBtn.id = "catalog"

    catalogBtn.textContent = "Каталог";
    inputBox.classList.add("input_box");
    searchInput.type = "search";
    searchInput.placeholder = "Искать товар";
    searchIcon.classList.add("search");
    searchIcon.src = "/search_icon.png";
    searchIcon.alt = "Поиск";
    menu.classList.add("menu");
    userData.classList.add("user_data");
    userLink.href = "#";
    userImg.src = "/user_icon.png";
    userImg.alt = "Пользователь";
    userName.textContent = item
    savedLink.href = "/src/pages/saved_page/";
    savedLink.textContent = "Избранное";
    deletedBox.classList.add("deleted");
    deletedLink.href = "/src/pages/deleted_page/";
    deletedLink.textContent = "Корзина";
    deletedCount.classList.add("deleted_count");
    deletedCount.textContent = "0";


   
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
    
    return header;
}

