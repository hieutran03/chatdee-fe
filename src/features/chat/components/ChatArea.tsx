import { Box, List, ListItem, ListItemText } from '@mui/material';
import MessageInput from '../MessageInput';
import { Message } from '../types';
import { useEffect, useRef, useState } from 'react';
import { useGetMessagesQuery } from '@/app/services/chat.service';
import { ScrollArea } from '@/components/scroll/ScrollArea';

export function ChatArea({ conversationId }: { conversationId: string }) {
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const firstLoadRef = useRef<boolean>(true);
  const { data: resp } = useGetMessagesQuery(
    {
      conversationId: conversationId!,
      query: {
        limit: 15,
        cursor: prevCursor,
      },
    },
    {
      skip: !conversationId,
    },
  );

  useEffect(() => {
    return () => {
      // cleanup on unmount
      setMessages([]);
      firstLoadRef.current = true;
      setPrevCursor(undefined);
    };
  }, []);

  useEffect(() => {
    if (firstLoadRef.current && messages.length > 0) {
      requestAnimationFrame(() => {
        const element = messagesContainerRef.current;
        if (element) element.scrollTop = element.scrollHeight;
      });
      firstLoadRef.current = false;
    }
  }, [messages]);

  useEffect(() => {
    if (resp && resp.data.items.length > 0) {
      setMessages(resp.data.items);
    }
  }, [resp]);

  return (
    <>
      <ScrollArea display="grid" gridTemplateRows="1fr auto" gap={2} overflow="auto">
        <Box ref={messagesContainerRef} sx={{ p: 2, overflow: 'auto' }}>
          <Box>
            {messages.length > 0
              ? messages.map((m) => (
                  <ListItem key={m.id}>
                    <ListItemText
                      primary={`${m.sender.name} • ${new Date(m.createdAt).toLocaleTimeString()}`}
                      secondary={m.content}
                    />
                  </ListItem>
                ))
              : null}
          </Box>
        </Box>
        <MessageInput />
      </ScrollArea>
    </>
  );
}
