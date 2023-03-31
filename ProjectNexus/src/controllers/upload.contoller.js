const path = require('path');
const Epic = require('../models/epic.model');
const TicketDataset = require('../utils/CSVparser');

exports.file = async (req, res) => {
    if (req.files && req.files.csv) {
        const { csv } = req.files;
        const extensionName = path.extname(req.files.csv.name);
        const allowedExtension = ['.csv'];
        if(!allowedExtension.includes(extensionName)){
            req.session.error = 'File must be CSV';
            res.redirect('/dashboard');
        } else {
            try {
                const dataset = TicketDataset.parseCSV(csv.data.toString());
                try {
                    await Epic.create_epics(dataset.epics);
            
                    dataset.tickets.forEach(async (elem) => {
                        await elem.save();
                    });
                    csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {}); // Move file to uploads directory
                    res.redirect('/dashboard');

                } catch (e) {
                    req.session.error = 'Database connection failed';
                    res.redirect('/dashboard');
                }
            } catch (e) {
                if (e instanceof RangeError){
                    req.session.error = 'Rows aren\'t the same lenght';
                    res.redirect('/dashboard');
                }
                else if(e instanceof TypeError){
                    req.session.error = 'Row headers don\'t match';
                    res.redirect('/dashboard');
                }
            }
        }
    } else {
        req.session.error = 'No file selected';
        res.redirect('/dashboard'); 
    }
}