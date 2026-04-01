// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://phenisys.github.io",
	integrations: [
		starlight({
			title: "MS Teams Observability",
			lastUpdated: true,
			defaultLocale: "root",
			locales: {
				root: { label: "English", lang: "en" },
				fr: { label: "Français", lang: "fr-FR" },
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/Phenisys/microsoft-teams-observability",
				},
			],
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{ slug: "getting-started" },
						{ slug: "getting-started/overview" },
						{ slug: "getting-started/prerequisites" },
					],
				},
				{
					label: "Collector",
					items: [
						{ slug: "collector" },
						{ slug: "collector/azure-permissions" },
						{ slug: "collector/installation" },
						{ slug: "collector/configuration" },
						{ slug: "collector/cli" },
						{ slug: "collector/service" },
						{ slug: "collector/runbook" },
						{ slug: "collector/troubleshooting" },
						{ slug: "collector/faq" },
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
								{ slug: "backends/dynatrace/installation" },
								{ slug: "backends/dynatrace/configuration" },
								{ slug: "backends/dynatrace/collector-connection" },
								{ slug: "backends/dynatrace/dashboards" },
								{ slug: "backends/dynatrace/troubleshooting" },
								{ slug: "backends/dynatrace/faq" },
							],
						},
						{
							label: "Splunk",
							collapsed: true,
							items: [
								{ slug: "backends/splunk" },
								{ slug: "backends/splunk/installation" },
								{ slug: "backends/splunk/configuration" },
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
						{ slug: "reference/configuration-schema" },
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
