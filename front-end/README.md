
## Hospital management front-end

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### Technologies used

- App created with [create-react-app](https://github.com/facebook/create-react-app)
- State management is with - [Redux](https://github.com/reduxjs/redux)
- In front-end development framework [Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React) and [evermut](https://github.com/mutable/evermut) is used
- Server side is [node.js](https://github.com/nodejs) with [Express](https://github.com/expressjs/express) library, running on [http://localhost:3003](http://localhost:3003) - `node app.js`

### Folder Structure

---> build
---> node_modules
---> public
---> src
     ---> actions # redux actions
     ---> components # components used in containers
     ---> containers # pages' views
     ---> reducers # redux reducers
     ---> routeComponens # protected and public wrapper components
     ---> static # static stuff like pictures, logo, background
      
