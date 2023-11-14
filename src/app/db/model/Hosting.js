import {mongoose} from '../db';

const benefitsSchema = mongoose.Schema({
    title: String,
    descriptions: String,
    type: String,
    icon: String,
});

const hostingSchema = mongoose.Schema({
    name: String,
    period: String,
    hosting_type: String,
    haveBadge: Boolean,
    avatar: String,
    benefits: [benefitsSchema]
});

module.exports = mongoose.models.Hosting || mongoose.model('Hosting', hostingSchema)
