import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useListMessagesQuery } from '@/app/services/chat.service';
import MessageInput from './MessageInput';
import ConversationsList from './components/ConversationsList';
import { useGetConversationsQuery } from '@/app/services/conversation.service';
// import { makeConversationsFromMessages } from './utils';

export default function ChatPage() {
  const { data } = useListMessagesQuery();

  const { data: conversationResponse } = useGetConversationsQuery();
  const conversations = conversationResponse?.data?.items || [];
  return (
    <Box
      p={2}
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '320px 1fr' }}
      gap={2}
      height="100vh"
    >
      <ConversationsList conversations={conversations} />

      {/* Main chat area */}
      <Box display="grid" gridTemplateRows="1fr auto" gap={2}>
        <Paper sx={{ p: 2, overflow: 'auto' }}>
          <List>
            {data?.map((m) => (
              <ListItem key={m.id}>
                <ListItemText
                  primary={`${m.from} • ${new Date(m.createdAt).toLocaleTimeString()}`}
                  secondary={m.text}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <MessageInput />
      </Box>
    </Box>
  );
}
