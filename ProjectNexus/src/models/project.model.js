const db = require("../utils/database");

module.exports = class Project {
    constructor(Project){
        this.project_name = Project.project_name;
        this.start_date = Project.start_date;
        this.end_date = Project.project_name;
    }
    // Method for saving project into database
    save() {
        return db.execute(
            `INSERT INTO project(project_name, start_date, end_date)
             VALUES(?, ?, ?)`,
             [this.project_name, this.start_date, this.end_date]
        )
    }
    // Method to fetch by id and use information
    static fetch(id_project) {
        let query = `SELECT FROM project `;
        if(id_project != 0) {
            query += `WHERE id = 0`
            return db.execute(query, [id_project]);
        }
    }
    static fetch_name(name) {
        let query = `SELECT FROM project `;
        if(name != "") {
            query += `WHERE project_name = ?`
            try {
                return db.execute(query, [name]);
            }
            catch (error) { console.log(error) };
        }
    }
    
}