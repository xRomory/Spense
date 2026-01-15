import { db } from "@/lib/db";
import { expenses, person } from "@/lib/db/models";
import { v4 as uuid4 } from "uuid";

jest.mock("uuid", () => ({
  v4: () => "00000000-0000-0000-0000-000000000000",
}));

describe("expenses and expenseSplit models", () => {
  const dateNow = new Date();
  const personId = uuid4();

  beforeAll(async () => {
    await db.delete(expenses);
    await db.delete(person);

    await db.insert(person).values({
      id: personId,
      name: "Test Person",
    });
  });

  it("should create an expense transaction but not settled", async() => {
    
    const [expense] = await db.insert(expenses).values({
      title: "Test Expense - January",
      amount: "1129.15",
      paidBy: personId,
      splitType: "equal",
      date: dateNow,
      settled: false,
    }).returning();

    expect(expense).toHaveProperty("id");
    expect(expense.title).toBe("Test Expense - January");
    expect(expense.amount).toBe("1129.15");
    expect(expense.paidBy).toBe(personId);
    expect(expense.splitType).toBe("equal");
    expect(expense.date).toStrictEqual(dateNow);
    expect(expense.settled).toBe(false);
  });

  afterAll(async() => {
    await db.delete(expenses);
    await db.delete(person);
  });
});