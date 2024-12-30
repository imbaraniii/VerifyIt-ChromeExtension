from flask import Flask, request, jsonify
import asyncio
from backend import AIMODEL, search_urls, create_crawler
import json
from flask_cors import CORS
from flask import json
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
    print("GOT THE QUERY\n")
    user_input = request.json.get("query")
    print(user_input)
    
    if not user_input:
        return jsonify({"error": "No query provided"}), 400
    
    # Check if the input is a URL
    if any(kwd in user_input for kwd in ["http", "www", "https", "://"]):
        target = asyncio.run(create_crawler(user_input))[user_input]
        print("Taarget- content: ", target)
        query = model.generate_search_queries(user_input)
    else:
        query = user_input
        target = query
        
    print("Generated Query:", query)
    urls = search_urls(query)  # Perform a search to get relevant URLs

    scraped_content = {}
    for url in urls[:4]:
        content = asyncio.run(create_crawler(url))
        scraped_content.update(content)

    print("DONE SCRAPING\n")
    combined_content = "\n".join(scraped_content.values())  # Combine the scraped content
    combined_content += f"\n\n\nThese are the url's which were used to analyse : {urls}"
    analysis_result_raw = model.analyse_url(query, combined_content, target)
    print("DONE ANALYZING\n")

    analysis_result = clean_response(analysis_result_raw)
    print(analysis_result)

    return jsonify(analysis_result)


if __name__ == "__main__":
    app.run(port=5000, debug=True)

