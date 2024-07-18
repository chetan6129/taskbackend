import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/logIn.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel : Model<User>,
        private jwtService : JwtService
    ){}

    async signUp(signUpDto : signUpDto):  Promise<{ token: string }> {
        const {name , email , password} = signUpDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);


        const user = await this.userModel.create({
            name,
            email,
            password : hashedPassword
        })
        const token =  this.jwtService.sign({id : user._id}) // passing the id (payload) of the user to the jwt token
        console.log("SignUp Successfull")
        return { token }


    }

    async logIn(logInDto : logInDto) : Promise<{ token : string}> {
        
        const {email , password} = logInDto;

        const user = await this.userModel.findOne({
            email
        })

        if(!user) {
            throw new Error('Invalid credentials')
        }

        const comparePassword = await bcrypt.compare(password , user.password);

        if(!comparePassword) {
            throw new Error('Invalid credentials')
        }

        const token =  this.jwtService.sign({id : user._id}) // passing the id (payload) of the user to the jwt token
        console.log("Login Successful")
        return { token }

    }
}
