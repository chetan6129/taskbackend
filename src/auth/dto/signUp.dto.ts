import { IsEmail, IsString, IsNotEmpty } from '@nestjs/class-validator';


export class signUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @IsNotEmpty()
    @IsEmail({}, {message : 'Enter Valid Email'})
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    readonly password : string;


}