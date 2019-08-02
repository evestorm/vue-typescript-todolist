export function getRandomStr(len: number): string {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, len);
}
