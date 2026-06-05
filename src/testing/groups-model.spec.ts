import { db } from "@/lib/db";
import { groupMembers, groups } from "@/lib/db/models";
import { v4 as uuid4 } from "uuid";

jest.mock("uuid", () => ({
  v4: () => "00000000-0000-0000-0000-000000000000",
}));

describe("Group Model", () => {
  // const groupId = uuid4();

  beforeEach(async () => {
    // Clean up tables before running tests
    await db.delete(groupMembers);
    await db.delete(groups);
  });

  it("should create a group", async () => {
    const [group] = await db
      .insert(groups)
      .values({
        groupName: "Dorm A",
        inviteCode: "ABC123",
      })
      .returning();

    expect(group.id).toBeDefined();
    expect(group.groupName).toBe("Dorm A"),
    expect(group.inviteCode).toBe("ABC123");
  });

  it("should create a group member", async () => {
    const [group] = await db
      .insert(groups)
      .values({
        groupName: "Dorm A",
        inviteCode: "ABC123",
      })
      .returning();

    const [member] = await db
      .insert(groupMembers)
      .values({
        groupId: group.id,
        name: "Test User",
        isCreator: true
      })
      .returning();
    
    expect(member.id).toBeDefined();
    expect(member.groupId).toBe(group.id);
    expect(member.name).toBe("Test User");
    expect(member.isCreator).toBe(true);
  });

  it("should reject member with invalid groupId", async () => {
    await expect(
      db.insert(groupMembers).values({
        groupId: crypto.randomUUID(),
        name: "Test User",
        isCreator: false
      })
    ).rejects.toThrow();
  });

  it("should not allow duplicate invite code", async () => {
    await db.insert(groups).values({
      groupName: "Dorm A",
      inviteCode: "ABC123",
    });

    await expect(
      db.insert(groups).values({
        groupName: "Dorm A",
        inviteCode: "ABC123",
      })
    ).rejects.toThrow();
  });

  afterAll(async () => {
    // Clean up after tests
    await db.delete(groupMembers);
    await db.delete(groups);
  });
});