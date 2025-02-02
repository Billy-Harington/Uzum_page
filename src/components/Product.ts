import { Product_data } from "../utils/types";

export function Product(item:Product_data<T>){
    // Создание основных элементов
    const product = document.createElement('div');
    const productImg = document.createElement('div');
    const saveLink = document.createElement('a');
    const saveIcon = document.createElement('img');
    const productName = document.createElement('p');
    const productFooter = document.createElement('div');
    const price = document.createElement('div');
    const originalPrice = document.createElement('p') as HTMLElement
    const salePrice = document.createElement('p');
    const purchaseLink = document.createElement('a');
    const purchaseIcon = document.createElement('img');

    purchaseIcon.classList.add('purch_icon')

    // Придание классов
    product.classList.add('product');
    productImg.classList.add('product_img');
    saveLink.classList.add('save');
    productFooter.classList.add('product_footer');
    price.classList.add('price');
    originalPrice.classList.add('original');
    salePrice.classList.add('sale');

    // Придание стилей
    
    productImg.style.background = `url(${item.media[0]}) no-repeat center / contain`;

    // Установка атрибутов
    saveIcon.setAttribute('src', '/save_icon.png');
    saveIcon.setAttribute('alt', '');
    purchaseIcon.setAttribute('src', '/purchase_icon.png');
    purchaseIcon.setAttribute('alt', '');

    

productName.innerText = item.title;
if (item.salePercentage == 0) {
   price.innerHTML = ""
}else{
    originalPrice.innerHTML = `${item.price.toString()} рублей`
}

const calculateDiscountPrice = (originalPrice: number, discountPercentage: number): number => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
  };
  
  // Пример использования
  const sum = item.price; 
  const discountPercentage = item.salePercentage;
  
  const discountedPrice = calculateDiscountPrice(sum, discountPercentage);
  
 salePrice.innerHTML = ` ${discountedPrice.toFixed()} рублей`;
  


    // Добавляем элементы в структуру
    productImg.appendChild(saveLink);
    saveLink.appendChild(saveIcon);

    price.appendChild(originalPrice);
    price.appendChild(salePrice);
    productFooter.appendChild(price);
    productFooter.appendChild(purchaseLink);
    purchaseLink.appendChild(purchaseIcon);

    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(productFooter);

    saveIcon.onclick = (event) => {
        event.stopPropagation(); // Предотвращаем всплытие и переход по ссылке
        if (saveIcon.src.includes('/heart_active.png')) {
            saveIcon.src = '/save_icon.png'; // Возвращаем обратно
        } else {
            saveIcon.src = '/heart_active.png'; // Меняем на активное
        }
    };
    

    product.onclick = () => {
        const productId = item.id
        location.assign(`/src/pages/product_page/?id=${productId}`)

    }

    return product;

};
