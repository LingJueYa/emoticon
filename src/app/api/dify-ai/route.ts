import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// 定义 URL
const DIDY_API_URL = process.env.DIDY_API_URL || "https://api.dify.ai/v1";
// 定义 API_KEY
const DIFY_API_KEY = process.env.DIFY_API_KEY;

export async function POST(req: NextRequest) {
  const { emojiDescription } = await req.json();

  // 确保请求体中包含 emojiDescription 字段
  if (!emojiDescription) {
    return NextResponse.json({ message: "表情描述不存在" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      `${DIDY_API_URL}/workflows/run`,
      {
        inputs: { user_input: emojiDescription },
        response_mode: "blocking",
        user: "test-user",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIFY_API_KEY}`,
        },
      }
    );

    let emoticons = response.data.data.outputs.emoticons;
    
    // 尝试解析 emoticons，如果它是一个字符串
    if (typeof emoticons === 'string') {
      try {
        emoticons = JSON.parse(emoticons);
      } catch (parseError) {
        console.error("无法解析 emoticons 字符串:", parseError);
      }
    }

    // 修改检查逻辑
    if (!emoticons || typeof emoticons !== 'object' || Array.isArray(emoticons)) {
      console.error("返回的数据不是一个有效的对象");
      console.log(emoticons);
      return NextResponse.json(
        { message: "输出格式无效" },
        { status: 400 }
      );
    }

    const requiredFields = ['emoticon_one', 'emoticon_two', 'emoticon_three', 'emoticon_four', 'sentence'];
    const missingFields = requiredFields.filter(field => !(field in emoticons));

    if (missingFields.length > 0) {
      console.error(`返回的数据缺少以下字段: ${missingFields.join(', ')}`);
      console.log(emoticons);
      return NextResponse.json(
        { message: "输出格式无效", missingFields },
        { status: 400 }
      );
    }

    // 直接返回 emoticons
    return NextResponse.json(emoticons);
  } catch (error: unknown) {
    console.error("运行工作流错误:", error);

    const errorMessage =
      ((error as Error & { response?: { data?: string } }).response
        ?.data as string) || (error as Error).message;

    return NextResponse.json(
      { message: "内容输出错误", error: errorMessage },
      { status: 500 }
    );
  }
}
