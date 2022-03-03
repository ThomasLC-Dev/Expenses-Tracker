import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("category", categorySchema);