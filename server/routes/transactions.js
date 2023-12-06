const express = require('express')
const router = express.Router();
const User = require("../models/Customer");
const fetchuser = require("../middleware/fetchuser");
const Transactions = require("../models/Transaction");
const { body, validationResult } = require("express-validator");
const ErrorHandler = require("../middleware/ErrorHandler")

// Route 1: Get all the transactions of a particular user using GET: "/api/transactions/fetchtransactions": login required
router.get('/fetchtransactions', fetchuser, async (req, res) => {
    try {
        const list1 = await Transactions.find({ sender: req.user.id });
        
        const list2 = await Transactions.find({ receiver: req.user.id });
       
        
        const transactions_paid = await Promise.all(list1.map(async (element) => {
            const user = await User.findById(element.receiver);
            const receiverName = user ? user.name : null;
            const type="paid"
            return { ...element.toObject(), receiverName,type };
        }));

        // map with promise.all works and not foreach 
        const transactions_recieved = await Promise.all(list2.map(async (element) => {
            const user = await User.findById(element.sender);
            const senderName = user ? user.name : null; 
            const senderAccount = user ? user.account.toString() : null; 
            const type="received"
            return { ...element.toObject(), senderName,senderAccount,type };
        }));

        const transactions=transactions_paid.concat(transactions_recieved);
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        // await Promise.all(transactions_paid.map(async (element) => {
        //     const user = await User.findById(element.receiver);
        //     element['receiverName']=user.name
           
        // }));
        // console.log(transactions_paid)
        // await Promise.all(transactions_recieved.map(async (element) => {
        //     const user = await User.findById(element.sender)
        //     element['senderName']=user.name
        //     element['senderAccount']=user.account
            // element.senderName=user.name
            // element.senderAccount=user.account
        // }));
        

        res.json(transactions);
        // res.json({ transactions_paid, transactions_recieved });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});
// Route 3: Get all the transactions of all the customers using GET: "/api/transactions/fetchtransfers": no login required

router.get('/fetchtransfers', async (req, res) => {
    try {
        const transactions = await Transactions.find();
        res.json(transactions);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
});
// Route 2: a new transaction using Post: "/api/transactions/fetchtransactions":login required
router.post('/newtransaction', [fetchuser, ErrorHandler], [
    body("amount", "Enter a Valid amount").isLength({ min: 1 }),
    body("account", "Enter a Valid account no").exists()
], async (req, res) => {
    let success = false;
    try {
        const { amount, account } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let receiver = await User.findOne({ account });
        let sender1 = await User.findById(req.user.id);
        let amount2 = parseInt(amount);
        const transaction = new Transactions({
            amount: req.body.amount,
            account: req.body.account,
            receiver: receiver,
            sender: sender1
        });
        await User.findOneAndUpdate({ account }, { $set: { balance: receiver.balance + amount2 } }, { new: true });
        await User.findByIdAndUpdate(req.user.id, { $set: { balance: sender1.balance - amount2 } }, { new: true });
        const savetransactions = await transaction.save();
        success = true;
        res.json({ success, savetransactions });
    } catch (error) {

        console.error(error.message);
        res.status(500).send({ success, message: error.message });
    }
});



module.exports = router;
