# typescript-demo-api-22-10-2022

### start app

```start
docker compose up -d
yarn
yarn start
```

clean app

```clean
docker compose down
```

<hr/>

## crate project

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
    "outDir": "dist"
```

```
yarn add -D typescript ts-node ts-node-dev rimraf
```

```package.json
 "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts"
  },
```

```
yarn add express morgan mongoose bcrypt jsonwebtoken passport passport-jwt passport-facebook passport-google-oauth20 nodemailer 
```

```dev
yarn add -D @types/express @types/morgan @types/mongoose @types/bcrypt @types/jsonwebtoken @types/passport  @types/passport-jwt @types/passport-google-oauth20 @types/passport-facebook
```
