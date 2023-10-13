import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = extractTokenFromHeader(req);

    if (!token) {
      const data = {
        message: "Acesso não autorizado",
        statusCode: HttpStatus.UNAUTHORIZED,
      };

      return res.json(data);
    }

    try {
      if (isPublicRoute(req)) {
        return next();
      }

      const isValid = validarTokenJWT(token);

      if (isValid) {
        next();
      } else {
        throw new UnauthorizedException("Token invalido");
      }
    } catch (error) {
      console.info("Error: ", error);
      throw new UnauthorizedException("Token invalido");
    }
  }
}

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}

function isPublicRoute(req: Request): boolean {
  const publicRoutes = [
    "/user",
    "/login",
    "/user/resendEmail",
    "/user/confirmEmail",
    "/recoverPassword/{email}",
    "/recoverPassword/resetPassword",
    "/google",
  ];

  return publicRoutes.includes(req.path);
}
async function validarTokenJWT(token: string) {
  try {
    const { exp } = await this.jwtService.verifyAsync(token, {
      secret: this.configRefresh.secret,
    });

    const dataAtual = Math.floor(Date.now() / 1000);

    if (exp && exp >= dataAtual) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
