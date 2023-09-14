"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Navbar from "@/components/instructionsComponent/navigation/navbar";
import Footer from "@/components/instructionsComponent/navigation/footer";

import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { sepolia } from "@wagmi/chains";

// https://github.com/wagmi-dev/viem/discussions/781
export function useShutTheFuckUpAboutENS() {
  useIsomorphicLayoutEffect(() => {
    const orig = window.console.error;
    window.console.error = function (...args) {
      if (args[0]?.name === "ChainDoesNotSupportContract") return;
      orig.apply(window.console, args);
    };
  }, []);
}

// const walletConnectProjectID = process?.env?.WALLET_CONNECT_PROJECT_ID ?? "demo";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "b4ea7572dbfd1001a2436a052c2364c0",

    // Required
    appName: "Tokenized Lottery",
    chains: [sepolia],

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useShutTheFuckUpAboutENS();
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <body>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "105vh" }}>
              <Navbar />
              <div style={{ flexGrow: 1 }}>{children}</div>
              <Footer />
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
