import { Box, Drawer, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ConversationsList from './components/ConversationsList';
import { ChatArea } from './components/ChatArea';
import { useChatUI } from './hooks/useChatUI';
import BlankArea from './components/BlankArea';
// import { makeConversationsFromMessages } from './utils';
import { useState } from 'react';

export default function ChatPage() {
  const { selectedConversationId } = useChatUI();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Box
      p={2}
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '320px 1fr' }}
      gap={2}
      sx={{
        height: { xs: '100dvh', md: '100vh' },
        minHeight: 0,
        overflow: 'hidden',
        // Prevent grid children from forcing overflow and stretching the layout
        '& > *': { minWidth: 0, minHeight: 0 },
      }}
    >
      {/* Left pane - hidden on small screens */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <ConversationsList />
      </Box>

      {/* Mobile hamburger button */}
      <IconButton
        aria-label="Open conversations"
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { xs: 'inline-flex', md: 'none' },
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Conversations Drawer for mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Conversations
            </Typography>
            <IconButton aria-label="Close" onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, minHeight: 0 }}>
            <ConversationsList />
          </Box>
        </Box>
      </Drawer>

      {selectedConversationId !== null ? (
        <ChatArea key={selectedConversationId} conversationId={selectedConversationId} />
      ) : (
        <BlankArea />
      )}
      {/* Main chat area */}
    </Box>
  );
}
