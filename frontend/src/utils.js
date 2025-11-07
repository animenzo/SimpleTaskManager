import {toast} from "react-toastify";

export const API_URL = "https://simple-task-manager-backendi.vercel.app/"

export const notify = (message,type) => {
    toast[type](message);
}