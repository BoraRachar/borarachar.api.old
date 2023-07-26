import "dotenv/config";

export class InstagramProvider {
  constructor(
    public readonly clientID: string = process.env.INSTAGRAM_ID,
    public readonly clientSecret: string = process.env.INSTAGRAM_SECRET,
    public readonly callBackURL: string = `https://${process.env.HOST}:${process.env.PORTSSL}/instagram/callback`,
    public readonly scope = ["instagram_basic"],
    public readonly profileFields?: string[],
  ) {}
}
