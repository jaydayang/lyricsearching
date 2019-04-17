# Lyrics Searching App: https://lyrics-searching.firebaseapp.com/


## Short description of project
With this app, the user is going to be able to find the lyrics of his favourite artists or albums. The user will be able to search lyrics by the name of the lyric itself or the name of an artist, save its favourite lyrics (only when logged in) and to translate them to many different languages. Based on the saved favorite list, the user will receive suggestions that he/she might like. Also, a list of the top 5 songs in the country will be shown.


## Project file structure
**1.Welcome page (View):** the start page of this app. It will show an initial top 25 songs, in this case in Sweden. From that list you can click on any of them to see its lyric.

**2.Login (Component, imported in Welcome View):** allow user to login or register. The login component is accesible from the Navigation bar on the top menu bar. It will allow the user to either login or register.

**3.Navigation bar:** user can search lyrics according to the words in the lyrics or album or the artist. The navigation bar is composed by the Search component and the Login button.

**4.SuggestionSidebar (Component, imported in SearchLyric View & FavoriteDetail VIew):** shows a suggestion list based on user’s favourite list.

**6.LyricDetail (View):** displays the lyric detail, users can translate the lyric and add the lyrics to their favourite list.

**7.AlbumInfo (Component, imported in LyricDetail View):** show album details.

**8.SimpleFavoriteList (Component, imported in SearchLyric View):** show a reduced user’s favorite lyric list. It has a view all button that is linked to the FavoriteDetail view in which you can see all the favorited artist and lyrics saved by the user.

**9.FavoriteDetail (View):** display the detail of each favourite lyric.

## Firebase and react
We are using three of the main Firebase functionalities:
1. *Firebase authenticaction* for login/registration.
2. *Firebase database* to save users' favorite lists.
3. *Firebase hosting* to deploy the app on a public site.  
