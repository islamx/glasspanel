export async function loadMessages(locale: string, namespaces: string[]) {
  const messages: Record<string, any> = {};
  for (const ns of namespaces) {
    messages[ns] = (await import(`../locales/${locale}/${ns}.json`)).default;
  }
  return messages;
} 