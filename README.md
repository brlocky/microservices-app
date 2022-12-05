
## Description

Simple application to manage Todos.
```bash
- Create
- Edit ( TODO )
- Mark complete/undo ( TODO )
- Delete ( TODO )
- List
```

Stack
```bash
- NestJS (single repo to manage micro-services)
- gRPC with ProtoBuf
- Kakfa
- MongoDB
```

Architecture
```bash
- Client <=> Rest <=> Gateway <=> gRPC <=> Auth
- Client <=> Rest <=> Gateway <=> gRPC <=> Todo
```
## Installation

```bash
$ npm install
```

## Running the Server ( MongoDB + Kafka )

```bash

$ docker-compose --profile server up

```

## Running the App ( Gateway + Auth + Todo )

```bash

$ docker-compose --profile app up

```

## Generate ProtoBuf typescript interfaces

```bash

$ npm run proto:build

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
