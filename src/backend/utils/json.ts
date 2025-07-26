// JSON utility functions for parsing and stringifying arrays stored as JSON strings

export function parseJsonArray(jsonString: string | null | undefined): string[] {
  if (!jsonString) return []
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function parseJsonArrayOrNull(jsonString: string | null | undefined): string[] | null {
  if (!jsonString) return null
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function stringifyJsonArray(array: string[] | null | undefined): string | null {
  if (!array || !Array.isArray(array) || array.length === 0) return null
  return JSON.stringify(array)
}

export function parseJsonRecord(jsonString: string | null | undefined): Record<string, number> {
  if (!jsonString) return {}
  try {
    const parsed = JSON.parse(jsonString)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function stringifyJsonRecord(record: Record<string, number> | null | undefined): string | null {
  if (!record || typeof record !== 'object') return null
  const keys = Object.keys(record)
  if (keys.length === 0) return null
  return JSON.stringify(record)
}