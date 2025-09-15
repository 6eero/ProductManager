# Next.js Boilerplate 🚀

A **scalable Next.js boilerplate** designed to bootstrap new projects with a clean and extensible architecture.
It provides a well-defined pattern for **state management**, **API interactions**, **error/loading handling**, and **internationalization**.

---

## 🔑 Key Features

- **Next.js 13+ App Router** with i18n support.
- **Global state management** with Context + Reducers.
- **Async actions lifecycle** (`START → SUCCESS → FAIL`) for consistent state transitions.
- **Encapsulated API calls** with normalized responses.
- **Predefined components** for error and loading handling.
- **i18n-ready** with message catalogs (`en`, `it`, …).
- **Modular structure**: easily add new features without breaking global architecture.

---

## 📂 Project Structure

```
.
├── api/                # Application-wide API calls and async tasks
│   └── App/
│       ├── endpoint.ts   # Encapsulated API calls (e.g. whoAmI)
│       └── tasks.ts      # Async logic dispatching actions + endpoints
│
├── app/                # Next.js App Router
│   ├── [locale]/        # Locale-aware routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
│
├── components/         # Reusable UI components
│   ├── error/
│   │   └── ErrorBlock.tsx
│   └── layout/
│       ├── Loading.tsx
│       └── ResourceLoader.tsx
│
├── context/            # Application contexts
│   ├── App.tsx          # App context provider (state + dispatch)
│   └── Contexts.d.ts    # Shared context types
│
├── i18n/               # Internationalization utilities
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
│
├── messages/           # Translations
│   ├── en/
│   │   ├── common.json
│   │   └── errors.json
│   └── it/
│       ├── common.json
│       └── errors.json
│
├── models/             # Data models (per feature/module)
│   └── app/
│
├── modules/            # Business logic per feature
│   └── app/
│       ├── actions.ts   # Action creators (async lifecycle)
│       ├── App.tsx      # Feature-specific components
│       └── reducer.ts   # Reducer managing feature state
│
├── utils/              # Utilities and helpers
│   ├── actions/
│   │   └── functions.ts # Async action generator
│   └── types/           # Shared TypeScript types
│
├── public/             # Static assets
├── middleware.ts       # Middleware (e.g. i18n routing)
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── README.md
```

---

## ⚙️ Flow Overview

Each async operation follows a **predictable lifecycle**:

```
Component → Task → Action → Reducer → State → UI
```

1. **Task** (`tasks.ts`)

   - Dispatches `START` action.
   - Calls endpoint.
   - Dispatches `SUCCESS` or `FAIL`.

2. **Actions** (`actions.ts`)

   - Define `START`, `SUCCESS`, `FAIL` action creators.

3. **Reducer** (`reducer.ts`)

   - Updates `state.data`, `state.loading`, `state.error` consistently.

4. **State** (`context/App.tsx`)

   - Global state exposed via Context API.

5. **UI** (`components/`)

   - Components read `loading`, `error`, and `data` to render feedback.

---

## 🏗 Adding a New Module

To add a new module (e.g., `user`):

1. Create a folder: `modules/user/`

   - `actions.ts` → define async actions.
   - `reducer.ts` → handle lifecycle updates.
   - `User.tsx` → optional UI entrypoint.

2. Create `api/User/`

   - `endpoint.ts` → encapsulate API calls.
   - `tasks.ts` → define async tasks calling endpoints + dispatching actions.

3. Extend `context/` to register new reducer if needed.

This guarantees that **each feature is isolated but follows the same rules**.

## 📖 How to Use this Boilerplate

This repository is configured as a **GitHub Template**, so you can easily start new projects while preserving the full Git history:

1. Click the green **“Use this template”** button at the top of the repository.
2. Choose **“Create a new repository”**.
3. GitHub will generate a brand-new repo with all files and commit history from the boilerplate.
4. Clone your new repo and start building:

   ```bash
   git clone git@github.com:6eero/nextjs-boilerplate.git my-new-project
   cd my-new-project
   npm install
   npm run dev
   ```

---

## 📖 Example

Inside a page or component:

```tsx
"use client";
import { useAppContext } from "@/context/App";
import { useAppActions } from "@/api/App/tasks";

export default function HomePage() {
  const { data, loading, error } = useAppContext();
  const { onWhoAmI } = useAppActions();

  return (
    <div>
      <button onClick={onWhoAmI}>Check Session</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {data?.name && <p>Welcome, {data.name}!</p>}
    </div>
  );
}
```

---

## ✅ Why This Boilerplate?

- Enforces a **clear architecture**.
- Avoids repetitive boilerplate across projects.
- Simplifies onboarding for new developers.
- Scales smoothly as app complexity grows.
