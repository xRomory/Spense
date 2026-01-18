import { db } from "@/lib/db";
import { person } from "@/lib/db/models";

describe("person model", () => {
  beforeAll(async () => {
    await db.delete(person);
  });

  it("should insert and retrieve user", async () => {
    const [people] = await db.insert(person).values({
      name: "Juan Dela Cruz",
    }).returning();

    expect(people).toHaveProperty("id");
    expect(people.name).toBe("Juan Dela Cruz");
  });

  afterAll(async () => {
    await db.delete(person);
  });
});