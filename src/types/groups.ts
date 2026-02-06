export interface Group {
  id: string;
  groupName: string;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  name: string;
  isCreator: boolean;
  joinedAt: string;
}