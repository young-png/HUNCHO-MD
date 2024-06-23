const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFoRUtNdTdVVWJSRk1obHhOWVhkOWx3bko3ckVJZGZsbVlSNC9VMGwzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1Z5MFU1UWg2cFdRdmxwRFdSVnlzRk5pL01vdjg0TnZXYWFqR3dlQndqOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT21oRnNnZlZyc2tNbHlsb2dPa2h2a2djbnJ1dVZUcURrVmtndnQ0bUdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJETzdVend5Nk80VWlqWFB0c09mbkRicWV4d1YybHpJSU9yV0FHNThnYVdRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHTnFzUnVKcVFTcmRiMzc2d1pwc0xwRkNBQlBtempFbmZFVmI3WjdVR0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhkYTY2citBRVNVMVZzcVJCTlVMVzU2Zkl1cy9FQjRmakl5cmlXcG8xU3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUdhdzRxdWh6MEM0THJlT1hTTUVEM1BtK1lhZ1U1bFUzNU9QS3B4TFlVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzMwWlh2cGoyTDFwdlhnclBOTGtZUjRzbGxSTFJpeFlWalR4aDkxdkJtOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQ5WGNNT1hDVVUrYlV2ZG5abXBJcnVoZzljZzlPUE5XekdDVG9SVCtNZU0rNDFtNlQvUUNHU1V2bk9aTENReFZIMnAvM0tFOGdQYWFGZ3dHVlc2bGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6ImJmcDhqQndhaDBWcnI0aXltNGVPcmMvOEpXR0hKTldYNThtSmpaZjFLTzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE2ODAwMDkzOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFQzA3NkZCRkE3RDRBRjEyMzJGQjFBMEM1MTI2MjJCQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5MTgxNzQzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUM1ZLY3dVS1JqRzhGQkxkQXI4cjNnIiwicGhvbmVJZCI6IjI4MDBhNWRhLTU0ODQtNDYzNi1hMmViLTc1YjkzZjc3NjQzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyWU15Q1BvQWRRQ3Fobk1vbSthdWxuMlNFQXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlgzRy9mOElUaDRFOVdrYnA4ZTh3MzY0V0NRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVGRlRMNVhDIiwibWUiOnsiaWQiOiIyMzQ4MTY4MDAwOTM5OjcwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsKgwqAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lxMWg2c0JFSjNENHJNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkY0SHIwNEhWOGRkUzg1Y2YzdFlZaFJkQzRJbnlRTnZQZ0RaV013ZGh3M0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1WeStkV3lHdHFIYmxCOUR6YjFkc21qdEVpY3NMNjZoaHF3UjZNNlcrWHlvNVdZNHVNQm5nSktmM0g5MEJ0UlhXZ0NSN3Q2N1ptM1UzWVJPcGJFUkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ5S3VSVlByNnozck1wWmFhTXVvelAzMUd0UFRWcDBzRmNHZkw0dlFyVnM2MkI0ZXJweFJpL1A5ZTFqVWdxd1pLcG5IUHJQSE9yeUdQdVJUSzBvS2JqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjgwMDA5Mzk6NzBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmVCNjlPQjFmSFhVdk9YSDk3V0dJVVhRdUNKOGtEYno0QTJWak1IWWNOeCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTE4MTczOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBNTEifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "→⁠(⁠°⁠ ⁠۝ ⁠°⁠)⁠┗",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348168000939",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW-XMD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
