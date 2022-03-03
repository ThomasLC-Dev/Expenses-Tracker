import Expense from '../models/expense.js';

export const getAllExpenses = async (req, res) => {
    if(req.query.userId){
        const expenses = await Expense.find({userId: req.query.userId});

        res.status(201).json({
            result: expenses
        });
    }
    else{
        const expenses = await Expense.find();

        res.status(201).json({
            result: expenses
        });
    }
}

export const createExpense = async (req, res) => {
    if((req.body.userId && req.body.userId != '') && (req.body.name && req.body.name != '') && (req.body.amount && req.body.amount != '') && (req.body.amount && req.body.amount != '')){
        const userId = req.body.userId;
        const name = req.body.name;
        const amount = req.body.amount;
        const date = req.body.date;

        const expense = new Expense({
            userId: userId,
            name: name,
            amount: amount,
            date: date,
            categoryId: (req.body.categoryId && req.body.categoryId != '') ? req.body.categoryId : null,
            projectId: (req.body.projectId && req.body.projectId != '') ? req.body.projectId : null,
        });

        await expense.save();

        res.status(201).json({
            result: "Expense created !"
        });
    }
}

export const getExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.expenseId);

    if(!expense){
        res.status(401).json({
            result: "Unknown expense ID !",
        });
    }
    else{
        res.status(201).json({
            result: expense
        });
    }
}

export const modifyExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.expenseId);

    if(!expense){
        res.status(401).json({
            result: "Unknown expense ID !",
        });
    }
    else{
        expense.name = (req.body.name) ? req.body.name : expense.name;
        expense.amount = (req.body.amount) ? req.body.amount : expense.amount;
        expense.date = (req.body.date) ? req.body.date : expense.date;
        expense.categoryId = (req.body.categoryId) ? req.body.categoryId : expense.categoryId;
        expense.projectId = (req.body.projectId) ? req.body.projectId : expense.projectId;

        await expense.save();

        res.status(201).json({
            result: "Expense modified !"
        });
    }
}

export const deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.expenseId);

    if(!expense){
        res.status(401).json({
            result: "Unknown expense ID !",
        });
    }
    else{
        await Expense.findByIdAndDelete(req.params.expenseId);

        res.status(201).json({
            result: "Expense deleted !",
        });
    }
}