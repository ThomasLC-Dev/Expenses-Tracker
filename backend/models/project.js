import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    goalAmount: {
        type: Number
    },
    goalDate: {
        type: Date
    }
});

export default mongoose.model("project", projectSchema);