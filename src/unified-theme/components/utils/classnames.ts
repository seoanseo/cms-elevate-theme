/**
 * Combines multiple class name inputs into a single space-separated string.
 * Supports strings, arrays, and objects where keys with truthy values are included.
 * All whitespace is properly trimmed and empty values are excluded.
 * Basically this is a replacement for the classnames library.
 */
export default function cx(...args: unknown[]): string {
  const classes: string[] = [];

  // Process all arguments
  args.flat(Infinity).forEach(arg => {
    // Skip falsy values early
    if (!arg) return;

    // Handle string arguments
    if (typeof arg === 'string') {
      const trimmed = arg.trim();
      if (trimmed) {
        classes.push(trimmed);
      }
      return;
    }

    // Handle object arguments (className: condition pairs)
    if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
      Object.entries(arg as Record<string, unknown>).forEach(([key, value]) => {
        // Only include keys with truthy values
        if (value) {
          const trimmed = key.trim();
          if (trimmed) {
            classes.push(trimmed);
          }
        }
      });
    }
  });

  // Join all classes with a single space
  return classes.join(' ');
}
