function SearchBar({ subreddit, setSubreddit, onSearch, loading }) {
    return (
        <div className="mb-8 flex gap-3">
            <div className="relative flex-1">
                <span className="font-mono pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#C9CDCF]">
                    r/
                </span>
                <input
                    type="text"
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    placeholder="javascript"
                    className="font-mono w-full rounded-xl border-2 border-[#C9CDCF]/60 bg-white py-3 pl-9 pr-4 text-[#1A1310] outline-none transition-colors focus:border-[#E4004B]"
                />
            </div>

            <button
                onClick={onSearch}
                disabled={loading}
                className="font-display rounded-xl bg-[#E4004B] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
                {loading ? "Checking..." : "Check vibe"}
            </button>
        </div>
    );
}

export default SearchBar;