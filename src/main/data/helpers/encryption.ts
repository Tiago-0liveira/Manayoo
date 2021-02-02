const CryptoJS = require('crypto-js');

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return result;
}

const encrypt = (text: string) => {
  const key = makeid(64);
  return {
    encrypted: CryptoJS.AES.encrypt(text, key).toString(),
    key,
  };
};

const decrypt = (ciphertext: string, key: string) => CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

export function decode(thing: string) {
  const div = thing.split(thing.slice(-12));
  return JSON.parse(decrypt(div[0], div[1]));
}

export function encode(thing: any) {
  const { encrypted, key } = encrypt(JSON.stringify({
    ...thing,
    firstTime: thing.firstTime === 1,
    autoLogin: thing.autoLogin === 1,
  }));
  const rand = makeid(12);
  return `${encrypted}${rand}${key}${rand}`;
}
