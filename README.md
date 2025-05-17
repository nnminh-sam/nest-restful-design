# Neo-notetaker Webapp Prototype

---

## Installation

```bash
yarn install
```

## Running the app

Development:

```bash
yarn run start
```

Watch mode:

```bash
yarn run start:dev
```

Production mode:

```bash
yarn run start:prod
```

---

## Project structure

Source code is in the `src` directory.

```
src
├── app.module.ts
├── common
│   ├── decorators
│   ├── dtos
│   ├── filters
│   ├── guards
│   ├── interceptors
│   ├── pipes
│   └── validators
├── configs
│   ├── domains
│   ├── enums
│   ├── index.ts
│   └── interfaces
├── main.ts
├── models
├── modules
│   ├── bot
│   │   ├── bot.controller.ts
│   │   ├── bot.module.ts
│   │   ├── bot.service.ts
│   │   └── dtos
│   │       └── create-bot.dto.ts
│   └── sample
│       ├── dto
│       │   ├── create-sample.dto.ts
│       │   └── update-sample.dto.ts
│       ├── sample.controller.ts
│       ├── sample.module.ts
│       └── sample.service.ts
└── utils
```
