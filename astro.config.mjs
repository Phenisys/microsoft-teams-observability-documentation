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
  redirects: {
    "/collector/standalone/": "/collector/",
    "/collector/v2/": "/collector/",
    "/collector/standalone/installation/": "/collector/v2/installation/",
    "/collector/standalone/configuration/": "/collector/v2/configuration/",
    "/collector/standalone/cli/": "/collector/v2/cli/",
    "/collector/standalone/service/": "/collector/v2/service/",
    "/collector/standalone/runbook/": "/collector/v2/runbook/",
    "/collector/standalone/faq/": "/collector/v2/faq/",
    "/collector/standalone/upgrade/": "/collector/v2/upgrade/",
    "/collector/standalone/migration/": "/collector/v2/migration/",
    "/collector/standalone/troubleshooting/": "/collector/troubleshooting/",
    "/collector/v2/troubleshooting/": "/collector/troubleshooting/",
    "/collector/v1/installation/": "/reference/archive/v1-deprecated/installation/",
    "/collector/v1/configuration/": "/reference/archive/v1-deprecated/configuration/",
    "/collector/v1/lookup-file/": "/reference/archive/v1-deprecated/lookup-file/",
    "/collector/v1/cli/": "/reference/archive/v1-deprecated/cli/",
    "/collector/v1/service/": "/reference/archive/v1-deprecated/service/",
  },
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
          label: "Start Here",
          items: [
            { slug: "getting-started" },
            { slug: "getting-started/deploy-dynatrace" },
            { slug: "getting-started/deploy-splunk" },
            { slug: "getting-started/deploy-grafana" },
            { slug: "getting-started/deploy-otlp" },
            { slug: "getting-started/prerequisites" },
            { slug: "getting-started/license" },
          ],
        },
        {
          label: "Operate",
          items: [
            { slug: "collector" },
            { slug: "collector/v2/installation" },
            { slug: "collector/v2/configuration" },
            { slug: "collector/v2/runbook" },
            { slug: "collector/v2/upgrade" },
            { slug: "collector/v2/migration" },
            {
              label: "Service & CLI",
              collapsed: true,
              items: [
                { slug: "collector/v2/service" },
                { slug: "collector/v2/cli" },
              ],
            },
            {
              label: "Extension",
              collapsed: true,
              items: [
                { slug: "collector/extension" },
                { slug: "collector/extension/installation" },
                { slug: "collector/extension/upgrade" },
                { slug: "collector/extension/migration" },
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
              label: "Grafana",
              collapsed: true,
              items: [
                { slug: "backends/grafana" },
                {
                  label: "Application",
                  items: [
                    { slug: "backends/grafana/app" },
                    { slug: "backends/grafana/app/installation" },
                    {
                      label: "Pages",
                      items: [
                        { slug: "backends/grafana/app/home" },
                        { slug: "backends/grafana/app/sites" },
                        { slug: "backends/grafana/app/calls" },
                        { slug: "backends/grafana/app/users" },
                        { slug: "backends/grafana/app/issues" },
                        { slug: "backends/grafana/app/status" },
                        { slug: "backends/grafana/app/provisioning" },
                      ],
                    },
                  ],
                },
                {
                  label: "OTLP → Grafana Cloud",
                  collapsed: true,
                  items: [{ slug: "backends/otlp/grafana" }],
                },
              ],
            },
            {
              label: "OTel / OTLP",
              collapsed: true,
              items: [
                { slug: "backends/otlp" },
                { slug: "backends/otlp/configuration" },
                { slug: "backends/otlp/grafana" },
                { slug: "backends/otlp/datadog" },
              ],
            },
          ],
        },
        {
          label: "Reference",
          collapsed: true,
          items: [
            { slug: "reference" },
            { slug: "reference/cli-reference" },
            { slug: "reference/metrics-dictionary" },
            { slug: "collector/azure-permissions" },
            { slug: "reference/license-estimation" },
            { slug: "reference/sites-file" },
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
            {
              label: "Archive",
              collapsed: true,
              items: [{ slug: "reference/archive/v1-deprecated" }],
            },
          ],
        },
        {
          label: "Architecture & Concepts",
          items: [
            { slug: "concepts/data-flow" },
            { slug: "reference/metrics-dictionary" },
            { slug: "concepts/demo-vs-live" },
          ],
        },
      ],
    }),
  ],
});
