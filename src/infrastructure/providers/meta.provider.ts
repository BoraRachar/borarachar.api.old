import "dotenv/config";

export class MetaProvider {
  constructor(
    public readonly clientID: string = process.env.META_ID,
    public readonly clientSecret: string = process.env.META_SECRET,
    public readonly callBackURL: string = `${process.env.HOST}:${process.env.PORT}/facebook/redirect`,
    public readonly scope: string = "email",
    public readonly profileFields: ["emails", "name"],
  ) {}
}
