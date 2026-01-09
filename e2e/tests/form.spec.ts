import { test, expect} from "@playwright/test";

// Make sure that your server is running when doing the test

test("user can create new group", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Fill out the form
  await page.fill('input[placeholder="e.g. Room 123, Trip to Boracay"]', 'Test Group');
  await page.fill('input[placeholder="Juan Dela Cruz"]', 'Test User');

  // Submit form
  await page.click('button:has-text("Create Group")');
});

test("user can add an expense", async ({ page }) => {
  // Create a group first
  await page.goto("http://localhost:3000");

  // Fill out the form
  await page.fill('input[placeholder="e.g. Room 123, Trip to Boracay"]', 'Test Group');
  await page.fill('input[placeholder="Juan Dela Cruz"]', 'Test User');

  // Submit form
  await page.click('button:has-text("Create Group")');

  // Go to the "Add Expense tab"
  await page.click("text=Add Expense");

  // Fill out the form
  await page.fill('input[placeholder="e.g. Electric Bill - September"]', 'Test Expense');
  await page.fill('input[placeholder="₱0.00"]', '1504.00');

  await page.click('button:has-text("Select who paid")');

  // Wait for the dropdown to appear
  await expect(page.locator('[role="option"]:has-text("Test User")')).toBeVisible();

  await page.click('[role="option"]:has-text("Test User")');

  // Submit the form
  await page.click('button:has-text("Add Expense")');

  // Assert the expense appears in the list
  await page.click('text=All Expenses');
  await expect(page.locator('text=Test Expense')).toBeVisible();
});