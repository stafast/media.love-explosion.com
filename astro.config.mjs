// @ts-check
import { loadEnv } from "vite";
import {defineConfig, envField} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from "@astrojs/partytown";

const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
    site: BASE_URL,
    trailingSlash: 'always',
    prefetch: {
        defaultStrategy: 'viewport'
    },
    env: {
        schema: {
            API_URL: envField.string({ context: "server", access: "public", optional: false }),
            BASE_URL: envField.string({ context: "server", access: "public", optional: false })
        }
    },
    integrations: [tailwind(), partytown()],
});