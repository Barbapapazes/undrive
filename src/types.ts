export type Awaitable<T> = Promise<T> | T

export interface Driver {
  name: string
  exists: (path: string) => Awaitable<boolean>
  get: (path: string) => Awaitable<Buffer>
  put: (path: string, contents: Buffer) => Awaitable<void>
}

export type DriverFactory<T> = (options: T) => Driver

export interface Drive {
  exists: (path: string) => Awaitable<boolean>
  get: (path: string) => Awaitable<Buffer>
  put: (path: string, contents: Buffer) => Awaitable<void>
}
