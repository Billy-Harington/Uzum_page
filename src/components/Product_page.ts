import { Product_data } from "../utils/types";

export function createProductPage(item: Product_data<T>, place: HTMLElement) {
    const main_container = document.createElement("div");
    const mainData = document.createElement("section");
    const frames = document.createElement("div");
    const column = document.createElement("div");
    const mainFrame = document.createElement("div");
    const mainImage = document.createElement("img");
    const rightArrow = document.createElement("a");
    const rightArrowImg = document.createElement("img");
    const leftArrow = document.createElement("a");
    const leftArrowImg = document.createElement("img");
    const data = document.createElement("div");
    const title = document.createElement("h1");
    const price = document.createElement("div");
    const salePrice = document.createElement("h2");
    const originalPrice = document.createElement("h2");
    const counter = document.createElement("div");
    const minus = document.createElement("span");
    const amount = document.createElement("span");
    const plus = document.createElement("span");
    const separator = document.createElement("hr");
    const description = document.createElement("p");
    const actionBtns = document.createElement("div");
    const purchaseBtn = document.createElement("button");
    const saveBtn = document.createElement("button");
    const descriptionSection = document.createElement("section");
    const descriptionTitle = document.createElement("h1");
    const descriptionCenter = document.createElement("div");
    const descriptionText = document.createElement("p");

    /** 2️⃣ Придание классов и ID **/
    mainData.classList.add("main_data");
    frames.classList.add("frames");
    column.classList.add("column");
    mainFrame.classList.add("main_frame");
    rightArrow.classList.add("right_arrow");
    leftArrow.classList.add("left_arrow");
    data.classList.add("data");
    price.classList.add("price");
    salePrice.classList.add("sale");
    originalPrice.classList.add("original");
    counter.classList.add("counter");
    minus.classList.add("minus");
    amount.classList.add("amount");
    plus.classList.add("plus");
    actionBtns.classList.add("action_btns");
    purchaseBtn.classList.add("purchase");
    saveBtn.classList.add("save");
    descriptionSection.classList.add("description");
    descriptionCenter.classList.add("center");
    let img_length = 0

    rightArrow.addEventListener('click', (e)=>{
        e.preventDefault()
        if (img_length == 5) {
            return
        } else {
            img_length++
            mainImage.src = item.media[img_length];
        }
    })
    leftArrow.addEventListener('click', (e)=>{
        e.preventDefault()
        if (img_length == 0) {
            return
        } else {
            img_length--
            mainImage.src = item.media[img_length];
        }
    })
    /** 3️⃣ Придание внутреннего контента **/
    mainImage.src = item.media[img_length];
    mainImage.alt = "Просим прощения но компания скупилась на фотогорафию";
    rightArrow.href = "#";
    rightArrowImg.src = "/right_arrow.png";
    rightArrowImg.alt = "";
    leftArrow.href = "#";
    leftArrowImg.src = "/left_arrow.png";
    leftArrowImg.alt = "";
    title.innerText = item.title;

    let price_og = item.price;

    if (item.salePercentage == 0) {
        originalPrice.innerHTML = "";
    } else {
        originalPrice.innerHTML = `${price_og.toString()} рублей`;
    }

    const calculateDiscountPrice = (originalPrice: number, discountPercentage: number): number => {
        const discountAmount = (originalPrice * discountPercentage) / 100;
        return originalPrice - discountAmount;
    };

    const discountPercentage = item.salePercentage;
    let price_sale = calculateDiscountPrice(price_og, discountPercentage);

    salePrice.innerHTML = price_sale.toFixed() + " рублей";

    minus.innerText = "-";
    amount.innerText = "1";
    plus.innerText = "+";
    description.innerText = item.description;
    purchaseBtn.innerText = "Добавить в корзину";
    saveBtn.innerText = "Добавить в избранное";
    descriptionTitle.innerText = "Описание товара";
    descriptionText.innerText = item.description;

    /** Обработчики событий для счетчика **/
    let count = 1;

    const updatePrice = () => {
        amount.innerText = count.toString();
        salePrice.innerText = (price_sale * count).toFixed() + " рублей";
        originalPrice.innerText = item.salePercentage > 0 ? (price_og * count).toFixed() + " рублей" : "";
    };

    minus.addEventListener("click", () => {
        if (count > 1) {
            count--;
            updatePrice();
        }
    });

    plus.addEventListener("click", () => {
       if (count === 35) {
        return
       }else{
        count++;
        updatePrice();
       }
    });

    /** 4️⃣ Распределение по местам через append **/
    rightArrow.appendChild(rightArrowImg);
    leftArrow.appendChild(leftArrowImg);
    mainFrame.append(mainImage, rightArrow, leftArrow);

    for (let i = 0; i < 5; i++) {
        const img = document.createElement("img");
        img.src = item.media[i];
        img.alt = "";
        column.appendChild(img);

        img.onclick = () =>{
            img_length = i
            mainImage.src = item.media[i]
        }
    }

    frames.append(column, mainFrame);
    price.append(salePrice, originalPrice);
    counter.append(minus, amount, plus);
    actionBtns.append(purchaseBtn, saveBtn);
    data.append(title, price, counter, separator, description, actionBtns);
    mainData.append(frames, data);

    descriptionCenter.appendChild(descriptionText);
    descriptionSection.append(descriptionTitle, descriptionCenter);

    main_container.append(mainData, descriptionSection);
    place.append(main_container);
    console.log(place);
    
    return place;
}