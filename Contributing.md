# Contributing Guidelines

To maintain code quality and ensure smooth collaboration, please follow the guidelines below.

## 1. Pull Request (PR) Rules

- All changes must be made through a **Pull Request (PR)**.
- Direct merges to the `initialize` branch are not allowed.
- Each PR must be reviewed and approved by at least three team members before merging.
- The repository owner (Hoang Duy Thinh) will have the final decision on accepting or rejecting PRs.
- Ensure that your PR includes a clear description of the changes being made.

## 2. Commit Message Rules

- Commit messages must follow the **Conventional Commits** format:  
  ```<type>(<scope>): <subject>``` (the **scope** is optional)
  
  - **Type**: The type of change, such as:
    - `feat`: New feature
    - `fix`: Bug fix
    - `docs`: Documentation only changes
    - `style`: Changes that do not affect the meaning of the code (formatting, etc.)
    - `refactor`: Code changes that neither fix a bug nor add a feature
    - `test`: Adding or updating tests
  - **Scope**: The area of the project affected (e.g., `library`, `user`, `API`).
  - **Subject**: A short, clear description of the change.
  
  **Examples**:  
  ```feat(client/homepage): implement homepage ui/ux```  
  ```fix(server/user): correct issue with login validation```

## 3. Branch Naming Rules

- Branch names should be descriptive and use the following structure:  
  ```<type>/<short-description>```  
  **Types**:
  - `feature/` for new features (e.g., `feature/save-product-functionality`)
  - `bugfix/` for fixing bugs (e.g., `bugfix/fix-issue-123`)
  - `hotfix/` for critical hotfixes (e.g., `hotfix/security-patch`)

## 4. Code Style

- All code should follow a consistent style.
- Use **tabs** for indentation, equivalent to **2 spaces**.
- Add comments to explain complex logic or important details in the code.

## 5. Unit Tests

- Every new feature or significant change should include appropriate **unit tests**.

## 6. Continuous Integration

- CI tools will automatically run tests on each PR. Ensure all tests pass before requesting a review.

Following these guidelines to keep the project organized and ensure high-quality code.
