import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

// 加密
export async function encryption(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltOrRounds);
    return await bcrypt.hash(password, salt);
}

// 密码匹配
export async function decrypt(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}