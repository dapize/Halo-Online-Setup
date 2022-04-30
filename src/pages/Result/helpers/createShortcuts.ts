import { shortcutCreator } from "@helpers/shortcutCreator";
import { IChecksItems } from "@pages/Welcome/components/Extras";
import { join } from "@tauri-apps/api/path";

export const createShortcuts = async ( extraChecks: IChecksItems, installationPath: string ) => {
  const { menu, desktop } = extraChecks;
  const finalPath = await join( installationPath, 'eldorado.exe' )
  if ( desktop ) {
    await shortcutCreator( 'Halo Online', finalPath, 'desktop' );
  }
  if ( menu ) {
    await shortcutCreator( 'Halo Online', finalPath, 'startmenu', 'Halo Online' );
  }
}
