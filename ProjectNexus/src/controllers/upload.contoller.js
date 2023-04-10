const path = require('path');
const Csv = require('../models/csv.model');
const Epic = require('../models/epic.model');
const TicketDataset = require('../utils/CSVparser');

// Directory where the uploaded files will be saved
const uploadDirectory = path.join(__dirname, '..', 'public', 'uploads');

/** 
 * Handles the upload of a csv file.
 * The file is parsed, analysed and then used to generate epics and tickets on
 * the database.
 * The server responds with an object containing the message for the client.
 * @type {import("express").RequestHandler} 
 */
exports.file = async (req, res) => {
    // Check if a file named csv was sent 

    if (!(req.files && req.files.csv)) {
        // There was not a file named csv sent to the server
        res.status(400).json({e:'No file selected'});
        return;
    }
    // A file named csv was sent to the server

    // The csv file is extracted from the request
    const { csv } = req.files;

    // Checks if the file extension is ".csv"
    const extensionName = path.extname(csv.name);
    const allowedExtension = ['.csv'];

    if(!allowedExtension.includes(extensionName)){
        // The extension is not ".csv" 
        res.status(400).json({e: 'File must be CSV'});
        return;
    } 
    // The extension is ".csv" 

    // Check the size of the file buffer to avoid reading an empty buffer
    const buff = csv.data;
    if(!buff.length) {
        // The buffer was empty
        res.status(400).json({e: 'The file is empty'});
        return;
    }

    const dataset = TicketDataset.parseCSV(buff.toString());

    // We handle if the csv parser fails parsing the file
    if (dataset instanceof RangeError){
        res.status(400).json({e: 'Rows aren\'t the same lenght'});
        return;
    }
    else if(dataset instanceof TypeError){
        res.status(400).json({e: 'Row headers don\'t match'});
        return;
    }

    // The database throw errors when it fails
    try {
        // We save all the epics
        dataset.epics.forEach(async (elem) => {
            await elem.save();
        });
        
        // We save all the tickets
        dataset.tickets.forEach(async (elem) => {
            await elem.save();
        });

        // We create a unique file name appending the time and the file name
        const fileSaveName = new Date().getTime() + '-' + csv.name;
        
        await new Csv({
            file_path: path.join('uploads', fileSaveName)
        }).save();

        // Move file to uploads directory
        csv.mv(path.join(uploadDirectory, fileSaveName), () => {});

        res.json({e: 'Success'});

    } catch (e) {
        res.status(500).json({e: 'Database connection failed'});
    }
}