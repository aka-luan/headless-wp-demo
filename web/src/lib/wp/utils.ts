/** Drops null/undefined entries from WPGraphQL lists (repeaters and connections are nullable). */
export function compact<T>(items: ReadonlyArray<T | null | undefined> | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

/** SCF select fields come back as string lists; blocks use a single value. */
export function firstValue(value: ReadonlyArray<string | null> | string | null | undefined): string | null {
  if (Array.isArray(value)) return value.find(Boolean) ?? null;
  return (value as string | null | undefined) ?? null;
}

/** Narrows relationship nodes: fragments on other types come back as {}. */
export function hasKey<K extends string>(key: K) {
  return <T extends object>(node: T): node is Extract<T, Record<K, unknown>> => key in node;
}
