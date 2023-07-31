import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleOauthGuard extends AuthGuard("google") {}
