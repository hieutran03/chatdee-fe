import { Paper, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import ConversationItem from './ConversationItem';
import type { ConversationPreview } from '../utils';

type Props = {
  conversations: ConversationPreview[];
};

export default function ConversationsList({ conversations }: Props) {
  return (
    <Paper sx={{ p: 1, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" mb={1} sx={{ px: 1 }}>
        Conversations
      </Typography>
      <Divider />
      <List>
        {conversations.map((c) => (
          <ConversationItem key={c.id} conversation={c} />
        ))}
        {conversations.length === 0 && (
          <ListItem>
            <ListItemText primary="No conversations" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}
