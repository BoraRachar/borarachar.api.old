import { resolve } from "path";
import { existsSync } from "fs";

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env.${env}`);
  const fileName: string = env ? `.env.${env}` : ".env.development";
  let filePath: string = resolve(`${dest}/${fileName}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
