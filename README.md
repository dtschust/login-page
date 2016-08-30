# Login Page
This is a simple app that allows a user to log in and see their resume. They can't edit it, they can just view it.

## Live Demo
[✨DEMO ✨](https://dtschust.github.io/login-page)
## Running the application
To run the app, clone the repo, install necessary packages, then start.
```sh
git clone git@github.com:dtschust/login-page.git
cd login-page
npm install
npm start
```
This will start in a developer environment, which has live reload support. To test the static production build, run
```sh
npm run start-static
```

## Redux-Bug-Reporter Integration
Redux-Bug-Reporter is built in to this app. Locally or in the demo, feel free to file a bug and a github issue will be created. Don't worry, I don't mind the spam, try it out! When viewing the github issue, copy the playback script and paste it in the dev console of a demo page to replay the filed bug.

## Caveats
Some shortcuts intentionally taken. I'm able to do all of the things listed below, but in the interest of time I chose not to implement them.
* No accessibility work was done.
* Print styles were not set.
* No input validation is done on the login inputs.
* I didn't do full cross browser testing. It works great on chrome, safari, and safari on my iPhone. I used the excellent [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) package to handle a lot of the tedious compatibility issues.
* I used flexbox and didn't implement fallbacks, but I did use postcss autoprefixer to help with browser support.
* Login submission checks against a hardcoded json list of users and artificially delays 2 seconds. The only user is `dtschust@gmail.com` and the password is `foobar`.
* The Forgot Password flow is a dialog that opens up giving you my username and password. I thought that was kinda funny.
* Login and password storage is comically insecure since this is just a demonstration.
* Resume data can not be edited. This was mostly done so that I could deploy a static build on gh-pages and didn't want to spin up a server just to allow for data persistence.
* There's no logout functionality or session persistence. If you refresh the page you are logged out.
* material-ui components were used. They're open source and actually pretty great, I didn't want to reinvent the wheel and this was a chance for me to play with them for the first time.
* I didn't write any tests to speak of. For a decent example of my work on `js` tests, see [redux-bug-reporter](https://github.com/dtschust/redux-bug-reporter).
* The 404 page is lazy and is just an h1 that says "404 not found"
* The "production" build does not have minification and does have source maps. Also the css is not pre-built, it's just inlined in the `<head>` like the developer build.
