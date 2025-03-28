# 🌍 LinguaLift: Your Smart Multimodal Travel Assistant

**LinguaLift** is an AI-powered travel assistant that helps users translate text, speech, and images in real-time, while also suggesting tourist spots using Azure OpenAI. Designed with empathy and accessibility in mind, it bridges the communication gap for travelers — enabling smoother, smarter, and more confident exploration.

---

## 🚀 Features

- 🔁 **Real-time Translation** – Text, speech, and image translation across multiple languages
- 🎙️ **Voice Input** – Speak and get instant translation
- 🖼️ **Image Text Recognition** – Extract and translate text from menus, signs, and documents
- 🤖 **AI-Powered Tourist Suggestions** – Get relevant tourist spot recommendations using Azure OpenAI
- 🌓 **Dark Mode** – Toggle between light and dark themes
- 📋 **Copy-to-Clipboard** – Easily copy translated content
- 🌐 **Multi-language Support** – Translate between English, Spanish, French, Bengali, Hindi, and more

---

## 💡 Inspiration

Travelers often face communication barriers in unfamiliar countries. We wanted to create a solution that not only translates but empowers — turning confusion into confidence, and isolation into connection.

---

## 🧰 Built With

**Languages & Frameworks**:  
HTML,CSS,JavaScript,VanillaJS,Mermaid.js

**Azure Services**:  
AzureTranslator,AzureSpeech-to-Text,AzureComputerVision,AzureOpenAI,gpt-35-turbo,AzureContentSafety

**Hosting & Dev Tools**:  
GitHubPages,GitHubCopilot,AzureStaticWebApps,AzureFunctions (optional)

---

## 🛠️ How We Built It

- Frontend: HTML/CSS/JavaScript with Dark Mode UI and accessibility-friendly layout
- Integration with Azure Cognitive Services (Translator, Speech, Computer Vision)
- GPT-35-Turbo via Azure OpenAI for personalized suggestions
- GitHub Copilot assisted in smart coding and quick debugging
- Hosted via GitHub Pages and Azure Static Web Apps

---
## 🔎 How It Works

1. **User Input**: The user can provide input via text, voice, or image upload.
2. **Processing**:
   - Voice input is converted to text using **Azure Speech-to-Text**
   - Images are analyzed and text extracted using **Azure Computer Vision (OCR)**
   - Raw text is passed to **Azure Translator** for language translation
3. **Tourist Spot Suggestion**: When a location is entered, **Azure OpenAI** generates relevant tourist recommendations.
4. **Output Filtering**: Optionally, **Azure Content Safety** ensures the output is appropriate and inclusive.
5. **Display**: Translations and suggestions are shown on the web UI with options to copy, switch modes, or interact further.

---

## 🎥Demo


https://github.com/user-attachments/assets/73c10046-2ae2-4a93-babc-2190bb67a029


## 🧠 What We Learned

- How to orchestrate multimodal inputs in one interface
- Using Azure services responsibly with safety and performance
- Designing with empathy and language accessibility in mind
- Building a cohesive UX for tourists of all skill levels

---

## 🏁 What's Next

- 🧭 Add geolocation-based tourist recommendations
- 📲 Launch as a mobile PWA
- 🔊 Integrate speech output (text-to-speech)
- 💾 Add translation history and offline mode

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © 2024 LinguaLift Team
