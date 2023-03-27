const path = require('path');

exports.file = (req, res) => {
    if (req.files && req.files.csv) {
        const { csv } = req.files;
        // console.log(csv.data); // File upload data buffer
        // console.log(csv.data.toString()); // Read buffer as string
        // Move file to uploads directory
        // csv.mv(path.join(__dirname, '..', 'public', 'uploads', 'test.csv'), () => {});
    } else {
        // No file, handle error
    }
}