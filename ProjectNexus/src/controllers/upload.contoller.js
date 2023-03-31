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
            } catch (e) {
                if (e instanceof RangeError){
<<<<<<< HEAD
                    req.session.error = 'Rows aren\'t the same lenght';
                    res.redirect('/dashboard');
                }
                else if(e instanceof TypeError){
                    req.session.error = 'Row headers don\'t match';
                    res.redirect('/dashboard');
=======
                    // 'Not all rows are the same lenght'
                    req.session.error = 'Not all rows are the same lenght';
                    res.redirect(req.get('referer'));
                }
                else if(e instanceof TypeError){
                    // 'Row headers don't match'
                    req.session.error = "Row headers don't match";
                    res.redirect(req.get('referer'));
>>>>>>> 175898a40735a6fd6df8fbbfb5fd3688da13a63a
                }
            }
    
            try {
                await Epic.create_epics(dataset.epics);
        
                dataset.tickets.forEach(async (elem) => {
                    await elem.save();
                })
            } catch (e) {
                req.session.error = 'Database connection failed';
                res.redirect('/dashboard');
            }
    
            csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {}); // Move file to uploads directory
            
            res.redirect('/dashboard');
        }
        
    } else {
        req.session.error = 'No file selected';
        res.redirect('/dashboard'); 
    }
}