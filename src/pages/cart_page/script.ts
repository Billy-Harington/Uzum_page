import { Cart_product } from "../../components/Cart_product";
import { Header } from "../../components/Header";
import { ApiClient } from "../../utils/apiHandler";
import { reload } from "../../utils/reload";
import { Product_data, User_data } from "../../utils/types";
import { calculateDiscountPrice } from "../../utils/percentage_calc";

(async function () {
    const localed = JSON.parse(localStorage.getItem("user") || "{}");
    document.body.prepend(Header(localed.name));
   
    

    const savedPlace = document.querySelector(".cart_container") as HTMLElement;
    const section = document.querySelector(".cart") as HTMLElement;

    // Элементы для итоговой цены, количества товаров, общей скидки
    const finalPriceEl = document.querySelector(".final_price") as HTMLElement;
    const totalLengthEl = document.querySelector(".total_length") as HTMLElement;
    const totalDiscountEl = document.querySelector(".total_price_length") as HTMLElement;

    const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
    const users = await apiCall.read("/users") as User_data[];

    const user = users.find(u => u.id === localed.id);

    function renderFavorites(): void {
        if (!user || !user.cart || user.cart.length === 0) {
            section.innerHTML = "";
            const img = document.createElement("img");
            img.classList.add("empty_page");
            img.src = "/empty_cart.png";
            section.append(img);
        } else {
            reload<Product_data>({
                arr: user.cart,
                commponent: Cart_product,
                place: savedPlace,
            });
        }
    }

    function recalcTotals() {
        const cartProducts = document.querySelectorAll(".cart_product");

        if (cartProducts.length === 0) {
            section.innerHTML = "";
            const img = document.createElement("img");
            img.classList.add("empty_page");
            img.src = "/empty_cart.png";
            section.append(img);

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

            const amountEl = cp.querySelector(".amount") as HTMLElement;
            const count = parseInt(amountEl.textContent || "1", 10);

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

    window.addEventListener("cartChanged", recalcTotals);

    renderFavorites();
    recalcTotals();
})();


const finish = document.querySelector('.arrange_btn') as HTMLButtonElement

finish.onclick = () =>{
    alert("Поздравояю вас с окончанием проверки сайта!Далер ака если проверяете вы то зайдите в консоль")
    console.log("Дорогой учебный центр WePro и уважаемые преподаватели! Я безмерно благодарен за всё, чему вы нас обучили. Вы дали нам возможность войти в мир программирования, и благодаря вам я многому научился. Я приложу все усилия, чтобы развивать свои способности и в будущем, ведь именно вы положили начало этому пути. Огромное вам спасибо!");
    
    
}
