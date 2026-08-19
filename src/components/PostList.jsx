
const sentimentStyles = {
    positive: { bg: "bg-[#ED775A]/10", text: "text-[#B24D2C]", dot: "#ED775A" },
    negative: { bg: "bg-[#E4004B]/10", text: "text-[#E4004B]", dot: "#E4004B" },
    neutral: { bg: "bg-[#C9CDCF]/25", text: "text-[#6B7278]", dot: "#8A8F92" },
};

function PostList({ posts }) {
    return (
        <div>
            <h2 className="font-display mb-4 text-xl font-bold text-[#1A1310]">
                Posts
            </h2>

            <div className="space-y-3">
                {posts.map((post) => {
                    const s = sentimentStyles[post.sentiment] || sentimentStyles.neutral;
                    return (
                        <div
                            key={post.id}
                            className="rounded-xl border border-[#C9CDCF]/50 bg-white p-4 transition-colors hover:border-[#C9CDCF]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-[15px] font-medium leading-snug text-[#1A1310]">
                                    {post.title}
                                </h3>
                                <span
                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ${s.bg} ${s.text}`}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                                    {post.sentiment}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-4 font-mono text-xs text-[#8A8F92]">
                                <span>↑ {post.score}</span>
                                <span>💬 {post.comments}</span>
                                {post.url && (
                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-auto font-body font-medium text-[#E4004B] hover:underline"
                                    >
                                        View post →
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PostList;