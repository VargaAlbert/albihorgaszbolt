import mongoose from "mongoose";

const shopCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: Array,
        default: []
    }
});

const ShopCard = mongoose.model("ShopCard", shopCardSchema);

export default ShopCard;

