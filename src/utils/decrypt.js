import CryptoJS from "crypto-js";

export default function decryptWithAES(ciphertext, secretKey) {
  const iv = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32)); // Extracts the first 16 bytes (32 hex characters) for the IV
  const encrypted = ciphertext.slice(32); // the rest is the actual ciphertext
  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8); // Convert to UTF8 string
}
