import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useSendMessageMutation } from '@/app/services/chat.service';

export default function MessageInput() {
  const [text, setText] = useState('');
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const onSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ text }).unwrap();
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
      <IconButton onClick={onSend} disabled={isLoading}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
