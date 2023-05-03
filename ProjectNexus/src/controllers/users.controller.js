const TeamMember = require('../models/teamMember.model');

const emailRegex = /^[\w-\.]+(@(dispatchhealth|gmail))\.(com)|a(\d{8}|\d{9})(@tec)\.(mx)$/;

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

/** @type {import("express").RequestHandler} */
exports.getUser = async (req, res) =>{
  const userInfo = await req.oidc.fetchUserInfo();
  // Retrieve the logged-in user's info from DB
  TeamMember.fetch_by_email(userInfo.email)
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
          res.redirect('/project/list');
        })
        .catch((error) => {
          console.log("Failed to save new TeamMember", error);
          res.send(JSON.stringify(error));
        });
      } else {
        res.redirect('/logout');
      }
      
    } else {
      // Logged in user was found in DB!
      res.redirect('project/list');
    }

  })
  .catch(error => {
    console.log(error);
    res.send(JSON.stringify(error));
  });

};
