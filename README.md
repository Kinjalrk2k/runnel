# vidfeed

## Basic Outline

- The streamer's computer will have a Streaming software like OBS (Open Broadcaster Software)
- The stream will have the actual video feed along with a unique stream key
- This video will be streamed in an outside server. This is done by creating a Real time Messaging protocol (RTMP) server. This is a specialized that will receive a video feed and bradcast it to different viewers, who can watch from their browser. RTMP server has a sole purpose of streaming videos
- We could potentially have multiple streamers and many different viewers can watch their streams
- We need another seperate API server that will essentially store the list of different available streams

## Authentication and Previlages

- When not logged in:
  - Users can view a list of streams
  - Users can view a single stream
- When logged in:
  - User can create new stream
  - User can edit a stream, that they have created
  - User can delete a stream, that they have created

## App Challenges

- Navigate around seperate pages
- Login/Logout
- Handle forms in Redux
- CRUD operations with React/Redux
- Error handling :)

## React Router

### React Router family of Libraries

- `react-router`: Core navigation library (We don't install this manually)
- `react-router-dom`: Navigation for DOM based Apps
- `react-router-native`: Navigation for react-native Apps
- `react-router-redux`: Binding between Redux and React router

### React Router working

- React router doesn't cares about the Domain/Hostname. It only cares about the URL after the first `/`
- The `BrowserRouter` component creates a `history` object. It keeps track of the URLs in the browser.
- The `history` object comminicated with `BrowserRouter` and it will in turn communicate with the child components `Route`s. The `Route` components then decides whether to show/hide themselves according to the `path`

### Path Matching

- Different routes can be matched by the same URL
- `exact` keyword: Matches the exact URL and not the sub-URLs too. This is done, because React router internally uses `.contains(path)` on the URL string. Hence, any sub-URLs will also get matched if we don't put in the `exact` keyword

### Navigation

- DON'Ts
  - Navigation shouldn't be handled with `a` tags just like we do in plain HTML.
  - This is because, whenever we make a request with `a` tag, the server responds with a index.html file. Browser receives the new index.html file, dumps the old HTML file it was showing (including React/Redux state data)
- DOs
  - Use `Link` in place of `a` tags!
  - Whenever the user uses the `Link`, the React router prevents to browser from navigating to a new page. But he URL still changes! `history` sees the updated URl, sends it to the `BrowserRouter` to do the needful.
  - This is where the concept of SPAs (Single Page Applications) comes

### Types of React Router

- These types differ in the part of URL they match
  - `BrowserRouter`: Uses everything after the TLD (Top Level Domain - .com, .net, .org) or port as the path
  - `HashRouter`: Uses everything after a `/#/` as a path
    - `/#/` is automatically injected in the URL
    - Example: `localhost:3000/#/pagetwo/`
  - `MemoryRouter`: Doesn't use the URL
    - The URL doesn't change at all!

## Authentication - OAuth

- Google's OAuth2.0 Authentication Flow
- OAuth can be used for
  - User identification in our app
  - Our app making actions on behalf of the user

### Email/Password Auth VS OAuth

- Email/Password Auth
  - We store a record in a database with the user's email and password
  - When the user tries to login, we compare email/password with whats stored in the DB
  - A user is logged in when they enter the correct email/password
- OAuth
  - User authenticates with outside service provider (Like Google, Facebook, Github, LinkedIn, etc)
  - User authorizes our app to access their information
  - Outside provider tells us about the user
  - We are trusting the outside provider to correctl handle identification of the user

### OAuth - for Servers VS Browsers

| For servers                                                                                     | For Browsers                                                                                      |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Results in a 'token' that a server can use to make requests on behalf of the user               | Results in a 'token' that a browser can use to make requests on behalf of the user                |
| Usually used when we have an app that needs to access user data **when they are not logged in** | Usually used when we have an app that only needs to access user data **while they are logged in** |
| Difficult to setup because we need to store a lot of info about the user                        | Very easy to setup! Thanks to Google's JS library to automate flow                                |

### OAuth Flow

- User clicks "Login with Google" button
- We use Google's JS Library to initiate OAuth process
  - Google's JS Lib makes auth request to Google
  - Google displays confirmation screen to user in popup window
  - User accepts
  - Popup window closes
- Google's JS lib invokes callback in our React/Redux app
- Callback provided with "authorization" token and profile info for user

## Form Handling
- Old Style: Component level state (Without Redux)
  - We get the value through `onChange` callback, update the state and then push it back to the DOM
- Mentos Style! (With Redux)
  - We will have the same `value` and `onChange` callback
  - There will be a form reducer
    - Form Reducer → `mapStateToProps` → `props` → `value` on DOM
    - Form Reducer ← Action Creators ← callback handler ← `onChange`
  - This all the stuffs will be handled with redux form libraries