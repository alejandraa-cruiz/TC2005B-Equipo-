const User = require('../models/teamMember.model');

const main = async () => {
    const [rows] = await User.fetch_names();
    console.log(rows);
}

main();
