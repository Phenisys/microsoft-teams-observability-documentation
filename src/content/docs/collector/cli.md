---
title: Using the CLI
description: Practical guide to the most common ms-teams-agent commands for deployment, validation, and operations.
sidebar:
  label: CLI
  order: 4
---

Practical guide to the most-used `ms-teams-agent` commands. For the full option reference, see [CLI Reference](/reference/cli-reference/).

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
| `state` | Inspect or reset the collection state database |

---

## Validation commands

Always run these before starting collection in production:

```bash
# Validate YAML syntax and schema
ms-teams-agent validate --config ./config.yaml

# Validate config + test Microsoft Graph auth + test all exporters
ms-teams-agent test-connection --config ./config.yaml
```

---

## Running the collector

```bash
# Continuous collection (main operation)
ms-teams-agent run --config ./config.yaml

# Test the pipeline without exporting to backends
ms-teams-agent run --config ./config.yaml --dry-run

# Debug a specific call
ms-teams-agent run --config ./config.yaml --call-id <CALL_ID> --log-level DEBUG
```

---

## Service management (Linux)

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

# Remove the service entirely
sudo ms-teams-agent service disable-service
```

See [Service Management](/collector/service/) for initial setup and the full list of service actions.

---

## State inspection

The collector maintains a local SQLite database to track processed objects and avoid duplicates.

```bash
# Show current state (safe to run while the service is active)
ms-teams-agent state show

# Export state to a JSON file
ms-teams-agent state export --output state-snapshot.json

# Reset state (forces full re-collection on next run — use with care in production)
ms-teams-agent state reset
```

---

## Recommended operational workflow

```bash
# 1. Validate config
ms-teams-agent validate --config ./config.yaml

# 2. Test connectivity
ms-teams-agent test-connection --config ./config.yaml

# 3. Start collection
ms-teams-agent run --config ./config.yaml
```

For Linux service deployments:

```bash
ms-teams-agent validate --config ./config.yaml
sudo ms-teams-agent service enable-service --config /absolute/path/config.yaml
sudo ms-teams-agent service status
```
