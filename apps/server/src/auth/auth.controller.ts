import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  loginUser(@Request() req: ExpressRequest) {
    const user = req.user as { id: string; name: string };
    return this.authService.login(user.id, user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req: ExpressRequest) {
    const user = req.user as { id: string };
    return {
      message: `Now you're in the protected route. This is your user id: ${user.id}`,
    };
  }
}
