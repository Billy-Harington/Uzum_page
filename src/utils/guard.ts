const localed = JSON.parse(localStorage.getItem('user') as string);

if (!localed) {
    location.assign("/src/pages/signin/")
}