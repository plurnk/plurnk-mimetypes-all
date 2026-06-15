# @plurnk/plurnk-mimetypes-all

Batteries-included bundle for [plurnk-service](https://github.com/plurnk/plurnk-service)'s mimetype handling. **It ships no code** — it's a single dependency that pulls in every first-party non-floor `@plurnk/plurnk-mimetypes-*` handler, **flat**, so one install surfaces them all to the framework's `discover()` scan.

```
npm i @plurnk/plurnk-mimetypes @plurnk/plurnk-mimetypes-all
```

Bundles:

| package | mimetype |
|---|---|
| `@plurnk/plurnk-mimetypes-application-pdf` | application/pdf |
| `@plurnk/plurnk-mimetypes-text-clojure` | text/x-clojure |
| `@plurnk/plurnk-mimetypes-text-cmake` | text/x-cmake |
| `@plurnk/plurnk-mimetypes-text-common-lisp` | text/x-common-lisp |
| `@plurnk/plurnk-mimetypes-text-csharp` | text/x-csharp |
| `@plurnk/plurnk-mimetypes-text-datalog` | application/vnd.datalog |
| `@plurnk/plurnk-mimetypes-text-diff` | text/x-diff |
| `@plurnk/plurnk-mimetypes-text-dockerfile` | text/x-dockerfile |
| `@plurnk/plurnk-mimetypes-text-erlang` | text/x-erlang |
| `@plurnk/plurnk-mimetypes-text-gherkin` | text/x-gherkin |
| `@plurnk/plurnk-mimetypes-text-graphql` | application/graphql |
| `@plurnk/plurnk-mimetypes-text-mariadb` | text/x-mysql, text/x-mariadb |
| `@plurnk/plurnk-mimetypes-text-nix` | text/x-nix |
| `@plurnk/plurnk-mimetypes-text-perl` | text/x-perl |
| `@plurnk/plurnk-mimetypes-text-plsql` | text/x-plsql |
| `@plurnk/plurnk-mimetypes-text-postgresql` | text/x-pgsql, text/x-postgresql |
| `@plurnk/plurnk-mimetypes-text-prolog` | text/x-prolog |
| `@plurnk/plurnk-mimetypes-text-protobuf` | application/protobuf |
| `@plurnk/plurnk-mimetypes-text-r` | text/x-r |
| `@plurnk/plurnk-mimetypes-text-redis` | text/x-redis |
| `@plurnk/plurnk-mimetypes-text-sparql` | application/sparql-query |
| `@plurnk/plurnk-mimetypes-text-sqlite` | text/x-sqlite |
| `@plurnk/plurnk-mimetypes-text-swift` | text/x-swift |
| `@plurnk/plurnk-mimetypes-text-terraform` | text/x-hcl, text/x-terraform |
| `@plurnk/plurnk-mimetypes-text-tsql` | text/x-tsql |
| `@plurnk/plurnk-mimetypes-text-vim` | text/x-vim |

## The floor is not here

The framework ([`@plurnk/plurnk-mimetypes`](https://github.com/plurnk/plurnk-mimetypes)) carries the **floor** as direct deps (text-plain, markdown, json, xml, html, csv) — the formats every install needs. This bundle deliberately does **not** re-pin them, so there's no double-pin drift between the framework's floor version and ours. Install both: the framework gives you the floor, `-all` gives you everything else.

## Why a bundle, not framework deps

The framework stays floor-only so its `discover()` scan can find handlers at the top level of `node_modules` without a circular dependency on every grammar. This aggregator depends on the daughters *directly*, so npm hoists them flat — discovery sees them. A **third party** publishes their own handler under their own scope (`@acme/acme-mime-foo`, declaring `plurnk.kind:"mimetype"`) and installs it alongside; the same scan finds it, no bundle membership required. The bundle is just the convenient default, never a gate.

Want a subset? Skip this and depend on the individual handler packages you want — discovery treats them identically.

## license

MIT.
