"use client";
// 主页
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import UserInput from "@/components/UserInput";
import EmojiDisplay from "@/components/EmojiDisplay";

interface EmojiResponse {
  emoticon_one: string;
  emoticon_two: string;
  emoticon_three: string;
  emoticon_four: string;
  sentence: string;
}

const Home = () => {
  const [emojiData, setEmojiData] = useState<EmojiResponse>({
    emoticon_one: "",
    emoticon_two: "",
    emoticon_three: "",
    emoticon_four: "",
    sentence: "",
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleEmojiResponse = (data: EmojiResponse | null) => {
    setEmojiData(
      data || {
        emoticon_one: "",
        emoticon_two: "",
        emoticon_three: "",
        emoticon_four: "",
        sentence: "",
      }
    );
  };

  useEffect(() => {
    if (Object.values(emojiData).some(Boolean)) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [emojiData]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto">
        <div className="container mx-auto flex flex-col items-center w-full px-6 py-10">
          <div className="relative flex flex-col items-center w-fit">
            <h1 className="text-5xl text-[#FE7600]/90 font-bold mb-6 dark:text-[#FE7600]/75">
              颜文字 Ya ~
            </h1>
            <p className="mt-4 mb-12 text-2xl text-[#504f4f] text-center dark:text-white/60">
              在下方输入一些场景，即可生成颜文字喔 (*´∀)~♥ ！
            </p>
            <Image
              src="/svg/go.svg"
              width={100}
              height={100}
              className="hidden md:block absolute top-8 -right-32"
              alt="go"
            />
          </div>
          <div className="w-full max-w-[600px] mb-8 backdrop-blur-lg">
            <UserInput onEmojiResponse={handleEmojiResponse} />
          </div>
          <EmojiDisplay {...emojiData} />
          <div ref={bottomRef} />
        </div>
      </main>
    </div>
  );
};

export default Home;
