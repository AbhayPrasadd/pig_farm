import { useState, useRef, useEffect } from "react";

export default function AIAdvisor() {
  const [chat, setChat] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const chatEndRef = useRef(null);

  const BASE_URL = "https://jeevya-farm-advisory-wbhook.onrender.com";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const transcribeAudio = async (blob) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(",")[1];
      const res = await fetch(`${BASE_URL}/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioBase64: base64Audio, languageCode: "en-IN" }),
      });
      const data = await res.json();
      if (data.transcript) {
        setInputText(data.transcript);
        handleSendMessage(data.transcript);
      }
    };
    reader.readAsDataURL(blob);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    setChat((prev) => [...prev, { sender: "user", text: message, timestamp: new Date() }]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch(`${BASE_URL}/webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message }),
      });
      const data = await res.json();
      setIsTyping(false);

      if (data.reply || data.answer) {
        setChat((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply || data.answer,
            feedback: null,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Sorry, I encountered an error. Please try again.",
          feedback: null,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const speakText = async (text) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    const res = await fetch(`${BASE_URL}/speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, languageCode: "en-IN" }),
    });
    const data = await res.json();
    if (data.audioContent) {
      const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
      audioPlayerRef.current = audio;
      audio.play();
    }
  };

  const handleFeedback = (index, value) => {
    setChat((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, feedback: value } : msg))
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="flex flex-col h-[93vh] font-poppins overflow-hidden">
      {/* Chat Area */}
      <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-4 overflow-y-auto">
        {chat.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-16">
            <div className="bg-white rounded-full p-6 shadow-md mb-3">
              <span className="text-6xl">🧫</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Welcome to Biosecurity Advisor!
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-sm">
              Ask me about farm safety, disease prevention, or biosecurity best practices. You can type or speak your question.
            </p>
          </div>
        )}

        {chat.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[85%] sm:max-w-[70%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex-shrink-0 ${msg.sender === "user" ? "ml-2" : "mr-2"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${msg.sender === "user" ? "bg-green-600" : "bg-blue-600"}`}>
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>
              </div>

              <div className="flex flex-col">
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-green-600 text-white rounded-br-md" : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"}`}>
                  <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                </div>

                {msg.sender === "ai" && (
                  <div className="flex items-center mt-2 space-x-2">
                    <button onClick={() => speakText(msg.text)} className="p-1 text-gray-600 hover:text-green-600 transition" title="Listen to response">🔊</button>
                    <button onClick={() => handleFeedback(idx, "up")} className={`p-1 ${msg.feedback === "up" ? "text-green-600" : "text-gray-400 hover:text-green-600"}`} title="Good response">👍</button>
                    <button onClick={() => handleFeedback(idx, "down")} className={`p-1 ${msg.feedback === "down" ? "text-red-600" : "text-gray-400 hover:text-red-600"}`} title="Poor response">👎</button>
                  </div>
                )}

                <div className={`text-[11px] text-gray-400 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">🤖</div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input Section */}
      <footer className="bg-white border-t border-gray-200 px-3 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          {recording && (
            <div className="bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-2 text-center text-red-600 text-sm">🔴 Recording... Click stop when done</div>
          )}
          {audioBlob && !recording && (
            <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2 mb-2 text-center text-blue-600 text-sm">🎧 Audio recorded! Click transcribe to convert to text</div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={1}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your biosecurity-related question here..."
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-sm transition ${
                  recording ? "bg-red-500 text-white hover:bg-red-600" : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                {recording ? "🛑 Stop" : "🎤 Speak"}
              </button>

              {audioBlob && (
                <button
                  onClick={() => transcribeAudio(audioBlob)}
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold text-xs sm:text-sm hover:bg-blue-600 transition"
                >
                  ⏩ Transcribe
                </button>
              )}

              <button
                onClick={() => handleSendMessage(inputText)}
                className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-sm transition ${
                  inputText.trim() ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!inputText.trim()}
              >
                💬 Send
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
