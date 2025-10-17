import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Stack,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { Conversation } from '../types';
import { useChatUI } from '../hooks/useChatUI';
import { motion } from 'framer-motion';
import { FormatTimeUtils } from '@/utils/formatTimeUtils';
import { RelativeTime } from '@/components/RelativeTime';
import { CompositeAvatar } from './CompositeAvatar';
import { CompositeTitle } from './CompositeTitle';

type Props = {
  conversation: Conversation;
};

export default function ConversationItem({ conversation }: Props) {
  const { setSelectedConversationId, selectedConversationId } = useChatUI();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedConversationId(conversation.id);
  };

  const initials =
    conversation.topMembers && conversation.topMembers.length > 0
      ? conversation.topMembers
          .slice(0, 2)
          .map((p) =>
            p.name && p.name[0] ? p.name[0].toUpperCase() : (p.avatar?.[0]?.toUpperCase() ?? '?'),
          )
          .join('')
      : conversation.title
        ? conversation.title
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : '?';

  const isSelected = selectedConversationId === conversation.id;

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleClick}
        sx={{
          py: 1.2,
          px: 1.5,
          borderRadius: 2,
          bgcolor: isSelected ? 'action.selected' : 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
            transform: 'translateX(2px)',
          },
        }}
      >
        <ListItemAvatar>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
            {conversation.avatar ? (
              <Avatar
                src={conversation.avatar}
                sx={{ width: 44, height: 44, bgcolor: '#1997eb', fontWeight: 600 }}
              />
            ) : (
              <CompositeAvatar members={conversation.topMembers} size={44} />
            )}
          </motion.div>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box
                component="span"
                sx={{
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? 'primary.main' : 'text.primary',
                }}
              >
                {conversation.title ? (
                  <Typography variant="subtitle1" noWrap component="span">
                    {conversation.title}
                  </Typography>
                ) : (
                  <CompositeTitle members={conversation.topMembers} />
                )}
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1, whiteSpace: 'nowrap' }}
                component="span"
              >
                {(() => {
                  const anyConv = conversation as any;
                  const ts = anyConv?.updatedAt ?? anyConv?.lastMessageAt ?? anyConv?.createdAt;
                  return ts ? <RelativeTime date={ts} /> : null;
                })()}
              </Typography>
            </Stack>
          }
          secondary={
            <Tooltip title={conversation.lastMessage ?? 'No messages yet'}>
              <Typography
                variant="body2"
                noWrap
                color="text.secondary"
                sx={{
                  maxWidth: 220,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                }}
                component="span"
              >
                {conversation.lastMessage ?? 'No messages yet'}
              </Typography>
            </Tooltip>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
