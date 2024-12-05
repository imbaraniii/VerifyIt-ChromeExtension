# VerifyIt - Verify Truth in an Instant 

<h3>Part of Chrome Built-in AI Hackathon 2024 ⚡ </h3>

![WhatsApp Image 2024-12-04 at 11 59 40 AM](https://github.com/user-attachments/assets/e1b01b43-5ec3-4b2e-a156-0a76d571605a)


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
### **Google Specific Framework used**

- **Custom Search API**
- **Programmable Search Engine by Google**
- **Gemini AI** (Use fast infering gemini-1.5-flash)
  
### **Frontend**
- HTML5 & Bootstrap CSS: Responsive, modern design
- JavaScript: Dynamic, interactive user experience

### **Backend**
- Flask API: Robust server-side processing and to handle asynchronous requests
- Google Custom Search API: Comprehensive information retrieval
- Crawl4AI: Intelligent web scraping framework
- Gemini AI: Advanced content truthfulness evaluation, with Customized prompt template



### 🔧 Unique Technical Innovations

- **Adaptive Search Query Generation**: Dynamically creates contextual search queries
- **Intelligent Content Analysis**: Uses AI to understand nuanced information contexts
- **Secure, Lightweight Extension**: Minimal performance overhead

![images](https://github.com/thespectacular314/VerifyIt---Chrome-Extension/blob/main/Animation%20-%201733412694313.gif)

---

## Pipeline
![Target Input is taken by the backend](https://github.com/user-attachments/assets/7c6a9703-9d60-45ac-b853-47c6c05a6bf9)

---

## **Demo Video**
Check out our **live demo video** to see VerifyIt in action:  

[![images](https://github.com/thespectacular314/VerifyIt---Chrome-Extension/blob/main/Animation%20-%201733411894860.gif)](https://www.youtube.com/watch?v=g_NnTCLrM20)


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
