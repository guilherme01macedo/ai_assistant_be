import {openAiHeaders} from './config.js';

export async function createEmbedding (questionToBeEmbedded) {
    let data = null;    
    let response = await fetch ('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: openAiHeaders,
        body: JSON.stringify({'model': 'text-embedding-3-small', 'input': questionToBeEmbedded})
    })

    if (response.ok) {
        let data = await response.json();
        return data.data[0].embedding;
    } else {
        throw new Error(`Error embedding: ${response.statusText}`);
    }
}
