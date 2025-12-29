import { test, expect} from "@playwright/test";

// Make sure that your server is running when doing the test

test("user can add an expense", async ({ page }) => {
  await page.goto("http://localhost:3000/app");

  // Go to the "Add Expense tab"
  await page.click("text=Add Expense");

  // Fill out the form
  await page.fill('input[placeholder="e.g. Electric Bill - September"]', 'Test Expense');
  await page.fill('input[placeholder="₱0.00"]', '1504.00');
  await page.click('button:has-text("Select who paid")');
  await page.click('text=You');

  // Submit the form
  await page.click('button:has-text("Add Expense")');

  // Assert the expense appears in the list
  await page.click('text=All Expenses');
  await expect(page.locator('text=Test Expense')).toBeVisible();
});