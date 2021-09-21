# Image Search Abstraction Layer

## Usage

`GET /query/:query` returns image results for `:query`.

`GET /query/:query?page=2` returns the `page 2` image results for `:query`.

`GET /recent` returns the recent entered queries.

## Technologies

- Node.js
- Express.js
- Axios
- PouchDB

## Description

Build a full stack JavaScript app that allows you to search for images like this: <https://image-search-abstraction-layer.freecodecamp.rocks/query/lolcats%20funny?page=10> and browse recent search queries like this: <https://image-search-abstraction-layer.freecodecamp.rocks/recent/>. Use a site builder of your choice to complete the project.

Here are the specific user stories you should implement for this project:

**User Story:** You can get the image URLs, description and page URLs for a set of images relating to a given search string.

**User Story:** You can paginate through the responses by adding a `?page=2` parameter to the URL.

**User Story:** You can get a list of the most recently submitted search strings.
