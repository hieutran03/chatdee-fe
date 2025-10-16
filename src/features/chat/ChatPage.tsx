import { Box } from '@mui/material';
import ConversationsList from './components/ConversationsList';
import { ChatArea } from './components/ChatArea';
import { useChatUI } from './hooks/useChatUI';
import BlankArea from './components/BlankArea';
// import { makeConversationsFromMessages } from './utils';

export default function ChatPage() {
  const { selectedConversationId } = useChatUI();
  return (
    <Box
      p={2}
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '320px 1fr' }}
      gap={2}
      height="100vh"
    >
      <ConversationsList />
      {selectedConversationId !== null ? (
        <ChatArea key={selectedConversationId} conversationId={selectedConversationId} />
      ) : (
        <BlankArea />
      )}
      {/* Main chat area */}
    </Box>
  );
}
