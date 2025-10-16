import { Typography, Divider, List, ListItem, ListItemText, Box } from '@mui/material';
import ConversationItem from './ConversationItem';
import { Conversation } from '../types';
import { ScrollArea } from '@/components/scroll/ScrollArea';
import { useGetConversationsQuery } from '@/app/services/conversation.service';
import { useEffect, useRef, useState } from 'react';

export default function ConversationsList() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const { data: resp, isFetching } = useGetConversationsQuery({
    limit: 10,
    cursor,
    include: 'topMembers,totalMembers',
  });

  const [items, setItems] = useState<Conversation[]>([]);
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (resp && resp.data) {
      // first page replace, subsequent pages append
      if (!cursor) {
        setItems([...resp.data.items].reverse() || []);
      } else {
        setItems((prev) => [...prev, ...([...resp.data.items].reverse() || [])]);
      }
      setPrevCursor(resp.data.meta?.prevCursor);
      console.log(
        '[ConversationsList] fetched page, cursor=',
        cursor,
        'prevCursor=',
        resp.data.meta?.prevCursor,
        'items=',
        resp.data.items,
      );
    }
  }, [resp]);

  return (
    <ScrollArea
      ref={containerRef}
      sx={{
        p: 1,
        height: '100%',
        overflow: 'auto',
        bgcolor: '#f5f5f5',
        border: '1px solid #ddd',
        borderRadius: 2,
      }}
      onScroll={(e: any) => {
        const el = e.currentTarget as HTMLDivElement;
        const threshold = 0.9;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight * threshold) {
          if (prevCursor && !isFetching) {
            console.log('[ConversationsList] loadMore triggered, setting cursor=', prevCursor);
            setCursor(prevCursor);
          }
        }
      }}
    >
      <Box>
        <Typography variant="h6" mb={1} sx={{ px: 1 }} textAlign="center">
          Conversations
        </Typography>
      </Box>

      <Divider />
      <List sx={{ display: 'flex', flexFlow: 'column', gap: 4 }}>
        {items.map((c) => (
          <ConversationItem key={c.id} conversation={c} />
        ))}
        {items.length === 0 && (
          <ListItem>
            <ListItemText primary="No conversations" />
          </ListItem>
        )}
      </List>
    </ScrollArea>
  );
}
