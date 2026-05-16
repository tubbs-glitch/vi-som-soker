import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "se.visomsoker.app",
  appName: "Vi som söker",
  webDir: "out",
  // Native iOS-app öppnar på vår build-yta. Inga live-reload-pekare —
  // alla resurser bakas in vid build.
  ios: {
    // Beteenden som matchar vår mobile-first design
    contentInset: "always",
    backgroundColor: "#0a0908",
  },
};

export default config;
