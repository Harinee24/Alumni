import json
import numpy as np
import pandas as pd
import pymongo
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
from config import MONGO_URI  # Only importing MongoDB URI

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['alumni_database']

# Fetch Users & Jobs from MongoDB
users = list(db['profiles'].find({}, {"_id": 0}))
jobs = list(db['jobs'].find({}, {"_id": 0}))

# Prepare Job Dataset for Training
job_texts, job_labels = [], []

for job in jobs:
    skills = job.get("required_skills")  # Convert list to string
    experience_required = str(job.get("experience_required"))  # Convert to string

    if skills and experience_required:
        job_texts.append(skills + " " + experience_required)
        job_labels.append(job.get("title", "Unknown"))

# Ensure valid jobs exist before training
if not job_texts:
    raise ValueError("No valid job available!")

# Convert text to numerical features
vectorizer = TfidfVectorizer(stop_words="english", min_df=1)
X_train = vectorizer.fit_transform(job_texts)

# Encode job titles
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(job_labels)

# Train Naive Bayes job classification model
model = MultinomialNB()
model.fit(X_train, y_train)

# Function to recommend jobs based on user profile
def recommend_jobs(user):
    user_skills = " ".join(user.get("skills", []))  # Get skills from user profile
    user_bio = user.get("bio", "").strip()
    user_location = user.get("location", "")
    user_experience = user.get("experience", 0)

    if not user_skills and not user_bio:
        return None  # Skip users with no valid skills or bio

    user_text = user_skills + " " + user_bio
    X_test = vectorizer.transform([user_text])

    # Predict job category
    predicted_label = model.predict(X_test)[0]
    recommended_job = label_encoder.inverse_transform([predicted_label])[0]

    # Find Best Matching Job (Considering Location & Experience)
    for job in jobs:
        job_experience = job.get("experience_required")
        job_experience_numeric = int(job_experience) if job_experience else 0  # Default to 0

        if (job["title"] == recommended_job and 
            job.get("location", "") == user_location and
            job_experience_numeric <= user_experience):
            return job  # Return job if it matches location & experience
    
    return None  # No suitable job found

# Iterate over users and recommend jobs
for user in users:
    recommended_job = recommend_jobs(user)

    if recommended_job:
        print(f"\nJob Recommendation for {user['name']}:\n")
        print(f"Job Title: {recommended_job['title']}")
        print(f"Company: {recommended_job['company']}")
        print(f"Location: {recommended_job['location']}")
        print(f"Description: {recommended_job['description']}\n")
        print("-" * 50)  # Separator for better readability
    else:
        print(f"\nNo suitable jobs found for {user['name']} in {user['location']}.")
        print("-" * 50)

# Close MongoDB connection
client.close()