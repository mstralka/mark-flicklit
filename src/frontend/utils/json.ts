export function parseJsonArray(jsonString: string | null): string[] {
  if (!jsonString) return []
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function stringifyArray(array: string[]): string {
  return JSON.stringify(array)
}