import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickedKeys = [
  "REACT_APP_EMAILJS_EMAIL_PROVIDER_SERVICE_ID",
  "REACT_APP_EMAILJS_EMAIL_PROVIDER_TEMPLATE_ID",
  "REACT_APP_EMAILJS_EMAIL_PROVIDER_PUBLICKEY_ID",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg"],
    },
    build: {
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
    worker: {
      format: "es",
      plugins: [],
    },
  };
});
