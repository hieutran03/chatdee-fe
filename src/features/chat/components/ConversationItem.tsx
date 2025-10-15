import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import { Conversation } from '../types';

type Props = {
  conversation: Conversation;
  onClick?: () => void;
};

export default function ConversationItem({ conversation, onClick }: Props) {
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

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          {/* If an avatar URL exists, use it as src; otherwise show computed initials */}
          <Avatar src={conversation.avatar}>{conversation.avatar ? undefined : initials}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={conversation.title}
          secondary={conversation.lastMessage ? `${conversation.lastMessage}` : 'No messages yet'}
        />
      </ListItemButton>
    </ListItem>
  );
}
