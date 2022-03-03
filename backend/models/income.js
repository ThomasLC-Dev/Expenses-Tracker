import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
});

export default mongoose.model("income", incomeSchema);