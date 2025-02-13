import { Cart_product } from "../../components/Cart_product";
import { Header } from "../../components/Header";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data, User_data } from "../../utils/types";
import { calculateDiscountPrice } from "../../utils/percentage_calc";

const localed = JSON.parse(localStorage.getItem('user') as string);
document.body.prepend(Header(localed.name));

const savedPlace = document.querySelector('.cart_container') as HTMLElement;
const section = document.querySelector('.cart') as HTMLElement;

// Элементы для итоговой цены, количества товаров, общей скидки
const finalPriceEl = document.querySelector(".final_price") as HTMLElement;
const totalLengthEl = document.querySelector(".total_length") as HTMLElement;
const totalDiscountEl = document.querySelector(".total_price_length") as HTMLElement;

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const users = await apiCall.read('/users') as Array<User_data>;

export const user = users.find(u => u.id === localed.id);

export function renderFavorites(): void {
  if (!user || !user.cart || user.cart.length === 0) {
    section.innerHTML = "";
    const img = document.createElement('img');
    img.classList.add('empty_page');
    img.src = "/empty_cart.png";
    section.append(img);
  } else {
    // Рендерим товары
    reload<Product_data>({
      arr: user.cart,
      commponent: Cart_product,
      place: savedPlace
    });
  }
}

renderFavorites()
function recalcTotals() {
  // Находим все элементы .cart_product
  const cartProducts = document.querySelectorAll(".cart_product");

  
  if (cartProducts.length === 0) {
    section.innerHTML = "";
    const img = document.createElement("img");
    img.classList.add("empty_page");
    img.src = "/empty_cart.png";
    section.append(img);

    // Также обнуляем итоговые данные
    finalPriceEl.textContent = "0 сум";
    totalLengthEl.textContent = "0";
    totalDiscountEl.textContent = "0";
    return;
  }

  let totalSum = 0;
  let totalCount = 0;
  let totalDiscount = 0;

  cartProducts.forEach(cp => {
    const originalPrice = parseInt(cp.getAttribute("data-originalprice") || "0", 10);
    const salePercentage = parseInt(cp.getAttribute("data-salepercentage") || "0", 10);

    // Ищем элемент .amount внутри текущего товара
    const amountEl = cp.querySelector(".amount") as HTMLElement;
    const count = parseInt(amountEl.textContent || "1", 10);

    // Рассчитываем суммы
    const normalPriceSum = originalPrice * count;
    const discountedSum = calculateDiscountPrice(originalPrice, salePercentage) * count;

    totalSum += Math.round(discountedSum);
    totalCount += count;
    totalDiscount += Math.round(normalPriceSum - discountedSum);
  });

  finalPriceEl.textContent = `${totalSum} сум`;
  totalLengthEl.textContent = String(totalCount);
  totalDiscountEl.textContent = String(totalDiscount);
}


window.addEventListener("cartChanged", () => {
  recalcTotals();
  
});



recalcTotals();

