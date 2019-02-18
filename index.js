const argv = require("yargs").argv;
const path = require("path");
const fs = require("fs");
const smartgame = require("smartgame");

function processSequence(sequence) {
  const nodes = sequence.nodes;
  const sequences = sequence.sequences;
  if (nodes) {
    nodes.forEach(node => {
      if (node.C) {
        delete node.C;
      }
    });
  }

  if (sequences) {
    // Recurse
    processSequence(sequences);
  }
}

function stripFiles(dir) {
  const files = fs.readdirSync(dir);
  //   console.log("files", files);
  files.forEach(file => {
    console.log("file", file);
    file = path.join(dir, file);
    if (fs.lstatSync(file).isDirectory()) {
      stripFiles(file);
    } else {
      console.log(path.extname(file));

      if (path.extname(file) === ".sgf") {
        const sgf = fs.readFileSync(file, { encoding: "utf8" });
        const game = smartgame.parse(sgf);

        if (game && game.gameTrees) {
          game.gameTrees.forEach(tree => processSequence(tree));
          fs.writeFileSync(file, smartgame.generate(game), {
            encoding: "utf8"
          });
        }
      }
    }
  });
}

if (argv.dir) {
  stripFiles(argv.dir);
} else {
  console.log(
    `This script will strip comments from all .sgf files in a directory, including all subdirectories. Specify which directory to act on using the --dir=<somedirectory> flag.`
  );
}
