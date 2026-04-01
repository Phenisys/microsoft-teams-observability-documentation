---
title: Collector FAQ
description: Frequently asked questions about the MS Teams Observability Collector — licensing, configuration, deployment, sizing, and security.
sidebar:
  label: FAQ
  order: 6
---

## Licensing and Activation

**How do I obtain a trial license?**

A trial license can be provided by the vendor or the team responsible for the product. It is required to activate the application and start testing in a target environment.

**Where do I configure the license?**

In your YAML config file, set `license.filepath` to the path of your license file:

```yaml
license:
  filepath: /etc/ms-teams-observability-agent/license.json
```

**Is a full redeployment required after updating the license?**

No. A reload of the configuration or a restart of the collector component is sufficient in most cases.

**Can a Microsoft tenant error be caused by a missing or invalid license?**

Yes. A missing, expired, or invalid license can prevent correct initialisation of certain features and produce tenant recognition or configuration errors.

---

## Configuration

**What are the minimum configuration requirements?**

- A valid license file
- Microsoft Graph credentials (`tenant_id`, `client_id`, and one auth method)
- Required API permissions
- Network connectivity between the Collector, Microsoft Graph API, and the output platform (Dynatrace/Splunk/OTel)

**Is the `sites.csv` file mandatory?**

No, it is optional. However, without it the Sites dashboard will show all calls as "No Mapped Calls" and site compliance analysis will not be possible.

**Is there a debug mode?**

Yes. Pass `--log-level DEBUG` to the `run` command to enable verbose logging. Debug logs are strongly recommended for diagnosing authentication, collection, or configuration issues.

**Why can't I save parameters in the Configuration tab of the Application?**

Possible causes:

- Backend endpoint unreachable
- Connectivity problem between the Application and the Collector
- Permission error
- Configuration inconsistency or application anomaly

An HTTP 404 error on save typically means a route is not exposed — check that the Collector backend is running and reachable.

---

## Collector Deployment

**Where can the Collector be installed?**

On any server meeting the technical and network prerequisites. It is not limited to a specific Dynatrace component unless your architecture requires it.

**Must the Collector run on an ActiveGate?**

No. The essential requirement is that the host has the necessary network access, system resources, and permissions.

**Does the Collector location matter?**

Yes. The location can influence:

- Network latency
- Communication stability
- Security compliance
- Quality of data flows to Microsoft Graph and the output platform

**What network flows and ports must be opened?**

The Collector must reach the required Microsoft Graph endpoints and your output platform. Validate:

- Outbound flows to Microsoft Graph API
- Outbound flows to Dynatrace/Splunk/OTel endpoint
- DNS resolution
- Proxy configuration (if applicable)
- Firewall/filtering rules

---

## Sizing and Technical Requirements

**What are the CPU, memory, and storage requirements?**

They depend primarily on:

- Call volume
- Number of supervised users
- Collection frequency
- Level of detail in the collected data

**Does the Collector store data persistently?**

The Collector is designed to collect and forward data to your observability backend. It keeps only local operational state required for reliable execution, not long-term call analytics storage.

**How do I size the Collector for high call volumes?**

Consider:

- Total session count
- Peak activity periods
- Data granularity
- Retry and recovery mechanisms
- Local processing capacity

A pilot or load test is recommended for high-volume environments.

---

## Security and Data

**Is the solution compatible with Microsoft 365 GovCloud?**

Compatibility with GCC, GCC High, or DoD must be explicitly validated. It depends on supported Microsoft endpoints, authentication mechanisms, and product compliance constraints.

**Where is data stored?**

Data location depends on the Dynatrace region used and your target architecture. This point must be confirmed to meet data residency requirements.

**How do I protect sensitive data such as user names or external IPs?**

Apply a combined strategy:

- Data minimisation at collection time
- Field masking
- Access control by field
- Role separation
- Clear data governance documentation

**Can Dynatrace Grail be used to restrict access to specific fields?**

Yes. A strategy based on fieldsets, access rights, and masking at ingest or query time is appropriate for controlling exposure of sensitive data.

**Does Microsoft Graph API usage incur additional costs?**

This depends on the APIs used, existing Microsoft licenses, and service conditions. Validate based on the actual functional scope implemented.
