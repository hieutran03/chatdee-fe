export type ConversationPreview = {
  id: string;
  name: string;
  lastMessage?: { text: string; createdAt: string };
  participants: string[];
};

export function makeConversationsFromMessages(
  messages?: { id: string; from: string; text: string; createdAt: string }[],
) {
  if (!messages || messages.length === 0) return [] as ConversationPreview[];

  const map = new Map<string, ConversationPreview>();
  for (const m of messages) {
    const key = m.from || 'unknown';
    const prev = map.get(key);
    if (!prev) {
      map.set(key, {
        id: key,
        name: key === 'me' ? 'You' : key === 'bot' ? 'Bot' : `User ${key}`,
        participants: [key],
        lastMessage: { text: m.text, createdAt: m.createdAt },
      });
    } else {
      if (new Date(m.createdAt) > new Date(prev.lastMessage?.createdAt || 0)) {
        prev.lastMessage = { text: m.text, createdAt: m.createdAt };
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    const ta = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
    const tb = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
    return tb - ta;
  });
}
