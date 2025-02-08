import { IsLowercase, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto{
    id:number
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsLowercase()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    confirmPassword: string;
}