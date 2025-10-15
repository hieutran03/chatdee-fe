import { Paper, Typography, Divider, List, ListItem, ListItemText, Box } from '@mui/material';
import ConversationItem from './ConversationItem';
import { Conversation } from '../types';

type Props = {
  conversations: Conversation[];
};

export default function ConversationsList({ conversations }: Props) {
  return (
    <Box
      sx={{
        p: 1,
        height: '100%',
        overflow: 'auto',
        bgcolor: '#f5f5f5',
        border: '1px solid #ddd',
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h6" mb={1} sx={{ px: 1 }} textAlign="center">
          Conversations
        </Typography>
      </Box>

      <Divider />
      <List sx={{ display: 'flex', flexFlow: 'column', gap: 4 }}>
        {conversations.map((c) => (
          <ConversationItem key={c.id} conversation={c} />
        ))}
        {conversations.length === 0 && (
          <ListItem>
            <ListItemText primary="No conversations" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
