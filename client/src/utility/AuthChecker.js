import { getData } from "./APICalling";

export const isLoggedUser = async () => {
    const token = localStorage.getItem("user_token");
    if (token) {
        const response = await getData("/check", { id: token });
        return response.isUserLogged;
    } else {
        return false;
    }
}