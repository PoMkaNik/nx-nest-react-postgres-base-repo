/**
 * Экранирует строку, позволяя на её основе создавать регулярное выражение
 * @param pattern шаблон регулярного выражения в формате строки
 */
export function escapeRegexp(pattern: string): string {
    return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
