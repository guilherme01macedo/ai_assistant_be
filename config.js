// OpenAi URL and headers
export const openAiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
}

export const zillizConfig = {
    URI: "https://in03-e74be7e7e143246.api.gcp-us-west1.zillizcloud.com",
    TOKEN: `Bearer ${process.env.ZILLIZ_API_KEY}`,
};