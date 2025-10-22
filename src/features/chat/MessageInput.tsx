import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { sendMessage } from './chat.actions';

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const onSend = () => {
    const content = text.trim();
    if (!content) return;
    dispatch(sendMessage({ conversationId, content, type: 'text' }));
    setText('');
  };

  return (
    <Box sx={{ p: 1.5, display: 'flex', gap: 1, bgcolor: '#f5f5f5', borderRadius: 2 }}>
      <TextField
        fullWidth
        size="medium"
        placeholder="Nhập tin nhắn…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <IconButton sx={{ color: '#38e1ffe0' }} onClick={onSend} disabled={!text.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
