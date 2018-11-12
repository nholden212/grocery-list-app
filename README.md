
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

Users are authenticated using Google through Firebase authentication. If no user is signed in, "guests" can still read data but cannot perform any actions upon it.

The icons used in the design are from Material Design Icons, a useful icon pack (also from Google) that you can find [here](https://material.io/tools/icons/).

## Next Steps

As I mentioned above, I was very pressed for time working on this project. Hypothetically it was supposed to be built over a week but I only had time to work on it for a day. Unfortunately, this limited what I was able to accomplish and there are some changes that still need to be made. Notably...

#### Make the database private

I only remembered this shortly before submitting this project for grading, but in order to use the firebase database during development, I had to switch the databases' access to public. I briefly switched it back to private, but the deployed app was no longer connecting to it properly at that point. There is a pretty straightforward process to make the data private for deployment, but again, time was an issue and I was unable to do this. Normally, this is a huge security threat to an application, but this is an academic project and given the circumstances this was not a high priority for me. However, for the sake of practice and understanding, this will be the next change I make.

#### Create a test suite

The app does not have a working test suite. This is because I have **never tested in React** before. I did some research to try to figure out how best to do this, but I was at a loss for how best to implement it. I first considered **Jest**, a popular test framework specifically designed to test React components. Supposedly, Jest is integrated into create-react-app or is at least supposed to be easy to implement, but after following some tutorials I couldn't get it to execute properly. My next thought was to write tests right in the App.test.js file that is included in create-react-app, because create-react-app does have a test script that it is set up to run upon intialization. However, I was a little confused by the code of the initial test that was written and didn't think it would be worth my time to learn a new testing syntax when I was already so pressed for time. Lastly, I considered using Jasmine, which I'm more familiar with and have used to test other projects. I wasn't sure how to implement Jasmine for React, however, and didn't realize that since it was an npm package (like create-react-app) that it could be used to test React similarly to how I used it in my other projects which were all done in Node.js. Overall, the main constraint was **time**, but still I need to sharpen my testing skills.

In spite of this, I did try to approach the development with a TDD-esque mindset - before I created each component, feature, or function, I first determined all that needed to be done and how I could test for it manually. At each step in the development I tested for functionality before moving on to the next step. I checked firebase to make sure the data was behaving as expected, and I checked the client to make sure everything was rendering properly. Although I have removed them now, I used plenty of console.log() statements to check that state and props were transferring correctly and that my references to the firebase database were always correct.

#### Small changes

There are some small changes to the existing code that could really clean things up - for example, clicking on a list will set it as the list to display, but clicking it again does not toggle this display off. It would be a simple fix to combine the activateList() and deactivateList() functions into a single toggleListActivation() function.

I also want to cut down on the conditional rendering that I've done here - particularly with the List component. It would probably make more sense to create a new, separate ListItem component that holds the variables tested in my conditional rendering in it's state. This would require a good deal of reconfiguring but would be more true to the architecure of React, and would also make rendering a List component more straightforward. It's also **significantly** better from a long-term perspective, in case new functionally needs to be added to list items in the future - this way they can be handled in the ListItem component instead of within the List component.

I also think it would be better to have the edit item form allow you to directly edit the text of the item, instead of writing in a separate text box. This is a theoretical idea for now but it shouldn't be too difficult, especially not if a ListItem is its own component and the content is held in the component's state.

#### New features

Some other features that would really enhance this project are adding families - families would allow users to keep their familiy's lists private unless the current, authenticated user was a family member.

Adding a price to each list item could also be handy, and help families estimate how much they will be spending at the store.

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
