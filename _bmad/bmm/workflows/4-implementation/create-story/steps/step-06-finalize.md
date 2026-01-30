---
name: 'step-06-finalize'
description: 'Update sprint status and finalize'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/4-implementation/create-story'

# File References
thisStepFile: '{workflow_path}/steps/step-06-finalize.md'
workflowFile: '{workflow_path}/workflow.md'

# Variables
sprint_status: '{implementation_artifacts}/sprint-status.yaml || {output_folder}/sprint-status.yaml'

# Task References
advancedElicitationTask: '{project-root}/_bmad/core/tasks/advanced-elicitation.xml'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.md'
---

# Step 6: Finalize & Handover

## STEP GOAL:
To update the project tracking (sprint status) and confirm the story is ready for development.

## EXECUTION PROTOCOLS:
- 🎯 Update sprint-status.yaml
- 🏁 Complete workflow

## INSTRUCTIONS:

### 1. Update Sprint Status
Load `{sprint_status}`.
- Find `development_status` for {{story_key}}.
- Update status from "backlog" to "ready-for-dev".
- Save file.

### 2. Validation (Optional)
Run validation check on the generated story file (structure check).

### 3. Final Report
Display:
```markdown
**🎯 TARGET LOCKED: Story {{story_key}} Ready for Dev!**

**Details:**
- File: {{story_file}}
- Status: ready-for-dev
- UI Mode: {{has_ui_component}} (siesa-ui-kit required: {{has_ui_component}})

**Next Action:**
- Run `dev-story` to begin implementation.
```

### 4. Present MENU OPTIONS

Display: "**Workflow Complete.**"
Display: "**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Finish"

#### Menu Handling Logic:
- IF A: Execute {advancedElicitationTask}
- IF P: Execute {partyModeWorkflow}
- IF C: EXIT workflow (Process Complete)

#### EXECUTION RULES:
- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed/exit when user selects 'C'
