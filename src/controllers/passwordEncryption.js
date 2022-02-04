const bcrypt = require('bcryptjs');

async function passEncryption(password) {
   return await bcrypt.hash(password, 10);
};

async function decryptedPassword(passwordBody, passwordEncryption ) {
   return await bcrypt.compare(passwordBody, passwordEncryption);
};

module.exports = {passEncryption, decryptedPassword};