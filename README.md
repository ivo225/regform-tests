# Registration Form Test Automation

This project contains automated UI tests for a registration form. The tests validate the form's validation rules.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

## Test Files Structure

- `tests/ui/RegistrationPage.ts` - UI tests for the registration form

## Test Cases

1. **TC1: Happy path** - Tests the successful completion of the registration form with valid data.
2. **TC2: Email format invalid** - Tests validation for incorrect email format.
3. **TC3: Email mismatch** - Tests validation when email and confirmation email don't match.
4. **TC4: Email too long** - Tests validation when email exceeds 25 characters.
5. **TC5: Password too short** - Tests validation when password is less than 6 characters.
6. **TC6: Password missing uppercase/digit** - Tests validation when password lacks an uppercase letter.

## Configuration

- `playwright.config.ts` - Configuration for the tests

## Screenshots

Test screenshots are saved to the `test-results` directory during test execution.
