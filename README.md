
Before you go any further, take a look at the deployed app [here!](https://nholden212-grocery-list-app.herokuapp.com/)

# Basic Grocery List App

This app is a basic list-making app built in React.js using create-react-app (info on create-react-app is at the bottom of this readme).
This is only the fourth app I've built in React and the first without instruction, so I was all on my own. I also built this project in a day - I was very pressed for time and had to build out the basics before I could add new features. What you see is what you get!

The database and backend are run using Firebase, which is a handy BaaS hosted by Google. The data is structured in a NoSQL, relational structure.

I chose to use React and Firebase because they have the ability to update data and the client in real-time.
This way users can update data on one device and see it updated in real-time on another device without having to refresh or reload the page.

This is a single-page application so there is never any reloading - once you're on, you're on, and you will have access to all of it's features.

Apart from the Material Design Icons, all CSS is implemented by me without the use of a framework.

## Features

The features of this app are fairly simple - you can perform basic CRUD operations to create different lists, which are displayed in a main list on the left-hand side of the page. Within each list, you can similarly perform basic CRUD operations on individual items. You can select a list from the left, and that list and it's items will display on the right.

For each item in the list, you can perform CRUD operations by clicking on the icons that are displayed in-line with it. Clicking the pencil will display a form allowing you to enter a new value for the item, the trash can will delete it, and the check mark will toggle the item's "purchased" value. Purchased items will display in green and bold, so that shoppers can keep track of what they've already found at the store.

The icons used in the design are from Material Design Icons, a useful icon pack (also from Google) that you can find [here](https://material.io/tools/icons/).


\* * * * *


# Create-React-App:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
