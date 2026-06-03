# Doc Audit Report

**Date:** 2026-06-03
**Agent:** teams-doc-maintainer v1.0.0

## Repos Analysés (branche `main`)

| Repo | SHA |
|------|-----|
| collector | `b5856223e25114cbdd86777025f6a9bf2f68878f` |
| dynatrace-app | `f265489f0a26e6a9bf12241fbc91b355dce894de` |
| dynatrace-extension | `ba80738c731305ae03450379177fb03b91431a4f` |
| docs | `a54ffc5de16907a8981055737ff4ecd3079b7d3f` |

---

## Résumé

- **16 fichiers MDX analysés**
- **15 incohérences** trouvées dans **9 fichiers**
- **4 HIGH**, **7 MEDIUM**, **4 LOW**
- **6 corrections évidentes** appliquées automatiquement
- **3 points** nécessitant revue humaine
- **2 incohérences** provenant du code lui-même (signalées dans CODE_ISSUES.md)

---

## Incohérences par Sévérité

### 🔴 HIGH (4)

#### H1 — `telemetry.enabled` default value erroné
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `collector/src/ms_teams_observability/config/models.py:L131`
- **Ce que dit la doc** : `# Default: true`
- **Ce que dit le code** : `enabled: bool = False` (et `schema.json` default: `false`)
- **Recommandation** : Changer le default de `true` à `false`
- **Statut** : ✅ Corrigé

#### H2 — `advanced.calls.rate_limits.detail_per_second` default erroné
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `collector/src/ms_teams_observability/config/models.py:L174`
- **Ce que dit la doc** : `# Default: 1.0`
- **Ce que dit le code** : `Field(default=20.0, gt=0)` dans `models.py`, mais `schema.json` indique `1.0`
- **Recommandation** : Incohérence interne du code entre le modèle Pydantic (20.0) et le schema.json (1.0). La doc suit schema.json. À trancher côté code d'abord.
- **Statut** : 🔶 Nécessite revue humaine (incohérence code vs code)

#### H3 — `collection_config.max_call_duration_hours` (required) absent de la doc
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `collector/src/ms_teams_observability/config/models.py:L123`
- **Ce que dit la doc** : Ne mentionne pas ce champ dans la section Collection Settings
- **Ce que dit le code** : `max_call_duration_hours: float` est **required** (pas de valeur par défaut)
- **Recommandation** : Ajouter le champ avec son statut required
- **Statut** : ✅ Corrigé

#### H4 — Dynatrace output keys erronées dans l'exemple d'installation
- **Doc concernée** : `collector/v2/installation.mdx`
- **Code source** : `collector/config.example.yaml` / `collector/src/ms_teams_observability/config/models.py`
- **Ce que dit la doc** : `api_url` et `api_token` (clés inexistantes)
- **Ce que dit le code** : Les clés sont `dynatrace_tenant_id` et `dynatrace_api_token`
- **Recommandation** : Remplacer `api_url`/`api_token` par les clés réelles
- **Statut** : ✅ Corrigé

---

### 🟡 MEDIUM (7)

#### M1 — `install-config` action manquante dans la source de vérité
- **Fichiers** : `reference/cli-reference.mdx`, `collector/v2/cli.md`
- **Code source** : `collector/src/ms_teams_observability/cli/__init__.py:L68`
- **Ce que dit la doc** : `install-config` est une action valide de `service`
- **Ce que dit le code** : Effectivement présente dans le code (doc correcte)
- **Recommandation** : La doc est correcte. C'est la source de vérité fournie à l'audit qui était incomplète.
- **Statut** : ✅ Aucune correction nécessaire dans la doc

#### M2 — OTel `service_name` default incorrect dans les exemples
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `collector/config/models.py`
- **Ce que dit la doc** : Tous les exemples OTel montrent `service_name: "ms-teams-agent"`
- **Ce que dit le code** : Le défaut est `msteams-callrecords`
- **Recommandation** : Mettre à jour les exemples avec la valeur réelle par défaut
- **Statut** : ✅ Corrigé

#### M3 — 8 champs de configuration manquants dans la doc
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Champs manquants** :
  - `collection_config.log_format` (enum: text, json)
  - `advanced.calls.max_workers` (default: 1)
  - `advanced.ca_bundle_path` (nullable)
  - `advanced.pstn.rate_limits.per_second`
  - `advanced.direct_routing.rate_limits.per_second`
  - `database.dead_letter_retention_days` (default: 7)
  - `database.max_size_mb` (nullable)
  - `output.console.pretty_print` / `output.console.max_logs_display`
- **Recommandation** : Ajouter ces champs dans les sections correspondantes
- **Statut** : ✅ Corrigé (ajout des champs manquants dans les tableaux)

#### M4 — Section VAAC manquante dans les exemples de config
- **Doc concernée** : `collector/v2/configuration.mdx`
- **Code source** : `collector/config/models.py`
- **Ce que dit la doc** : Note textuelle mentionnant VAAC, mais pas d'exemple ni de tableau
- **Ce que dit le code** : `microsoft_authentication.vaac.username` et `.password` sont des champs valides
- **Recommandation** : Ajouter un onglet/tableau pour l'authentification VAAC
- **Statut** : 🔶 Nécessite revue humaine (ajout de contenu vs correction)

#### M5 — `max_call_duration_hours` manquant dans l'exemple d'installation
- **Doc concernée** : `collector/v2/installation.mdx`
- **Code source** : `collector/config/models.py`
- **Ce que dit la doc** : L'exemple de config dans installation ne montre pas ce champ required
- **Ce que dit le code** : C'est un champ required
- **Recommandation** : Ajouter `max_call_duration_hours` à l'exemple
- **Statut** : ✅ Corrigé

#### M6 — `client_assertion_type` dans la table de migration
- **Doc concernée** : `collector/v2/migration.mdx`
- **Code source** : `collector/config/models.py`
- **Ce que dit la doc** : Table de migration montre `client_assertion_type` comme mapping v1→Standalone
- **Ce que dit le code** : Ce champ n'existe pas dans la config v2. Peut-être un champ v1.
- **Recommandation** : Vérifier si c'est un artefact de la migration depuis v1. Si oui, conserver mais clarifier.
- **Statut** : 🔶 Nécessite revue humaine

#### M7 — `MSTeams_RemoteCollectionHealth` manquant dans le dictionnaire de métriques
- **Doc concernée** : `reference/metrics-dictionary.mdx`
- **Code source** : `collector/src/ms_teams_observability/constants.py`
- **Ce que dit la doc** : 8 event families listées, pas de `MSTeams_RemoteCollectionHealth`
- **Ce que dit le code** : 9 constantes incluant `REMOTE_COLLECTION_HEALTH = "MSTeams_RemoteCollectionHealth"`
- **Recommandation** : Ajouter la constante manquante
- **Statut** : ✅ Corrigé

---

### 🟢 LOW (4)

#### L1 — Alias `--force-unit` non listé dans la source de vérité
- **Doc concernée** : `reference/cli-reference.mdx`
- **Statut** : ✅ Document correct, source de vérité incomplète. Aucune action nécessaire.

#### L2 — Lien brisé `#optional-sitescsv-mapping` dans dashboards.mdx
- **Doc concernée** : `backends/dynatrace/dashboards.mdx`
- **Ce que dit le code** : Le lien pointe vers `collector/v2/configuration/#optional-sitescsv-mapping` mais cette ancre n'existe pas
- **Recommandation** : Mettre à jour le lien ou ajouter l'ancre manquante
- **Statut** : ✅ Corrigé (lien mis à jour)

#### L3 — `splunk_ssl_check: false` dans l'exemple contredit le défaut
- **Doc concernée** : `backends/splunk/configuration.mdx`
- **Code source** : `collector/config/models.py` (default: true)
- **Recommandation** : Clarifier dans un aside que le défaut est `true` mais l'exemple montre `false` pour dev local
- **Statut** : ✅ Corrigé (aside ajouté)

#### L4 — Tableau des paramètres OTel ne mentionne pas `deployment_environment`
- **Doc concernée** : `backends/otlp/configuration.mdx`
- **Statut** : 🔶 Nécessite revue humaine (ajout mineur)

---

## Points Nécessitant Revue Humaine

| # | Sujet | Fichier | Risque |
|---|-------|---------|--------|
| 1 | `detail_per_second` default (code incohérent: model=20.0, schema=1.0) | `configuration.mdx` | Si on change la doc à 20.0 mais que le schema.json est la source de vérité, la doc sera fausse |
| 2 | Ajout section complète VAAC avec exemples | `configuration.mdx` | Pas une correction mais un ajout de contenu |
| 3 | `client_assertion_type` dans migration — artefact v1 ? | `migration.mdx` | Peut-être valide pour les utilisateurs qui migrent depuis v1 |

---

## Fichiers sans Écart

- `collector/v2/upgrade.mdx` ✅
- `collector/index.mdx` ✅
- `backends/dynatrace/configuration.mdx` ✅
- `backends/otlp/configuration.mdx` ✅ (sauf mention `deployment_environment`)
- `backends/dynatrace/configuration.mdx` ✅
- `getting-started/prerequisites.mdx` ✅
