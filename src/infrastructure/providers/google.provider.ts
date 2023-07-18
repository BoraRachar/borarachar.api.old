import "dotenv/config";

export class GoogleProvider {
  constructor(
    public readonly clientID: string = process.env.GOOGLE_API,
    public readonly clientSecret: string = process.env.GOOGLE_SECRET,
    public readonly callBackURL: string = `${process.env.HOST}:${process.env.PORT}/auth/google/callback`,
    public readonly scope = ["emails", "profile"],
  ) {}
}
