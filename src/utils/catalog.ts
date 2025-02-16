// Функция для выбора правильного окончания слова "товар"
function getProductWord(count: number): string {
    
    if (count % 100 >= 11 && count % 100 <= 19) {
      return "товаров";
    }
    switch (count % 10) {
      case 1:
        return "товар";
      case 2:
      case 3:
      case 4:
        return "товара";
      default:
        return "товаров";
    }
  }
  
  export function catalog(data: Record<string, number>): void {
    const dialog = document.createElement("dialog");
    dialog.classList.add("catalog");
  
    const exit = document.createElement("h1");
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
  
    // Правильная деструктуризация: [category, count]
    Object.entries(data).forEach(([category, count]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
  
      const h1 = document.createElement("h1");
      const h2 = document.createElement("h2");
  
      // h1 показывает название категории с заглавной буквы
      h1.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  
      // h2 показывает количество товаров с правильным окончанием
      h2.textContent = `${count} ${getProductWord(count)}`;
  
      categoryDiv.appendChild(h1);
      categoryDiv.appendChild(h2);
      container.appendChild(categoryDiv);
    });
  
    dialog.append(title, exit, container);
    document.body.appendChild(dialog);
    dialog.showModal();
  }
  