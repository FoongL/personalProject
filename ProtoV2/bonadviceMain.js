const fs = require('fs');

class NoteService {
  constructor(file) {
    this.fileName = file;
    this.notes = {};
    this.listNotePromise = this.listNote();
  }

  listNote(user) {
    return new Promise((res, rej) => {
      fs.readFile(this.fileName, 'utf-8', (err, data) => {
        if (err) {
          rej(err);
          return;
        }
        this.notes = JSON.parse(data);
        //console.log(this.notes[user]);
        res(this.notes[user]);
      });
    });
  }

  addNote(note, user) {
    return new Promise((res, rej) => {
      this.listNotePromise.then(() => {
        if (typeof this.notes[user] === 'undefined') {
          this.notes[user] = [];
        }
        this.notes[user].push(note);
        fs.writeFile(this.fileName, JSON.stringify(this.notes), err => {
          if (err) {
            rej(err);
            return;
          }
          res(this.notes[user]);
        });
      });
    });
  }
  removeNote(index, user) {
    return new Promise((res, rej) => {
      this.listNotePromise.then(() => {
        this.notes[user].splice(index, 1);
        fs.writeFile(this.fileName, JSON.stringify(this.notes), err => {
          if (err) {
            rej(err);
            return;
          }
          res('Success');
        });
      });
    });
  }
  insertNote(index, note, user) {
    console.log('I am pre promise: ', index, note);
    return new Promise((res, rej) => {
      this.listNotePromise.then(() => {
        this.notes[user].splice(index, 0, note);
        console.log('I am post promise: ', index, note);
        fs.writeFile(this.fileName, JSON.stringify(this.notes), err => {
          if (err) {
            rej(err);
            return;
          }

          res('Success');
        });
      });
    });
  }
}

module.exports = NoteService;
