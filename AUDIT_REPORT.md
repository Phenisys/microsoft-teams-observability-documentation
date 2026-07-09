# Doc Audit Report

**Date:** 2026-07-09
**Agent:** teams-doc-maintainer v1.0.0

## Repos Analysés (branche `main`)

| Repo | SHA | Version |
|------|-----|---------|
| collector | `25adc062ef072be4e512f6cbc63079634a697484` | v2.9.0 |
| dynatrace-app | `cf194f3718b1d1faccaea4f7e5f93a8a85562acd` | v2.9.0 |
| dynatrace-extension | `08c404f7bd386cbbc9123b6fb5026704dc0f9cb9` | v2.9.0 |
| grafana-app | `c4003405b60c69483bb4a4d022f0c27995561662` | v1.2.0 |
| docs | `918b235fd9399d2e01889373b90950a3f8c2d688` | — |

**Dernier audit:** 2026-06-03 (b5856223 → 25adc06 = +41 commits collector, tous les repos ont changé)

---

## Résumé

- **50 fichiers MDX** dans la doc
- **19 incohérences** trouvées : **7 HIGH**, **8 MEDIUM**, **4 LOW**
- **1 absence majeure** : Grafana App complètement non documentée
- Les changements v2.9.0 du collector (DatabaseConfig supprimé, outbox retiré, rate limits modifiés) rendent ~30% de `configuration.mdx` obsolète

---

## Incohérences par Sévérité

### 🔴 HIGH (7)

#### H1 — Section "Database Retention" entièrement obsolète
- **Doc concernée** : `collector/v2/configuration.mdx` (lignes 264–283)
- **Code source** : DatabaseConfig supprimé (commit `4aaac6d`)
- **Ce que dit la doc** : Section "Optional: Database Retention" documentant `outbox_sent_retention_days`, `outbox_max_attempts`, `outbox_max_log_age_hours`, `max_processed_objects_per_type`, `processed_objects_max_age_hours`
- **Ce que dit le code** : Aucun de ces champs n'existe plus. DatabaseConfig retiré, workers/retention/rate limits hardcodés dans `constants.py`
- **Impact** : Utilisateurs qui configurent ces champs auront des erreurs de validation
- **Action** : **Supprimer** toute la section "Optional: Database Retention"

#### H2 — `detail_per_second` default erroné (20.0 → 75)
- **Doc concernée** : `collector/v2/configuration.mdx` (ligne 221)
- **Code source** : `config/models.py` → `detail_per_second: float | None = Field(default=75, gt=0)`
- **Ce que dit la doc** : `# Default: 20.0`
- **Ce que dit le code** : `75`
- **Contexte** : L'ancien audit H2 signalait un conflit model=20.0 vs schema=1.0. Le modèle a été mis à jour à 75 dans v2.9.0.

#### H3 — `list_per_second` default erroné (1.0 → 2)
- **Doc concernée** : `collector/v2/configuration.mdx` (ligne 219)
- **Code source** : `config/models.py` → `list_per_second: float | None = Field(default=2, gt=0)`
- **Ce que dit la doc** : `# Default: 1.0`
- **Ce que dit le code** : `2`

#### H4 — `max_items_per_cycle` documenté mais supprimé du code
- **Doc concernée** : `collector/v2/configuration.mdx` (ligne 211)
- **Code source** : `config/models.py` → champ absent de `CallsAdvancedConfig`
- **Ce que dit la doc** : `max_items_per_cycle: null    # No cap by default`
- **Ce que dit le code** : Ce champ n'existe plus

#### H5 — `state purge-stale` documenté mais remplacé par `vacuum`
- **Doc concernée** : `reference/cli-reference.mdx` (lignes 126, 150–160, 196–200)
- **Code source** : `cli/__init__.py` → les actions state sont `show`, `reset`, `vacuum`, `export`, `migrate-v1`
- **Ce que dit la doc** : `purge-stale` avec flags `--older-than`, `--category`, `--dry-run`
- **Ce que dit le code** : `purge-stale` n'existe plus, remplacé par `vacuum` (sans flags)
- **Impact** : Les utilisateurs qui suivent la doc taperont une commande invalide

#### H6 — Référence "outbox" dans la doc de migration
- **Doc concernée** : `collector/v2/migration.mdx` (ligne 20)
- **Ce que dit la doc** : `State: SQLite (state.db) with deduplication + outbox`
- **Ce que dit le code** : L'outbox a été supprimé dans v2.9.0

#### H7 — Grafana App complètement absente de la documentation
- **Doc concernée** : `backends/index.mdx`, `getting-started/index.mdx`, ensemble du site
- **Code source** : `phenisyslab-msteamsobservability-app` v1.2.0 — app Grafana publiée sur le Plugin Catalog avec 7 pages (Home, Calls, Call Overview, Users, Sites, Issues, Configuration)
- **Ce que dit la doc** : OTLP = "No native app" (`getting-started/index.mdx` ligne 84), aucun fichier Grafana App
- **Ce que dit le code** : L'app Grafana existe et a des fonctionnalités équivalentes à l'app Dynatrace
- **Fichiers manquants** : `backends/grafana/index.mdx`, `backends/grafana/app/*.mdx` (8+ pages), `getting-started/deploy-grafana.mdx`

---

### 🟡 MEDIUM (8)

#### M1 — `service_name` OTel dans les exemples de doc (encore `"ms-teams-agent"`)
- **Doc concernée** : `collector/v2/configuration.mdx` (lignes 104, 117, 130), `backends/otlp/grafana.mdx` (ligne 33)
- **Code source** : `config/models.py` → `service_name: str = "msteams-callrecords"`
- **Ce que dit la doc** : Tous les exemples OTel montrent `service_name: "ms-teams-agent"`
- **Ce que dit le code** : Le défaut est `"msteams-callrecords"`
- **Note** : `config.example.yaml` utilise aussi `"ms-teams-agent"` — l'exemple diverge volontairement du défaut. À clarifier avec un aside.

#### M2 — Nouveaux champs throttle non documentés
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `config/models.py` → `CallsThrottleAdvancedConfig`
- **Champs manquants** :
  - `in_cycle_max_retries` (default: 2) — short 429 retries in-cycle
  - `in_cycle_retry_max_wait_seconds` (default: 30) — max wait before persisted backoff

#### M3 — `max_call_duration_hours` manquant dans l'exemple deploy-dynatrace
- **Doc concernée** : `getting-started/deploy-dynatrace.mdx` (lignes 61–66)
- **Code source** : `config/models.py` → champ **required**
- **Ce que dit la doc** : L'exemple minimal de config ne l'inclut pas
- **Note** : Corrigé dans `installation.mdx` (audit précédent M5) mais oublié ici

#### M4 — Nouveaux champs de config non documentés
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Champs manquants** :
  - `license.expiration_warning_days` (default: 14)
  - `collection_config.log_format` (enum: text, json, default: text)
  - `output.console.pretty_print` (default: True)
  - `output.console.max_logs_display` (default: 10)
  - `output.otel[*].service_version` (default: "1.0.0")

#### M5 — Quality thresholds documentés incomplets
- **Doc concernée** : `collector/v2/configuration.mdx` (lignes 290–296)
- **Code source** : `QualityThresholdsConfig` contient audio, video, sharing
- **Ce que dit la doc** : Seulement `audio.max_rtt_ms` et `audio.max_jitter_ms`
- **Ce que dit le code** :
  - audio: `min_packet_utilization`, `max_rtt_ms`, `max_jitter_ms`, `max_packet_loss_rate`
  - video: `max_frame_loss_pct`, `min_frame_rate_fps`, `max_post_fec_loss_rate`
  - sharing: `max_frame_loss_pct`, `min_frame_rate_fps`

#### M6 — Dynatrace App version obsolète dans la doc
- **Doc concernée** : `backends/dynatrace/app/index.mdx` (ligne 13)
- **Ce que dit la doc** : `**Version:** 2.8.0`
- **Ce que dit le code** : v2.9.0

#### M7 — `deployment_environment` dans les exemples OTel (`"test"` vs défaut `"production"`)
- **Doc concernée** : `collector/v2/configuration.mdx` (lignes 105, 118, 131, 150)
- **Code source** : `OTelOutputConfig` → `deployment_environment: str = "production"`
- **Ce que dit la doc** : Tous les exemples utilisent `"test"`
- **Note** : `config.example.yaml` utilise `"production"`. Les exemples doc sont trompeurs.

#### M8 — `client_assertion_type` toujours présent dans la table de migration
- **Doc concernée** : `collector/v2/migration.mdx` (ligne 49)
- **Code source** : Le champ existe bien dans `GraphAuthConfig` (optionnel)
- **Statut précédent** : M6 — nécessitait revue humaine. Le champ est valide, pas une erreur.
- **Action** : Clôturer HR-3, c'est correct.

---

### 🟢 LOW (4)

#### L1 — `ca_bundle_path` pas documenté dans les champs de config avancée
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `AdvancedConfig` → `ca_bundle_path: str | None = None`
- **Ce que dit la doc** : Non mentionné dans les tableaux (mais `config.example.yaml` le documente en commentaire)

#### L2 — `backends/otlp/grafana.mdx` obsolète — ne couvre pas l'app Grafana
- **Doc concernée** : `backends/otlp/grafana.mdx`
- **Problème** : Cette page parle uniquement d'OTLP vers Grafana Cloud, pas de l'app Grafana Plugin
- **Action** : Renommer ou dupliquer — la page OTLP→Grafana Cloud reste utile, mais il faut une section Grafana App séparée

#### L3 — Tables des backends ne mentionne pas Grafana App
- **Doc concernée** : `backends/index.mdx` (ligne 15–20), `getting-started/index.mdx` (ligne 80–84)
- **Ce que dit la doc** : Table "Supported Backends" n'a que Dynatrace, Splunk, OTLP
- **Action** : Ajouter une ligne Grafana App dans les deux tables

#### L4 — `maxCallDuration` extension : défaut doc vs extension vs collector
- **Extension UI** : `maxCallDuration` = 5h (activationSchema)
- **Collector standalone** : `max_call_duration_hours` = required (pas de défaut)
- **Doc `max_call_duration_hours`** : "1–60"
- **Incohérence** : L'extension a un défaut de 5h, le standalone n'en a pas. À documenter.

---

## Points Nécessitant Revue Humaine

| # | Sujet | Fichier | Risque |
|---|-------|---------|--------|
| 1 | Création section Grafana App complète (8+ pages) | `backends/grafana/` | Travail conséquent — création de contenu, pas correction |
| 2 | `service_name` dans `config.example.yaml` = `"ms-teams-agent"` vs défaut code = `"msteams-callrecords"` | doc + example config | Cohérence à décider : aligner l'exemple ou documenter l'écart |
| 3 | Extension `schedulerRespectPersistedBackoff` = `true` vs standalone = `false` | doc extension | À documenter comme différence standalone/extension |
| 4 | `maxCallDuration` 5h (extension UI) vs required (standalone) | doc | Documenter la différence de comportement |

---

## Fichiers sans Écart (vérifiés)

- `collector/v2/installation.mdx` ✅
- `collector/v2/index.mdx` ✅
- `collector/v2/upgrade.mdx` ✅
- `collector/v2/runbook.mdx` ✅
- `collector/azure-permissions.mdx` ✅
- `collector/troubleshooting.mdx` ✅
- `collector/extension/installation.mdx` ✅
- `collector/extension/migration.mdx` ✅
- `collector/extension/upgrade.mdx` ✅
- `collector/extension/index.mdx` ✅
- `backends/splunk/configuration.mdx` ✅
- `backends/otlp/configuration.mdx` ✅
- `backends/dynatrace/configuration.mdx` ✅
- `backends/dynatrace/collector-connection.mdx` ✅
- `backends/dynatrace/dashboards.mdx` ✅
- `backends/dynatrace/index.mdx` ✅
- `concepts/demo-vs-live.mdx` ✅
- `concepts/data-flow.mdx` ✅
- `getting-started/prerequisites.mdx` ✅
- `getting-started/license.mdx` ✅
- `reference/metrics-dictionary.mdx` ✅ (9 event families, correct)
- `reference/sites-file.mdx` ✅

### App Dynatrace — écarts supplémentaires (non critiques)
- L'app utilise 2 log sources legacy (`MSGraphAPI_CallRecords_StreamDetails`, `MSGraphAPI_CallRecords_GlobalMetadata`) en fallback `OR` avec les nouvelles — non documenté dans metrics-dictionary
- La feature "Chat IA interactif" (multi-provider OpenAI/Anthropic) ajoutée en v2.9.0 n'est pas documentée
- Settings schema v3.0.0 avec 15 propriétés (vs potentiellement documenté comme plus ancien)
- 17 fonctions backend et 19 scopes non listés dans la doc

---

## État des Findings Précédents

| ID | Titre | Nouveau statut |
|----|-------|----------------|
| H1 | `telemetry.enabled` default | ✅ Reste fixé |
| H2 | `detail_per_second` code inconsistency | 🔄 Ré-ouvert : doc = 20.0, code = 75 |
| H3 | `max_call_duration_hours` missing | ✅ Reste fixé |
| H4 | Dynatrace config keys wrong | ✅ Reste fixé |
| M2 | OTel `service_name` default | 🔄 Régressé : exemples doc encore à `"ms-teams-agent"` |
| M3 | 8 champs manquants | 🔄 Partiellement : nouveaux champs throttle + quality encore absents |
| M5 | `max_call_duration_hours` install example | 🔄 Fixé dans installation.mdx, pas dans deploy-dynatrace.mdx |
| M6 | `client_assertion_type` migration | ✅ Résolu : champ valide |
| M7 | `MSTeams_RemoteCollectionHealth` missing | ✅ Reste fixé |
| L2 | Broken anchor link | ✅ Reste fixé |
| L3 | `splunk_ssl_check` default | ✅ Reste fixé |
| HR-1 | `detail_per_second` code fix | 🔄 Résolu code (75) mais doc pas mise à jour |
| HR-2 | Section VAAC | 🔄 Toujours pending |
| HR-3 | `client_assertion_type` migration | ✅ Résolu |
