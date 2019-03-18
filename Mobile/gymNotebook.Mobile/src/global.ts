export {}

declare global {
  interface Array<T> {
    first(this: T[]): T;
  }
}

if (!Array.prototype.first) {
  Array.prototype.first = function<T>(this: T[]): T | null {
    return this[0] ? this[0] : null
  }
}