# Registration Form UI Test Automation Suite

This repository contains an automated UI test suite for a simple registration form application hosted at https://abc13514.sg-host.com/. The suite is using Playwright and TypeScript.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Testing Approach](#testing-approach)
- [UI Test Matrix](#ui-test-matrix)

## Project Overview

Automated end-to-end UI tests for the registration form application. The form includes:

- Email address and Confirm email address
  - Valid email format
  - Maximum length: 25 characters
  - Both entries must match
- Password
  - 6–20 characters long
  - At least one uppercase letter
  - At least one digit
- A Confirm button to submit

Client-side validations ensure the user is guided correctly before the form is submitted.

## Prerequisites

- Node.js ≥ 16.x
- npm or yarn
- VS Code with:
  - ESLint
  - Prettier
  - Playwright Test for VS Code

## Installation & Setup

Clone the repo

```bash
git clone https://github.com/ivo225/regform-tests
cd regform-tests
```

Install dependencies

```bash
npm install
# or
yarn install
```

Install Playwright browsers

```bash
npx playwright install
# or
yarn playwright install
```

Verify TypeScript compilation

```bash
npx tsc --noEmit
```

## Project Structure

```
├─ tests/
│   └─ ui/
│       └─ RegistrationPage.ts          # Combined UI tests and page interactions
├─ .eslintrc.js                         # ESLint rules
├─ .prettierrc                          # Prettier rules
├─ package.json
├─ package-lock.json
├─ playwright.config.ts                 # Playwright configuration
├─ tsconfig.json                        # TypeScript settings
└─ README.md                            # This file
```

## Running Tests

Run all UI tests:

```bash
npm test
# or
npx playwright test
```

Show HTML report:

```bash
npx playwright show-report
```

## Testing Approach

- Playwright + TypeScript: unified framework for UI automation, with type safety.
- Page Object Model (POM): encapsulate selectors and actions within RegistrationPage.ts alongside tests.
- Data-driven & boundary checks: isolate each validation rule and its edge cases.
- Reusability: common helpers for navigation, filling, and assertions.

## UI Test Matrix

| ID   | Scenario                      | Expected Behavior                              |
|------|-------------------------------|------------------------------------------------|
| TC1  | Happy path                    | Success message displayed                      |
| TC2  | Invalid email format          | Inline error, button disabled                  |
| TC3  | Email mismatch                | Inline "Emails do not match" error             |
| TC4  | Email length > 25             | Inline "must not exceed 25 characters" error   |
| TC5  | Password length < 6           | Inline "6–20 characters" error                 |
| TC6a | Password missing uppercase    | Inline "must contain at least one uppercase" error |
| TC6b | Password missing digit        | Inline "must contain at least one digit" error |
| TC7  | Boundary values (6, 20, 25 chars) | No errors at exact limits; errors just outside them |

Test results are automatically generated after each test run and can be viewed through the Playwright HTML report.
