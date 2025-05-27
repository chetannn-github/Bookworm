import bcrypt from "bcryptjs";

export const hashPassword = async function (password) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    return hash;
}
