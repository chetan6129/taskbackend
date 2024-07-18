import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found'); // No token provided
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Payload:', payload); // Log payload
      request.user = { _id: payload.id, ...payload }; // Attach user data to the request
      return true; // Valid token
    } catch (error) {
      console.log('Invalid token:', error.message);
      return false; // Invalid token
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extract the token from the Authorization header (e.g., Bearer <token>)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}