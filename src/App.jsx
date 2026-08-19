import { useState } from "react";

import SearchBar from "./components/SearchBar";
import PostList from "./components/PostList";
import SentimentSummary from "./components/SentimentSummary";

import { getHotPosts } from "./services/redditApi";
import { analyzeSentiment } from "./services/sentiment";

function App() {
    const [subreddit, setSubreddit] = useState("javascript");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!subreddit.trim()) {
            setError("Enter a subreddit name first");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setPosts([]);

            const data = await getHotPosts(subreddit.trim());

            const analyzedPosts = data.map((post) => ({
                ...post,
                sentiment: analyzeSentiment(post.title),
            }));

            setPosts(analyzedPosts);
            setSearched(true);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF6]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400..700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
                .font-body { font-family: 'Inter', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
            `}</style>

            <div className="mx-auto max-w-4xl px-6 py-12 font-body">

                {/* Header */}
                <div className="mb-10 flex items-baseline justify-between border-b-2 border-[#C9CDCF] pb-6">
                    <div>
                        <h1 className="font-display text-4xl font-bold tracking-tight text-[#1A1310]">
                            Vibe Check
                        </h1>
                        <p className="mt-1 text-sm text-[#6B7278]">
                            Read the room on any subreddit
                        </p>
                    </div>
                    <span className="font-mono text-xs text-[#C9CDCF]">
                        r/hot × 50
                    </span>
                </div>

                {/* Search */}
                <SearchBar
                    subreddit={subreddit}
                    setSubreddit={setSubreddit}
                    onSearch={handleSearch}
                    loading={loading}
                />

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-[#E4004B]/20 bg-[#E4004B]/5 px-4 py-3 text-sm font-medium text-[#E4004B]">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center gap-3 py-16">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#ED775A]" />
                        <p className="font-mono text-sm text-[#6B7278]">
                            Reading r/{subreddit}...
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !searched && (
                    <div className="rounded-2xl border-2 border-dashed border-[#C9CDCF] py-16 text-center">
                        <p className="font-display text-lg text-[#6B7278]">
                            Enter a subreddit to check its vibe
                        </p>
                    </div>
                )}

                {/* Results */}
                {posts.length > 0 && !loading && (
                    <>
                        <SentimentSummary subreddit={subreddit} posts={posts} />
                        <PostList posts={posts} />
                    </>
                )}

            </div>
        </div>
    );
}

export default App;