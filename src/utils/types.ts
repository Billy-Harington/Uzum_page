export type ReloadProps<T> = {
    arr: Array<T>; // Теперь массив имеет конкретный тип T
    commponent: (item: T) => HTMLElement;
    place: HTMLElement;
};

export type Product_data = {
    id: number;
    title: string;
    description: string;
    colors: string[]; // Используем string[] вместо просто Array
    rating: number;
    price: number;
    isBlackFriday: boolean;
    salePercentage: number;
    media: string[]; // Тоже исправляем
    type: string;
    number:number
};

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    favorites: Array<Product_data>; // или, если нужно хранить больше информации – массив объектов
    cart: Array<Product_data>;
  
}
export type User_data = {
    id: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    favorites: Array<Product_data>; // или, если нужно хранить больше информации – массив объектов
    cart: Array<Product_data>;
    
}

  