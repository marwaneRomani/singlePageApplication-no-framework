import { url } from "../config/index.js";

export const login = user => fetch(url + "users/login", {
            method: 'post',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user),
    });