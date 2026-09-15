import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Exp. 447",
    description: "A collection of useful digital things.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
