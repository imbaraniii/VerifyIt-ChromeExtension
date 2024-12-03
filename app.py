# from flask import Flask, request, jsonify, render_template
# import asyncio
# from backend import AIMODEL, search_urls, create_crawler
# import ast

# app = Flask(__name__)

# model = AIMODEL()

# @app.route("/")
# def home():
#     return render_template("demo.html")

# @app.route("/analyze", methods=["POST"])
# def analyze():
#     print("GOT THE QUERY\n")
#     user_input = request.json.get("query")
#     if not user_input:
#         return jsonify({"error": "No query provided"}), 400

#     if any(kwd not in user_input for kwd in ["http", "www",]):
#         query = user_input
#     else:
#         query = model.generate_search_queries(user_input)

#     print("GENERATED THE QUERY\n")
#     urls = search_urls(query)
#     scraped_content = {}
#     for url in urls[:4]:
#         content = asyncio.run(create_crawler(url))
#         scraped_content.update(content)

#     print("DONE SCRAPPING\n")
#     combined_content = "\n".join(scraped_content.values()) # Combine the scrapped content
#     print(f"The scrapped content is: {combined_content}")
#     analysis_result = model.analyse_url(query, combined_content)
#     print("DONE ANALYSING\n")
#     print(type(analysis_result))
#     print(analysis_result)
#     return jsonify(analysis_result)

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify, render_template
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
        urls = [user_input]  # Directly use the input URL
    else:
        query = model.generate_search_queries(user_input)
        print("Generated Query:", query)
        urls = search_urls(query)  # Perform a search to get relevant URLs

    scraped_content = {}
    for url in urls[:4]:
        content = asyncio.run(create_crawler(url))
        scraped_content.update(content)

    print("DONE SCRAPING\n")
    combined_content = "\n".join(scraped_content.values())  # Combine the scraped content
    print(f"The scraped content is: {combined_content}")

    analysis_result_raw = model.analyse_url(user_input, combined_content)
    print("DONE ANALYZING\n")

    analysis_result = clean_response(analysis_result_raw)
    print(analysis_result)

    return jsonify(analysis_result)


if __name__ == "__main__":
    app.run(debug=True)
