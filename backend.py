import requests
from dotenv import load_dotenv
import os
from crawl4ai import AsyncWebCrawler
import google.generativeai as genai
import ast

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
                        "Examine the URL and identify the main topic being discussed. Provide just the complete topic name",
                    ],
                },
            ]
        )
        response = chat_session.send_message(target)
        return response.text

    def analyse_url(self, topic, content):
        chat_session = self.model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "Act as a distinguisher for verifying the truthfulness of a given title based on web-scraped content from multiple URLs.. Analyze the given title using the provided web-scraped content from multiple URLs to determine its accuracy. Based on the evidence, conclude whether the title is true, false, or uncertain. If uncertain, provide a possible likelihood of the title's accuracy.\n\nAssign a trustworthiness score (ranging from 0 to 1) to the title, reflecting its reliability. Additionally, provide links to credible sources that support your conclusion, along with their trustworthiness scores. Avoid explicitly discussing the details of the sources—simply indicate their credibility and relevance. Provide the response in a dictionary format, where it has a key value pair, which contains these (title, bool, t_score, concl, source)",
                    ],
                },
            ]
        )

        response = chat_session.send_message(f"Title: {topic}, Web_content: {content}")
        # response = ast.literal_eval(response.text.strip())
        return response.text

async def create_crawler(url):
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            word_count_threshold=20,
            excluded_tags=['form', 'nav'],
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

    response = requests.get(base_url, params=params) # Get the links
    url = []
    if response:
        links = response.json()['items'] # get only the items which contains the links
        for item in links:
            print(item['link'])
            url.append(item['link'])
    else:
        print(response)

    return url
