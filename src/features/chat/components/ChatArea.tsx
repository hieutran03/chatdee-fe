import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageInput from '../MessageInput';
import { useEffect, useRef, useState } from 'react';
import { useGetMessagesQuery } from '@/app/services/chat.service';
import { ScrollArea } from '@/components/scroll/ScrollArea';
import MessageItem from './MessageItem';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { joinConversation } from '../chat.actions';
import { useChatUI } from '../hooks/useChatUI';
import { useGetConversationQuery } from '@/app/services/conversation.service';
import { CompositeTitle } from './CompositeTitle';

export function ChatArea({
  conversationId,
  onOpenConversations,
}: {
  conversationId: string;
  onOpenConversations?: () => void;
}) {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const firstLoadRef = useRef<boolean>(true);
  const prevLenRef = useRef<number>(0);
  const loadingOlderRef = useRef<boolean>(false);
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

  // Fetch conversation to get official title/topMembers
  const { data: convResp } = useGetConversationQuery({
    id: conversationId,
    include: ['topMembers'],
  });
  const conversation = convResp?.data;

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

  // Always scroll to bottom when new messages are appended (not when loading older)
  useEffect(() => {
    const element = messagesContainerRef.current;
    if (!element) return;
    const prevLen = prevLenRef.current;
    if (messages.length > prevLen) {
      if (!loadingOlderRef.current) {
        requestAnimationFrame(() => {
          element.scrollTop = element.scrollHeight;
        });
      } else {
        // Reset the flag after handling older messages load
        loadingOlderRef.current = false;
      }
    }
    prevLenRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (resp && resp.data.items.length > 0) {
      const isFirstPage = !cursor;
      // Push into context store as well
      setPage(conversationId, resp.data.items, resp.data.meta?.prevCursor, {
        replace: isFirstPage,
      });
      // Keep local state for immediate rendering and scroll handling
      setPrevCursor(resp.data.meta?.prevCursor);
    }
  }, [resp]);

  // Keep local prevCursor in sync with store when switching conversations
  useEffect(() => {
    setPrevCursor(getPrevCursor(conversationId));
  }, [conversationId]);

  // Derive a simple title from participants in messages (fallback if no conversation meta)
  const otherNames = Array.from(
    new Map(
      messages
        .filter((m) => m.sender.id !== me?.id)
        .map((m) => [m.sender.id, m.sender.name || 'Member']),
    ).values(),
  );
  const derivedTitleFallback = otherNames.length
    ? `${otherNames.slice(0, 2).join(', ')}${otherNames.length > 2 ? ` +${otherNames.length - 2}` : ''}`
    : 'Đoạn chat';

  return (
    <>
      <Box display="grid" gridTemplateRows="auto 1fr auto" gap={2} overflow="hidden" minHeight={0}>
        <Box
          sx={{
            px: 1,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Inline hamburger only on small screens, so it won't cover the title */}
          <IconButton
            aria-label="Open conversations"
            onClick={() => onOpenConversations?.()}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            {conversation ? (
              conversation.title ? (
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {conversation.title}
                </Typography>
              ) : (
                <CompositeTitle members={conversation.topMembers} />
              )
            ) : (
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {derivedTitleFallback}
              </Typography>
            )}
          </Box>
        </Box>
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
                // Mark that we are loading older messages to prevent auto-scroll-to-bottom
                loadingOlderRef.current = true;
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
