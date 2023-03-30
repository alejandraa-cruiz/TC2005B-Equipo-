const path = require('path');
const Epic = require('../models/epic.model');
const TicketDataset = require('../utils/CSVparser');

exports.file = async (req, res) => {
    if (req.files && req.files.csv) {
        const { csv } = req.files;
        const extensionName = path.extname(req.files.csv.name);
        const allowedExtension = ['.csv'];
        if(!allowedExtension.includes(extensionName)){
            req.session.error = 'No extension allowed';
            console.log('redireccion desde no serve');
            res.redirect('/dashboard');
        } else {
            try {
                const dataset = TicketDataset.parseCSV(csv.data.toString());
            } catch (e) {
                if (e instanceof RangeError){
                    // 'Not all rows are the same lenght'
                    req.session.error = 'Not all rows are the same lenght';
                    res.redirect('/dashboard');
                }
                else if(e instanceof TypeError){
                    // 'Row headers don't match'
                }
            }
    
            try {
                await Epic.create_epics(dataset.epics);
        
                dataset.tickets.forEach(async (elem) => {
                    await elem.save();
                })
            } catch (e) {
                // 'Connection to db failed'
            }
    
            csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {}); // Move file to uploads directory
            
            console.log('redireccion desde el if');
            res.redirect('/dashboard');
        }
        
    } else {
        req.session.error = 'No file selected';
        console.log('redireccion desde el else');
        res.redirect('/dashboard');
        // 'No file or not a csv file' 
    }
    // 'Success! :)'
}