export const storage = {
  get: (k: string) => {
    try { return JSON.parse(localStorage.getItem(k) || 'null') } catch { return null }
  },
  set: (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v)),
  remove: (k: string) => localStorage.removeItem(k),
}