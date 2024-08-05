const express = require("express");

const app = express();
const port = 3001

app.use(express.json()); //middleware to parse JSON bodies

let mobileBrands = [
    {id:1, mobile: "Vivo"},
    {id:2, mobile: "Redmi"},
    {id:3, mobile: "Samsung"}
];

//GET 
app.get('/mobileBrands',(req,res) => {
    res.json(mobileBrands);
});

// get mobileId
app.get('/mobileBrands/:id',(req,res) => {
    const mobileId = parseInt(req.params.id, 10);
    const mobile = mobileBrands.find(u => u.id === mobileId);
    if (mobile){
        res.json(mobile)
    }
    else {
        res.status(404).send("MobileId Not Found");
    }
})

//create a new brand mobile
app.post('/mobileBrands',(req,res) => {
    const newMobile = req.body;
    newMobile.id = mobileBrands.length ? mobileBrands[mobileBrands.length -1].id + 1:1;
    mobileBrands.push(newMobile);
    res.status(201).json(newMobile);
});

//update a new Mobile
app.put('/mobileBrands/:id',(req,res) => {
    const mobileId = parseInt(req.params.id, 10);
    const index = mobileBrands.findIndex(u =>u.id === mobileId);
    if (index !== -1){
        const updateNewMobile = req.body;
        updateNewMobile.id = mobileId;
        mobileBrands[index] = updateNewMobile;
        res.json(updateNewMobile)
    }
    else {
        res.status(404).send('mobile not found')
    }
});

// delete mobile
app.delete('/mobileBrands/:id',(req,res) => {
    const mobileId = parseInt(req.params.id, 10);
    mobileBrands = mobileBrands.filter(u => u.id !== mobileId);
    res.status(204).send();
});

app.listen(port,()=>{
    console.log(`server running on ${port} Production`)
})
