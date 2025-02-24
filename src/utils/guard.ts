import { ApiClient } from "./apiHandler";
import { User_data } from "./types";

const localedStr = localStorage.getItem('user');
if (!localedStr || localedStr === "{}") {
  location.assign("/src/pages/signin/");
} else {
  const localed = JSON.parse(localedStr);
  // Если объект не содержит ключей, считаем его пустым
  if (Object.keys(localed).length === 0) {
    location.assign("/src/pages/signin/");
  }
}

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL)
const users = await apiCall.read("/users/")as Array<User_data>
if (users.length === 0) {
    location.assign("/src/pages/signin/");
}
