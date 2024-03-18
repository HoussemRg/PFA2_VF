const mongoose =require('mongoose');

const  validateId = (req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("invalid id");
    next();
}

module.exports={validateId}