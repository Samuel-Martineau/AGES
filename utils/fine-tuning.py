import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

# print(openai.File.create(
#     file=open("./fine-tuning-data.jsonl", "rb"),
#     purpose='fine-tune'
# ))

# print(openai.FineTuningJob.create(
#     training_file="file-U1ZugzAMao80o3LeuE8hzY15", model="gpt-3.5-turbo"))

print(openai.FineTuningJob.list(limit=10))
