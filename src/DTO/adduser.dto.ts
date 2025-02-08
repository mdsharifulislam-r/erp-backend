import { IsNotEmpty } from "class-validator";

export class AddUserDto{
    @IsNotEmpty()
    name:string
}