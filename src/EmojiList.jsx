import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import PropTypes from 'prop-types';

export default function EmojiList({ query }) {
    const [emojis, setEmojis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedEmoji, setCopiedEmoji] = useState(null);

    useEffect(() => {
        let ignore = false;
        
        const fetchEmoji = async () => {
            // Utilisation de l'URL du proxy configuré dans vite.config.js
            const url = '/api/api/emojis';
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);

                if (!ignore) {
                    // Adaptez la structure des données si nécessaire
                    const formattedEmojis = data.map((emoji) => ({
                        slug: emoji.unicodeName || emoji.annotation,
                        character: emoji.character,
                        unicodeName: emoji.unicodeName || emoji.annotation,
                        group: emoji.group,
                        subGroup: emoji.subGroup,
                    }));
                    setEmojis(formattedEmojis);
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
        };

        fetchEmoji();

        return () => {
            ignore = true;
        };
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
        ? emojis.filter((emoji) => 
            [emoji.unicodeName, emoji.slug, emoji.group, emoji.subGroup]
                .some((field) => field?.toLowerCase().includes(query.toLowerCase()))
        )
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
    );
}

EmojiList.propTypes = {
    query: PropTypes.string.isRequired,
};
