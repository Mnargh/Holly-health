
import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What term would you like to search for? `,
    (searchTermInput) => {
        console.log(`Searching for ${searchTermInput}!`);
        rl.close();
    }
);


