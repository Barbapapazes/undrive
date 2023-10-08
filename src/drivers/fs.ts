import { readFileSync, existsSync, outputFileSync } from "fs-extra";
import { createError, defineDriver } from "./utils";

export interface FSDriverOptions {
  base?: string
}

export default defineDriver((options: FSDriverOptions = {}) => {
  const driver = "fs"
  const base = options.base || process.cwd()

  function normalizeLocation(location: string): string {
    return `${base}/${location}`
  }

  return {
    name: driver,
    exists: (location) => {
      const normalizedLocation = normalizeLocation(location)

      return existsSync(normalizedLocation)
    },
    get: (location) => {
      const normalizedLocation = normalizeLocation(location)

      try {
        return readFileSync(normalizedLocation)
      } catch (error) {
        if (error instanceof Error) {
          throw createError(driver, error.message)
        }
        throw createError(driver, "Unknown error")
      }
    },
    put: (location, contents) => {
      const normalizedLocation = normalizeLocation(location)

      try {
        outputFileSync(normalizedLocation, contents)
      } catch (error) {
        if (error instanceof Error) {
          throw createError(driver, error.message)
        }
        throw createError(driver, "Unknown error")
      }
    }
  }
})
