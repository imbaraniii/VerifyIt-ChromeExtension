# VerifyIt - Verify Truth in an Instant 

<h3>Part of Chrome Built-in AI Hackathon 2024</h3>
<div style="display: flex; align-items: center; justify-content: space-between;">
    <a href="https://github.com/thespectacular314/VerifyIt---Chrome-Extension/">
        <img src="https://github.com/user-attachments/assets/66344982-f429-423c-8b8f-31d384d0b9ea" alt="Logo" height="100">
    </a>
</div>

---

## **About VerifyIt**
Welcome to **VerifyIt**, the ultimate fact-checking Chrome extension designed to empower your digital journey.  
Whether you're navigating news, social media, or research, VerifyIt uses cutting-edge web scraping and intelligent analysis to provide instant truth validation for any statement.

### **Key Features**
- **Real-Time Verification**: Scrapes web data to validate any statement instantly.  
- **User-Friendly Interface**: Simple, clean, and intuitive extension design.  
- **Comprehensive Analysis**: Ranks sources by credibility and provides a confidence score.  
- **Privacy-First Approach**: Ensures your queries remain private and secure.

---

## **Tech Stack**
### **Google Specific Framework Used**
- **Custom Search API**
- **Programmable Search Engine by Google**
- **Gemini AI**

### **Frontend**
- **HTML/CSS**: User-friendly interface design.
- **JavaScript**: Handles browser interactions.

### **Backend**
- **Flask API**: Server-side scripting for data processing.
- **Google's Custom Search API**: An API search engine used to retrieve the URLs for a query.
- **Crawl4AI**: Web scraping framework.
- **Gemini AI**: For evaluating the target content for its truthfulness.

---

## **Demo Video**
Check out our **live demo video** to see VerifyIt in action:  
[![Watch the Video](https://img.youtube.com/vi/your-video-id/hqdefault.jpg)](https://www.youtube.com/watch?v=your-video-id)  

<!-- Uncomment the iframe below if using GitHub Pages -->
<!--
<iframe width="560" height="315" src="https://www.youtube.com/embed/g_NnTCLrM20?si=DVZO3Xl1CdD5627p&amp;controls=0&amp;start=3" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" 
allowfullscreen>
</iframe>
-->

---

## 🧩 **How It Works**
1. Clone the repo and follow the **Installation Instructions**.
2. Highlight any statement or click on the Analysis Button.
3. Let VerifyIt scrape, analyze, and rank the results.
4. Get instant feedback with a truthfulness score and credible sources.

---

## 💡 **Installation Instructions**
1. Clone this repository:  
   ```bash
   git clone https://github.com/thespectacular314/VerifyIt-ChromeExtension.git
   ```

2. Navigate to the extension directory:  
   ```bash
   cd VerifyIt-ChromeExtension
   ```

3. Create a `.env` file for API keys:  
   - In the root of your project directory, create a file named `.env`.
   - Add the following content to your `.env` file, replacing `your_key` with the actual values:
     ```env
     SEARCH_ID="your_search_id"
     CUSTOM_API="your_custom_api_key"
     GEMINI="your_gemini_api_key"
     ```
   - Ensure `.env` is added to `.gitignore` to keep your keys private:
     ```bash
     echo ".env" >> .gitignore
     git add .gitignore
     git commit -m "Add .env to .gitignore"
     ```

4. Load the extension:
   - Open Chrome.
   - Go to `chrome://extensions`.
   - Enable **Developer Mode**.
   - Click on **Load unpacked** and select the project folder.

5. Start the backend server:
   ```bash
   python3 app.py
   ```

6. Use the extension:
   - Go to any webpage you want to fact-check and click the **Analysis button** at the bottom left for a complete URL analysis.
   - Alternatively, select text and **right-click** to analyze it.

---

**VerifyIt** - Empowering you to navigate the digital world with confidence and truth.  
