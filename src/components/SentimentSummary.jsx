function SentimentSummary({ subreddit, posts }) {
    const positiveCount = posts.filter((p) => p.sentiment === "positive").length;
    const neutralCount = posts.filter((p) => p.sentiment === "neutral").length;
    const negativeCount = posts.filter((p) => p.sentiment === "negative").length;
    const total = posts.length || 1;
    const pct = (n) => Math.round((n / total) * 100);

    const score = (positiveCount - negativeCount) / total; // -1 .. 1
    const angleDeg = 180 - ((score + 1) / 2) * 180;
    const angleRad = (angleDeg * Math.PI) / 180;

    const cx = 150, cy = 145, r = 108;
    const needleX = cx + (r - 14) * Math.cos(angleRad);
    const needleY = cy - (r - 14) * Math.sin(angleRad);

    const vibeLabel =
        score > 0.25 ? "Hyped" :
        score < -0.25 ? "Stormy" :
        "Mellow";

    const vibeColor =
        score > 0.25 ? "#ED775A" :
        score < -0.25 ? "#E4004B" :
        "#8A6F2E";

    return (
        <div className="mb-10 rounded-2xl border border-[#C9CDCF]/60 bg-white p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#6B7278]">
                r/{subreddit}
            </p>

            <div className="mt-4 grid grid-cols-1 items-center gap-8 md:grid-cols-2">

                {/* Gauge */}
                <div className="flex flex-col items-center">
                    <svg viewBox="0 0 300 165" className="w-full max-w-xs">
                        <defs>
                            <linearGradient id="vibeGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#E4004B" />
                                <stop offset="50%" stopColor="#ED775A" />
                                <stop offset="100%" stopColor="#FAD691" />
                            </linearGradient>
                        </defs>

                        <path
                            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                            fill="none"
                            stroke="url(#vibeGradient)"
                            strokeWidth="14"
                            strokeLinecap="round"
                        />

                        <line
                            x1={cx} y1={cy}
                            x2={needleX} y2={needleY}
                            stroke="#1A1310"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <circle cx={cx} cy={cy} r="6" fill="#1A1310" />
                    </svg>

                    <p className="font-display -mt-2 text-2xl font-bold" style={{ color: vibeColor }}>
                        {vibeLabel}
                    </p>
                </div>

                {/* Stat bars */}
                <div className="space-y-3">
                    <StatBar label="Positive" count={positiveCount} pct={pct(positiveCount)} color="#ED775A" />
                    <StatBar label="Neutral" count={neutralCount} pct={pct(neutralCount)} color="#C9CDCF" textColor="#6B7278" />
                    <StatBar label="Negative" count={negativeCount} pct={pct(negativeCount)} color="#E4004B" />
                </div>
            </div>
        </div>
    );
}

function StatBar({ label, count, pct, color, textColor }) {
    return (
        <div>
            <div className="mb-1 flex items-baseline justify-between">
                <span className="text-sm font-medium text-[#1A1310]">{label}</span>
                <span className="font-mono text-xs" style={{ color: textColor || color }}>
                    {count} · {pct}%
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#FAD691]/20">
                <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

export default SentimentSummary;