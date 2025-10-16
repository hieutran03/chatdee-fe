import { Box } from '@mui/material';
import MessageInput from '../MessageInput';
import { Message } from '../types';
import { useEffect, useRef, useState } from 'react';
import { useGetMessagesQuery } from '@/app/services/chat.service';
import { ScrollArea } from '@/components/scroll/ScrollArea';
import { RelativeTime } from '@/components/RelativeTime';
import MessageItem from './MessageItem';
import { useAppSelector } from '@/hooks/useAppSelector';

export function ChatArea({ conversationId }: { conversationId: string }) {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const firstLoadRef = useRef<boolean>(true);
  const { data: resp, isFetching } = useGetMessagesQuery(
    {
      conversationId: conversationId!,
      query: {
        limit: 15,
        cursor: cursor,
      },
    },
    {
      skip: !conversationId,
    },
  );

  const me = useAppSelector((s) => s.auth.me);

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
      // Prepend older messages; use functional update to avoid stale closure
      setMessages((prev) => [...resp.data.items, ...prev]);
      setPrevCursor(resp.data.meta?.prevCursor);
    }
  }, [resp]);

  return (
    <>
      <Box display="grid" gridTemplateRows="1fr auto" gap={2} overflow="auto">
        <ScrollArea
          ref={messagesContainerRef}
          sx={{ p: 2, overflow: 'auto' }}
          overflow="auto"
          onScroll={(e: any) => {
            const el = e.currentTarget as HTMLDivElement;
            const threshold = 0.1;
            if (el.scrollTop <= el.scrollHeight * threshold) {
              if (!isFetching && prevCursor) {
                setCursor(prevCursor);
              }
            }
          }}
        >
          <Box>
            {messages.length > 0
              ? messages.map((m) => (
                  <MessageItem key={m.id} message={m} isOwn={m.sender.id === me?.id} />
                ))
              : null}
          </Box>
        </ScrollArea>
        <MessageInput />
      </Box>
    </>
  );
}
