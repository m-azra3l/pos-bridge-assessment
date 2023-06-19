var fs = require('fs');
const path = require('path');
console.log(__dirname);

// JSON object representing the prompt
const json = {
  prompt: 'Once upon a time in the ancient Bini Empire which was a pre-colonial African state located in what is now southern Nigeria, there lived a young prince named Uhanmi. Uhanmi was the heir to the throne, destined to become a great king and ruler. Uhanmi was a strong and fierce warrior, he wields japanese katana in each hand as his special battle weapons as he is skilled in swordsmanship and hand to hand combat. As a vibrant leader, he commanded respect wherever he finds himself and was loved by many.',
};

// Create the file name using the prompt variable
const fileName = 'prompt';

// Write the JSON object to a file
fs.writeFileSync(
  path.join(__dirname, 'prompt', String(fileName)),
  JSON.stringify(json)
);

// run node metadata/generatePrompt.js
