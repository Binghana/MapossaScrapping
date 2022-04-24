function initSMS(address,body) {
    return {
        "address": address,
        "body": body
    }
}
export function smsOM(body) {
    return initSMS("OrangeMoney", body);
}
export function smsMOMO(body) {

    return initSMS ("MobileMoney", body)
}