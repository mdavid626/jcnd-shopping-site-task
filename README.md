# Shopping Site Task

Simple shopping site created as an interview task.

The app was developed using the latest version of Node (v18), but should run on older version too.

## Implementation details
The application was created using `create-react-app` with the `typescript` template.

Linting rules are enforced using eslint and prettier.

Client side routing is done with the help of react-router. Data loading is managed by `@apollo/client`. Dates are parsed and formatted using date-fns.

Mobile screen sizes are supported via media queries.

The app has 100% coverage of unit and integration test.

## Local development
Run `npm install` and then `npm start` in both `client` and `server` folders. It expects a locally running MongoDB database on port `27017`
