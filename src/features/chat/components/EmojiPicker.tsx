import { useCallback, useRef, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import 'emoji-picker-element';

export type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
};

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pickerNodeRef = useRef<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Callback ref to ensure we always attach/detach the custom event listener
  const setPickerRef = useCallback((node: any) => {
    // Detach from previous
    if (pickerNodeRef.current) {
      pickerNodeRef.current.removeEventListener('emoji-click', onEmojiClick as EventListener);
    }
    pickerNodeRef.current = node as HTMLElement | null;
    // Attach to new
    if (pickerNodeRef.current) {
      pickerNodeRef.current.addEventListener('emoji-click', onEmojiClick as EventListener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEmojiClick = (event: any) => {
    // Different versions expose either detail.unicode or detail.emoji.unicode
    const unicode: string | undefined = event?.detail?.unicode ?? event?.detail?.emoji?.unicode;
    if (unicode) {
      onSelect(unicode);
      handleClose();
    }
  };

  return (
    <>
      <IconButton aria-label="Emoji" onClick={handleOpen} size="large">
        <EmojiEmotionsIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 0 } } }}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore - custom element from emoji-picker-element */}
        <emoji-picker ref={setPickerRef} style={{ height: 360 }}></emoji-picker>
      </Popover>
    </>
  );
}
