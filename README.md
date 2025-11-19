🌐 Stress Detection & Buster Application

A multimodal AI-powered platform that detects user stress using Facial Expressions, Text Inputs, and Voice Tone, and provides personalized relaxation activities powered by Gen-AI.

📌 Project Overview

Stress is a leading contributor to mental health issues and cardiovascular diseases in the modern fast-paced lifestyle.
Most existing systems rely on single-mode input, making them inaccurate and impersonal.

Our system solves this by combining three complementary AI pipelines:

🧠 Text Stress Analysis → DistilBERT-based NLP

🙂 Facial Stress Analysis → CNN-based emotion classifier

🎤 Voice Stress Analysis (future expansion)

🎧 Stress Buster System → Personalized relaxations (music, memes, breathing, affirmations)

The system is built using a React frontend, Node.js/Express + MongoDB backend, and a Flask microservice for NLP inference.

🚀 Features
🧠 1. Multimodal Stress Detection
Input Mode	Model Used	Output
Face	CNN (FER2013)	Low/Medium/High
Text	DistilBERT	Low/Medium/High
Voice	Future Integration	Tone-based stress level
😌 2. Stress Buster Engine

Stress-specific relaxation suggestions:

Low stress → Memes, jokes

Medium stress → Calming music, breathing animation

High stress → AI-generated affirmations, guided meditation scripts

📈 3. Stress Trend Visualization

Line charts tracking stress levels over time

Weekly dashboard

Helps users understand stress patterns
