const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProofSchema = new Schema(
    {
        proof_id: { type: Number, default: 0 },
        fileLink: { type: String },
        s3_key: { type: String }
    },
    {
        // createdAt,updatedAt fields are automatically added into records
        timestamps: true
    }
);

ProofSchema.plugin(AutoIncrement, { inc_field: "proof_id" });

const Proof = mongoose.model('Proof', ProofSchema);

module.exports = Proof;