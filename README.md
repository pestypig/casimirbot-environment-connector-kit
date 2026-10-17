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

## Provenance

`provenance.json` records the canonical input hashes, selected exports, dependency versions and generated source hashes. The selected source and compiled outputs match the verified MIT candidate. The public README and this repository's history are prepared separately from the private product repository.
