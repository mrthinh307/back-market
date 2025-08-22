export function generateSku(name: string): string {
  return name
    .toLowerCase()               // Converts to lowercase
    .trim()                      // Removes whitespace from both ends
    .replace(/\s+/g, '-')       // Replaces whitespace with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Eliminates special characters
}