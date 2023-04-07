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
            res.json({e: 'File must be CSV'});
        } else {
            try {
                const buff = csv.data;
                if(!buff.length) {
                    throw new Error('Empty file');
                }
                const dataset = TicketDataset.parseCSV(buff.toString());
                try {
                    await Epic.create_epics(dataset.epics);
            
                    dataset.tickets.forEach(async (elem) => {
                        await elem.save();
                    });
                    csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {}); // Move file to uploads directory
                    res.json({e: 'Success'});
                } catch (e) {
                    req.session.error = 'Database connection failed';
                    res.json({e: 'Database connection failed'});
                    // res.redirect(req.get('referer'));
                }
            } catch (e) {
                if (e instanceof RangeError){
                    req.session.error = 'Rows aren\'t the same lenght';
                    res.json({e: 'Rows aren\'t the same lenght'})
                    // res.redirect(req.get('referer'));
                }
                else if(e instanceof TypeError){
                    req.session.error = 'Row headers don\'t match';
                    res.json({e: 'Row headers don\'t match'});
                    // res.redirect(req.get('referer'));
                }
                else if(e instanceof Error) {
                    req.session.error = 'The file is empty';
                    res.json({e: 'The file is empty'})
                    // res.redirect(req.get('referer'));
                }
            }
        }
    } else {
        req.session.error = 'No file selected';
        // res.redirect(req.get('referer'));
        res.json({e:'No file selected'});
    }
}