const inmate = require('../models/inmate');

const getAllInmates = async (req, res, next) => {
    let Inmates;

    try {
        Inmates = await inmate.find();
    } catch (err){
        console.log(err);
    }

    if(!Inmates) {
        return res.status(404).json({message: "Users are not found"});
    }

    return res.status(200).json({ Inmates });

};

const getReleasedInmates = async (req, res, next) => {
    try {
        const releasedInmates = await inmate.find({ status: "Released" });
        res.status(200).json(releasedInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getWantedInmates = async (req, res, next) => {
    try {
        const wantedInmates = await inmate.find({ status: "Wanted" });
        res.status(200).json(wantedInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCurrentInmates = async (req, res, next) => {
    try {
        const currentInmates = await inmate.find({ status: "Current" });
        res.status(200).json(currentInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const addInmates = async (req, res, next) => {
    const { 
    fullname,
    initialname,
    birthday,
    gender,
    nic,
    address,
    contactnumber,
    emergencycontactname,
    emergencycontactnumber,
    marital,
    occupation,
    education,
    religion,
    inmatenumber,
    offense,
    sentence,
    admissionDate,
    releaseDate,
    years,
    months,
    days,
    cellNumber,
    medicalConditions,
    additionalNotes,
    realReleaseDate,
    releaseReason,
    releaseBy,
    confirmReleased,
    status,
    escapedDate,
    escapedTime,
    escapedLocation,
    physicalDescription,
    clothingDescription,
    foundDate
 } = req.body;

    const image = req.file ? req.file.filename : null;

    try{
        const inmates = new inmate({ 
            image,
            fullname,
            initialname,
            birthday,
            gender,
            nic,
            address,
            contactnumber,
            emergencycontactname,
            emergencycontactnumber,
            marital,
            occupation,
            education,
            religion,
            inmatenumber,
            offense,
            sentence,
            admissionDate,
            releaseDate,
            years,
            months,
            days,
            cellNumber,
            medicalConditions,
            additionalNotes,
            realReleaseDate,
            releaseReason,
            releaseBy,
            confirmReleased,
            status,
            escapedDate,
            escapedTime,
            escapedLocation,
            physicalDescription,
            clothingDescription,
            foundDate
        });
        await inmates.save();

        res.status(201).send('New inmate added successfully');
    } catch(error){
        console.error('Error:', error);
        res.status(500).send('Failed to add inmate');
    }
};

//Get by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let Inmate;
    try {
        Inmate = await inmate.findById(id);
    } catch(err) {
        console.log(err);
    }

    if(!Inmate) {
        return res.status(404).json({message: "User nor found"})
    }
    return res.status(200).json({ Inmate });
}

//Delete inmate
const deleteInmate = async (req, res, next) => {
    const id = req.params.id;

    let Inmate;
    try{
        Inmate = await inmate.findByIdAndDelete(id)
    } catch(err) {
        console.log(err);
    }

        if(!Inmate) {
        return res.status(404).json({message: "Unable to Delete Inmate"})
    }
    return res.status(200).json({ Inmate });
}

//Update inmate details
const updateInmate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInmate = await inmate.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedInmate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllInmates = getAllInmates;
exports.getReleasedInmates = getReleasedInmates;
exports.getWantedInmates = getWantedInmates;
exports.getCurrentInmates = getCurrentInmates;
exports.addInmates = addInmates;
exports.getById = getById;
exports.deleteInmate = deleteInmate;
exports.updateInmate = updateInmate;

