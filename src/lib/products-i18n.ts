export function normalizeSpecKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\+/g, '_plus')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/(^_+|_+$)/g, '');
}
