import { url } from "../config/index.js";


export async function checkConnection() {
    let result = await fetch(url + "users/isConnected");   
    let data  =  await result.json();

    return data;
}

export const formToJson = (div,idForm)=>{
    let form = div.querySelector(idForm)
    console.log(form);
    let formData = new FormData(form)
    let datas = { }
    formData.forEach((element,key) => datas[key] = element)
    
    return datas;
}