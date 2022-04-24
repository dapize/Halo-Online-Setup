import { Command } from '@tauri-apps/api/shell';
import { createDir } from '@tauri-apps/api/fs';
import { dirname, join } from '@tauri-apps/api/path';
import { path } from '@tauri-apps/api';
import { fetch, Response } from '@tauri-apps/api/http';

import { ISubscribersObj, IFile, ISubscriber, TFnProgress, TFnFinish, TFnError } from './Downloader.d';

export class Downloader {
  private readonly urls: IFile[];
  private readonly installationFolder: string;
  private processed: number = 0;
  private readonly subscribers: ISubscribersObj = {
    progress: [],
    finish: [],
    error: [],
  }

  constructor( urlOrUrls: IFile | IFile[], installationPath: string ) {
    this.urls = !Array.isArray( urlOrUrls ) ? [ urlOrUrls ] : urlOrUrls;
    this.installationFolder = installationPath;
    this.processor( [ ...this.urls ] )
  }

  private async processor ( arr: IFile[] ) {
    const file = arr.shift() as IFile;
    const wasGetted = await this.getFile( file );
    if ( wasGetted && arr.length ) this.processor( arr )
  }

  private async getFile ( file: IFile ) {
    try {
      const fullPathFile = file.path.join( path.sep );
      if ( file.path.length > 1 ) {
        await this.createFolderRecursive( fullPathFile, this.installationFolder );
      }
      const fullPathToSave = await join( this.installationFolder, fullPathFile );
      await this.exeCommand( file.url, fullPathToSave);
      this.setProgress();
    } catch ( err: unknown ) {
      this.finished( err )
      return false;
    }
    return true;
  }

  private exeCommand ( url: string, fullPathToSave: string ): Promise<null | unknown> {
    return new Promise(( resolve, reject ) => {
      ( async () => {
        // check if exists the file
        const req: Response<unknown> = await fetch(url, { method: 'HEAD' });
        if ( !req.ok ) {
          const checkingError = new Error();
          checkingError.name = "Validation Error"
          checkingError.message = `The url "${url}" is not valid`;
          return reject( checkingError )
        }

        // initializing the download
        const command = new Command('curl', [url, '--output', fullPathToSave]);
        command.on('close', () => {
          resolve( null )
        })
        command.on('error', ( err: unknown ) => {
          reject( err )
        })
        command.spawn();
      })();
    })
  }

  private setProgress () {
    this.processed += 1;
    const progress = ( this.processed * 100 ) / this.urls.length;
    this.subscribers.progress.forEach( (fn: TFnProgress ) => fn( progress ));
    if ( progress >= 100 ) this.finished( false )
  }

  private finished ( err: unknown ) {
    this.subscribers.finish.forEach( (fn: TFnFinish ) => fn( err ));
    if ( err ) this.outError( err );
  }

  private outError ( err: unknown ) {
    this.subscribers.error.forEach( (fn: TFnError ) => fn( err ));
  }

  private async createFolderRecursive ( pathFile: string, installationPath: string ) {
    try {
      const justFolders = await dirname( pathFile );
      const foldersToCreate = await join( installationPath, justFolders );
      await createDir( foldersToCreate, { recursive: true } );
    } catch ( err: unknown ) {
      this.outError( err );
    }
  }

  on( eventName: ISubscriber['type'], fn: ISubscriber['cb']  ) {
    switch( eventName ) {
      case 'progress':
        this.subscribers.progress.push( fn as TFnProgress )
        break;

      case 'finish':
        this.subscribers.finish.push( fn as TFnFinish )
        break;

      case 'error':
        this.subscribers.error.push( fn as TFnError )
        break;
    }
  }
}
