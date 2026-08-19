# Subreddit Vibe Check

A full-stack Reddit sentiment dashboard that fetches the 50 hottest posts from a subreddit, analyzes their sentiment, and presents the overall community vibe through a visual dashboard.

---

## Features

- Search any subreddit
- Fetch up to 50 hot Reddit posts
- Display post title, score, and comment count
- Analyze post sentiment
- Classify posts as:
  - Positive
  - Neutral
  - Negative
- Calculate the overall subreddit vibe
- Display sentiment percentages
- Visual sentiment gauge
- Open the original Reddit post
- React frontend with reusable components
- Express backend for Reddit API requests
- Backend-based Reddit API communication
- Environment variables for sensitive configuration
- Responsive dashboard UI

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- Reddit API
- CORS
- dotenv

---

## Project Structure

```text
assessment/
│
├── server/
│   ├── app.js
│   ├── redditApi.js
│   ├── redditAuth.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── subreddit-vibe-check/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── PostList.jsx
│   │   │   └── SentimentSummary.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── redditApi.js
│   │   │   └── sentiment.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md