import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import PropTypes from 'prop-types';

export default function EmojiList({ query }) {
    const [emojis, setEmojis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedEmoji, setCopiedEmoji] = useState(null);

    const API_KEY = "14d0ee6eebe21bf0c2799ab1e12109e6387b97d7";

    useEffect(() => {
        let ignore = false;
        
        const fetchEmoji = async () => {
            const url = `https://emoji-api.com/emojis?access_key=${API_KEY}`
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (!ignore) {
                    setEmojis(data);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error) {
                if (!ignore) {
                    setEmojis([]);
                    setError(error);
                    setIsLoading(false);
            }
        } 
    }
    fetchEmoji();

    return () => {
        ignore = true
    }
    }, []);

    const handleCopy = (emoji) => {
        navigator.clipboard.writeText(emoji);
        setCopiedEmoji(emoji);

        let times = 0;
        const interval = setInterval(() => {
            setCopiedEmoji((prev) => (prev === emoji ? null : emoji));
            times++;
            if (times >= 4) {
                clearInterval(interval);
                setTimeout(() => setCopiedEmoji(null), 100);
            }
        }, 100);
    };
    
    const filteredEmojis = query 
        ? emojis.filter((emoji) => emoji.unicodeName.toLowerCase().includes(query.toLowerCase()))
        : emojis;

    return (
        <div className="emojiList">
        {isLoading && 
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={isLoading}
            />
        }         
        {error && <p>Something went wrong: {error.message}</p>}
            {filteredEmojis.map((emoji) => (
                <button 
                    key={emoji.slug}
                    className={`emoji ${copiedEmoji === emoji.character ? "copied" : ""}`}
                    onClick={() => {
                        handleCopy(emoji.character);
                        }}
                >
                    {emoji.character}
                </button>
            ))}
        </div>
)};

EmojiList.propTypes = {
    query: PropTypes.string.isRequired,
};

