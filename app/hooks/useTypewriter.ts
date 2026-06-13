import { useState, useEffect } from 'react';

interface UseTypewriterReturn {
  currentText: string;
  isWaiting: boolean;
}

export function useTypewriter(
  words: string[],
  typeSpeed: number = 120,
  deleteSpeed: number = 40,
  delay: number = 5000
): UseTypewriterReturn {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Hold the fully typed word for the specified delay duration
    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    // Move to the next word once erasing is complete
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Word is fully typed out, trigger waiting/blinking state
    if (!isDeleting && currentText === currentWord) {
      setIsWaiting(true);
      return;
    }

    // Step-by-step typing or deleting execution
    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

  return { currentText, isWaiting };
}