const fs = require("fs");
const axios = require("axios");

// Writes content to the console or a file
function output(content, filename) {
  if (filename) {
    fs.writeFile(filename, content, "utf8", (err) => {
      if (err) {
        console.error(`Couldn't write ${filename}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

// Reads content from a local file
function cat(path, outputFilename) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    } else if (data === "") {
      console.log(`The file ${path} is empty.`);
    } else {
      output(data, outputFilename);
    }
  });
}

// Fetches content from a URL
async function webCat(url, outputFilename) {
  try {
    const response = await axios.get(url);
    output(response.data, outputFilename);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Parses command line arguments and decides the action
function processArgs(args) {
  let outputFilename = null;

  if (args[0] === "--out") {
    outputFilename = args[1];
    args = args.slice(2);
  }

  const target = args[0];
  if (target.startsWith("http://") || target.startsWith("https://")) {
    webCat(target, outputFilename);
  } else {
    cat(target, outputFilename);
  }
}

// Getting and processing the command-line arguments
processArgs(process.argv.slice(2));
