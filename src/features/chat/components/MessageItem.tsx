import { Avatar, Box, Stack, Typography } from '@mui/material';
import { RelativeTime } from '@/components/RelativeTime';
import type { Message } from '../types';

export type MessageItemProps = {
  message: Message;
  isOwn?: boolean;
  showAvatar?: boolean;
  showName?: boolean;
};

/**
 * Renders a single chat message with bubble styling.
 * Aligns right for current user's messages, left for others.
 */
export function MessageItem({ message, isOwn = false, showAvatar = !isOwn, showName = !isOwn }: MessageItemProps) {
  const initials = (message.sender?.name || '?').trim()[0]?.toUpperCase() || '?';

  return (
    <Box
      data-message-id={message.id}
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        px: 1,
        py: 0.5,
      }}
    >
      <Stack direction={isOwn ? 'row-reverse' : 'row'} spacing={1.25} alignItems="flex-end" maxWidth="100%">
        {showAvatar ? (
          <Avatar src={message.sender?.avatar} alt={message.sender?.name} sx={{ width: 32, height: 32 }}>
            {initials}
          </Avatar>
        ) : (
          <Box sx={{ width: 32, height: 32 }} />
        )}

        <Box
          sx={(theme) => ({
            maxWidth: '85%',
            bgcolor: isOwn ? theme.palette.primary.main : theme.palette.grey[200],
            color: isOwn ? theme.palette.primary.contrastText : theme.palette.text.primary,
            px: 1.25,
            py: 0.75,
            borderRadius: 1.5,
            borderTopRightRadius: isOwn ? 4 : 12,
            borderTopLeftRadius: isOwn ? 12 : 4,
            boxShadow: isOwn ? 1 : 0,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {/* Optional Sender Name (for others) */}
          {showName && (
            <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.9, mb: 0.25 }}>
              {message.sender?.name}
            </Typography>
          )}

          {/* Content */}
          <MessageBody content={message.content} type={message.type} />

          {/* Footer: time aligned to the right, always shown */}
          <Typography
            variant="caption"
            sx={{
              alignSelf: 'flex-end',
              mt: 0.5,
              opacity: 0.8,
              fontSize: '0.8rem',
            }}
          >
            <RelativeTime date={message.createdAt} />
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function MessageBody({ content }: { content: string; type: Message['type'] }) {
  // Extend here later for image/video/file types.
  return (
    <Typography variant="body2" component="div">
      {content}
    </Typography>
  );
}

export default MessageItem;
