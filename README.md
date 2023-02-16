# Shopping Site Task

Simple shopping site created as an interview task.

The app was developed using the latest version of Node (v18), but should run on older version too.

## Implementation details
The application was created using `create-react-app` with the `typescript` template.

Linting rules are enforced using `eslint` and `prettier`.

Client side routing is done with the help of `react-router`. Data loading is managed by `@apollo/client`. The shopping cart is stored locally in Session Storage.

The app has a near 100% coverage of unit and integration test.

## Local development
Run `npm install` and then `npm start` in both `client` and `server` folders. It expects a locally running MongoDB database on port `27017`

## Missing parts / ideas
Here are some ideas for future development:
- products could be stored and loaded from DB instead of the file system
- media queries could be added to support mobile/tablet views
- stock numbers could be updated when an order is created, so a new order would use the updated stock values
