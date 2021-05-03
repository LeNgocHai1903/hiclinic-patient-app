# Patient Portal for HiClinic application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Git branch

Master -> develop -> qc -> uat

1/ Development team checks out latest code from develop then branch your branch feature will develop. Once you done pls make sure your branch is latest code already then push, create pull request to develop branch.

2/ develop brach will deliver to qc branch for testing perspective.

3/ qc branch will deliver to uat branch for user acceptance testing

## Features

- latest API of React 16^ with HOOK API
- axios to fetching
- react-sweet-state: Global + local state combining the best of Redux and Context API
- i18n for Internationalization and localization
- formik to handle form without tears

### Development features

- jest framework and runner, enzyme, testing-library, react-test-renderer as test utilities
- lint stage, run test before push the code

## Note to start on local development

Please run before start

```
npm run dependencies:legacy
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Husky

Requires Node >= 10 and Git >= 2.13.0

### Pre-commit

- lint-staged: prettier, tslint fix, stylelint, test staged with flag findRelatedTests

### Pre-push

- TBD

## Required plugins

- EditorConfig
- Code-spell-checker
- Prettier
