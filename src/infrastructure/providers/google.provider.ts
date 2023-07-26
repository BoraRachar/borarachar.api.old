import "dotenv/config";

export class GoogleProvider {
  constructor(
    public readonly clientID: string = process.env.GOOGLE_API,
    public readonly clientSecret: string = process.env.GOOGLE_SECRET,
    public readonly callBackURL: string = `http://${process.env.HOST}:${process.env.PORT}/google/callback`,
    public readonly scope = ["email", "profile"],
  ) {}
}
