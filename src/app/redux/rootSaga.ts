import { all, call, delay, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { joinConversation, sendMessage, SendMessagePayload } from '@/features/chat/chat.actions';

function getSocket(): any {
  return (window as any).socket;
}

function* waitForSocket(maxRetries = 20, ms = 100): SagaIterator {
  for (let i = 0; i < maxRetries; i++) {
    const s: any = yield call(getSocket);
    if (s) return s;
    yield delay(ms);
  }
  return null as any;
}

function* handleJoinConversation(action: ReturnType<typeof joinConversation>): SagaIterator {
  try {
    const socket: any = yield call(waitForSocket);
    if (socket) {
      console.log('Joining conversation via socket:', action.payload);
      socket.emit('join', { conversationId: action.payload });
    }
  } catch (e) {
    // no-op; could dispatch failure action
  }
}

function* handleSendMessage(action: ReturnType<typeof sendMessage>): SagaIterator {
  try {
    const payload: SendMessagePayload = action.payload;
    if (!payload.content?.trim()) return;
    const socket: any = yield call(waitForSocket);
    if (socket) {
      socket.emit('chat', payload);
    }
  } catch (e) {
    // no-op; could dispatch failure action
  }
}

export default function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(joinConversation.type, handleJoinConversation),
    takeLatest(sendMessage.type, handleSendMessage),
  ]);
}
