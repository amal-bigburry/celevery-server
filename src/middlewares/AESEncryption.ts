import { Injectable, NestMiddleware } from "@nestjs/common";
import * as CryptoJS from "crypto-js";

@Injectable()
export class EncryptionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const secretKey = "1234567812345678"; // 128-bit (16 bytes) key

    // Decrypt incoming request payload
    if (req.body?.payload && req.body?.iv) {
      try {
        const iv = CryptoJS.enc.Base64.parse(req.body.iv); // Parse IV from Base64
        console.log("Request IV (Base64):", req.body.iv);
        console.log("Request IV (Hex):", iv.toString(CryptoJS.enc.Hex));
        const bytes = CryptoJS.AES.decrypt(req.body.payload, secretKey, {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: iv,
        });
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
          throw new Error("Decryption failed: Empty result");
        }
        console.log("Decrypted Data:", decrypted);
        req.body = JSON.parse(decrypted);
      } catch (error) {
        console.error("Decryption failed:", error.message);
        return res.status(400).json({ error: "Invalid encrypted payload" });
      }
    } else if (req.body?.payload) {
      console.error("Missing IV in request");
      return res.status(400).json({ error: "IV is required for decryption" });
    }

    // Override res.json to encrypt response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      const iv = CryptoJS.lib.WordArray.random(16); // Generate new IV for response
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(body), secretKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
      }).toString();
      const ivBase64 = iv.toString(CryptoJS.enc.Base64); // Convert IV to Base64
      console.log("Response Payload:", encrypted);
      console.log("Response IV (Base64):", ivBase64);
      console.log("Response IV (Hex):", iv.toString(CryptoJS.enc.Hex));
      console.log("Response IV (WordArray):", iv);
      return originalJson({ payload: encrypted, iv: ivBase64 });
    };

    next();
  }
}