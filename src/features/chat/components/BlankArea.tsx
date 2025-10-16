import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlankArea() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1997eb',
        fontSize: 18,
        gap: 12,
      }}
    >
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <MessageCircle size={60} strokeWidth={1.5} />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        Select a conversation to start chatting 💬
      </motion.div>
    </div>
  );
}
