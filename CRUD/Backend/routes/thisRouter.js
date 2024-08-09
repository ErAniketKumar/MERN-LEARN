const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
        unique:true,
    },
    age:{
        type:Number,
        require:true,
    },
},{timestamps:true});

const userModel = mongoose.model('crudData', userSchema);

const uri = process.env.URI;

async function run() {
    const dboptions = {
        dbName: 'mernDb',
    }
    try {
        await mongoose.connect(uri, dboptions);
        console.log('connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

run();

//retrieve all data from data base;

async function getAllData ()
{
    const data = await userModel.find({});
    return data;
}



//send data via post method
router.post('/',async (req, res)=>{
    const {name, email, age} = req.body;

    const createData = new userModel({
        name:name,
        email:email,
        age:age,
    })

    await createData.save();
    res.status(200).json(createData);
    
})



//get all users data
router.get('/', async (req, res) => {
    try {
        const showAll = await userModel.find({});
        res.status(200).json(showAll);
    } catch(error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
});


// get single user  find by id
router.get('/:id',async (req, res)=>{
    const {id} = req.params;
    try {
        const singleUser = await userModel.findById({_id:id});
        res.status(200).json(singleUser);
    } catch(error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
})

// delete user data 

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const deletedUser = await userModel.findByIdAndDelete({_id:id});
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({err:err.message})
    }
})


//update data 
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, email, age} = req.body;
    try {
        // await userModel.findByIdAndUpdate(id, { name: 'Rajababu', email: 'raj@gmail.com' }); also we can do by input
        await userModel.findByIdAndUpdate(id, { name: name, email: email, age:age});
        res.status(200).json({ message: 'updated data' });
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = router;