# 
typescript-demo-api-22-10-2022

```
docker compose up -d
yarn 
yarn dev
```

```
yarn init -y
yarn add -D tsc
tsc --init
```

```tsconfig.json
    "module": "commonjs",
    "rootDir": "src",
    "esModuleInterop": true,
    "target": "es2020",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
```

```
yarn add -D typescript ts-node ts-node-dev
```

```package.json
 "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts"
  },
```

```
yarn add express morgan mongoose bcrypt jsonwebtoken passport passport-jwt
yarn add -D @types/express @types/morgan @types/mongoose @types/bcrypt @types/jsonwebtoken @types/passport  @types/passport-jwt
```
