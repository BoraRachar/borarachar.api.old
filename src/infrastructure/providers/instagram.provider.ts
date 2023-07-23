import "dotenv/config";

export class InstagramProvider {
  constructor(
    public readonly clientID: string = process.env.INSTAGRAM_ID,
    public readonly clientSecret: string = process.env.INSTAGRAM_SECRET,
    public readonly callBackURL: string = `${process.env.HOST}:${process.env.PORT}/instagram/callback`,
    public readonly scope: string = "email",
    public readonly profileFields: ["emails", "name"],
  ) {}
}
