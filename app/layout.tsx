import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "./globals.css";
const gothic = Gothic_A1({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-gothic" });
export const metadata: Metadata = {
  title: "Md Belal Ashraf | Civil Engineer: QA/QC & Project Controls",
  description: "Civil engineering student at Jamia Millia Islamia with internships at DLF, ONGC and IIT Delhi.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={gothic.variable}>{children}</body></html>);
}
