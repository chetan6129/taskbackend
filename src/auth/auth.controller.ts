import { Body, Controller, Post , UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { logInDto } from './dto/logIn.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor ( private authService : AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpdto : signUpDto) {
        return this.authService.signUp(signUpdto);
    }

    @Post('/login')
    logIn(@Body() logIndto : logInDto) {
        return this.authService.logIn(logIndto);
    }
}
