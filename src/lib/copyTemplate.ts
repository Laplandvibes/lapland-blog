/**
 * Fill `{name}` placeholders in a COPY string, e.g. `fillCopy(c.readPostAria, { title })`.
 *
 * The word order stays in the translation ('Lesen: {title}', '「{title}」を読む'),
 * so no language has to be forced into the English prefix pattern. split/join
 * rather than replace(): a replacement string would read `$&` or `$1` inside a
 * post title as a pattern.
 */
export function fillCopy(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce((out, [key, value]) => out.split(`{${key}}`).join(value), template);
}
