import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";

function App() {
  const letterRef = useRef(null);
  const audioRef = useRef(null);

  const [displayedText, setDisplayedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const fullText = `
From the moment you entered my life,
everything felt different.

Your smile became my sunrise.
Your voice became my favorite sound.
Your presence became my peace.

If loving you is a dream,
then I never want to wake up.

You are not just my Valentine…
You are my forever.
❤️
`;

  // Typing effect + autoplay music
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);

    // Try autoplay (works on desktop, may wait for interaction on mobile)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay blocked until user interaction");
      });
    }

    return () => clearInterval(interval);
  }, []);

  const scrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: "smooth" });

    // Ensure music starts after first tap (mobile safe)
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="bg-black text-white"
    >
      {/* AUDIO */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/romantic.mp3" type="audio/mpeg" />
      </audio>

      {/* HERO SECTION */}
      <div className="relative min-h-screen glow-bg flex items-center justify-center text-white px-6 text-center overflow-hidden">

        {/* Floating Hearts */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <FaHeart
              key={i}
              className="absolute text-white/20 animate-pulse"
              size={Math.random() * 30 + 10}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg mb-6 leading-tight">
            From the moment I met you… ❤️
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90">
            My world changed in ways I never imagined.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToLetter}
            className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-lg font-semibold shadow-lg hover:bg-white/30 transition-all"
          >
            Open My Heart 💌
          </motion.button>
        </motion.div>
      </div>

      {/* LOVE LETTER SECTION */}
      <div
        ref={letterRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl text-base sm:text-lg leading-relaxed whitespace-pre-line"
        >
          {displayedText}
        </motion.div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="min-h-screen bg-black py-20 px-6 flex flex-col items-center">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Our Beautiful Journey 💕
        </h2>

        <div className="relative max-w-3xl w-full">

          {/* Vertical Line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 transform -translate-x-1/2"></div>

          {[
            "The first time we talked… something felt different.",
            "Our first late-night conversation that never ended.",
            "The first fight that made us stronger.",
            "The first time I realized… I love you.",
            "And now… forever begins."
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`mb-12 flex justify-center md:${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-full md:w-5/12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
                <p className="text-white/90">{text}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* SURPRISE SECTION */}
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 flex flex-col items-center justify-center text-center px-6">

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Will You Be Mine Forever? 💍❤️
        </motion.h2>

        <div className="flex flex-col sm:flex-row gap-6 items-center relative">

          {/* YES BUTTON */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });

              confetti({
                particleCount: 300,
                spread: 180,
                origin: { y: 0.6 },
              });

              setTimeout(() => {
                confetti({
                  particleCount: 200,
                  spread: 100,
                  origin: { y: 0.3 },
                });
              }, 400);
            }}
            className="bg-pink-500 w-56 py-4 rounded-full text-lg font-bold hover:scale-110 transition transform shadow-xl"
          >
            YES 💖
          </button>

          {/* NO BUTTON */}
          <button
            onClick={moveNoButton}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
            }}
            className="px-8 py-4 bg-gray-600 rounded-full text-white font-bold shadow-xl transition-all duration-300"
          >
            No 😢
          </button>

        </div>
      </div>

      {/* MUSIC TOGGLE */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full shadow-xl text-white hover:scale-110 transition-all"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

    </motion.div>
  );
}

export default App;
