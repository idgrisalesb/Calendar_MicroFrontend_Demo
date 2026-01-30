---
name: 'step-02-check-branch'
description: 'Validate and enforce Git branch naming convention'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/4-implementation/dev-story'

# File References
thisStepFile: '{workflow_path}/steps/step-02-check-branch.md'
nextStepFile: '{workflow_path}/steps/step-03-load-context.md'
epicsFile: '{output_folder}/planning-artifacts/epics.md'
---

# Step 2: Git Branch Validation

## STEP GOAL:

Ensure development occurs on the correct feature branch (`Feature/{Epic_Name}`) corresponding to the selected story's Epic.

## MANDATORY EXECUTION RULES:

- 🛑 NEVER start development on `main` or `develop` directly
- 📖 Read `epics.md` to resolve Epic names
- 🔄 Create or checkout the branch automatically

## EXECUTION PROTOCOLS:

### 1. Identify Epic

Using the `story_key` identified in Step 1 (e.g., `1-2-user-auth`):

1.  Extract the **Epic ID** (the first number).
    *   Example: `1-2-user-auth` -> Epic ID = `1`.
2.  Load and read `{epicsFile}`.
3.  Find the Epic section matching this ID (e.g., `### Epic 1: Project Foundation & Configuration`).
4.  Extract the **Epic Name** (e.g., `Project Foundation & Configuration`).

### 2. Construct Branch Name

1.  Sanitize the Epic Name to create a valid Git branch name:
    *   Replace spaces with dashes `-`.
    *   Remove special characters.
    *   Use PascalCase or Kebab-Case as per project standard (Default to `Feature/Epic-Name-Sanitized`).
    *   Example: `Feature/Project-Foundation-Configuration`.

### 3. Check Current Branch

1.  Run `git branch --show-current`.
2.  Compare current branch with constructed `target_branch`.

### 4. Enforce Branch

**IF Current Branch == Target Branch:**
-   Output: `✅ Already on correct branch: {{target_branch}}`
-   Proceed to Next Step.

**IF Current Branch != Target Branch:**
1.  Check if `target_branch` exists: `git branch --list {{target_branch}}`.
2.  **IF Exists:**
    *   Run `git checkout {{target_branch}}`.
    *   Output: `🔄 Switched to existing branch: {{target_branch}}`.
3.  **IF Not Exists:**
    *   Run `git checkout -b {{target_branch}}`.
    *   Output: `✨ Created and switched to new branch: {{target_branch}}`.

### 5. Validation Fallback

If `epics.md` is missing or Epic cannot be identified:
1.  Ask user: "Could not detect Epic name for Story {{story_key}}. Please provide the target branch name or Epic name."
2.  Wait for input and create/switch manually.

### 6. Next Step

Load, read entire file, then execute `{nextStepFile}` (`step-03-load-context.md`).
