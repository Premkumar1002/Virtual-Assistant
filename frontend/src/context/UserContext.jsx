import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch current user
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("👤 Current user:", result.data);
    } catch (error) {
      console.error("❌ Fetch current user failed:", error);
    }
  };

  // ✅ Text-to-Speech
  const speakResponse = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel(); // cancel ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Debug logs
    utterance.onstart = () => console.log("🔊 Speaking started...");
    utterance.onend = () => console.log("✅ Speaking finished.");
    utterance.onerror = (err) => console.error("❌ Speech error:", err);

    window.speechSynthesis.speak(utterance);
  };

  // ✅ AI Response (only returns data, does not speak)
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      console.log("🤖 AI Response:", result.data);
      return result.data;
    } catch (error) {
      console.error("❌ Gemini request failed:", error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
    speakResponse, // only exposed, never auto-called
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
