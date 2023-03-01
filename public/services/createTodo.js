import { url } from "../config/index.js";

export const createTodo = todo => fetch(url + "/todos", {
                            method: 'post',
                            headers: {
                                'Content-Type': 'Application/json'
                            },
                            body: JSON.stringify(todo),
                        });