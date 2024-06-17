import { zillizConfig } from "./config.js";
import { createEmbedding } from "./openai.js";

const {  TOKEN } = zillizConfig;


// primary key is also required because zilliz does not have auto-increment
export async function saveVector(question, answer, pk) {
  const openAiVector = await createEmbedding(question);
  // dimension
  const insertData = [{
    "vector": openAiVector,
    "question": question,
    "answer": answer,
    "primary_key": pk,
  }];


  const url = 'https://in03-e74be7e7e143246.api.gcp-us-west1.zillizcloud.com/v1/vector/insert';
  const options = {
    method: 'POST',
    headers: {
      Authorization: TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "collectionName": "portfolio",
      "data": insertData,
    })
  };

  const response = await fetch(url, options);
  const data = await response.json();
};


async function searchVector(question) {
  const openAiVector = await createEmbedding(question);
  // search
  console.time(`Searching vector`);

  const url = 'https://in03-e74be7e7e143246.api.gcp-us-west1.zillizcloud.com/v1/vector/search';
  const options = {
    method: 'POST',
    headers: {
      Authorization: TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "collectionName": "portfolio", "vector": openAiVector })
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.timeEnd(`Searching vector`);
  return data
}

async function getData(id) {
  // search
  const url = 'https://in03-e74be7e7e143246.api.gcp-us-west1.zillizcloud.com/v1/vector/get';
  const options = {
    method: 'POST',
    headers: {
      Authorization: TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "collectionName": "portfolio", "id": [id] })
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

