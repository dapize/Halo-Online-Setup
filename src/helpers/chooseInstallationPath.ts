import { open } from "@tauri-apps/api/dialog";
import { join } from "@tauri-apps/api/path";

export const getFullPath = async ( newPath: string ) => await join(newPath, 'Halo Online');

export const chooseInstallationPath = async () => {
  const chosenFolder = await open({ directory: true });
  if ( !chosenFolder ) return false;
  const newPath = await getFullPath( chosenFolder as string );
  return newPath
}
