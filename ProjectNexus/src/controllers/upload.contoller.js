const path = require('path');
const Epic = require('../models/epic.model');
const TicketDataset = require('../utils/CSVparser');

/** @type {import("express").RequestHandler} */
exports.file = async (req, res) => {
    if (req.files && req.files.csv && req.body.project) {
        const { csv } = req.files;
        const dataset = TicketDataset.parseCSV(csv.data.toString());
        
        await Epic.create_epics(dataset.epics);

        dataset.tickets.forEach(async (elem) => {
            await elem.save();
        })

        // Move file to uploads directory
        csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {});
    } else {
        // No file, handle error
    }
}