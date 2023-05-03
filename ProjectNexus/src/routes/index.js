const homeRoutes = require('./home.routes');
const loginRoutes = require('./login.routes');
const userRoutes = require('./user.routes');
const projectRoutes = require('./project.routes');
const teamMemberRoutes = require('./member.routes');


module.exports.initRoutes = (app) => {
    app.use('/', loginRoutes);
    app.use('/user', userRoutes);
    app.use('/dashboard', homeRoutes);
    app.use('/project', projectRoutes);
    app.use('/members', teamMemberRoutes);
    app.use((req, res) => {
        res.sendStatus(404);
    });
}
