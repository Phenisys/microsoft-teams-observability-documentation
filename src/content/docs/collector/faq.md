---
title: Collector FAQ
description: Frequently asked questions for operating the collector.
sidebar:
  label: FAQ
  order: 90
---

## Which collector variant should I use on this branch?

Use the standalone **Collector** for host-based deployment, or **Collector Extension** if you run Dynatrace ActiveGate.

## Where can I find the setup steps?

Start with:

- [Installation](/collector/v1/installation/)
- [Configuration](/collector/v1/configuration/)
- [CLI](/collector/v1/cli/)
- [Service Management](/collector/v1/service/)

## The backend receives no data. What should I check first?

1. Microsoft Graph credentials and consent.
2. Connectivity to `graph.microsoft.com` and your backend endpoint.
3. Collector logs and service status.

## Where can I find Dynatrace Extension setup?

See [Collector Extension Installation](/collector/extension/installation/).
