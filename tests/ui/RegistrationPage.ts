import { test, expect } from '@playwright/test';

// Only run the test on Chromium for debugging
test.describe('Registration Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page and wait for it to load
    await page.goto('https://abc13514.sg-host.com/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot at the start
    await page.screenshot({ path: 'test-results/page-loaded.png' });
    
    // Wait for form to be visible
    await page.waitForSelector('form', { state: 'visible', timeout: 10000 });
  });

  // Helper function to fill the registration form
  async function fillForm(
    page: any, 
    email: string, 
    confirmEmail: string, 
    password: string
  ) {
    const inputs = await page.locator('input').all();
    console.log(`Found ${inputs.length} input elements`);
    
    if (inputs.length < 3) {
      throw new Error(`Expected at least 3 input fields, found ${inputs.length}`);
    }
    
    // Email field (first input)
    await inputs[0].waitFor({ state: 'visible' });
    await inputs[0].fill(email);
    
    // Confirm email field (second input)
    await inputs[1].waitFor({ state: 'visible' });
    await inputs[1].fill(confirmEmail);
    
    // Password field
    const passwordField = page.locator('#password');
    await passwordField.waitFor({ state: 'visible', timeout: 5000 });
    await passwordField.focus();
    await passwordField.click();
    // Clear field first
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    // Type character by character with small delays
    await passwordField.type(password, { delay: 50 });
  }

  test('TC1: Happy path', async ({ page }) => {
    await fillForm(page, 'valid@example.com', 'valid@example.com', 'Password123');
    
    // Click the confirm button
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await button.click();
    
    // Take a final screenshot
    await page.screenshot({ path: 'test-results/tc1-success.png' });
    
    // Check for success message
    const successMsg = page.locator('text=Registration successful');
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });

  test('TC2: Email format invalid', async ({ page }) => {
    await fillForm(page, 'foo', 'foo', 'Password123');
    
    // Take a screenshot after filling the form
    await page.screenshot({ path: 'test-results/tc2-invalid-email.png' });
    
    // Check that the button is disabled
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeDisabled();
    
    // Check for any inline validation messages that appear immediately
    // This might be as an attribute, aria-label, or visible message
    const emailField = page.locator('input').first();
    
    // Get any validation attributes or messages
    const isValid = await emailField.evaluate((el: HTMLInputElement) => el.validity.valid);
    console.log('Email validity state:', isValid);
    
    // Take note of any client-side validation messages
    const validationMessage = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
    if (validationMessage) {
      console.log('Validation message:', validationMessage);
    }
    
    // Check for visible error messages - target specific email error by ID
    const emailErrorMsg = page.locator('#emailError');
    if (await emailErrorMsg.count() > 0) {
      await expect(emailErrorMsg).toBeVisible();
      const errorText = await emailErrorMsg.textContent();
      console.log('Email error message text:', errorText);
      await expect(emailErrorMsg).toContainText('valid email');
    } else {
      console.log('No visible error message found, but button is disabled as expected');
    }
  });

  test('TC3: Email mismatch', async ({ page }) => {
    await fillForm(page, 'valid@example.com', 'different@example.com', 'Password123');
    
    // Take a screenshot after filling form
    await page.screenshot({ path: 'test-results/tc3-error.png' });
    
    // Check that button is disabled
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeDisabled();
    
    // Check for error message
    const errorMsg = page.locator('#confirmEmailError');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Emails do not match');
  });

  test('TC4: Email too long', async ({ page }) => {
    await fillForm(page, 'toolongemailtoolongemail@example.com', 'toolongemailtoolongemail@example.com', 'Password123');
    
    // Take a screenshot after filling form
    await page.screenshot({ path: 'test-results/tc4-error.png' });
    
    // Check that button is disabled
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeDisabled();
    
    // Check for error message
    const errorMsg = page.locator('#emailError');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Email must not exceed 25 characters');
  });

  test('TC5: Password too short', async ({ page }) => {
    await fillForm(page, 'valid@example.com', 'valid@example.com', 'Pass1');
    
    // Take a screenshot after filling form
    await page.screenshot({ path: 'test-results/tc5-error.png' });
    
    // Check that button is disabled
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeDisabled();
    
    // Check for error message
    const errorMsg = page.locator('#passwordError');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('between 6 and 20 characters');
  });

  test('TC6: Password missing uppercase/digit', async ({ page }) => {
    await fillForm(page, 'valid@example.com', 'valid@example.com', 'password');
    
    // Take a screenshot after filling form
    await page.screenshot({ path: 'test-results/tc6-error.png' });
    
    // Check that button is disabled
    const button = page.locator('button:has-text("Confirm")');
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeDisabled();
    
    // Check for error message
    const errorMsg = page.locator('#passwordError');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('contain at least one capital letter');
  });
});
