# Conventional Commit

A faster way to commit your changes with a nice, formatted commit message that follows the rulesets of [Conventional Commits](https://www.conventionalcommits.org)

#### Requirements

This project requires you to have a **Google Gemini API Key** and **git** installed locally on your machine

## Installation

```bash
bash <(curl -Ss https://raw.githubusercontent.com/myferr/conventional-commit/refs/heads/main/x.sh)
```

Then restart your shell or run `source ~/{YOUR_CONFIG_FILE}`

> Replace `{YOUR_CONFIG_FILE}` with your config file
> Examples: `.zshrc`, `.bashrc`

## Why?

Using [Conventional Commits](https://www.conventionalcommits.org) is a nice and neat way to make your project's history more readable, automate releases, and maintain cleaner collaboration. Here's why you should use them:

1. Conventional commits follow a structured format like:

```
feat: add user login support
fix: correct typo in signup message
chore: update dependencies
```

2. In a team setting (or your future self), a commit like:

```
fix: handle null values in API response
```

…is much clearer than:

```
update stuff
```

You instantly know what type of change was made, why, and how it affects the project.

3. Your Git log becomes a **narrative** of the project:

```bash
git log --oneline
```

might show:

```
feat: add OAuth support for GitHub
fix: sanitize user input in comment form
docs: add API usage example to README
```

That’s easier to scan than:

```
better auth
fixing things
final README tweaks
```
