import { IsLowercase, IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    @IsLowercase()
    username:string

    @IsNotEmpty()
    @Length(8,16)
    password:string
}

