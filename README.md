## Activity Dashboard Mini App — Candidate Assignment

Welcome aboard! This assignment gives us insight into your full-stack product instincts: frontend craft, backend/API design, containerization, and DevOps hygiene. Feel free to lean on modern AI tools—the objective is to demonstrate how you build efficiently and thoughtfully. Expect to spend roughly one focused day.

---

## Objective

Ship a fully containerized web app that lets users:
- Log in
- Review existing activity logs
- Create new activity logs
- View summary analytics generated from those logs

The brief is intentionally domain-neutral. We’re evaluating how you architect, implement, and communicate an end-to-end solution.

---

## Activity Log Definition

Each log captures a single action:
- `id` — auto-generated identifier
- `user` — string
- `action_type` — string (e.g., `created`, `updated`, `deleted`)
- `description` — text
- `value` — number
- `timestamp` — datetime

This is straightforward CRUD—no extra business rules needed.

---

## Functional Requirements

### 1. Login
- Email + password fields
- Authentication can rely on hardcoded credentials
- Successful login routes to the dashboard

### 2. Dashboard
- **Summary cards** (≥4) that show Total Activities, Total Value, Most Common Action Type, Most Active User
- **Activity table** with columns `user`, `action_type`, `description`, `value`, `timestamp`; sortable by timestamp and value at minimum; paginated or infinite scroll
- **Add-log workflow** (modal, drawer, or page) that captures every log field and refreshes both the table and the summary cards immediately

---

## Backend Requirements

Use any language or framework. Expose these endpoints:

| Purpose | Method & Path | Notes |
| --- | --- | --- |
| Authentication | `POST /auth/login` | Hardcoded users allowed |
| Create log | `POST /logs` | Persist a new activity entry |
| List logs | `GET /logs` | Return all logs with metadata |
| Summary stats | `GET /stats/summary` | Respond with `total_activities`, `total_value`, `most_common_action`, `most_active_user` |
| Health check | `GET /health` | Return `{ "status": "ok" }` |

Choose any database (MySQL, Postgres, MongoDB, SQLite, etc.). Data must survive restarts via a Docker volume.

---

## Docker & DevOps Expectations

The entire system should launch with:

```
docker-compose up --build
```

Compose must orchestrate three services: `frontend`, `backend`, `database`. Please also include:
- Multi-stage Dockerfiles for frontend and backend
- `.env.example` capturing required environment variables
- Clear port exposure and inter-container networking
- Useful logging plus readiness/health indicators

---

## Project Structure Guidance

Design the repository structure you would want to inherit: clear boundaries, sensible naming, and documentation for notable decisions (`README`, `ARCHITECTURE.md`, ADRs, etc.). The layout should make future maintenance straightforward.

---

## Evaluation Rubric

1. **Architecture & Code Quality** — separation of concerns, clarity, naming
2. **Frontend Execution** — UX quality, component reuse, state management
3. **Backend Quality** — API design, validation, error handling, data modeling
4. **Docker & DevOps** — build repeatability, environment management, observability
5. **Velocity & AI Usage** — ability to use modern tooling without compromising quality

---

## Submission Checklist

1. Fork this repo (or clone → fresh repo)
2. Build your solution
3. Confirm everything runs with `docker-compose up --build`
4. Share the public repository link

---

## Questions

If anything is unclear, open an issue or reach out to your point of contact—we’re happy to clarify. Thanks for taking the time, and enjoy the build!
