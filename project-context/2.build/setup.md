# Setup Documentation: SprintPilot AI

**Persona**: @project.mgr
**Epic**: setup-project
**Date**: 2026-03-07
**Status**: Complete

---

## 1. Overview

This document records all project scaffolding actions performed by the @project.mgr persona for the SprintPilot AI MVP. It covers directory structure, dependency installation, environment configuration, and handoff notes for downstream agents.

No application or business logic code was written. All placeholder files are annotated with the responsible downstream agent.

---

## 2. Prerequisites

| Tool | Version Verified | Purpose |
| :--- | :--------------- | :------ |
| Python | 3.12.3 | Backend runtime (FastAPI + CrewAI) |
| Bun | 1.3.10 | Frontend package manager, bundler, and runtime |
| Git | (pre-existing) | Version control |

---

## 3. Directory Structure Created

```
AI Sprint Planner/
├── frontend/                          # Next.js 16 + assistant-ui + shadcn/ui
│   ├── app/                           # Next.js App Router pages
│   │   ├── layout.tsx                 # Root layout (generated)
│   │   ├── page.tsx                   # Landing page (generated)
│   │   ├── globals.css                # Global styles (Tailwind, updated by shadcn)
│   │   ├── sprint/                    # Sprint planning route (@frontend.eng)
│   │   └── api/
│   │       ├── chat/                  # SSE proxy endpoint (@integration.eng)
│   │       └── health/                # Health check (@backend.eng)
│   ├── components/
│   │   ├── chat/                      # Chat UI components (@frontend.eng)
│   │   ├── layout/                    # Header, Sidebar (@frontend.eng)
│   │   └── ui/
│   │       └── button.tsx             # shadcn/ui base component (generated)
│   ├── lib/
│   │   ├── utils.ts                   # shadcn/ui utility (generated)
│   │   ├── types/                     # TypeScript type definitions (@frontend.eng)
│   │   └── utils/                     # Streaming utilities (@frontend.eng)
│   ├── public/                        # Static assets
│   ├── package.json
│   ├── bun.lock                       # Bun lockfile (committed)
│   ├── components.json                # shadcn/ui configuration
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── .env.example
│
├── backend/                           # Python FastAPI + CrewAI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # Entry point placeholder (@backend.eng)
│   │   ├── models/
│   │   │   └── __init__.py            # Pydantic models (@backend.eng)
│   │   ├── routes/
│   │   │   └── __init__.py            # FastAPI routes (@backend.eng)
│   │   └── tools/
│   │       └── __init__.py            # CrewAI tools (@backend.eng)
│   ├── config/
│   │   ├── agents.yaml                # Agent definitions placeholder (@backend.eng)
│   │   └── tasks.yaml                 # Task definitions placeholder (@backend.eng)
│   ├── tests/
│   │   └── __init__.py                # Test suite (@qa.eng)
│   ├── .venv/                         # Python virtual environment (gitignored)
│   ├── requirements.txt               # Production dependencies
│   ├── requirements-dev.txt           # Dev/test dependencies
│   ├── pyproject.toml                 # Project metadata, tool config
│   └── .env.example
│
├── project-context/
│   ├── 1.define/                      # Phase 1 artifacts (existing)
│   │   ├── mrd.md
│   │   ├── prd.md
│   │   ├── sad.md
│   │   └── sad-mvp.md
│   ├── 2.build/
│   │   ├── setup.md                   # THIS FILE
│   │   └── logs/                      # Runtime prompt traces and logs
│   └── 3.deliver/                     # Phase 3 artifacts
│
├── .cursor/                           # AAMAD framework (existing)
├── .env                               # Root environment (gitignored)
├── .env.example                       # Root environment template
├── .gitignore                         # Updated for full project structure
├── AGENTS.md                          # AAMAD bridge file (existing)
├── CHECKLIST.md                       # Execution checklist (existing)
└── README.md                          # Project README (existing)
```

---

## 4. Frontend Dependencies

Scaffolded via `bun create next-app frontend` with TypeScript, Tailwind CSS, ESLint, and App Router.

### Production Dependencies

| Package | Version | Purpose |
| :------ | :------ | :------ |
| next | 16.1.6 | React framework with App Router |
| react | 19.2.3 | UI library |
| react-dom | 19.2.3 | React DOM renderer |
| @assistant-ui/react | 0.12.15 | LLM chat interface (SAD-MVP Section 3) |
| @assistant-ui/react-ai-sdk | 1.3.12 | AI SDK adapter for assistant-ui |
| ai | 6.0.116 | Vercel AI SDK for streaming |
| zod | 4.3.6 | Schema validation (SAD-MVP Section 4) |
| class-variance-authority | 0.7.1 | Component variant utility (shadcn/ui) |
| clsx | 2.1.1 | Class name utility (shadcn/ui) |
| tailwind-merge | 3.5.0 | Tailwind class merging (shadcn/ui) |
| lucide-react | 0.577.0 | Icon library (shadcn/ui) |
| tw-animate-css | 1.4.0 | Animation utilities (shadcn/ui) |

### Dev Dependencies

| Package | Version | Purpose |
| :------ | :------ | :------ |
| typescript | 5.9.3 | Type checking |
| tailwindcss | 4.2.1 | Utility-first CSS |
| @tailwindcss/postcss | 4.2.1 | PostCSS integration |
| eslint | 9.39.4 | Linting |
| eslint-config-next | 16.1.6 | Next.js ESLint rules |
| @types/react | 19.2.14 | React type definitions |
| @types/react-dom | 19.2.3 | React DOM type definitions |
| @types/node | 20.19.37 | Node.js type definitions |
| shadcn | 4.0.0 | shadcn/ui CLI |

### shadcn/ui Initialization

Initialized via `bunx --bun shadcn@latest init -d`. Generated files:
- `components/ui/button.tsx` -- base button component
- `lib/utils.ts` -- `cn()` utility for class name merging
- `components.json` -- shadcn/ui project configuration
- Updated `app/globals.css` with CSS variables and Tailwind theme

---

## 5. Backend Dependencies

Python virtual environment created at `backend/.venv/` with Python 3.12.3.

### Production Dependencies (requirements.txt)

| Package | Version | Purpose |
| :------ | :------ | :------ |
| crewai[tools] | 1.10.1 | Multi-agent framework (SAD-MVP Section 2) |
| crewai-tools | 1.10.1 | CrewAI tool library |
| fastapi | 0.135.1 | Web framework (SAD-MVP Section 4) |
| uvicorn[standard] | 0.41.0 | ASGI server |
| pydantic | 2.11.10 | Data validation |
| python-dotenv | 1.1.1 | Environment variable loading |
| httpx | 0.28.1 | HTTP client |
| aiosqlite | 0.21.0 | Async SQLite driver (SAD-MVP Section 4) |
| sse-starlette | 3.3.2 | SSE streaming for FastAPI |
| openai | 2.26.0 | OpenAI API client (transitive via crewai) |

### Dev Dependencies (requirements-dev.txt)

| Package | Version | Purpose |
| :------ | :------ | :------ |
| pytest | >=8.0.0 | Test framework |
| pytest-asyncio | >=0.24.0 | Async test support |
| ruff | >=0.8.0 | Linting (SAD-MVP Section 6) |
| mypy | >=1.13.0 | Static type checking |

---

## 6. Environment Variable Catalog

All environment variables are documented in `.env.example` at three levels:

| Variable | Location | Default | Description |
| :------- | :------- | :------ | :---------- |
| AAMAD_ADAPTER | Root | crewai | AAMAD framework adapter |
| OPENAI_API_KEY | Root, Backend | (empty) | OpenAI API key -- **user must populate** |
| BACKEND_HOST | Root, Backend | 127.0.0.1 | FastAPI bind host |
| BACKEND_PORT | Root, Backend | 8000 | FastAPI bind port |
| BACKEND_LOG_LEVEL | Root, Backend | info | Logging level |
| NEXT_PUBLIC_API_URL | Root, Frontend | http://127.0.0.1:8000 | Backend URL for frontend |
| NEXT_PUBLIC_APP_NAME | Root, Frontend | SprintPilot AI | Application display name |
| CREWAI_VERBOSE | Root, Backend | false | CrewAI verbose logging |
| CREWAI_MAX_RPM | Root, Backend | 60 | CrewAI requests per minute limit |
| CREWAI_STORAGE_DIR | Root, Backend | ./project-context/2.build/logs | CrewAI log storage path |
| DATABASE_URL | Root, Backend | sqlite:///./sprintpilot.db | SQLite database path |

---

## 7. Verification Commands

### Frontend

```bash
cd frontend
bun run build        # Verify Next.js builds successfully
bun run dev          # Start dev server at http://localhost:3000
bun run lint         # Run ESLint checks
```

### Backend

```bash
cd backend
.venv\Scripts\activate                    # Windows
# source .venv/bin/activate               # macOS/Linux
python -c "import crewai; import fastapi; print('OK')"   # Verify imports
```

---

## 8. Downstream Agent Handoff

### @frontend.eng (`*develop-fe`)

- **Working directory**: `frontend/`
- **Package manager**: Bun (`bun add`, `bun run dev`, `bunx`)
- **Scaffolded**: Next.js 16 App Router + TypeScript + Tailwind CSS 4 + shadcn/ui + assistant-ui
- **Key entry points**:
  - `app/page.tsx` -- landing page (redirect to /sprint)
  - `app/sprint/` -- sprint planning chat interface (primary)
  - `components/chat/` -- custom chat components (StoryCard, EstimationDisplay, SprintPlanView, ApprovalGate)
  - `components/layout/` -- Header, Sidebar
  - `lib/types/` -- TypeScript type definitions (agent.ts, story.ts, sprint.ts)
  - `lib/utils/` -- streaming utilities
- **Reference**: SAD-MVP Section 3

### @backend.eng (`*develop-be`)

- **Working directory**: `backend/`
- **Runtime**: Python 3.12 venv at `backend/.venv/`
- **Scaffolded**: FastAPI + CrewAI + Pydantic + SQLite
- **Key entry points**:
  - `app/main.py` -- FastAPI application
  - `config/agents.yaml` -- CrewAI agent definitions (3 agents per SAD-MVP Section 2)
  - `config/tasks.yaml` -- CrewAI task definitions (3 tasks per SAD-MVP Section 2)
  - `app/models/` -- Pydantic request/response schemas
  - `app/routes/` -- FastAPI route handlers (/crew/execute, /crew/status, /health)
  - `app/tools/` -- CrewAI tool implementations
- **Reference**: SAD-MVP Sections 2, 4

### @integration.eng (`*integrate-api`)

- **Frontend SSE proxy**: `frontend/app/api/chat/route.ts` -- wire to backend `/crew/execute`
- **Frontend health**: `frontend/app/api/health/route.ts` -- wire to backend `/health`
- **Backend SSE events**: See SAD-MVP Section 4 for event types (agent_start, reasoning, tool_result, task_complete, approval_needed, crew_complete, error)
- **Reference**: SAD-MVP Section 4, Section 7

### @qa.eng (`*qa`)

- **Test directory**: `backend/tests/`
- **Frontend lint**: `bun run lint` (in `frontend/`)
- **Backend lint**: `ruff check .` (in `backend/`)
- **Quality gates**: SAD-MVP Section 6 (zero ESLint errors, zero ruff errors, type check pass, unit/integration test pass, build success)
- **Reference**: SAD-MVP Section 6

---

## Sources

1. SAD-MVP (project-context/1.define/sad-mvp.md) -- architecture decisions, technology stack, agent specifications
2. PRD (project-context/1.define/prd.md) -- feature requirements F1--F4, infrastructure specifications
3. adapter-crewai rules (.cursor/rules/adapter-crewai.mdc) -- YAML config patterns, tool binding, execution controls
4. AAMAD Core rules (.cursor/rules/aamad-core.mdc) -- agent contract, task contract, tooling rules

## Assumptions

1. Bun 1.3.10+ is available on all development machines. If not, install via `curl -fsSL https://bun.sh/install | bash` or `powershell -c "irm bun.sh/install.ps1 | iex"`.
2. Python 3.12+ is available. CrewAI 1.10.1 requires Python 3.10+.
3. The OpenAI API key must be populated in `.env` before backend crew execution.
4. SQLite is used for MVP; the schema is designed for PostgreSQL migration in Phase 2.

## Open Questions

1. Should the backend use `uv` instead of `pip` for faster dependency resolution? CrewAI 1.10.1 bundles `uv` as a transitive dependency.
2. Should frontend and backend share a single `.env` at root or maintain separate environment files?

## Audit

| Field | Value |
| :---- | :---- |
| Persona ID | @project.mgr |
| Task ID | setup-project |
| Action | Scaffold project structure, install dependencies, configure environment |
| Model | claude-4.6-opus (via Cursor IDE) |
| Temperature | Default (IDE-managed) |
| Target File | project-context/2.build/setup.md |
| Timestamp | 2026-03-07 |
| Frontend Runtime | Bun 1.3.10 |
| Frontend Framework | Next.js 16.1.6, React 19.2.3, TypeScript 5.9.3 |
| Frontend UI | assistant-ui 0.12.15, shadcn/ui 4.0.0, Tailwind CSS 4.2.1 |
| Backend Runtime | Python 3.12.3 |
| Backend Framework | FastAPI 0.135.1, CrewAI 1.10.1, Pydantic 2.11.10 |
| Database | SQLite via aiosqlite 0.21.0 |
| Directories Created | 15 new directories across frontend/, backend/, project-context/ |
| Env Files Created | 3 (.env.example at root, frontend, backend) |
| Placeholder Files | 8 (backend __init__.py files, main.py, agents.yaml, tasks.yaml) |
