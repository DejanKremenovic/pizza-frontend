## Pizza app

Application is built on React framework with basic setup just for skills presentation. App contains couple views: list of all products, single product, cart, login... There is a lot more features to add to improve it. Also some better design should be applied.

## Running project locally

### To run locally you need Node.js and NPM installed.

Clone repository.

Navigate to local repository.

Install dependencies.

```
npm install
```

Create build

```
npm run build
```

Start local Express.js server

```
npm start
```

To run app in development mode you need to change this line in package.json file

```
    "start": "node server/server.js",
```

to

```
    "start": "react-scripts start",
```

Navigate to [http://localhost:3000] to see app homepage.

## TODO in next version

- Configure .env file
- Configure npm start command
- Add pagination to lists
- Apply some design and upgrade responsive
- Add Global Error handler for handling responses 403, 401, 500...
