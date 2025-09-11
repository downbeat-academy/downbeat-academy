# WWW Application Documentation

This directory contains comprehensive documentation for the Downbeat Academy WWW application, with a focus on testing, environment setup, and implementation details.

## Documentation Structure

### 📁 [setup/](./setup/)
Environment configuration and initial setup guides
- [environment-variables.md](./setup/environment-variables.md) - Complete environment variable reference
- [quick-start.md](./setup/quick-start.md) - Quick start guide for Cypress E2E testing

### 📁 [testing/](./testing/)
Testing-related documentation and guides
- [test-users.md](./testing/test-users.md) - Test user configuration and management
- [troubleshooting.md](./testing/troubleshooting.md) - Common issues and solutions
- [ci-cd.md](./testing/ci-cd.md) - CI/CD pipeline configuration

### 📁 [implementation/](./implementation/)
Implementation details and technical summaries
- [auth-test-fixes.md](./implementation/auth-test-fixes.md) - Authentication test failure resolutions
- [environment-validation.md](./implementation/environment-validation.md) - Environment validation system implementation

### 📁 [reference/](./reference/)
Quick reference materials
- [commands.md](./reference/commands.md) - All available npm scripts and commands

## Quick Links

- **New to testing?** Start with [Quick Start Guide](./setup/quick-start.md)
- **Setting up environment?** See [Environment Variables](./setup/environment-variables.md)
- **Having issues?** Check [Troubleshooting Guide](./testing/troubleshooting.md)
- **Need commands?** Reference [Command List](./reference/commands.md)

## Documentation Standards

### File Naming Convention
- Use kebab-case for all documentation files
- Keep names descriptive but concise
- Use `.md` extension for all documentation

### Content Format
- **Headers**: Use title case for main headers, sentence case for subheaders
- **Code blocks**: Include language identifier for syntax highlighting
- **Links**: Use relative links for internal documentation
- **Examples**: Provide practical examples where applicable

### Structure Guidelines
Each document should include:
1. Clear title and purpose statement
2. Table of contents for longer documents
3. Practical examples and code snippets
4. Related links section at the end
5. Last updated date (for time-sensitive content)

## Contributing to Documentation

When adding new documentation:
1. Place files in the appropriate subdirectory
2. Update this README with links to new files
3. Follow the formatting standards above
4. Include cross-references to related documents
5. Keep content concise and actionable

## For AI Agents

This documentation is structured to be both human and AI-friendly:
- Clear hierarchy for easy navigation
- Consistent formatting for reliable parsing
- Explicit file paths and cross-references
- Structured content with clear sections
- Command examples with expected outputs