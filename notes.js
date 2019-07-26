const fs = require("fs");
const chalk = require("chalk")

const getNotes = function (title) {
  // console.log("Your notes are...");
  const notes = loadNotes();
  const result = notes.find((note) => note.title === title)

  if (result != undefined) {
    console.log(chalk.blue.bold(result.title) + ': ' + (chalk.green.italic(result.body)))

  } else {
    console.log(chalk.bgRed('Not Found!!'));

  }
  // console.log(result);


};

const addNotes = function (title, body) {
  const notes = loadNotes();

  //duplicateNotes() not so efficient

  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title
  // })

  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('Note added!'));

  } else {
    console.log(chalk.bgRed('title taken!!!'));

  }

  // console.log(notes);

};

const loadNotes = function () {
  try {
    const dataBuf = fs.readFileSync("notes.json");
    const dataJSON = JSON.parse(dataBuf);
    return dataJSON;
  } catch (error) {
    return [];
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNotes = function (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  // console.log(notesToKeep);


  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found!'));

  } else {
    console.log(chalk.bgGreen('Note removed!'));
    saveNotes(notesToKeep)
  }

}

const listNotes = function () {
  console.log(chalk.underline.red.bold('your notes...'));
  const note = loadNotes()
  note.forEach(element => {
    console.log(chalk.blue.bold(element.title) + ': ' + (chalk.green.italic(element.title)))
  });

}

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes

};