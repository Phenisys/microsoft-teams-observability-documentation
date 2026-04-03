---
title: Collector FAQ
description: Frequently asked questions for operating the collector on the v1 branch.
sidebar:
  label: FAQ
  order: 90
---

## Which collector variant should I use on this branch?

Use **Collector v1** for standalone deployments and **Collector Extension** if you run Dynatrace ActiveGate.

## Where can I find the v1 setup steps?

Start with:

- [v1 Installation](/collector/v1/installation/)
- [v1 Configuration](/collector/v1/configuration/)
- [v1 CLI](/collector/v1/cli/)
- [v1 Service](/collector/v1/service/)

## The backend receives no data. What should I check first?

1. Microsoft Graph credentials and consent.
2. Connectivity to `graph.microsoft.com` and your backend endpoint.
3. Collector logs and service status.

## Where can I find Dynatrace Extension setup?

See [Collector Extension Installation](/collector/extension/installation/).
