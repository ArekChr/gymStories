export {}

declare global {
  interface Array<T> {
    firstOrDefault(this: T[]): T;
  }
}

if (!Array.prototype.firstOrDefault) {
  Array.prototype.firstOrDefault = function<T>(this: T[]): T | null {
    return this[0] ? this[0] : null
  }
}