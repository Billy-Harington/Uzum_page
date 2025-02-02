import { ReloadProps } from "./types"


export const reload = <T>({ arr, commponent, place }: ReloadProps<T>): void => {
    place.innerHTML = ""; 
    
   
    
    for (const item of arr) {
        
             const element = commponent(item);
             
             
             place.append(element); 
         };
    
};


