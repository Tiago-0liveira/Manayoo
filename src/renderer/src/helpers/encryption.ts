import CryptoJS from "crypto-js"

export function makeid(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

export const encrypt = (text: string) => {
    var key = makeid(64);
    return {
        encrypted: CryptoJS.AES.encrypt(text, key).toString(),
        key: key,
    };
};

export const decrypt = (ciphertext: string, key: string) =>
    CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);