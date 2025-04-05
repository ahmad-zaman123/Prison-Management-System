const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const InmateController = require("../controllers/inmateController");


// Set up multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
}

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
}).single('image');

// Route to handle form submission
router.post("/addinmates", upload, InmateController.addInmates);
// Display all inmates
router.get("/getallinmates", InmateController.getAllInmates);
// Display all released inmates
router.get("/getreleasedinmates", InmateController.getReleasedInmates);
// Display all wanted inmates
router.get("/getwantedinmates", InmateController.getWantedInmates);
// Route to get current inmates
router.get("/getcurrentinmates", InmateController.getCurrentInmates);
// Delete inmate details
router.delete("/:id", InmateController.deleteInmate);
// Update inmate details
router.put("/:id", InmateController.updateInmate);


module.exports = router;
