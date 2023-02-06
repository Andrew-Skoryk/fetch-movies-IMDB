# fetch-movies-IMDB
[DEMO LINK](https://Andrew-Skoryk.github.io/fetch-movies-IMDB/)

1. When a user enters a title and submits the form, send a request to IMDB database;
    - use axios library;
    - The submit button should be disabled when the title field is empty;
    - show a spinner on the submit button while waiting for the respose;
    - if a movie is not found show an error message below the input;
    - hide it after changing the title;

2. If a movie is found show the preview and the add button;
    - use deafult picture if the found movie has no poster;
 
3. The add button should **add** the movie to the list, **clear** the form and **remove** the preview;

4. Don't add a movie to the list twice, just clear the data;

5. Add **watched** button;

6. Add React Router;
