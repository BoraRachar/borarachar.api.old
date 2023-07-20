import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthGoogleService {
  googleLogin(req) {
    console.log(JSON.stringify(req));

    if (!req.user) {
      return "Usuario não cadastrado no Google";
    }
    return {
      user: JSON.stringify(req.user),
    };
  }
}
