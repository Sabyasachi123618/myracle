const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
var mongoose = require('mongoose');
//-----------------DATABASE CONNECTION-------------------
mongoose.connect('mongodb://localhost:27017/newProj', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Something went wrong");
    })



app.set('view engine', 'ejs');

//-----------------DEFINING SCHEMA-----------------
const userSchema = new mongoose.Schema({
    sub_id: String,
    sub_name: String,
    sub_code: String,
    sub_prof: String
});
const user = mongoose.model('user', userSchema);

//-------------ROUTE FOR ADDING SUBJECT DETAILS----------
app.get("/add_subject", (req, res) => {
    res.render("add_subject");
})

//------------ROUTES FOR SEARCHING--------------------
app.get("/search", (req, res) => {
    res.render('find_form');
})
app.get("/find", (req, res) => {
    const { id } = req.query;
    user.findOne({ sub_id: id }, function (err, docs) {
        if (err) throw err;
        res.send(docs);
    })
})

//------------ROUTE FOR INSERTING DATA--------------------
app.post("/insert", (req, res) => {
    const data = new user({
        sub_id: req.body.sub_id,
        sub_name: req.body.sub_name,
        sub_code: req.body.sub_code,
        sub_prof: req.body.sub_prof
    });
    user.collection.insertOne(data);
    res.send("done");
})
app.listen(3000, () => {
    console.log("Listening on port 3000...");
})