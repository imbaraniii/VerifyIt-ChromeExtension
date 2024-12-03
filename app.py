from flask import Flask, request, jsonify, render_template
import asyncio
from backend import AIMODEL, search_urls, create_crawler
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = AIMODEL()

def clean_response(raw_response):
    json_start = raw_response.find("{")
    json_end = raw_response.rfind("}") + 1
    clean_json = raw_response[json_start:json_end]
        
    data = json.loads(clean_json)
    if 'bool' in data:
        data['bool'] = True if data['bool'] == 'true' else False if data['bool'] == 'false' else data['bool']
        
    return data
        
@app.route("/analyze", methods=["POST"])
def analyze():
    user_input = request.json.get("query")
    if not user_input:
        return jsonify({"error": "No query provided"}), 400

    # Check if input is a URL or text
    if any(kwd not in user_input for kwd in ["http", "www", "https", "://"]):
        query = user_input
        urls = search_urls(query)
    else:
        query = user_input
        urls = [query]
    
    scraped_content = {}
    for url in urls[:4]:
        content = asyncio.run(create_crawler(url))
        scraped_content.update(content)

    combined_content = "\n".join(scraped_content.values())
    analysis_result_raw = model.analyse_url(query, combined_content)
    analysis_result = clean_response(analysis_result_raw)

    return jsonify(analysis_result)

if __name__ == "__main__":
    app.run(debug=True)