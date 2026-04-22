// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const base = env.PUBLIC_BASE_PATH ?? "/";

// https://astro.build/config
export default defineConfig({
  site: "https://phenisys.github.io",
  base,
  integrations: [
    mermaid(),
    starlight({
      title: "MS Teams Observability",
      favicon: "/favicon.ico",
      lastUpdated: true,
      components: {
        Footer: "./src/components/Footer.astro",
      },
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
      },
      social: [
        {
          icon: "external",
          label: "Website",
          href: "https://www.phenisys.com/",
        },
        {
          icon: "rss",
          label: "Blog",
          href: "https://www.phenisys.com/blog/",
        },
        {
          icon: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/phenisys/",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Phenisys/microsoft-teams-observability",
        },
        {
          icon: "comment-alt",
          label: "Contact",
          href: "https://www.phenisys.com/contact/#contact",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { slug: "getting-started" },
            { slug: "getting-started/prerequisites" },
            { slug: "getting-started/license" },
          ],
        },
        {
          label: "Collector",
          items: [
            { slug: "collector" },
            { slug: "collector/azure-permissions" },
            {
              label: "v2",
              collapsed: true,
              items: [
                { slug: "collector/v2" },
                { slug: "collector/v2/installation" },
                { slug: "collector/v2/configuration" },
                { slug: "collector/v2/cli" },
                { slug: "collector/v2/service" },
                { slug: "collector/v2/runbook" },
                { slug: "collector/v2/troubleshooting" },
                { slug: "collector/v2/faq" },
                { slug: "collector/v2/migration" },
              ],
            },
            {
              label: "Extension",
              collapsed: true,
              items: [
                { slug: "collector/extension" },
                { slug: "collector/extension/installation" },
                { slug: "collector/extension/migration" },
              ],
            },
            {
              label: "v1 (Deprecated)",
              collapsed: true,
              items: [
                { slug: "collector/v1/installation" },
                { slug: "collector/v1/configuration" },
                { slug: "collector/v1/lookup-file" },
                { slug: "collector/v1/cli" },
                { slug: "collector/v1/service" },
              ],
            },
            { slug: "collector/troubleshooting" },
          ],
        },
        {
          label: "Backends",
          items: [
            { slug: "backends" },
            {
              label: "Dynatrace",
              items: [
                { slug: "backends/dynatrace" },
                { slug: "backends/dynatrace/prerequisites" },
                { slug: "backends/dynatrace/configuration" },
                { slug: "backends/dynatrace/collector-connection" },
                {
                  label: "Application",
                  collapsed: true,
                  items: [
                    { slug: "backends/dynatrace/app" },
                    { slug: "backends/dynatrace/app/installation" },
                    {
                      label: "Pages",
                      items: [
                        { slug: "backends/dynatrace/app/home" },
                        { slug: "backends/dynatrace/app/sites" },
                        { slug: "backends/dynatrace/app/calls" },
                        { slug: "backends/dynatrace/app/call-overview" },
                        { slug: "backends/dynatrace/app/users" },
                        { slug: "backends/dynatrace/app/issues" },
                        { slug: "backends/dynatrace/app/configuration" },
                      ],
                    },
                  ],
                },
                {
                  label: "Dashboards",
                  collapsed: true,
                  items: [{ slug: "backends/dynatrace/dashboards" }],
                },
                { slug: "backends/dynatrace/troubleshooting" },
              ],
            },
            {
              label: "Splunk",
              collapsed: true,
              items: [
                { slug: "backends/splunk" },
                { slug: "backends/splunk/configuration" },
                {
                  label: "Application",
                  items: [
                    { slug: "backends/splunk/application" },
                    { slug: "backends/splunk/application/installation" },
                    { slug: "backends/splunk/application/pages" },
                  ],
                },
                { slug: "backends/splunk/troubleshooting" },
              ],
            },
            {
              label: "OTel / OTLP",
              collapsed: true,
              items: [
                { slug: "backends/otlp" },
                { slug: "backends/otlp/configuration" },
              ],
            },
          ],
        },
        {
          label: "Reference",
          collapsed: true,
          items: [
            { slug: "reference" },
            {
              label: "FAQ",
              collapsed: true,
              items: [
                { slug: "reference/faq" },
                { slug: "reference/faq/common" },
                { slug: "reference/faq/data-security" },
                { slug: "reference/faq/dynatrace-app" },
                { slug: "reference/faq/dynatrace-extension" },
                { slug: "reference/faq/standalone" },
              ],
            },
            { slug: "reference/cli-reference" },
            { slug: "reference/metrics-dictionary" },
            { slug: "reference/azure-permissions" },
            { slug: "reference/license-estimation" },
          ],
        },
      ],
    }),
  ],
});
