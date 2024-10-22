"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";

interface EmojiDisplayProps {
  emoticon_one: string;
  emoticon_two: string;
  emoticon_three: string;
  emoticon_four: string;
  sentence: string;
}

export function EmojiDisplay({
  emoticon_one,
  emoticon_two,
  emoticon_three,
  emoticon_four,
  sentence
}: EmojiDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
  };

  const renderEmojiBlock = (emoji: string, id: string) => (
    <div className="relative p-6 bg-white/90 rounded-lg shadow-md min-h-[140px] min-w-[280px] flex items-center justify-center">
      {emoji ? (
        <>
          <button
            onClick={() => copyToClipboard(emoji, id)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="复制表情"
          >
            <Copy size={18} />
          </button>
          <p className="text-3xl text-center">{emoji}</p>
          {copied === id && (
            <span className="absolute bottom-3 right-3 text-xs text-green-500">已复制</span>
          )}
        </>
      ) : (
        <p className="text-black/90 text-xl">⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {renderEmojiBlock(emoticon_one, "one")}
        {renderEmojiBlock(emoticon_two, "two")}
        {renderEmojiBlock(emoticon_three, "three")}
        {renderEmojiBlock(emoticon_four, "four")}
      </div>
      <div className="relative p-5 bg-white/90 rounded-lg shadow-md flex items-center min-h-[70px]">
        {sentence ? (
          <>
            <p className="flex-grow text-lg">{sentence}</p>
            <button
              onClick={() => copyToClipboard(sentence, "sentence")}
              className="ml-5 text-gray-500 hover:text-gray-700"
              aria-label="复制句子"
            >
              <Copy size={18} />
            </button>
            {copied === "sentence" && (
              <span className="absolute bottom-2 right-3 text-xs text-green-500">已复制</span>
            )}
          </>
        ) : (
          <p className="text-black/90 text-xl">⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾</p>
        )}
      </div>
    </div>
  );
}
