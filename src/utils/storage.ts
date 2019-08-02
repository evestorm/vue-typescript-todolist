function set(key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val))
}
function get<T>(key: string): T[] {
  const result = localStorage.getItem(key)
  return result ? JSON.parse(result) : null
}
function remove(key: string): void {
  localStorage.removeItem(key)
}

const storage = {
  set,
  get,
  remove,
}

export default storage
