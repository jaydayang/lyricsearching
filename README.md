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
