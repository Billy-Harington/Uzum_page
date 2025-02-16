import { ApiClient } from "../../utils/apiHandler";
import { User } from "../../utils/types";
import bcrypt from "bcryptjs";

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
  
  const fm = new FormData(form);
  const email = fm.get("email")?.toString() || "";
  const password = fm.get("password")?.toString() || "";
  
  try {
    const data: any = await api_call.read(`/users?email=${email}`);
    if (data.length === 0) {
      alert("Пользователь с таким email не найден!");
    } else {
      // Сравниваем введённый пароль с хешем
      const userFromServer = data[0];
      const isValidPassword = await bcrypt.compare(password, userFromServer.password);
      if (!isValidPassword) {
        alert("Неверный пароль!");
      } else {
        // Успешная авторизация
        delete userFromServer.password;
        localStorage.setItem("user", JSON.stringify(userFromServer));
        location.assign("/");
      }
    }
  } catch (error) {
    console.error("Ошибка при запросе данных:", error);
    alert("Произошла ошибка! Попробуйте позже.");
  }
};
