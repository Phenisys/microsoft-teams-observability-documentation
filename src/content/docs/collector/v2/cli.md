---
title: Using the CLI
description: Practical guide to common ms-teams-agent v2 commands for validation, runtime operations, service, and state.
sidebar:
  label: CLI
  order: 4
---

Practical guide to the most-used `ms-teams-agent` commands for v2 operations. For complete flags and subcommands, see [CLI Reference](/reference/cli-reference/).

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
| `state` | Inspect, export, reset, or migrate state |

## Validation Commands

Run these before starting collection in production:

```bash
# Validate YAML syntax and schema
ms-teams-agent validate --config ./config.yaml

# Validate config + test Microsoft Graph auth + test all exporters
ms-teams-agent test-connection --config ./config.yaml
```

## Running the Collector

```bash
# Continuous collection (main operation)
ms-teams-agent run --config ./config.yaml

# Test pipeline without exporting to backends
ms-teams-agent run --config ./config.yaml --dry-run

# Debug a specific call
ms-teams-agent run --config ./config.yaml --call-id <CALL_ID> --log-level DEBUG

# Run a cycle without existing state
ms-teams-agent run --config ./config.yaml --ignore-state

# Override state database path
ms-teams-agent run --config ./config.yaml --state-file ./state/state.db
```

## Service Management (Linux)

Most service actions require `sudo`.

```bash
# Install and start as a systemd service
sudo ms-teams-agent service enable-service --config /absolute/path/config.yaml

# Check service status (default instance)
sudo ms-teams-agent service status

# Check a named instance
sudo ms-teams-agent service status --instance prod

# Restart a service instance
sudo ms-teams-agent service restart --instance default

# Update config for a running instance (restart only if already active)
sudo ms-teams-agent service install-config \
  --config /etc/config.prod.yaml \
  --instance prod \
  --service-restart-if-active

# Remove a service instance
sudo ms-teams-agent service disable-service --instance default
```

Available service actions are: `install`, `install-config`, `enable`, `restart`, `status`, `disable`, `remove`, `provision`, `enable-service`, `disable-service`.

See [Service Management](/collector/v2/service/) for lifecycle procedures and rollout-safe updates.

## State Operations

The collector uses a local SQLite state database to track processed objects and deduplication.

```bash
# Show current state (safe while service is active)
ms-teams-agent state show

# Export state snapshot to JSON
ms-teams-agent state export --output state-snapshot.json

# Export selected object types with filters
ms-teams-agent state export \
  --include-objects \
  --type calls_collection \
  --since 2026-03-28 \
  --limit 200 \
  --output state-detailed.json

# Reset state (forces full re-collection on next run)
ms-teams-agent state reset
```

### Temporary Migration Command

Use this only during v1 to v2 migration:

```bash
ms-teams-agent state migrate-v1 --source ./state-v1.json

# Non-interactive migration for CI/automation
ms-teams-agent state migrate-v1 --source ./state-v1.json --overwrite --force
```

## Recommended Operational Workflow

```bash
# 1. Validate config
ms-teams-agent validate --config ./config.yaml

# 2. Test connectivity
ms-teams-agent test-connection --config ./config.yaml

# 3. Start collection
ms-teams-agent run --config ./config.yaml
```
