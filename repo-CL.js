
import fetch from 'node-fetch'
import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What term would you like to search for? `,
    (searchTermInput) => {
        console.log(`Searching for ${searchTermInput}!`);
        getReposBySearchTerm(searchTermInput);
        rl.close();
    }
);


export const getReposBySearchTerm = (searchTerm) => {
    const apiReponses = [];
    for ( let i = 1; i <= 10; i++) {
        apiReponses.push(fetchRepoData(searchTerm, i));
    };
    Promise.all(apiReponses).then(
        data => {            
            // for each item in data, filter out if item.language is Null or empty string.

            // group remaining repos by language

            // sort langauge by order descending
            console.log(data)
        }
    )
}

async function fetchRepoData (searchTerm, pageNumber) {
    const queryString = `"${searchTerm}" in:description`
    const url = 'https://api.github.com/search/repositories?'+ new URLSearchParams({ 
        q: queryString,
        per_page: 100,
        page: pageNumber
    });
    const response = await fetch(url,
    {
        method: 'GET',
        headers: {
            auth: process.env.GITHUB_API_TOKEN
        }
    })
    .then((res) => { 
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json()
    })
    .then(data => data.items)
    .catch(err => console.log(err));
    return response;
}

