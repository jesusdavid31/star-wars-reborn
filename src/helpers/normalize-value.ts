export function normalizeValue(value?: string, capitalizeFirst = true): string {
    if (!value) return "Unknown";

    const lower = value.toLowerCase().trim();

    if (lower === "n/a") return "Not Applicable";
    if (lower === "unknown") return "Unknown";

    if (capitalizeFirst) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
}