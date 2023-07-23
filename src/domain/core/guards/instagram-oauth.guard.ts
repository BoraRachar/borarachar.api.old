import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class InstagramOauthGuard extends AuthGuard("instagram") {}
