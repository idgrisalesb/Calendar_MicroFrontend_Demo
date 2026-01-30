# Step 11: Component Strategy

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on defining component library strategy and custom components
- 🎯 COLLABORATIVE component planning, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating component strategy content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper component insights
- **P (Party Mode)**: Bring multiple perspectives to define component strategy
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step's A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Design system choice from step 6 determines available components
- User journeys from step 10 identify component needs
- Focus on defining custom components and implementation strategy

## 🔴 CRITICAL: SIESA-UI-KIT MANDATORY CHECK

**BEFORE defining ANY component strategy, you MUST:**

1. **Load Company Standards** from `{company_standards_path}/frontend-standards.md`
2. **Check siesa-ui-kit FIRST** for every component need identified
3. **Follow the Component Decision Protocol** below

### Component Decision Protocol

For EVERY component needed in the UX specification:

```
┌─────────────────────────────────────────┐
│  Component Needed: [Component Name]      │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Is it in siesa-ui-kit?                 │
└─────────────────────────────────────────┘
          │                    │
         YES                   NO
          │                    │
          ▼                    ▼
┌─────────────────┐  ┌─────────────────────────┐
│ USE siesa-ui-kit │  │ ASK USER:               │
│ component AS-IS  │  │ [1] Use shadcn directly │
└─────────────────┘  │ [2] Create custom for   │
                     │     siesa-ui-kit (MR)   │
                     └─────────────────────────┘
```

### Why This Matters

| Rule | Impact |
|------|--------|
| **siesa-ui-kit first** | 90% fewer bugs vs manual creation |
| **Consistency** | Unified experience across all Siesa products |
| **Maintenance** | Platform team maintains shared components |
| **Compliance** | Meets company visual and accessibility standards |

### UI Text Language Rule

🔴 **MANDATORY**: All user-facing text in UX specifications MUST be in Spanish.

**✅ CORRECT:**
- Buttons: "Guardar", "Cancelar", "Enviar"
- Labels: "Nombre de usuario", "Contraseña"
- Messages: "Datos guardados correctamente"

**❌ INCORRECT:**
- Mixed: "Save cambios", "Failed al guardar"
- English: "Save", "Cancel", "Submit"

## YOUR TASK:

Define component library strategy and design custom components not covered by the design system.

## COMPONENT STRATEGY SEQUENCE:

### 1. Load siesa-ui-kit and Company Standards

🔴 **FIRST**: Before any analysis, load:
- `{company_standards_path}/frontend-standards.md`
- Check if siesa-ui-kit documentation exists in project

"Before we analyze components, let me load the company standards and siesa-ui-kit to ensure we follow Siesa's component guidelines."

### 2. Analyze Component Coverage (siesa-ui-kit FIRST)

Review components in this priority order:
1. **siesa-ui-kit** (company shared components) - USE FIRST
2. **Design System** from step 6 (shadcn/Radix) - fallback
3. **Custom components** - only if not in above

"Based on siesa-ui-kit and our chosen design system, let's identify what components are already available.

**🟢 Available from siesa-ui-kit:**
[List components from siesa-ui-kit that match our needs - THESE MUST BE USED]

**🟡 Available from Design System (shadcn/Radix):**
[List of components available but NOT in siesa-ui-kit]

**Components Needed for {{project_name}}:**
Looking at our user journeys and design direction, we need:

- [Component need 1 from journey analysis]
- [Component need 2 from design requirements]
- [Component need 3 from core experience]

**Gap Analysis (Components NOT in siesa-ui-kit or Design System):**

For each gap, we need to ask:
- [Gap 1] → [1] Use shadcn directly OR [2] Create for siesa-ui-kit?
- [Gap 2] → [1] Use shadcn directly OR [2] Create for siesa-ui-kit?"

### 3. Design Custom Components

For each custom component needed, design thoroughly:

**For each custom component:**
"**[Component Name] Design:**

**Purpose:** What does this component do for users?
**Content:** What information or data does it display?
**Actions:** What can users do with this component?
**States:** What different states does it have? (default, hover, active, disabled, error, etc.)
**Variants:** Are there different sizes or styles needed?
**Accessibility:** What ARIA labels and keyboard support needed?

Let's walk through each custom component systematically."

### 4. Document Component Specifications

Create detailed specifications for each component:

**Component Specification Template:**

```markdown
### [Component Name]

**Purpose:** [Clear purpose statement]
**Usage:** [When and how to use]
**Anatomy:** [Visual breakdown of parts]
**States:** [All possible states with descriptions]
**Variants:** [Different sizes/styles if applicable]
**Accessibility:** [ARIA labels, keyboard navigation]
**Content Guidelines:** [What content works best]
**Interaction Behavior:** [How users interact]
```

### 5. Define Component Strategy

Establish overall component library approach:
"**Component Strategy:**

**Foundation Components:** (from design system)

- [Foundation component 1]
- [Foundation component 2]

**Custom Components:** (designed in this step)

- [Custom component 1 with rationale]
- [Custom component 2 with rationale]

**Implementation Approach:**

- Build custom components using design system tokens
- Ensure consistency with established patterns
- Follow accessibility best practices
- Create reusable patterns for common use cases"

### 6. Plan Implementation Roadmap

Define how and when to build components:
"**Implementation Roadmap:**

**Phase 1 - Core Components:**

- [Component 1] - needed for [critical flow]
- [Component 2] - needed for [critical flow]

**Phase 2 - Supporting Components:**

- [Component 3] - enhances [user experience]
- [Component 4] - supports [design pattern]

**Phase 3 - Enhancement Components:**

- [Component 5] - optimizes [user journey]
- [Component 6] - adds [special feature]

This roadmap helps prioritize development based on user journey criticality."

### 7. Generate Component Strategy Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

```markdown
## Component Strategy

### siesa-ui-kit Components (Priority 1)

[List all components from siesa-ui-kit that will be used - THESE ARE MANDATORY]

### Design System Components (Priority 2)

[Components from shadcn/Radix not covered by siesa-ui-kit]

### Custom Components (Priority 3)

[Custom component specifications - only for gaps not covered above]
[Include decision: shadcn direct OR create for siesa-ui-kit MR]

### Component Implementation Strategy

[Component implementation strategy based on conversation]
[Include UI text language: Spanish for all user-facing text]

### Implementation Roadmap

[Implementation roadmap based on conversation]
```

### 8. Present Content and Menu

Show the generated component strategy content and present choices:
"I've defined the component strategy for {{project_name}}. This balances using proven design system components with custom components for your unique needs.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let's refine our component strategy
[P] Party Mode - Bring technical perspectives on component design
[C] Continue - Save this to the document and move to UX patterns

### 9. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current component strategy content
- Process the enhanced component insights that come back
- Ask user: "Accept these improvements to the component strategy? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current component strategy
- Process the collaborative component insights that come back
- Ask user: "Accept these changes to the component strategy? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/ux-design-specification.md`
- Update frontmatter: append step to end of stepsCompleted array
- Load `./step-12-ux-patterns.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ **siesa-ui-kit checked FIRST** before any component decisions
✅ Company standards loaded from `{company_standards_path}`
✅ Design system coverage properly analyzed (siesa-ui-kit → shadcn → custom)
✅ All custom components thoroughly specified
✅ Component strategy clearly defined with priority hierarchy
✅ **All UI text in Spanish** for user-facing elements
✅ Implementation roadmap prioritized by user need
✅ Accessibility considered for all components
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ **CRITICAL**: NOT checking siesa-ui-kit FIRST - creates components that already exist
❌ **CRITICAL**: Creating custom components without asking user (shadcn vs siesa-ui-kit MR)
❌ **CRITICAL**: UI text in English instead of Spanish
❌ Not loading company standards from `{company_standards_path}`
❌ Not analyzing design system coverage properly
❌ Custom components not thoroughly specified
❌ Missing accessibility considerations
❌ Component strategy not aligned with user journeys
❌ Implementation roadmap not prioritized effectively
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting 'C'

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-12-ux-patterns.md` to define UX consistency patterns.

Remember: Do NOT proceed to step-12 until user explicitly selects 'C' from the A/P/C menu and content is saved!
