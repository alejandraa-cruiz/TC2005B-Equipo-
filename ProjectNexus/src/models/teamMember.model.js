const db = require("../utils/database");

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
             WHERE (SELECT count(*) FROM teammember WHERE email = ?) = 0`,
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
    static fetchAll() { // fetch by id - usar nombres mas descriptivos
        let query = `SELECT * FROM teamMember `; 
        return db.execute(query);
    }

    static search_by_name(name){
        let query= `SELECT name FROM teamMember 
        WHERE member_name LIKE "?_%"`;
        return db.execute(query,[name])
        
    }
    
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
}