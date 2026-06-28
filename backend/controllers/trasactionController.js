const Transaction = require('../models/Transaction');
const addTransaction = async (req,res)=>{
    try{ const {title,amount,type,category,date} = req.body;
    const transaction = await Transaction.create({
        title,
        amount,
        type,
        category,
        date,
        user: req.user.id
    });
    res.status(201).json(transaction);
} catch (error) {
    res.status(400).json({ message: error.message });
}};
const getTransactions = async (req,res)=>{
    console.log(req.user.id);
    try{
        const transactions = await Transaction.find({user:req.user.id}).sort({date:-1});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message,"gg": "Something went wrong" });
    }
};
const updateTransaction = async (req,res)=>{
    try{
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }
        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({ message: 'Not authorized to update this transaction' });
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true });
        res.status(200).json(updatedTransaction);} catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTransaction = async (req,res)=>{
    try{
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({ message: 'Transaction not found' });
        }
        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({ message: 'Not authorized to delete this transaction' });
        }
        await transaction.deleteOne();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {addTransaction,getTransactions,updateTransaction,deleteTransaction};