---
name: 'step-07-commit-push'
description: 'Safely commit and push verified code to the repository'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/4-implementation/code-review'

# File References
thisStepFile: '{workflow_path}/steps/step-07-commit-push.md'
workflowFile: '{workflow_path}/workflow.md'
outputFile: '{output_folder}/review-{story_key}.md'

# Data References
sprint_status_file: '{implementation_artifacts}/sprint-status.yaml'
epicsFile: '{output_folder}/planning-artifacts/epics.md'
---

# Step 7: Commit & Push

## STEP GOAL:
To securely persist the verified and approved code changes to the repository by validating the development branch and performing a git commit and push operation.

## MANDATORY EXECUTION RULES:
- 🛑 ONLY execute if the story status is explicitly 'done' or 'completed'
- 🌳 Ensure development is on the correct `Feature/{Epic_Name}` branch
- 📝 Commit messages must follow the standard format: "feat: implementation for story {{story_key}}"

## Sequence of Instructions

### 1. Verification of Status

**Goal**: ensure we are authorized to push code.

<action>
1. Load `{sprint_status_file}`.
2. Find the entry for `{{story_key}}` under `development_status`.
3. Check if the value is `done` (or `completed`).
</action>

<check if="status != 'done' AND status != 'completed'">
  <output>
  ⚠️ **COMMIT ABORTED**: Story status is '{{status}}'.
  Changes are only committed and pushed when the story is marked as 'done'.
  </output>
  <action>STOP execution. Do NOT run git commands.</action>
</check>

### 2. Branch Validation

**Goal**: Ensure code is committed to the correct Epic feature branch.

<check if="status == 'done' OR status == 'completed'">

  <action>
  1. Extract **Epic ID** from `{{story_key}}` (first number, e.g., '1' from '1-2-user-auth').
  2. Load and read `{epicsFile}`.
  3. Find the header matching `### Epic {Epic_ID}:`.
  4. Extract the Epic Name (e.g., "Project Foundation").
  5. Sanitize Epic Name (Pascal/Kebab case, replacing spaces with dashes: "Project-Foundation").
  6. Construct `target_branch` = `Feature/{Sanitized_Epic_Name}`.
  </action>

  <action>Run command `git branch --show-current` to get `current_branch`.</action>

  <check if="current_branch != target_branch">
      <output>🔄 Switching branches (Current: {{current_branch}} -> Target: {{target_branch}})...</output>

      <action>Check if target branch exists: `git branch --list {{target_branch}}`.</action>

      <if condition="branch exists">
          <action>Run `git checkout {{target_branch}}`.</action>
          <output>✅ Switched to existing branch: {{target_branch}}</output>
      </if>

      <if condition="branch does NOT exist">
          <action>Run `git checkout -b {{target_branch}}`.</action>
          <output>✨ Created and switched to new branch: {{target_branch}}</output>
      </if>
  </check>

  <check if="current_branch == target_branch">
      <output>✅ Already on correct branch: {{target_branch}}</output>
  </check>

</check>

### 3. Git Operations

**Goal**: Persist changes.

<check if="status == 'done' OR status == 'completed'">

  1. **Stage Changes**:
     <action>Run command `git add .`</action>

  2. **User Confirmation**:
     <output>
     READY TO COMMIT:
     - Branch: {{target_branch}}
     - Message: "feat: implementation for story {{story_key}}"

     Do you want to proceed with the commit and push?
     </output>

     <menu>
        <item cmd="C" action="continue">Yes, Commit & Push</item>
        <item cmd="M" action="exit">No, Cancel (Manual Handling)</item>
     </menu>

     <logic>
       <if selection="M">
          <output>🚫 Commit cancelled by user.</output>
          <output>Changes are staged. You can now commit manually.</output>
          <action>Update frontmatter of `{outputFile}`: `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`</action>
          <action>EXIT</action>
       </if>
     </logic>

  3. **Commit Changes**:
     <action>Run command `git commit -m "feat: implementation for story {{story_key}}"`</action>
     <check if="Commit failed (no changes?)">
        <output>ℹ️ No changes to commit.</output>
     </check>

  4. **Push to Remote**:
     <action>
     1. Identify current branch (should be {{target_branch}} now): `git branch --show-current`
     2. Push: `git push origin {{target_branch}}`
     </action>

     <check if="Push failed">
        <output>❌ **Push Failed**. Please check your network or permissions and try pushing manually.</output>
     </check>
     <check if="Push success">
        <output>✅ **Success**: Code pushed to origin.</output>
     </check>

</check>

### 4. Final Logging

<action>Append to `{outputFile}`:</action>
<template-output>
## Repository Sync
- **Branch**: {{target_branch}}
- **Commit**: [Performed/Skipped]
- **Push**: [Performed/Skipped]
- **Status**: Workflow Completed Successfully
</template-output>

### 5. Workflow Completion

<output>
🎉 **Workflow Completed**
The code review cycle for **{{story_key}}** is finished.
</output>

<action>Update frontmatter of `{outputFile}`: `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`</action>

<action>EXIT workflow.</action>
