# Holly-health


## Back-end Developer Test
### Technical Requirements
Your solution will be run with a recent version of NodeJS. You can use plain JavaScript or TypeScript. 
You are expected to integrate with the REST API directly, instead of using pre-written integrations (like an SDK), but otherwise you're welcome to use any libraries you like.

### Functional Requirements

The command line application must:

* Take a single argument specifying the search term, and error out if one is not provided
* Using the Github API as a starting point, find all the repositories that have a description containing the given search term as a full phrase (not just the words individually). To avoid hitting the API rate limit, you should only load up to 1000 results.
* Filter out any repos with an empty "language" (null or empty String)
* Group the remaining list of repos by "language", and count the number of occurrences for each
* Sort the languages by occurrence descending
* Output a line for each result, in the {language}: {count} format
* After the results, on a separate line, output the total number of search results in the format: => {total_count} total result(s) found

For example, using mindfulness as an input, it should return something like:

JavaScript: 6

C#: 2

Emacs Lisp: 1

Jupyter Notebook: 1

HTML: 1

Python: 1

CMake: 1

Go: 1

TypeScript: 1

PHP: 1

=> 29 total result(s) found
 
Please provide a README with basic instructions on how to run your application, and assumptions you made when writing it.

Evaluation
While your submission must work for any arbitrary search term, it will be tested with the following:
`mindfulness`
`nudge`
`holly`

## How To Run

Clone the repository

Ensure that you have an up to date version of Node.js installed (Tested at `v14.17.5` and above)

Install the required npm packages

```npm i```

To run the application from your command line terminal

```node repo-CL.js```


## Future Improvements

Given more time I would:

* Write unit tests for the functions used to sort, order and output the data, while mocking the response from the api. I started to do this, but ran into some issues using `Jest` in combination with `Babel` to transpile.

* Convert the program to Typescript for a more robust solution that would be easier to expand. I also believe this would help resolve the issue I was having with `Jest` for writing unit tests.