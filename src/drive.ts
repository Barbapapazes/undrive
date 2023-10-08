import { Drive, Driver } from "./types";

export interface CreateDriveOptions {
  driver: Driver
}

export function createDrive(options: CreateDriveOptions): Drive {
  const driver = options.driver

  const drive: Drive = {
    exists: async  (location: string) => {
      return await driver.exists(location)
    },
    get: async (location: string) => {
      return await driver.get(location)
    },
    put: async (location: string, contents: Buffer) => {
      return await driver.put(location, contents)
    }
  }

  return drive
}
