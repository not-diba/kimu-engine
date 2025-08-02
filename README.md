# ⚙️ Kimu Engine

`kimu-engine` is a backend project powered by [GraphQL Nexus](https://nexusjs.org/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/), bundled and run with [Bun](https://bun.sh/). It serves as the GraphQL API engine for the Kimu foods Flutter app. I initially tried building this in Go and also tried Kotlin Ktor.

---

## 🧱 Tech Stack

- **[Bun](https://bun.sh/)**
- **[GraphQL](https://graphql.org/)**
- **[Nexus](https://nexusjs.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)**

---

## 📁 Directory Structure

```text
/
├── bun.lockb                  # Bun's lockfile
├── eslint.config.js           # ESLint configuration
├── generated/                 # Generated types (Nexus & Prisma)
├── node_modules/
├── package.json
├── prisma/
│   └── schema.prisma          # Prisma data model
├── src/
│   ├── context.ts             # Prisma context
│   ├── logs/                  # Logs
│   ├── models/                # Interfaces
│   ├── mutations/             # GraphQL mutations
│   ├── queries/               # GraphQL queries
│   ├── schema.ts
│   ├── server.ts
│   └── utils/
├── tsconfig.json
└── README.md
```
