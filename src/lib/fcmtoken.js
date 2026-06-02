import { requestPermissionAndGetToken } from "../hooks/useFCM";
import getBrowserName from "./getBrowserName";

export const generateFcmTokenData = async () => {
    const token = await requestPermissionAndGetToken();
    //  console.log(token, "token");
    let deviceId = null;

    if (!token) return null;

    let getDeviceId = localStorage.getItem("deviceId");
    if (!getDeviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", deviceId);
    } else {
        deviceId = getDeviceId;
    }

    const browserName = await getBrowserName(navigator.userAgent);

    // console.log(browserName, "browserName");

    const fcmToken = {
        deviceId: deviceId,
        token: token,
        platform: "WEB",
        deviceName: browserName,
    };
    // console.log('Generated FCM Token Data:', fcmToken);
    return fcmToken;
};