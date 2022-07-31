
import fetch from 'node-fetch'
import * as readline from 'node:readline';
import { groupBy } from 'underscore';

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
    for ( let i = 1; i <= 2; i++) {
        apiReponses.push(fetchRepoData(searchTerm, i));
    };
    Promise.all(apiReponses).then(
        data => {            
            // for each item in data, filter out if item.language is Null or empty string.
            const validLanguageData = removeNullLanguages(data);

            // group remaining repos by language
            const groupedData = groupBy(validLanguageData, 'language');

            // sort langauge by order descending
            const orderedOccurances = sortByLanguageOccurances(groupedData);

            // output
            outputOccurances(orderedOccurances);
        }
    )
}

async function fetchRepoData (searchTerm, pageNumber) {
    const queryString = `"${searchTerm}" in:description`
    const url = 'https://api.github.com/search/repositories?'+ new URLSearchParams({ 
        q: queryString,
        per_page: 100, // change to 100
        page: pageNumber // change to loop to page 10
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

const removeNullLanguages = (data) => 
    data.flat().filter(item => item.language !== (null && 'null' && ''));

export const sortByLanguageOccurances = (data) => {
    const langauges = Object.keys(data)
    const languageOccurances = langauges.map(language => ({ [language]: data[language].length}));
    return languageOccurances.sort((a,b) => { return Object.values(b) - Object.values(a) })
}

export const outputOccurances = (occurances) => {
    // output a line for each result with 'language: count' format
    occurances.forEach(occurance => 
        {
            for (const [key, value] of Object.entries(occurance)) {
                console.log(`${key}: ${value}`);
            }
        })
    
    // output the total amount of search results 
    console.log(`${occurances.reduce((acc, cur) =>  acc + Number(Object.values(cur)[0]), 0)} total result(s) found`)
}


