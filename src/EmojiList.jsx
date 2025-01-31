import { useState, useEffect } from "react"

export default function EmojiList() {
    const [emojis, setEmojis] = useState([]);
    const API_KEY = "14d0ee6eebe21bf0c2799ab1e12109e6387b97d7";

    useEffect(() => {
        fetch("https://emoji-api.com/emojis?access_key=" + API_KEY)
            .then((response) => response.json())
            .then((data) => setEmojis(data))
    }, []);
    return (
        <div>
        This is the EmojiList component.
        Je fais des tests.
        <ul>
            {emojis.map((emoji) => (
            <li key={emoji.slug}>
                <img src={emoji.url} alt={emoji.unicodeName} />
                {emoji.character}
            </li>
            ))}
        </ul>
        </div>
    )
};
