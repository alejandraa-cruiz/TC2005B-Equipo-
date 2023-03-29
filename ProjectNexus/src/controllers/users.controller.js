const TeamMember = require('../models/TeamMember.model');

const emailRegex = /^[\w-\.]+(@(dispatchhealth|gmail))\.(com)|a(\d{8}|\d{9})(@tec)\.(mx)$/;

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
};

exports.getUser = async (req, res) =>{
    const userInfo = await req.oidc.fetchUserInfo();
    // Retrieve the logged-in user's info from DB
    TeamMember.fetch_email(userInfo.email)
    .then(([rows, fieldData]) =>{
        // Check if user is in DB
        if(rows.length === 0) {
            // Create a new TeamMember when user email matches regex
            if (userInfo.email.match(emailRegex)) {
                const newUser = new TeamMember({
                    email: userInfo.email,
                    userName: userInfo.name,
                    team: "",
                });
                newUser.save()
                .then(([rows, fieldData]) => {
                    res.redirect('/dashboard');
                })
                .catch((error) => {
                    console.log("Failed to save new TeamMember", error);
                    res.send(JSON.stringify(error));
                });
            } else {
                // TODO: Create view of not matching regex
                res.redirect('/login');
            }
        } else {
            // Logged in user was found in DB!
            res.redirect('/dashboard');
        }
    })
    .catch(error => {
        console.log(error);
        // TODO: Might want to redirect to an error page
        // res.redirect('/error');
        res.send(JSON.stringify(error));
    });
};
