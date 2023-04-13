const db = require("../utils/database");

module.exports = class Epic {
    constructor(Epic) {
        this.id_project = Epic.id_project || null;
        this.epic_link = Epic.epic_link;
    }

    save() {
        let query = `INSERT INTO epic (epic_link) 
                     SELECT ?
                     WHERE (SELECT count(epic_link) 
                            FROM epic WHERE epic_link = ?) = 0;`;
        return db.execute(query, [this.epic_link, this.epic_link]);
    }

    /**
     * Toma una lista con los nombres de las epics e inserta solo los que no 
     * se repitan
     * @param {[String]} epic_links 
     * @returns void
     */
    static async create_epics (epic_links) {
        let query = `
                INSERT INTO epic (epic_link) 
                SELECT ? 
                WHERE (SELECT count(epic_link) FROM epic WHERE epic_link = ? FOR UPDATE) = 0;`;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            epic_links.forEach(async (epic_link) => {
                await connection.query(query, [epic_link, epic_link]);
            });
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.log(error);
        }

    }
    
    static fetch_all_links() {
        let query = `SELECT epic_link FROM epic`;
        return db.execute(query);
    }
    
    static fetch_epic_link(id_project) {
        let query = `SELECT epic_link FROM Epic WHERE id_project = ?`;
        return db.execute(query, [id_project]);
    }

    static fetch_by_id(id_epic) {
        let query = `SELECT * FROM Epic WHERE id_epic = ?`;
        return db.execute(query, [id_epic]);
    }

    static fetch_id(epic_link) {
        let query = `SELECT id_epic FROM Epic WHERE epic_link = ?`;
        return db.execute(query, [epic_link]);
    }

    static fetch_assigned_epics() {
        let query = `SELECT * FROM epic WHERE id_project IS NOT NULL`;
        return db.execute(query);
    }

    static fetch_unassigned_epics() {
        let query = `SELECT * FROM epic WHERE id_project IS NULL`;
        return db.execute(query);
    }
}