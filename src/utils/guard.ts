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
