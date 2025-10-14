import { Box, Paper, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useListMessagesQuery } from '@/app/services/chat.service'
import MessageInput from './MessageInput'

export default function ChatPage() {
  const { data } = useListMessagesQuery()
  return (
    <Box p={2} display="grid" gridTemplateRows="1fr auto" height="100vh" gap={2}>
      <Paper sx={{ p:2, overflow:'auto' }}>
        <Typography variant="h6" mb={1}>Chat</Typography>
        <List>
          {data?.map(m => (
            <ListItem key={m.id}>
              <ListItemText primary={`${m.from} • ${new Date(m.createdAt).toLocaleTimeString()}`} secondary={m.text}/>
            </ListItem>
          ))}
        </List>
      </Paper>
      <MessageInput />
    </Box>
  )
}
