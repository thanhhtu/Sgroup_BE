import express from 'express';
import uploadStorage from '../../config/upload.config';

const route = express.Router();

// Single file
route.post("/single", uploadStorage.single("file"), (req, res) => { //single middleware
    // console.log(uploadStorage)
    console.log(req.file)
    return res.send("Single file")
})
//Multiple files
route.post("/multiple", uploadStorage.array("file", 10), (req, res) => {
    console.log(req.files)
    return res.send("Multiple files")
})

export default route;