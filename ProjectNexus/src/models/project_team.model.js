const { project } = require("../controllers/project.controller");
const db = require("../utils/database");

module.exports = class ProjectTeam {
    constructor (ProjectTeam) {
        this.id_project = ProjectTeam.id_project;
        this.id_team_member = ProjectTeam.id_team_member;
        this.agile_points = ProjectTeam.agile_points;
    }
    save () {
        let query = 
        `INSERT INTO project_teamMember (id_project, id_team_member, agile_points) `;
            query += `SELECT P.id_project, T.id_team_member, ? `;
            query += `FROM project as P, teamMember as T 
            WHERE P.id_project = ? AND T.id_team_member = ?;`;
            return db.execute(query, [this.id_project, this.id_team_member, this.agile_points]);
    }
    static fetch_projects_assigned_search_bar(search_name_project, email){
        return db.execute (`
            SELECT P.project_name, P.id_project, COUNT(T.member_name) as count_team_members
            FROM project as P, teamMember as T, project_teamMember as Tm
            WHERE P.id_project = Tm.id_project AND Tm.id_team_member = T.id_team_member
            AND P.project_name = ? AND T.email = ?
            `, [search_name_project, email]
        );
    }

    static fetch_projects_assigned_id(id_member){
        if (id_member  > 0){
            let query = `
            SELECT project_name, id_project
            FROM project
            WHERE id_project IN (
                SELECT id_project
                FROM project_teamMember
                WHERE id_team_member IN (
                    SELECT id_team_member
                    FROM teamMember
                    WHERE id_team_member = ?
                )
            )`;
            return db.execute(query, [id_member]);
        }
    }
    static fetch_projects_assigned_email(email){
        if (email  != ''){
            let query = `
            SELECT project_name, id_project
            FROM project
            WHERE id_project IN (
                SELECT id_project
                FROM project_teamMember
                WHERE id_team_member IN (
                    SELECT id_team_member
                    FROM teamMember
                    WHERE email = ?
                )
            )`;
            return db.execute(query, [email]);
        }
    }
    static fetch_teamMembers(){
        let query = `
        SELECT P.agile_points, T.member_name
        FROM project_teamMember as P, teamMember as T, project as Pr
        WHERE P.id_project = Pr.id_project AND P.id_team_member = T.id_team_member;`;
        return db.execute(query);
    }
    
    static async fetch_number_members_assigned(list_projects){
        let query = `
        SELECT COUNT(member_name) AS count_team_members
        FROM teamMember
        WHERE id_team_member IN (
                    SELECT id_team_member
                    FROM project_teamMember
                    WHERE id_project IN (
                        SELECT id_project
                        FROM project
                        WHERE id_project = ?
                    )
        )`;
        const promises = [];
        list_projects.forEach((project, index) => {
            promises.push(db.execute(query, [project.id_project]));
        });
        const result = await Promise.all(promises);
        const counts = [];
        result.forEach(([rows], index) => {
            counts.push(rows[0].count_team_members);
        });
        return counts;
    }
}