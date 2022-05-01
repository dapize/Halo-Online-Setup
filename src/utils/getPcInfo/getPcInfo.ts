import { arch, platform, type, version } from "@tauri-apps/api/os"
import { Command } from "@tauri-apps/api/shell";
import { primaryMonitor } from "@tauri-apps/api/window";

import { IDisk, IMonitor } from './getPcInfo.d';

const getTotalRam = (): Promise<number> => {
  return new Promise( (resolve, reject ) => {
    const command = new Command('powershell', ['(Get-WMIObject Win32_PhysicalMemory |  Measure-Object Capacity -Sum).sum/1GB']);
    let total = 0;
    command.on('close', () => {
      resolve( Number(total) )
    })
    command.on('error', ( err: unknown ) => {
      reject( err )
    })
    command.stdout.on('data', line => {
      total = line;
    })
    command.spawn();
  })
}

const arrDisksBuilder = ( lines: string[] ): IDisk[] => {
  return lines
    .filter( item => item )
    .slice(2)
    .map( ( column: string ) => column.split(' ').filter(( item: string ) => item ) )
    .map( disk => {
      return {
        letter: disk[0].substring(-1, 1),
        type: Number(disk[1]),
        size: Number(disk[2]),
        free: Number(disk[3]),
      }
    })
}

const getDisksInfo = (): Promise<IDisk[]> => {
  return new Promise( (resolve, reject ) => {
    const command = new Command('powershell', ['Get-WmiObject -Class win32_logicaldisk | Format-Table DeviceId, DriveType, @{n="Size";e={[math]::Round($_.Size/1GB,2)}},@{n="FreeSpace";e={[math]::Round($_.FreeSpace/1GB,2)}}']);
    const lines: string[] = [];
    command.on('close', () => {
      resolve( arrDisksBuilder( lines ) )
    })
    command.on('error', ( err: unknown ) => {
      reject( err )
    })
    command.stdout.on('data', line => {
      lines.push(line);
    })
    command.spawn();
  })
}

const getFreeDiskSpace = async ( letter: string ): Promise<number | null> => {
  const listDisk = await getDisksInfo();
  const disk = listDisk.find( ( item: IDisk ) => item.letter.toLowerCase() === letter.toLowerCase());
  return disk ? disk.free : null
}

const getMonitor = async (): Promise<null| IMonitor> => {
  const monitor = await primaryMonitor();
  if ( !monitor) return null;
  const { scaleFactor, size: { height, width } } = monitor;
  return {
    scaleFactor,
    width,
    height
  }
}

const getPcInfo = async () => {
  const cpuArc = await arch();
  const os = await platform();
  const osType = await type();
  const osVersion = await version();
  const ram = await getTotalRam();
  const disks = await getDisksInfo();
  const monitor = await getMonitor();

  return {
    arc: cpuArc,
    os,
    osType,
    osVersion,
    ram,
    disks,
    monitor
  }
}

export {
  getPcInfo,
  getDisksInfo,
  getFreeDiskSpace
}
