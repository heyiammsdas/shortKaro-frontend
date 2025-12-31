import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!originalUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "https://shortkaro-backend-1.onrender.com/api/url/shorten",
        { originalUrl }
      );

      setShortUrl(res.data.shortUrl);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid URL or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">🔗 Short Karo</div>

      <div className="main">
        <h2>
          Welcome to the original link shortener — simplifying the Internet
          through the power of the URL
        </h2>

        <div className="card">
          <p className="title">Shorten a Link</p>

          <input
            type="text"
            placeholder="Paste the original link here"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Shortening..." : "Get your link"}
          </button>

          {error && <p className="error">{error}</p>}

          {shortUrl && (
            <div className="result">
              <p>Short URL:</p>
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
