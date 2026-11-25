export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "YC";
}

export function displayName(person?: { businessName?: string | null; fullName?: string } | null) {
  if (!person) return "Yucachain";
  return person.businessName || person.fullName || "Yucachain";
}
