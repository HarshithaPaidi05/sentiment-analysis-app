import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [polarity, setPolarity] = useState(null);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSentiment('');
    setPolarity(null);
    setError('');

    try {
      const response = await fetch('http://15.206.167.230:5000/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.sentiment) {
        setSentiment(data.sentiment);
        setPolarity(data.polarity);
      } else {
        setError('Unable to analyze sentiment.');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Sentiment Analysis</h1>
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text for analysis"
            className="textarea"
          />
          <button type="submit" className="submit-btn">Analyze</button>
        </form>

        {sentiment && (
          <div className="result">
            <h2 className="result-sentiment">Sentiment: {sentiment}</h2>
            {polarity !== null && (
              <p className="result-polarity">Polarity Score: {polarity.toFixed(3)}</p>
            )}
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
