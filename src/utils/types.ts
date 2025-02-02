export type ReloadProps<T> = {
    arr: Array<T>;
    commponent: (item: T) => HTMLElement;
    place: HTMLElement;
};

export type Product_data<T> = {
    id: number;
    title:string;
    description:string;
    colors:Array<T>;
    rating:number;
    price:number;
    isBlackFriday: boolean;
    salePercentage:number;
    media:Array<T>;
    type:string;
}
