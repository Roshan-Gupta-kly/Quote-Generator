import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTwitterSquare, FaLinkedinIn } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [bgColor, setBgColor] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const randomColors = ["#27AE60", "#2C3E50", "#16A085", "#342224"]; // Random color choices

  const fetchQuote = async () => {
    try {
      // Fetching quote from given API
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      // Trigger fade-out animation
      setAnimationClass("fade-out");

      setTimeout(() => {
        setQuote({
          text: data.quote,
          author: data.author,
        });

        // Generate random background color
        const colorIndex = Math.floor(Math.random() * randomColors.length);
        setBgColor(randomColors[colorIndex]);

        // Trigger fade-in animation
        setAnimationClass("fade-in");
      }, 1000); // Match this delay with the fade-out duration
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  // Fetch a new quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text + " - " + quote.author)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(quote.text + " - " + quote.author)}`;

  return (
    <div
      className={`h-screen w-screen flex justify-center items-center flex-col gap-2 transition-background`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-[450px] bg-white py-10 px-12 rounded-lg flex flex-col justify-between items-center gap-4"
        id="quote-box"
      >
        <div className={`text-2xl italic ${animationClass}`} id="text"
        style={{
          color: bgColor,
        }}
        >
          <FaQuoteLeft className="inline-block mr-2 text-3xl" />
          {quote.text}
        </div>
        <div className={`text-xl ${animationClass}`} id="author"
        style={{
          color: bgColor,
        }}>
          - {quote.author}
        </div>
        <div className="flex justify-between items-center w-full">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:shadow-xl hover:scale-105 transition-all"
            id="tweet-quote"
            title="Share on Twitter"
            style={{ color: bgColor }}
          >
            <FaTwitterSquare />
          </a>
          <button
            onClick={fetchQuote}
            className="px-3 py-2 text-white rounded-md"
            id="new-quote"
            style={{ backgroundColor: bgColor }}
          >
            New Quote
          </button>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:shadow-xl hover:scale-105 transition-all"
            title="Share on LinkedIn"
            style={{ color: bgColor }}
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      <div className="text-white">by Roshan❤️</div>
    </div>
  );
};

export default App;
