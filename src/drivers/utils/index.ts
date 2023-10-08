import { DriverFactory } from "../../types";

export function defineDriver<T = any>(factory: DriverFactory<T>): DriverFactory<T> {
  return factory
}

export function createError(
  driver: string,
  message: string,
  options?: ErrorOptions
) {
  const error = new Error(`[drive] [${driver}] ${message}`, options)
  return error
}
