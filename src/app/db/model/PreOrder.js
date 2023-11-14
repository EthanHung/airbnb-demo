import {mongoose} from '../db';

const schema = mongoose.Schema({
    price: Number,
    service_charge: Number,
    currency: String,
    package_type: String
})

module.exports = mongoose.models.PreOrder || mongoose.model('PreOrder', schema)
