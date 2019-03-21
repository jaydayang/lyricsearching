<<<<<<< HEAD
<<<<<<< HEAD
##Lyrics Searching App##
#Short description of project:
With this app, the user is going to be able to find the song lyrics of his favourite artists or albums. The user will be able to search by different categories, save its favourite lyrics and the translation of them. Based on the saved list, the user will receive similar suggestions. 

#What we have done
We already setup the basic framework code and have an initial layout of the app, and fetch data using Musixmatch API. 

#What you still plan to do
We will redesign the layout of each page by changing CSS files, and complete all the data transfer between each page. Besides, we also plan to connect it with database to achieve user login and register, and also use it to store user’s favourite lyrics.


#We now have the startup code:
Including several components:
1.Welcome (View): the start page of this app.
2.Login (Component, imported in Welcome View): allow user to login or register.
3.SearchLyric (View): user can search lyrics according to the words in the lyrics or album or the artist.
4.SearchResults (Component, imported in SearchLyric View ): show the search results.
5.SuggestionSidebar (Component, imported in SearchLyric View & FavoriteDetail VIew): shows the suggestion based on user’s favourite list.
6.LyricDetail (View): displays the lyric detail, users can translate the lyric and add the lyrics in their favourite list.
7.AlbumInfo (Component, imported in LyricDetail View): show album details.
8.SimpleFavoriteList (Component, imported in SearchLyric View): show user’s favorite lyric list.
9.FavoriteDetail (View): display the detail of each favourite lyric.
=======
# Dinner Planner React

## How to get started

Since modern frameworks use some advanced features like compiling the templates and source code in pure
JavaScript and dynamically loading the needed content, you cannot anymore just open the HTML file 
in the browser. Instead, you will need a local webserver that will serve your app. Follow the instructions 
bellow to install all the neded dependencies (e.g. the framework libraries) and the development webserver.

1. First, make sure that you have npm installed on your system (follow the instructions
   at [Installing Node](https://docs.npmjs.com/getting-started/installing-node). The computers in the lab rooms
   should already have it, you will just need to do `module add node` to activate it (every time
   you start the terminal).

2. Run `npm install` through the terminal in the root of the repository. Let it
   install all the dependencies.

3. Run `npm start` through the terminal. This will start the webserver and the application should pop up in your
   browser ready for use. Alternatively you can open in through [http://localhost:3000]. Whenever you make changes in your code and save, the browser will update automatically, so you don't have to click refresh anymore.

## Understanding the startup code

* `public/index.html` - this is the static html file, and as opposed to previous labs, we don't put view's HTML here. It should only contain HTML that's shared among all the views (e.g. header, footer)
* `src/data/DinnerModel.js` - example of dinner model with number of guests, getAllDishes function implemented using `fetch()` and Observer pattern. You can copy other functions from your original model (and modify as needed to make it work with ES6 JavaScript class)
* `src/index.js` - this is where React is started. You will normally not need to modify this file, but you can check it to see how React is started and how it calls the App - which is our root component.
* `src/index.css` - put your global styles here
* `src/App.js` - root component you can modify it's HTML and add different routes to it
* `src/Dishes`, `src/SelectDish` etc. - contain the `.js` and `.css` file for each component. You should create your own components roughly corresponding to your views from previous labs.

Check the components and see how they work. There are additional comments in the code.

## What you need to do

* reimplement the missing views following React practices
* use [Router](https://reacttraining.com/react-router/web/guides/philosophy) to map different url address (e.g. /search, /dish/ID) to specific components (the startup code already does that for welcome screen and select dish screen)
* implement cookies or localStorage so that the numberOfGuests and menu are persisted on the page reload


## Credits

* Michel Tabari for fine tunning the code

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
>>>>>>> 3c2a264553c534d9f0f3fa4d9da86ecdb34e9c21
