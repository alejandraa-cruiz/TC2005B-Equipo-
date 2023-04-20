const db = require("../utils/database");
const { delete_by_id } = require("./project.model");

module.exports = class TeamMember {
    constructor(teamMember) {
        this.id = teamMember.id; // no se ocupa 
        this.email = teamMember.email || null;
        this.userName = teamMember.userName || null;
        this.team = teamMember.team || "FE";
    }
    // method for saving a new teamMember in database
    // with auth0 we can fetch name and email
    save() {
        return db.execute(
            `INSERT INTO teamMember(email, member_name, team)
             SELECT ?, ?, ?
             WHERE (SELECT count(*) FROM teamMember WHERE email = ?) = 0`,
            [this.email, this.userName, this.team, this.email]
        );
    }

    // method to modify agile points of user
    static fetch(id) { // fetch by id - usar nombres mas descriptivos
        let query = `SELECT * FROM teamMember `; 
        if (id != 0) {
            query += `WHERE id = ?`
            return db.execute(query, [id]);
        }
        return db.execute(query);
    }

    static fetch_names() {
        let query = `SELECT member_name FROM teamMember`;
        return db.execute(query); 
    }

    static fetch_unassigned(project_id) {
        let query = `SELECT member_name, id_team_member FROM teamMember WHERE id_team_member NOT IN (SELECT id_team_member 
            FROM project_teamMember
            WHERE id_project = ?)`;
        return db.execute(query, [project_id]);
    }


    static fetchAll() { // fetch by id - usar nombres mas descriptivos
        let query = `SELECT * FROM teamMember `; 
        return db.execute(query);
    }

    static search_by_name(member_name){
        let query= `SELECT member_name FROM teamMember 
        WHERE member_name LIKE "${member_name}_%"`;
        return db.execute(query)
        
    }
    
    //fetchs all of team members that start 
    static fetch_by_team(userName) { 
        let query = `SELECT team FROM teamMember `;
        if (userName != "") {
            query += `WHERE team = ?`
            return db.execute(query, [userName]);
        }
        return db.execute(query);
    }
    static fetch_by_email(email) { // fetch by email - usar nombres mas descriptivos
        let query = `SELECT * FROM teamMember `;
        if (email != "") {
            query += `WHERE email = ?;`
            return db.execute(query, [email]);
        }
    }
    static fetch_id_by_email(email) {
        let query = `SELECT id_team_member FROM teamMember `;
        if (email != ""){
            query += `WHERE email = ?;`
            try {
                return db.execute(query, [email]);
            }
            catch (error) { console.log(error) };
        }
    }

    static fetch_all_by_id(id){
        let query = 'SELECT email, member_name, team FROM teamMember WHERE id_team_member = ? ';
        return db.execute(query,[id]);
    }

    static delete_by_id(id) {
        let query = 'DELETE From teamMember';
        if (id > 0) {
            query += ' WHERE id_team_member = ?';
            return db.execute(query, [id]);
        }
    }

    static delete_by_name(name) {
        let query = 'DELETE From teamMember';
        if (name != "") {
            query += 'WHERE member_name = ?';
            return db.execute(query, [name]);
        }
    }

    static update_by_id(name, email, team, id){
        let query = 'UPDATE teamMember SET member_name = ?, email = ?, team = ? WHERE id_team_member = ?'
        return db.execute(query,[name, email, team, id]);
    }
}