import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { sendMessage } from './chat.actions';
import EmojiPicker from './components/EmojiPicker';

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onSend = () => {
    const content = text.trim();
    if (!content) return;
    dispatch(sendMessage({ conversationId, content, type: 'text' }));
    setText('');
    // Keep focus on input after sending
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const insertAtCursor = (emoji: string) => {
    const el = inputRef.current;
    if (!el) return;

    // Ensure input focused to get correct caret position
    el.focus();
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;

    // Use functional update to avoid any stale state issues
    setText((prev) => {
      const before = prev.slice(0, start);
      const after = prev.slice(end);
      const next = before + emoji + after;

      // Restore caret position after state update based on the indices we captured
      const caretPos = start + emoji.length;
      requestAnimationFrame(() => {
        el.setSelectionRange(caretPos, caretPos);
        el.focus();
      });

      return next;
    });
  };

  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        gap: 1,
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        alignItems: 'center',
      }}
    >
      <EmojiPicker onSelect={(emoji: string) => insertAtCursor(emoji)} />

      <TextField
        fullWidth
        size="medium"
        placeholder="Nhập tin nhắn…"
        value={text}
        inputRef={inputRef}
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
