---
title: CLI Reference
description: User command reference for ms-teams-agent.
sidebar:
  label: CLI Reference
  order: 4
---

Quick command reference for running and operating the collector.

## Command Shape

```bash
ms-teams-agent <command> [options]
```

| Command | Purpose |
| --- | --- |
| `run` | Start collection and export |
| `validate` | Validate config and exit |
| `test-connection` | Test Microsoft auth and backend connectivity |
| `service` | Manage Linux systemd service |
| `state` | Inspect or reset local collector state |

## `run`

```bash
ms-teams-agent run --config <path> [options]
```

| Option | Purpose |
| --- | --- |
| `--config <path>` | Required config file |
| `--log-level <LEVEL>` | Override log level |
| `--call-id <id>` | Process one call for troubleshooting |
| `--ignore-state` | Run one cycle without previous state |
| `--state-file <path>` | Custom local state file |
| `--dry-run` | Test collection without sending data |

Examples:

```bash
ms-teams-agent run --config ./config.yaml
ms-teams-agent run --config ./config.yaml --dry-run
ms-teams-agent run --config ./config.yaml --call-id <CALL_ID> --log-level DEBUG
```

## `validate`

```bash
ms-teams-agent validate --config ./config.yaml
```

Validates YAML configuration and exits.

## `test-connection`

```bash
ms-teams-agent test-connection --config ./config.yaml
```

Checks Microsoft authentication and output connectivity.

## `service` (Linux)

```bash
ms-teams-agent service <action> [options]
```

Most-used actions:

- `enable-service`
- `disable-service`
- `status`
- `restart`
- `install-config`

Example:

```bash
sudo ms-teams-agent service enable-service --config /absolute/path/config.yaml
sudo ms-teams-agent service status --instance default
```

## `state`

```bash
ms-teams-agent state show
ms-teams-agent state reset
ms-teams-agent state export --output state-snapshot.json
```

Use with care in production, especially `reset`.

## Global Options

```bash
ms-teams-agent --version
ms-teams-agent --help
```

## Recommended Workflow

```bash
ms-teams-agent validate --config ./config.yaml
ms-teams-agent test-connection --config ./config.yaml
ms-teams-agent run --config ./config.yaml
```
