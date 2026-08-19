const BASE_URL = "http://localhost:5000";

export async function getHotPosts(subreddit) {
    const response = await fetch(
        `${BASE_URL}/api/reddit/${subreddit}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch subreddit");
    }

    const data = await response.json();

    return data.posts;
}