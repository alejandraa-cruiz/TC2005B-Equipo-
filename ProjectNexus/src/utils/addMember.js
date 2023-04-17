const User = require('../models/teamMember.model');

const main = async () => {
    const [rows] = await User.fetch_all();
    console.log(rows);
}

main();
