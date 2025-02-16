import { ApiClient } from "../../utils/apiHandler";
import { User } from "../../utils/types";
import bcrypt from "bcryptjs";

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
  
  // Используем FormData для получения значений формы
  const fm = new FormData(form);
  
  // Получаем "сырой" пароль
  const rawPassword = fm.get("password")?.toString() || "";
  // Хешируем пароль с солью (10 раундов)
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  
  // Создаем объект нового пользователя, используя хешированный пароль
  const newUser: User = {
    id: crypto.randomUUID(),
    email: fm.get("email")?.toString() || "",
    name: fm.get("name")?.toString() || "",
    surname: fm.get("surname")?.toString() || "",
    password: hashedPassword, // сохраняем хешированный пароль
    favorites: [],
    cart: []
  };

  try {
    // Проверяем, существует ли уже пользователь с таким email
    const data: any = await api_call.read(`/users?email=${newUser.email}`);
    if (data.length > 0) {
      alert("Такой email уже существует!");
    } else {
      // Создаем пользователя на сервере
      await api_call.create("/users", newUser);
      
      // Сохраняем нового пользователя в localStorage (без пароля можно сохранить, если нужно)
      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      // Переходим на главную страницу
      location.assign("/");
    }
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    alert("Произошла ошибка! Попробуйте позже.");
  }
};
