import { Box } from '@mui/material';
import MessageInput from '../MessageInput';
import { useEffect, useRef, useState } from 'react';
import { useGetMessagesQuery } from '@/app/services/chat.service';
import { ScrollArea } from '@/components/scroll/ScrollArea';
import MessageItem from './MessageItem';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { joinConversation } from '../chat.actions';
import { useChatUI } from '../hooks/useChatUI';

export function ChatArea({ conversationId }: { conversationId: string }) {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);

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
  const { getMessages, setPage, getPrevCursor } = useChatUI();
  const messages = getMessages(conversationId);
  const prevCursorFromStore = getPrevCursor(conversationId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      // cleanup on unmount
      firstLoadRef.current = true;
      setPrevCursor(undefined);
    };
  }, []);

  // Join socket room for this conversation when it becomes active
  useEffect(() => {
    if (conversationId) {
      dispatch(joinConversation(conversationId));
    }
  }, [conversationId]);

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
      const isFirstPage = !cursor;
      // Push into context store as well
      setPage(conversationId, resp.data.items, resp.data.meta?.prevCursor, { replace: isFirstPage });
      // Keep local state for immediate rendering and scroll handling
      setPrevCursor(resp.data.meta?.prevCursor);
    }
  }, [resp]);
  
  // Keep local prevCursor in sync with store when switching conversations
  useEffect(() => {
    setPrevCursor(getPrevCursor(conversationId));
  }, [conversationId]);

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
              const nextCursor = prevCursor ?? prevCursorFromStore;
              if (!isFetching && nextCursor) {
                setCursor(nextCursor);
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
        <MessageInput conversationId={conversationId} />
      </Box>
    </>
  );
}
