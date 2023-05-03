const db = require("../utils/database");

module.exports = class Csv {
  constructor(csv) {
    this.id_team_member = csv.id_team_member || null;
    this.id_sprint = csv.id_sprint || null;
    this.file_path = csv.file_path;
  }

  save () {
    return db.execute('INSERT INTO csv (file_path) VALUES (?)', 
                       [this.file_path]);
  }

  save (connection) {
    return connection.execute('INSERT INTO csv (file_path) VALUES (?)', 
                              [this.file_path]);
  }
  
}