## Consolidated .83 source checkpoint

The [frozen source inventory](SOURCE_FREEZE_DESKTOP_ALPHA83.json) pins this selected export to canonical commit `7e5414c4b2eaac794f8cb0a46bfa53570631c68a`. Its code and package inputs match the previously qualified clean-consumer archive; only README qualification notes differ. No tests were rerun solely for the commit pin. Earlier candidate notes are historical preparation evidence. Source publication does not establish signed-desktop or website availability, independent onboarding, or game-action authority.

# CasimirBot environment connector kit — source preview

CasimirBot is a Windows research workstation and environment harness for working with AI inside real software. This repository is a selected **read-only connector source preview**: versioned v1 wire schemas, a TypeScript transport client, a Java 21 transport helper, system-clock and synthetic examples, a read-only template, and an in-memory mock.

The source is available under MIT for inspection, modification and reuse. See [LICENSE](LICENSE) for the first-party grant and [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt) for the declared Zod dependency. This repository has clean history and contains only the selected 43-export closure. It is not the CasimirBot desktop, server, room service, account system, or full source tree.

## Build from source

Use Node 20+ and npm. The reviewed build uses TypeScript 5.6.3 and @types/node 22.20.5. Run:

```sh
npm install
npm run build
```

The build regenerates `dist/` from the eleven selected TypeScript files in `src/`. The archive also includes a Java transport helper at `java/com/casimirbot/helix/environment/HelixConnectorClient.java`; compile it with JDK 21. The package is marked `private: true` to prevent accidental npm registry publication. You can inspect its local exports and examples through `package.json`.

## Scope and current limits

The examples demonstrate synthetic reachability and a read-only system-clock observation. The mock is an in-memory test fixture, not an authorization server. Real endpoint use requires a registered connector package, account/session checks, owner approval during pairing, and a supported CasimirBot installation. This source preview has **not** completed independent-developer onboarding or production pairing acceptance. It does not supply a generic action SDK, hosted entitlement, model runtime, or a public connector directory admission.

The desktop and account overview live at [casimirbot.com](https://casimirbot.com). The public desktop download is a separate release channel; availability of this source does not establish that a particular desktop build exposes this kit.

## Pending consolidated update

This local proposal updates the existing selected schemas with an optional environment-binding reference on probe observations and the read-only `companion_poststate` and `companion_region` manifest probe names. The 43-export boundary is unchanged. Schema support does not grant access, enable game actions or prove an installed Companion/GPT Live session. A clean local consumer passes 10 runtime checks, eight focused schema checks, TypeScript compilation, and a byte-identical rebuild of all 22 compiled files. The selected source and compiled trees use LF checkout rules. These checks do not establish native pairing or independent-developer acceptance. Final source freeze and coordinated publication remain pending.

## Provenance

`provenance.json` records the canonical input hashes, selected exports, dependency versions and generated source hashes. The selected source and compiled outputs match the verified MIT candidate. The public README and this repository's history are prepared separately from the private product repository.
