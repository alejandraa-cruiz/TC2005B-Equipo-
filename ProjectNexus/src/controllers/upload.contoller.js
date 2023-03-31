const path = require('path');
const Epic = require('../models/epic.model');
const TicketDataset = require('../utils/CSVparser');

/** @type {import("express").RequestHandler} */
exports.file = async (req, res) => {
    if (req.files && req.files.csv) {
        const { csv } = req.files;
        const extensionName = path.extname(req.files.csv.name);
        const allowedExtension = ['.csv'];
        if(!allowedExtension.includes(extensionName)){
            req.session.error = 'File must be CSV';
            res.redirect(req.get('referer'));
        } else {
            try {
                const dataset = TicketDataset.parseCSV(csv.data.toString());
                try {
                    await Epic.create_epics(dataset.epics);
            
                    dataset.tickets.forEach(async (elem) => {
                        await elem.save();
                    });
                    csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {}); // Move file to uploads directory
                    res.redirect(req.get('referer'));

                } catch (e) {
                    req.session.error = 'Database connection failed';
                    res.redirect(req.get('referer'));
                }
            } catch (e) {
                if (e instanceof RangeError){
                    req.session.error = 'Rows aren\'t the same lenght';
                    res.redirect(req.get('referer'));
                }
                else if(e instanceof TypeError){
                    req.session.error = 'Row headers don\'t match';
                    res.redirect(req.get('referer'));
                }
            }
        }
    } else {
        req.session.error = 'No file selected';
        res.redirect(req.get('referer'));
    }
}