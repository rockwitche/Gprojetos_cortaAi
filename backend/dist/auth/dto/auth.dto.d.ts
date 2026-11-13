export declare enum UserType {
    CLIENTE = "CLIENTE",
    BARBEIRO = "BARBEIRO"
}
export declare class RegisterDto {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    tipo?: UserType;
    rememberMe?: boolean;
}
export declare class LoginDto {
    email: string;
    senha: string;
    rememberMe?: boolean;
}
export declare class VerifyEmailDto {
    code: string;
    email?: string;
    verificationToken?: string;
}
export declare class ResendCodeDto {
    email: string;
    verificationToken?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    senha: string;
}
