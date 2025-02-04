import { useState, useEffect } from "react"

export default function EmojiList() {
    const [emojis, setEmojis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "14d0ee6eebe21bf0c2799ab1e12109e6387b97d7";

    useEffect(() => {
        let ignore = false;
        
        const fetchEmoji = async () => {
            const url = `https://emoji-api.com/emojis?access_key=${API_KEY}`
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (ignore === false) {
                    setEmojis(data);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error) {
                if (ignore === false) {
                    setEmojis(null);
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

    return (
        <div>
        This is the EmojiList component.
        Je fais des tests.
        <ul>
            {emojis.map((emoji) => (
            <li key={emoji.slug}>
                {emoji.character}
            </li>
            ))}
        </ul>
        </div>
    )
};
