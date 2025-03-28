// 🔑 Replace these with your actual Azure keys and endpoints
const translatorKey = "<key>";
const translatorEndpoint = "<endpoint>";
const translatorRegion = "<region>";

const visionKey = "<key>";
const visionEndpoint = "<endpoint>";

const speechKey = "<key>";
const speechRegion = "eastus";

// ---------------- Image to Text ----------------
function copyText(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy."));
  }
  
  // ---------------- Image to Text ----------------
  async function handleImage() {
    const file = document.getElementById("imageInput").files[0];
    if (!file) return alert("Please upload an image.");
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer]);
  
      const response = await fetch(`${visionEndpoint}vision/v3.2/ocr?language=unk&detectOrientation=true`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": visionKey,
          "Content-Type": "application/octet-stream",
        },
        body: blob,
      });
  
      const result = await response.json();
      let extractedText = "";
      result.regions?.forEach(region =>
        region.lines.forEach(line =>
          extractedText += line.words.map(w => w.text).join(" ") + " "
        )
      );
  
      document.getElementById("imageResult").textContent = extractedText;
      translate(extractedText, "imageTranslation"); // show in separate box
    };
    reader.readAsArrayBuffer(file);
  }
  
  
  // ---------------- Text Translation ----------------
  function translateText() {
    const input = document.getElementById("textInput").value.trim();
    if (!input) {
      alert("Please enter some text.");
      return;
    }
    translate(input, "textResult");
  }
  
  async function translate(text, outputElementId) {
    const targetLang = document.getElementById("targetLang").value;
    const url = `${translatorEndpoint}translate?api-version=3.0&to=${targetLang}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Ocp-Apim-Subscription-Region": translatorRegion,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: text }]),
    });
  
    const data = await response.json();
    const translation = data[0]?.translations?.[0]?.text || "Translation unavailable.";
    document.getElementById(outputElementId).textContent = translation;
  }
  
  
  // ---------------- Voice Input ----------------
  async function startRecording() {
    const sdk = window.SpeechSDK;
    if (!sdk) {
      alert("Speech SDK not loaded.");
      return;
    }
  
    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
    speechConfig.speechRecognitionLanguage = "en-US";
  
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  
    document.getElementById("voiceResult").textContent = "Listening...";
    recognizer.recognizeOnceAsync(result => {
      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        document.getElementById("voiceResult").textContent = "Recognized: " + result.text;
        translate(result.text, "voiceResult");
      } else {
        document.getElementById("voiceResult").textContent = "No speech recognized.";
      }
      recognizer.close();
    });
  }
  const openAIKey = "<key>";
  const openAIEndpoint = "<endpoint>";
  const openAIDeployment = "<model>";
  const openAIAPIVersion = "2023-05-15"; // safe latest version

async function suggestTouristSpots() {
  const location = document.getElementById("locationInput").value.trim();
  const resultList = document.getElementById("touristSpotsList");

  if (!location) {
    alert("Please enter a location.");
    return;
  }

  resultList.innerHTML = "<li>Generating suggestions with AI...</li>";

  const prompt = `Suggest 5 must-visit tourist attractions in ${location}. List each on a new line.`;

  try {
    const response = await fetch(`${openAIEndpoint}openai/deployments/${openAIDeployment}/chat/completions?api-version=${openAIAPIVersion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": openAIKey
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful travel assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      resultList.innerHTML = "<li>No response from AI. Please try again.</li>";
      return;
    }

    const aiText = data.choices[0].message.content;
    const suggestions = aiText.split("\n").filter(line => line.trim() !== "");

    resultList.innerHTML = "";
    suggestions.forEach(spot => {
      const li = document.createElement("li");
      li.textContent = spot.replace(/^[0-9]+[.)]?\s*/, "");
      resultList.appendChild(li);
    });

  } catch (error) {
    console.error(error);
    resultList.innerHTML = "<li>Something went wrong. Check your API setup.</li>";
  }
}
