import { pipeline } from '@xenova/transformers';
let summarizer: any = null;

// Initialize the model
async function initializeSummarizer() {
    if (!summarizer) {
        summarizer = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
    }
    return summarizer;
}

export async function generateCryptoSummary(data: {
    prices: any;
    average_marketcap: any;
    label: string;
}) {
    const model = await initializeSummarizer();

    // Create a natural language description of the data
    const prices_mean = data.prices.reduce((a: any, b: any) => a + b, 0) / data.prices.length;
    const prices_sorted = [...data.prices].sort((a, b) => a - b);
    const prices_median = prices_sorted[Math.floor(data.prices.length / 2)];
    const marketcap_mean = data.average_marketcap.reduce((a: any, b: any) => a + b, 0) / data.average_marketcap.length;
    const marketcap_sorted = [...data.average_marketcap].sort((a, b) => a - b);
    const marketcap_median = marketcap_sorted[Math.floor(data.average_marketcap.length / 2)];

    const text = `Analyze this data of cryptocurrency ${data.label} prices: Mean: ${prices_mean.toFixed(2)}, Median: ${prices_median.toFixed(2)}, 
    Max: ${prices_sorted[prices_sorted.length - 1]}, Min: ${prices_sorted[0]}. 
    Provide a brief statistical summary and insights. Analyze this data of cryptocurrency ${data.label} market cap: Mean: ${marketcap_mean.toFixed(2)}, Median: ${marketcap_median.toFixed(2)}, 
    Max: ${marketcap_sorted[marketcap_sorted.length - 1]}, Min: ${marketcap_sorted[0]}. 
    Provide a brief statistical summary and insights.`;

    const result = await model(text, {
        max_length: 600,
        min_length: 30,
        temperature: 0.7
    });

    return result[0].generated_text;
}