import CryptoJS from "crypto-js";

export default function decryptWithAES(ciphertext, secretKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);

    if (bytes.sigBytes > 0) {
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } else {
      throw new Error("Decryption failed");
    }
  } catch (error) {
    console.error("🚀 ~ decryptWithAES ~ error", error);
    throw new Error("Invalid decryption key or corrupted ciphertext");
  }
}
