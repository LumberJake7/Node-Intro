const fs = require("fs");
const axios = require("axios");

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

function processArg(arg) {
  if (arg.startsWith("http://") || arg.startsWith("https://")) {
    webCat(arg);
  } else {
    cat(arg);
  }
}

const arg = process.argv[2];

processArg(arg);
