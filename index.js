const express = require('express');
const path = require('path');
const ejs = require('ejs').renderFile;
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const { dbConnection } = require('./shared/mysql');
const {
    blockUser,
    createUser,
    getBillByIdTabel,
    getBillsTable,
    getUnpaidBillsTable,
    getUsersWhoNotPaidBillsFor3Months,
    getUserByIdTabel,
    getUsersTable,
    logincontroller,
    logOutController
} = require('./controllers/controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs);

//backend api end points
app.get('/users', (req, res) => {
    getUsersTable(req, res)
})
app.get('/users/:userid', (req, res) => {
    getUserByIdTabel(req, res)
})

app.get('/bills', (req, res) => {
    getBillsTable(req, res)
})

app.get('/bills/unpaid', (req, res) => {
    getUnpaidBillsTable(req, res)
})

app.get('/bills/:userid', (req, res) => {
    getBillByIdTabel(req, res)
})

app.post('/auth/signin/admin', (req, res) => {
    logincontroller(req, res)
})

app.post('/logout', (req, res) => {
    logOutController(req, res)
})

app.post('/block/:blockstatus/:userid', (req, res) => {
    blockUser(req, res)
})

app.post('/auth/signup', (req, res) => {
    createUser(req, res)
})

app.get('/unpaidfor3monts', (req, res) => {
    getUsersWhoNotPaidBillsFor3Months(req, res)
})

//front end api end poits
app.get('/adminlogin', (req, res) => {
    res.render('login.html')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.html')
})

app.get('/demo', (req, res) => {
    res.render('demo.html')
})




app.listen(3000, () => console.log('server listening to 3000 port'))

// this is required to loop the bills details from json
// app.get('/uploadbills', async (req, res) => {
//     try {
//         await uploadSampleBillData(req, res);
//     } catch (error) {
//         console.error("Error handling request:", error);
//         res.status(500).json({ error: "An error occurred while processing the request" });
//     }
// })

// const { getUsersTable, getBillsTable, uploadSampleBillData, getBillByIdTabel, getUserByIdTabel, logincontroller } = require('./controllers/controllers');
