import { useState, useEffect } from 'react';
import './SlidingWords.css'

function SlidingWords({ words, interval = 3000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((index + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [index, interval, words]);

    return (
        <div className="sliding-word">
            {words.map((word, i) => (
                <span
                    key={i}
                    className={`word ${i === index ? 'active' : ''} ${i < index ? 'slide-up' : ''
                        }`}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}

export default SlidingWords