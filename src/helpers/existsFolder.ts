import { readDir } from "@tauri-apps/api/fs";

export const existsFolder = async ( installationPath: string ): Promise<boolean> => {
  try {
    await readDir( installationPath );
    return true
  } catch ( err: unknown ) {
    return false;
  }
}
