const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberProfileSchema = new Schema({
    name: String,
    skills: [String],
    contact: String,
    email: { type: String, required: true, unique: true },
    interests: [String],
    socials: Object, // Define socials as an object
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true }
});

const MemberProfileModel = mongoose.model('MemberProfile', MemberProfileSchema);

module.exports = MemberProfileModel;
