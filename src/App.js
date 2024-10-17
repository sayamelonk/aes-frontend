import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  // Base API URL dari environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  console.log("API_BASE_URL:", API_BASE_URL);

  // Function to handle encryption
  const handleEncrypt = async () => {
    if (!message || !key) {
      alert("Please enter message and encryption key.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/encrypt`, {
        message: message,
        key: key,
      });
      setEncryptedMessage(response.data.encrypted_message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Check network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
    }
  };

  // Function to handle decryption
  const handleDecrypt = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/decrypt`, {
        encrypted_message: encryptedMessage,
        key: key,
      });
      setDecryptedMessage(response.data.decrypted_message);
    } catch (error) {
      console.error("Error during decryption:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Encryption and Decryption AES-256</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter encryption key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <button onClick={handleEncrypt}>Encrypt</button>

      {encryptedMessage && (
        <div>
          <h3>Encrypted Message:</h3>
          <p>{encryptedMessage}</p>
        </div>
      )}

      {encryptedMessage && (
        <>
          <button onClick={handleDecrypt}>Decrypt</button>

          {decryptedMessage && (
            <div>
              <h3>Decrypted Message:</h3>
              <p>{decryptedMessage}</p>
            </div>
          )}
        </>
      )}

      <footer>
        <p>Pembuat Riki Hikmianto</p>
        <p>NIM 23.51.1430</p>
      </footer>
    </div>
  );
}

export default App;
