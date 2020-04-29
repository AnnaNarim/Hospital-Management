
## Hospital management front-end

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload while making changes.<br />
Also some lint errors will be visible in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The app is ready to be deployed!

### `node app.js`

Runs the server side of the front-end.

### Technologies used

- App created with [create-react-app](https://github.com/facebook/create-react-app)
- State management is with - [Redux](https://github.com/reduxjs/redux)
- In front-end development framework [Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React) and [evermut](https://github.com/mutable/evermut) is used
- Server side is [node.js](https://github.com/nodejs) with [Express](https://github.com/expressjs/express) library, running on [http://localhost:3003](http://localhost:3003) showing the bundle that was created during `npm run build`

### Folder Structure

- build<br>
- node_modules<br>
- public<br>
- src<br>
     - actions # redux actions<br>
     - components # components used in containers<br>
     - containers # pages' views<br>
     - reducers # redux reducers<br>
     - routeComponens # protected and public wrapper components<br>
     - static # static stuff like pictures, logo, background<br>
      
