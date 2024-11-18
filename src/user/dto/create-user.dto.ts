import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserBody {
    @IsNotEmpty({
        message: "Nome não deve estar vazio"
    })
    name: string;
    
    @IsNotEmpty({
        message: "E-mail não deve estar vazio"
    })
    @IsEmail({}, {message: "E-mail deve ser um email"})
    email: string;
    
    @IsNotEmpty({
        message: "Senha não deve estar vazio"
    })
    password: string;
}