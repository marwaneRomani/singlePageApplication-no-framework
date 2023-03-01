import { url } from "../config/index.js";

export const register = user => fetch(url + "/users/register", {
            method: 'post',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user),
    });
