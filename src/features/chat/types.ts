import { UUID } from 'crypto';

export enum ConversationRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum ConversationType {
  GROUP = 1,
  DIRECT = 0,
}

export enum MessageTypeEnum {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  FILE = 'file',
  NOTIFICATION = 'notification',
}

export enum ChatActionEnum {
  SEND_MESSAGE = 'send_message',
  UPDATE_MESSAGE = 'update_message',
  DELETE_MESSAGE = 'delete_message',
  ADD_MEMBER = 'add_member',
  REMOVE_MEMBER = 'remove_member',
  UPDATE_MEMBER = 'update_member',
  LEAVE_CONVERSATION = 'leave_conversation',
  CHANGE_OWNER = 'change_owner',
  UPDATE_CONVERSATION = 'update_conversation',
}

export type Message = {
  id: string;
  content: string;
  conversationId: string;
  type: MessageTypeEnum;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: UUID;
    name: string;
    avatar: string;
  };
};

export type Member = {
  id: string;
  conversationRole: ConversationRole;
  name: string;
  avatar: string;
};

export type Conversation = {
  id: string;
  title: string;
  theme: string;
  avatar?: string;
  type: ConversationType;
  owner: Member;
  lastMessage: string;
  topMembers: Member[];
  totalMembers: number;
};
