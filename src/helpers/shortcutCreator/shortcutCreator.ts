import { writeFile, createDir } from '@tauri-apps/api/fs';
import { tempdir } from '@tauri-apps/api/os';
import { dataDir, desktopDir, dirname, join } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';
import { TShortcut } from './shortcutCreator.d';

const wScriptCommand = (pathFile: string) => {
  return new Promise( (resolve, reject ) => {
    const command = new Command('wscript', [pathFile]);
    command.on('close', () => {
      resolve( null )
    })
    command.on('error', ( err: unknown ) => {
      reject( err )
    })
    command.spawn();
  })
}

const wscriptCreator = async (name: string, target: string, pathFile: string) => {
  const justFolders = await dirname( pathFile );
  const targetShortcut = await join(target, name);
  return `Set objShell = CreateObject("WScript.Shell")
Set objLink = objShell.CreateShortcut("${targetShortcut}.lnk")
objLink.Description = "${name}"
objLink.IconLocation = "${pathFile},0"
objLink.TargetPath = "${pathFile}"
objLink.WindowStyle = 3
objLink.WorkingDirectory = "${justFolders}"
objLink.Save`
}

export const shortcutCreator = async ( name: string, pathFile: string, type: TShortcut, folderName?: string ) => {
  // getting the shortcut target
  let createShortcutIn: string = '';
  if ( type === 'desktop' ) {
    createShortcutIn = await desktopDir()
  } else {
    const dataPath = await dataDir();
    const folderProgram = folderName ? `\\${folderName}` : '';
    createShortcutIn = await join( dataPath, `Microsoft\\Windows\\Start Menu\\Programs${folderProgram}`);
    if ( folderName ) {
      await createDir( createShortcutIn )
    }
  }

  // creating the script
  const contentWscript = await wscriptCreator( name, createShortcutIn, pathFile)

  // writing the file in temp
  const tempPath = await tempdir();
  const getTimeNum = new Date().getTime();
  const fileNameVbs = `${(name.replace(/ /g, '-'))}-shortcut-${type}-creator-${getTimeNum}.vbs`
  const wscriptInTempPath = await join(tempPath, fileNameVbs)
  await writeFile({
    contents: contentWscript,
    path: wscriptInTempPath
  });

  // executing the script ( creating the shortcut )
  await wScriptCommand( wscriptInTempPath );
}
