/**
 * String utility functions for text manipulation
 */

/**
 * Extracts initials from a name string
 * @param name - Full name or string to extract initials from
 * @param maxInitials - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials or '?' if name is empty
 *
 * @example
 * getInitials('John Doe') // 'JD'
 * getInitials('Alice') // 'A'
 * getInitials('') // '?'
 * getInitials('Bob Smith Wilson', 3) // 'BSW'
 */
export function getInitials(name?: string, maxInitials: number = 2): string {
  if (!name || name.trim().length === 0) return '?';

  const parts = name.trim().split(/\s+/);

  // If only one word, take first character
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() || '?';
  }

  // Take first character from each word, up to maxInitials
  return parts
    .slice(0, maxInitials)
    .map((part) => part[0]?.toUpperCase() || '')
    .filter(Boolean)
    .join('') || '?';
}

/**
 * Extracts initials from multiple member names
 * @param members - Array of objects with 'name' property
 * @param maxMembers - Maximum number of members to process (default: 2)
 * @returns Combined initials from member names
 *
 * @example
 * getMembersInitials([{name: 'John'}, {name: 'Doe'}]) // 'JD'
 */
export function getMembersInitials(
  members: Array<{ name?: string; avatar?: string }> | undefined,
  maxMembers: number = 2
): string {
  if (!members || members.length === 0) return '?';

  return members
    .slice(0, maxMembers)
    .map((member) => {
      if (member.name && member.name[0]) {
        return member.name[0].toUpperCase();
      }
      if (member.avatar && member.avatar[0]) {
        return member.avatar[0].toUpperCase();
      }
      return '?';
    })
    .join('');
}
