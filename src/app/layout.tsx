// LayOut

// 导入工具函数
import { cn } from "@/lib/utils";
// 导入全局样式
import "../styles/globals.css";
// 导入字体
import { Inter } from "next/font/google";
// 导入组件
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import BackgroundCircles from "@/components/BackgroundCircles";

// 配置 Inter 字体
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


// 根布局组件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <head>
        {/* 添加安全相关的 meta 标签 */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          "antialiased",
          "flex flex-col",
          "relative overflow-y-auto"
        )}
      >
        <BackgroundCircles />
        <div className="relative z-10 flex flex-col flex-grow">
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  );
}
