import { url } from "../config/index.js";

export const getTodos = () => fetch(url + `todos`);