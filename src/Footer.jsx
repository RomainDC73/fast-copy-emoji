export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>© {currentYear} Fast Copy Emojis 👉 by <a href="https://www.linkedin.com/in/romaindicandido/" target="_blank">Romain DI CANDIDO</a> ✏️ <a href="https://github.com/RomainDC73/fast-copy-emoji" target="blank">Github Code</a></p>
        </footer>
    );
    }