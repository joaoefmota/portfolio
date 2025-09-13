import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/footer.module.scss";

function GetQuotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  useEffect(() => {
    const options = {
      async: true,
      crossDomain: true,
      url: "https://type.fit/api/quotes",
      method: "GET",
    };

    axios
      .request(options)
      .then((response) => {
        setQuotes(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const shuffle = (array: number[]) => {
    if (!Array.isArray(array) || array === null || array === undefined) return;
    const output = [...array];
    for (let i = output.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1)); // Fisher-Yates shuffle algorithm
      const temp = output[i];
      output[i] = output[j];
      output[j] = temp;
    }
    return output;
  };

  const handleShuffle = () => {
    if (!quotes || !Array.isArray(quotes)) return;
    const indices: number[] = quotes.map((_, i) => i);
    const shuffledIndices = shuffle(indices);
    const shuffledQuotes = shuffledIndices!.map((i) => quotes[i]); // new array with shuffled indices
    setQuotes(shuffledQuotes);
  };

  return (
    <div className={styles.quoteContianer}>
      {quotes &&
        quotes
          .slice(0, 1)
          .map((quote: { text: string; author: string }, index: number) => (
            <div key={index} className={styles.quoteBlock}>
              <div>
                <p className={`${styles.quote}`}>&quot;{quote.text}&quot;</p>
                <p className={styles.author}>{quote.author}</p>
              </div>
              <button onClick={handleShuffle} className={styles.getQuotes}>
                Get more Quotes!
              </button>
            </div>
          ))}
    </div>
  );
}

export default GetQuotes;
