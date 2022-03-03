import Income from '../models/income.js';

export const getAllIncomes = async (req, res) => {
    if(req.query.userId){
        const incomes = await Income.find({userId: req.query.userId});

        res.status(201).json({
            result: incomes
        });
    }
    else{
        const incomes = await Income.find();

        res.status(201).json({
            result: incomes
        });
    }
}

export const createIncome = async (req, res) => {
    if((req.body.userId && req.body.userId != '') && (req.body.name && req.body.name != '') && (req.body.amount && req.body.amount != '') && (req.body.amount && req.body.amount != '')){
        const userId = req.body.userId;
        const name = req.body.name;
        const amount = req.body.amount;
        const date = req.body.date;

        const income = new Income({
            userId: userId,
            name: name,
            amount: amount,
            date: date,
            categoryId: (req.body.categoryId && req.body.categoryId != '') ? req.body.categoryId : null,
            projectId: (req.body.projectId && req.body.projectId != '') ? req.body.projectId : null,
        });

        await income.save();

        res.status(201).json({
            result: "Income created !"
        });
    }
}

export const getIncome = async (req, res) => {
    const income = await Income.findById(req.params.incomeId);

    if(!income){
        res.status(401).json({
            result: "Unknown income ID !",
        });
    }
    else{
        res.status(201).json({
            result: income
        });
    }
}

export const modifyIncome = async (req, res) => {
    const income = await Income.findById(req.params.incomeId);

    if(!income){
        res.status(401).json({
            result: "Unknown income ID !",
        });
    }
    else{
        income.name = (req.body.name) ? req.body.name : income.name;
        income.amount = (req.body.amount) ? req.body.amount : income.amount;
        income.date = (req.body.date) ? req.body.date : income.date;
        income.categoryId = (req.body.categoryId) ? req.body.categoryId : income.categoryId;
        income.projectId = (req.body.projectId) ? req.body.projectId : income.projectId;

        await income.save();

        res.status(201).json({
            result: "Income modified !"
        });
    }
}

export const deleteIncome = async (req, res) => {
    const income = await Income.findById(req.params.incomeId);

    if(!income){
        res.status(401).json({
            result: "Unknown income ID !",
        });
    }
    else{
        await Income.findByIdAndDelete(req.params.incomeId);

        res.status(201).json({
            result: "Income deleted !",
        });
    }
}