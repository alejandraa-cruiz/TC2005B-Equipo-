const db = require("../utils/database");

module.exports = class Project {
    constructor(Project){
        this.project_name = Project.project_name;
        this.start_date = Project.start_date;
        this.end_date = Project.end_date;
    }
    // Method for saving project into database
    save() {
        let query = `INSERT INTO project (project_name, start_date, end_date) VALUES(?, ?, ?)`;
        return db.execute(query, [this.project_name, this.start_date, this.end_date]);
    }
    // Method to fetch by id and use information
    static fetch(id_project) {
        let query = `SELECT * FROM project `;
        if(id_project != 0) {
            query += `WHERE id = 0`;
            return db.execute(query, [id_project]);
        }
    }
    static fetch_name(name) {
        let query = `SELECT project_name FROM project `;
        if(name != "") {
            query += `WHERE project_name = ?`;
            return db.execute(query, [name]);
        }
    }
    static fetch_all() {
        return db.execute(`SELECT * FROM project`);
    }

    static fetch_all_id_name() {
        return db.execute(`SELECT id_project, project_name FROM project`);
    }

    async async_fetch_id_by_name(name){
        return db.execute('SELECT id_project FROM project WHERE project_name = ?',[name]);
    }

    static fetch_projects_assigned(email) {
        if (email != '') {
            let query = `
            SELECT id_project, project_name
            FROM project
            WHERE id_project IN (
                SELECT id_project
                FROM project_teamMember
                WHERE id_team_member IN (
                    SELECT id_team_member
                    FROM teamMember
                    WHERE email = ?
                )
            )`
            return db.execute(query, [email]);
        }
    }
    
    static async update_epics(id, list_epics) {
        let query = `UPDATE epic SET id_project = ? WHERE epic_link = ?`;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            list_epics.forEach(async(epic_link, index)=> {
                await connection.query(query, [id, epic_link]);
            });
            await connection.commit();
        } catch(error) {
            await connection.rollback();
            console.log(error);
        }
    }

    static fetch_dates(id_project) {
        let query = `SELECT start_date, end_date
        FROM project WHERE id_project = ?`
        return db.execute(query, [id_project]);
    }

    static fetch_id_by_name(name) {
        let query = `SELECT id_project FROM project `;
        if (name !== "") {
            query += `WHERE project_name = ?`;
            return db.execute(query, [name]);
        }
    }
    static delete_by_id(id) {
        let query = `DELETE FROM project `;
        if (id > 0) {
            query += `WHERE id_project = ?`;
            return db.execute(query, [id]);
        }
    }
    static delete_by_name(name) {
        let query = `DELETE FROM project `;
        if (name != "") {
            query += `WHERE project_name = ?`;
            return db.execute(query, [name]);
        }
    }

    static modify_by_id(name, start_date, end_date, id ) {
        let query = `UPDATE project SET project_name = ?, start_date = ?, end_date = ? WHERE  id_project = ?`;
        return db.execute(query,[name, start_date, end_date, id]);
    }

    static fetch_name_by_id(id){
        let query = 'SELECT project_name, start_date, end_date FROM project WHERE id_project = ?';
        return db.execute(query,[id]);
    }

}