import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env = process.env.NODE_ENV;
  const fallback = resolve(`${dest}/.env`);
  const fileName = env ? `${env}.env` : 'development.env';
  // Create a file path from environment destination and filename
  let filePath = resolve(`${dest}/${fileName}`);
  // if the path doesn't exist, fallback
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}
