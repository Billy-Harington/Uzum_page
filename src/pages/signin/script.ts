import { ApiClient } from "../../utils/apiHandler";
import { User } from "../../utils/types";

const form = document.forms.namedItem("signin") as HTMLFormElement;
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

form.onsubmit = async (e: Event) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) isValid = false;
    });

    if (!isValid) return;
    
    // Используем FormData для получения значений формы
    const fm = new FormData(form);
    // Для авторизации нужны только email и password – создаем объект пользователя
    const user: Partial<User> = {
        email: fm.get("email")?.toString() || "",
        password: fm.get("password")?.toString() || "",
    };

    try  {
        const data: any = await api_call.read(`/users?email=${user.email}`);
        
        if (data.length === 0) {
            const emailSpan = form.querySelector(".email_handeler") as HTMLSpanElement;
            emailSpan.textContent = "Пользователь с таким email не найден!";
            inputs.forEach(inp => inp.style.border = "2px solid red");
        } else if (data[0].password !== user.password) {
            const passwordSpan = form.querySelector(".password_handler") as HTMLSpanElement;
            passwordSpan.textContent = "Неверный пароль!";
            inputs.forEach(inp => inp.style.border = "2px solid red");
        } else {
            // Если авторизация успешна – удаляем password из полученных данных
            delete data[0].password;
            localStorage.setItem("user", JSON.stringify(data[0]));
            location.assign("/");
        }
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        const errorSpan = form.querySelector(".general_error") as HTMLSpanElement;
        if (errorSpan) errorSpan.textContent = "Произошла ошибка! Попробуйте позже.";
    }
};
