import { user } from "../components/Product";
import { ApiClient } from "./apiHandler";
import { Product_data } from "./types";

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL);


export function setFavoriteIcon(saveIcon:HTMLImageElement,item:Product_data) {
    if (user && user.favorites && user.favorites.some(fav => fav.id === item.id)) {
        saveIcon.src = '/heart_active.png';
    } else {
        saveIcon.src = '/save_icon.png';
    }
}



export async function updateFavorites(productData: Product_data, add: boolean,saveIcon:HTMLImageElement) {
    if (user) {
        let favorites: Product_data[] = user.favorites || [];
        if (add) {
            if (!favorites.some(fav => fav.id === productData.id)) {
                favorites.push(productData);
            }
        } else {
            favorites = favorites.filter(fav => fav.id !== productData.id);
        }
        try {
            const updatedUser = await apiCall.update(`/users/${user.id}`, { favorites });
            user.favorites = updatedUser.favorites;
            setFavoriteIcon(saveIcon,productData);
            
            window.dispatchEvent(new CustomEvent("favoritesUpdated"));
        } catch (error) {
            console.error("Ошибка обновления избранного:", error);
        }
    }
}
export async function updateFavoritesOther(productData: Product_data, add: boolean) {
    if (user) {
        let favorites: Product_data[] = user.favorites || [];
        if (add) {
            if (!favorites.some(fav => fav.id === productData.id)) {
                favorites.push(productData);
            }
        } else {
            favorites = favorites.filter(fav => fav.id !== productData.id);
        }
        try {
            const updatedUser = await apiCall.update(`/users/${user.id}`, { favorites });
            user.favorites = updatedUser.favorites;
           
    
            window.dispatchEvent(new CustomEvent("favoritesUpdated"));
        } catch (error) {
            console.error("Ошибка обновления избранного:", error);
        }
    }
}