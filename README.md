# Ai Assistant - backend

The backend of the AI assistant is designed to explore the OpenAI API. The project aims to generate a set of personalized questions about my career, which will be answered using OpenAI's capabilities to provide the most suitable responses to each user entry.

##  How to use

- Create an account on OpenAI and save your API key as an environment variable named OPENAI_API_KEY.
- Sign up for a Zilliz database account and set an environment variable called ZILLIZ_API_KEY using your API key.
- Create a file following the template provided in prompt_template.xlsx, where each question made is paired with its corresponding answer.
- After that, you can run the file xlsxReader.js, changing the line 54 to the name of your xlsx file. After that your database should be populated.
- The last step should be create an api route with the searchVector function found on the zilliz.js file. In my case I hosted the function in a AWS Lambda function.
