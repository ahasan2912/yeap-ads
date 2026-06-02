import { getToken } from "firebase/messaging";
import { messaging } from "../pages/notification/firebase.messaging";
import toast from "react-hot-toast";

export const requestPermissionAndGetToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {

            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_WEB_PUSH_CERTIFICATE
            });

            if (token) {
                return token;
            } else {
                toast.error("Failed to retrieve FCM token.");
            }
        } else {
            toast.error("Notification permission denied.");
        }
    } catch (error) {
        console.error("Error getting token:", error);
    }
};