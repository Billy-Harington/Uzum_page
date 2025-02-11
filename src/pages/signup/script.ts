import { ApiClient } from "../../utils/apiHandler";
import { User } from "../../utils/types";

const form = document.forms.namedItem("register") as HTMLFormElement;
const api_call = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);
const inputs = form.querySelectorAll("input");

// Функция для валидации
const validateInput = (input: HTMLInputElement) => {
    const errorSpan = input.nextElementSibling as HTMLSpanElement;
    if (!input.value.trim()) {
        errorSpan.textContent = "Поле не может быть пустым";
        input.style.border = "2px solid red";
        return false;
    } else {
        errorSpan.textContent = "";
        input.style.border = "";
        return true;
    }
};

// Назначаем обработчики для каждого инпута
inputs.forEach(input => {
    input.addEventListener("blur", () => validateInput(input));
});

form.onsubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) isValid = false;
    });
    if (!isValid) return;
    
    // Получаем значения формы с помощью FormData
    const fm = new FormData(form);
    // Создаем объект пользователя, явно задавая все необходимые поля,
    // а также новые поля favorites и cart
    const user: User = {
        id: crypto.randomUUID(),
        email: fm.get("email")?.toString() || "",
        name: fm.get("name")?.toString() || "",
        surname: fm.get("surname")?.toString() || "",
        password: fm.get("password")?.toString() || "",
        favorites: [],
        cart: []
    };

    const data: any = await api_call.read(`/users?email=${user.email}`);
    if (data.length > 0) {
        alert("Такой email уже существует!");
    } else {
        const data: any = await api_call.read(`/users?email=${user.email}`);
        localStorage.setItem("user", JSON.stringify(data[0]));
        await api_call.create("/users", user);
        location.assign("/");
    }
};
