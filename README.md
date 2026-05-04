# AI News Intelligence Dashboard

A full-stack, AI-powered news dashboard built with Next.js. Users can search for AI-related articles, save them to their personal library, generate AI summaries with GPT-4.1, and view analytics on their reading habits — all behind a secure authentication layer.

---

## Features

- **Article Search** — Search and filter AI news articles by title or source
- **AI Summaries** — Generate concise 3-bullet-point summaries for any article using GPT-4.1 Mini
- **Save & Unsave** — Persist articles to a personal library, synced to Supabase per user
- **Analytics Dashboard** — Visualize saved article counts, unique sources, top topics, and a topic breakdown bar chart
- **Authentication** — Email/password login and signup via Supabase Auth, with protected dashboard routes
- **Responsive Design** — Collapsible sidebar on desktop; dropdown navigation on mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, Radix UI |
| Charts | Recharts |
| AI | OpenAI SDK (GPT-4.1 Mini) |
| Database & Auth | Supabase (PostgreSQL + Auth) |
| Testing | Jest, React Testing Library |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── articles/          # Fetch news articles
│   │   ├── summarize/         # OpenAI summarization endpoint
│   │   ├── save-article/      # Save / delete articles (POST, DELETE)
│   │   └── saved-articles/    # Retrieve user's saved articles
│   ├── dashboard/
│   │   ├── page.js            # Overview with analytics charts
│   │   ├── layout.js          # Sidebar + header layout with auth guard
│   │   ├── articles/          # Article search page
│   │   └── saved/             # Saved articles page
│   └── login/                 # Login / signup page
├── components/
│   ├── ArticleItem.jsx         # Article card with save, summarize, and read actions
│   ├── ArticlesClient.jsx      # Client-side search and article list
│   ├── EmptySavedState.jsx     # Empty state for saved articles
│   └── ui/                    # shadcn/ui component library
├── lib/
│   ├── api.js                 # Article fetching helpers
│   ├── dateUtils.js           # Relative time formatting
│   └── supabase/              # Supabase client (browser + server)
└── data/
    └── articles.js            # Static article seed data
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [OpenAI](https://platform.openai.com) API key

### Installation

```bash
git clone https://github.com/your-username/ai-news-intelligence-dashboard.git
cd ai-news-intelligence-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Database Setup

In your Supabase project, create the following table:

```sql
create table saved_articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  article_id text not null,
  title text,
  source text,
  summary text,
  published_at text,
  tags text[],
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table saved_articles enable row level security;

create policy "Users can manage their own articles"
  on saved_articles
  for all
  using (auth.uid() = user_id);
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest test suite |

---

## Testing

Tests are located in `src/__tests__/` and cover:

- Article search renders correctly and shows loading state
- Articles appear after a successful search
- Empty state is displayed when no results are found
- Saving an article triggers the correct state update
- Saved articles page renders and handles the unsave action

```bash
npm run test
```

---

## Authentication Flow

1. User navigates to `/login` and enters their email and password
2. The app attempts `signInWithPassword` via Supabase; if the user does not exist, it automatically calls `signUp`
3. On success, the user is redirected to `/dashboard`
4. All dashboard routes check for an active Supabase session and redirect unauthenticated users back to `/login`
5. Logout clears the session and redirects to `/login`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/articles` | Fetch available news articles |
| `POST` | `/api/summarize` | Generate an AI summary for an article |
| `POST` | `/api/save-article` | Save an article for the authenticated user |
| `DELETE` | `/api/save-article?id=<article_id>` | Remove a specific saved article |
| `DELETE` | `/api/save-article` | Remove all saved articles for the user |
| `GET` | `/api/saved-articles` | Retrieve all saved articles for the user |

