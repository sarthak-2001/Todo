//note taking app
const notes = require("./notes.js");
const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");

//add command
yargs.command({
  command: "add",
  describe: "add new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "note content",
      demandOption: true,
      type: "string"
    }
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

//remove command
yargs.command({
  command: "remove",
  describe: "removes a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  }

});

//list command
yargs.command({
  command: "list",
  describe: "list note",
  handler: function () {
    notes.listNotes()
  }
});

//read command
yargs.command({
  command: "read",
  describe: "Shows the note with given title",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
  },
  handler: function (argv) {
    notes.getNotes(argv.title)
  }
});

// console.log(yargs.argv);
yargs.parse();