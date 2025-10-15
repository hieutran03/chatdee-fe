import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import type { ConversationPreview } from '../utils';

type Props = {
  conversation: ConversationPreview;
  onClick?: () => void;
};

export default function ConversationItem({ conversation, onClick }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar>
            {conversation.participants
              .slice(0, 2)
              .map((p: string) => p[0]?.toUpperCase() ?? '?')
              .join('')}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={conversation.name}
          secondary={
            conversation.lastMessage
              ? `${conversation.lastMessage.text} • ${new Date(conversation.lastMessage.createdAt).toLocaleTimeString()}`
              : 'No messages yet'
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
