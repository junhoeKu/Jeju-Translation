from flask import Flask, request, jsonify, render_template, send_file
from transformers import BartForConditionalGeneration, PreTrainedTokenizerFast, pipeline
import torch
from flask_cors import CORS
from gtts import gTTS
import base64
import os
import uuid

app = Flask(__name__)
CORS(app)

# Model and tokenizer initialization
model_path = './0530_checkpoint_146000'
model = BartForConditionalGeneration.from_pretrained(model_path)
tokenizer = PreTrainedTokenizerFast.from_pretrained(model_path)

# Translation pipeline
translation_pipeline = pipeline(
    "translation_xx_to_yy",
    model=model,
    tokenizer=tokenizer,
    device=0 if torch.cuda.is_available() else -1,
    max_length=64
)

jeju_token = "[제주]"
standard_token = "[표준]"

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No JSON data provided'}), 400

    text = data.get('text')
    source_language = data.get('source_language')

    if not text or not source_language:
        return jsonify({'error': 'No text or source language provided'}), 400

    token = jeju_token if source_language == '제주' else standard_token
    translated_text = translation_pipeline(token + " " + text)[0]['translation_text']

    tts = gTTS(translated_text, lang='ko')
    audio_file = f"{uuid.uuid4()}.mp3"
    tts.save(audio_file)

    with open(audio_file, 'rb') as f:
        audio_data = f.read()

    os.remove(audio_file)

    audio_base64 = base64.b64encode(audio_data).decode('utf-8')

    return jsonify({'translated_text': translated_text, 'audio': audio_base64})

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text')
    source_language = data.get('source_language')

    tts = gTTS(text, lang='ko')
    audio_file = f"{uuid.uuid4()}.mp3"
    tts.save(audio_file)

    return send_file(audio_file, as_attachment=True, download_name='output.mp3', mimetype='audio/mpeg')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
