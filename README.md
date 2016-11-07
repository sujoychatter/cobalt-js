# CobaltJS

Everything React in a snap.

[![Code Climate](https://codeclimate.com/github/sujoychatter/cobalt-js/badges/gpa.svg)](https://codeclimate.com/github/sujoychatter/cobalt-js)
[![npm version](https://img.shields.io/npm/v/cobalt-js.svg?style=flat-square)](https://www.npmjs.com/package/cobalt-js)
[![npm downloads](https://img.shields.io/npm/dm/cobalt-js.svg?style=flat-square)](https://www.npmjs.com/package/cobalt-js)

---

CobaltJS is a package that uses React and its associated technologies on Node to setup fast and effecient web applications. It streamlines all the best practices in an opiniated manner, bypassing the decisions that usually involve while creating a new application on React.

CobaltJS, along with being a starter kit on React also provides various other mechanisms and standards, with most effecient practices for speed.


## Usage
Using cobalt is straight forward. Install this package globally and initiate cobalt setup.

``` npm install -g cobalt-js ```

In a fresh folder:

``` cobalt init demo ``` (for setting up demo application)

``` cobalt start  ```

## Documentation
Cobalt JS is a combination of [React](https://github.com/facebook/react) and [Redux](https://github.com/reactjs/redux). Documentation on these may be found in their source repositories.

Internally CobaltJS also uses the [React Router](https://github.com/ReactTraining/react-router) and [React Hot reloading](https://github.com/gaearon/react-hot-loader).

* #### Setting up routes
	CobaltJS uses the routes.yml file to define routes. The hierachy of routes may be defined in this YML file along with specifying the route path, the folder path (with respect to the modules folder) in which the react element to be rendered for the route may be found and the name of the file that contains the react element.

    The build bundles created by CobaltJS for the routes are designed in a specific manner, so as to load the app in minimum time. The route siblings at the top of the hierarchy are bundled seperately. So, if /abc and /def are two top level app paths, the nested contents of each of these will be bundled and loaded seperately and lazily. This keeps the content loaded on the client side absolutely minimal and limited to the major portions of the app as needed, along with avoiding multiple requests, which might slow it down as well.

* #### Modules
	The modules folder contains the react elements to be rendered. They are loaded into the DOM by the react router with the help of the routes.yml file. The creation and use of the elements is standard and may be found in the React documentation.

   Fixed Components: The modules folder has another folder named fixed_components. This can contain two files: header.js and footer.js. These files may be used to create header and footer for the application that will be loaded along with the first bundle for the app and will show on the top and bottom of every page.

* #### Reducers
	Again, reducers are used and implemented same as are required by Redux and how to use them may be found in the Redux documentation. The setup with the store is already done by CobaltJS and the reducers are just needed to be exported via the index.js inside the reducers folder to get them working as they should.

	The react elements need to be connected to the store though, if access to the store is needed by it. Examples may be found in the CobaltJS demo app.

* #### Models
	The models folder may be used to write code associated with a certain model. Actions may be written and used from here, as well as definitions of http requests.

* #### SCSS
	The scss folder contains the .scss files that may be used in the application. These can be 'required' into module react element files to be loaded and added to the DOM via webpack.

* #### Making HTTP requests
	CobaltJS comes with an inbuilt Redux action to make HTTP requests. Internally, [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) has been used for making HTTP requests.

	The format of options to be passed to this action is:

	    dispatch(action(
        [name] string,
        [model] string,
        [reqObject] {
        url: string,
        reqSettings: (?)Object,
        name: (?)string,
        track: (?)boolean,
        forceReq: (?)boolean
        }))


    **name**: This is the name of the request.

    **model**: The model assciated with the request.

    Note: **The response of the request will be recieved with an action that will have a property type which will be [name]__[model]. So, to recieve the response of a request make with Cobalt action will have to be recieved by a custom reducer that will identify the action.type as [name]__[model]**

   	**reqObject :**

    url: This key is used to specify the HTTP endpoint to make a request to.

    reqSettings: See [fetch](https://github.github.io/fetch/) documentation for details.

    name: This is used internally to keep track of already fetched http GET requests. This is also the name with which the status of the request will be available in the state.requestInProgress object.

    track: This boolean value indicates if CobaltJS needs to keep track of the HTTP GET request or not. If set to false, for the HTTP GET request, it will neither be checked if the the request is a repeat one or not, nor will CobaltJS keep a record of the fetch after the data has been recieved.

    forceRequest: This is used to force a GET request even when the request has been repeated. It is meaningful when track is true for a GET request and but we want a fresh set of data to be retrieved and tracked (but only after the new data has been recieved) even if we already have done so earlier.



## About
##### License: ISC
##### Author: [Sujoy Chatterjee](http://github.com/sujoychatter)
