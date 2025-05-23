# Contributing to Hafla

Thanks for your interest in contributing to **[Hafla]**!. Here are a few guidelines to help you get started.

## Table of Contents
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)
- [Community Standards](#community-standards)

## Getting Started

To contribute, you'll need to have a working development environment. Here’s how to set it up:

1. Fork the repository.
2. Clone your fork:

   ```bash
   git clone https://github.com/letsspice/hafla.git
   cd hafla
   ```
3. Install dependencies:
    ```
    bundle install
    ```
4. Set up the database:
    ```
    rails db:setup
    ```
5. Run the app:
    ```
    bin/dev
    ```

## How to Contribute
- Bug reports: Please create an issue describing the problem with steps to reproduce.

- Feature requests: Feel free to suggest new features via issues or discussions.

- Code contributions: We welcome pull requests! Please read the PR guidelines below.

## Pull Request Guidelines

1. Fork the repository and create your branch from develop:

```
git checkout -b feature/your-feature-name
```
2. Make your changes.
3. Ensure tests pass:
```
bundle exec rspec
```
4. Commit your changes with clear messages.
5. Push to your fork and submit a Pull Request.
6. Fill out the PR template and explain your changes clearly.

## Pull Request Template
Submit PRs with clear, concise titles and descriptions.

Reference related issues using Fixes #issue_number when applicable.

Ensure all tests pass.

After your PR is approved and merged, delete your feature branch.

When submitting a PR, please use the following format in the PR description:

        ### What
        Briefly explain what this PR does and why.

        ### Changes
        - [x] List out major changes in this PR
        - [x] If applicable, note any migrations, env changes, or configs added

        ### How to Test
        Steps to test this feature locally:
        1. ...
        2. ...
        3. ...

        ### Screenshots (if applicable)
        Attach UI screenshots or before/after comparisons.

        ### Notes
        Any additional context or considerations.

        ### Checklist
        - [ ] Code compiles and runs
        - [ ] Tests added or updated
        - [ ] All tests passing
        - [ ] Branch ready to be deleted after merge

## Code Style
Follow the existing code conventions.

Use Rubocop for Ruby code linting.

```
 bundle exec rubocop -A
```

## Reporting Issues
If you find a bug or have a suggestion, please open an issue. Include as much detail as possible, including:

Steps to reproduce

Expected behavior

Screenshots/logs (if applicable)

Your environment (OS, browser, Ruby/Rails version, etc.)

## Community Standards
We adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.




