import { db } from "@/lib/db";
import { groupMembers, groups } from "@/lib/db/models";
import { v4 as uuid4 } from "uuid";

jest.mock("uuid", () => ({
  v4: () => "00000000-0000-0000-0000-000000000000",
}));

describe("groups and groupMembers models", () => {
  const groupId = uuid4();

  beforeAll(async () => {
    // Clean up tables before running tests
    await db.delete(groupMembers);
    await db.delete(groups);
  });

  it("should insert and retrieve a group", async () => {
    const [group] = await db.insert(groups).values({
      groupName: "Test Group",
    }).returning();

    expect(group).toHaveProperty("id");
    expect(group.groupName).toBe("Test Group");
  });

  // Initialize group for groupId reference
  beforeAll(async () => {
    await db.insert(groups).values({
      id: groupId,
      groupName: "Test Group"
    });
  }); 

  it("should insert and retrieve a group member", async () => {
    const [member] = await db.insert(groupMembers).values({
      groupId,
      name: "Test User",
      isCreator: true,
    }).returning();

    expect(member).toHaveProperty("id");
    expect(member.groupId).toBe(groupId);
    expect(member.name).toBe("Test User");
    expect(member.isCreator).toBe(true);
  });

  afterAll(async () => {
    // Clean up after tests
    await db.delete(groupMembers);
    await db.delete(groups);
  });
});