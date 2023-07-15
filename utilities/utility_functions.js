import bcrypt from "bcrypt";

/**
 * function to generate a random string of length n
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
 * @param password the text to be encrypted
 * @param saltRound integer that proportionally determines strenght of hashing
 * @return encrypted text
 */

export async function hashText(text, saltRounds){
    return await bcrypt.hash(text, saltRounds)
}