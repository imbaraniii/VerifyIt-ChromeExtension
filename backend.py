import requests
from dotenv import load_dotenv
import os
from crawl4ai import AsyncWebCrawler
import google.generativeai as genai
load_dotenv()

class AIMODEL:
    def __init__(self):
        self.api_key = os.getenv("GEMINI")
        genai.configure(api_key=self.api_key)
        self.generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=self.generation_config,
        )

    def generate_search_queries(self, target):
        chat_session = self.model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "Examine the URL and identify the main topic being discussed. Provide the complete main topic on what is being discussed in the url. I dont want any introductory responses from you",
                    ],
                },
            ]
        )
        response = chat_session.send_message(target)
        return response.text

    def analyse_url(self, topic, content, target_content=None):
        chat_session = self.model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "Evaluate the accuracy of a given title and its associated target_content_to_examine using web-scraped data from multiple sources. Analyze the evidence from these sources to determine if the title and content are accurate, false, or uncertain. If the conclusion is uncertain, provide an estimated likelihood of the title's accuracy. \n\n\nAssign a trust score (between 0 and 1) to the title, reflecting its reliability. Include links supporting the conclusion, along with their respective trust scores. Also, provide an explanation for the trustworthiness assessment as a conclusion, avoiding explicit details about the sources—focus instead on their credibility and relevance. Provide the response in a dictionary format, where it has a key value pair, which contains these (title, bool, t_score, concl, source)",
                    ],
                },
            ]
        )

        response = chat_session.send_message(f"Title: {topic}, Target_Content_to_examine: {target_content}, Source_to_refer: {content}")
        # response = ast.literal_eval(response.text.strip())
        return response.text

async def create_crawler(url):
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            word_count_threshold=20,
            excluded_tags=['form', 'nav', 'aside', 'footer', 'header', 'iframe', 'script', 'style'],
            remove_overlay_elements=True,
            exclude_external_links=True,
            exclude_social_media_links=True,
        )

        return {url: result.markdown}

def search_urls(search_query=None):
    api_key = os.getenv('CUSTOM_API')
    search_engine_id = os.getenv("SEARCH_ID")

    base_url = "https://www.googleapis.com/customsearch/v1"

    params = {
        'key': api_key,
        'cx': search_engine_id,
        'q': search_query
    }

    response = requests.get(base_url, params=params)
    url = []
    
    if response.status_code == 200:
        response_json = response.json()
        if 'items' in response_json:
            links = response_json['items']
            for item in links:
                print(item['link'])
                url.append(item['link'])
        else:
            print("No 'items' key in response:", response_json)
    else:
        print("Search request failed:", response.status_code, response.text)

    return url