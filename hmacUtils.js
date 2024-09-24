const crypto = require("crypto");

class HMACUtils {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  static calculateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}

module.exports = HMACUtils;
