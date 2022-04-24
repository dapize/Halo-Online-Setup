import { createDir } from "@tauri-apps/api/fs";
import { dirname, join } from "@tauri-apps/api/path";

export const createFolderRecursive = async ( pathFile: string, installationPath: string ) => {
  const justFolders = await dirname( pathFile );
  const foldersToCreate = await join( installationPath, justFolders );
  await createDir( foldersToCreate, { recursive: true } );
}
