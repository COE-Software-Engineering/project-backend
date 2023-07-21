import bcrypt from "bcrypt";

/**
 * function to generate a random string of length n
 * @param {int} n the length of the random string to generate
 */
export function generateRandomString(n){
    let caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let small = caps.toLowerCase();
    let digits = "1234567890";
    let special = "!@#$%^&*()_+";
    let full = caps + small + digits + special;
    let randString = "";

    for(let i = 0; i < n; i++){
        randString += full[Math.round(Math.random() * full.length)];
    }

    return randString;
}

/**
 * function to encrypt password
 * @param {string} password the text to be encrypted
 * @param {int} saltRound integer that proportionally determines strenght of hashing
 * @return encrypted text
 */

export async function hashText(text, saltRounds){
    return await bcrypt.hash(text, saltRounds)
}

/**
 * function compare string against hash
 * @param {string} text  the text to verify
 * @param {string} encryptedText  the hash to compare the text against
 * @returns {string} the hashed form of given text
 */

export async function compareHash(text, hashedText){
    return await bcrypt.compare(text, hashedText);
}

/**
 * remove special characters from some text
 * @param {string} text the text for which special characters are to be removed
 * @returns {string} text with special characters removed
 */
export function removeHTMLSpecialchars(text){
    const removeReg = /[<>/]/g
    return text.replace(removeReg, " ");
}