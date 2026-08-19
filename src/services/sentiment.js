const positiveWords = [
    "good",
    "great",
    "awesome",
    "excellent",
    "amazing",
    "love",
    "best",
    "happy",
    "helpful",
    "success",
    "successful",
    "win",
    "better",
    "beautiful",
    "nice",
    "easy",
    "perfect",
    "cool",
];

const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "hate",
    "worst",
    "sad",
    "angry",
    "problem",
    "bug",
    "broken",
    "fail",
    "failed",
    "failure",
    "worse",
    "hard",
    "difficult",
    "issue",
    "error",
];

export function analyzeSentiment(text) {
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    let score = 0;

    words.forEach((word) => {
        if (positiveWords.includes(word)) {
            score++;
        }

        if (negativeWords.includes(word)) {
            score--;
        }
    });

    if (score > 0) {
        return "positive";
    }

    if (score < 0) {
        return "negative";
    }

    return "neutral";
}