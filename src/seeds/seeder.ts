import { acmeCorporation,technologyArc } from './seed';
import { constants } from '../constants';

const mongoose = require('mongoose');

connect().catch(err => console.log(err));

const transactionSeedSchema = new mongoose.Schema({
    date: String,
    balance: Number,
    income: Number,
    expences:Number
},{timestamps:true});
const accountSeedSchema = new mongoose.Schema({
    name: String,
    grant: String,
    transactions: [transactionSeedSchema],
},{timestamps:true});
const userSeedSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roles: [String],
},{timestamps:true});
const businessSeedSchema = new mongoose.Schema({
    name: String,
    users: [userSeedSchema],
    accounts: [accountSeedSchema],
},{timestamps:true});


const newSeed = mongoose.model('businesses', businessSeedSchema);

const seederAcme = new newSeed(acmeCorporation);
const seederTech = new newSeed(technologyArc);

save(seederAcme,seederTech);


async function connect() {
    await mongoose.connect(constants.mongoURI);
}
async function stop() {
    await mongoose.disconnect() ;
}
async function save(seederAcme,seederTech) {
    const acmeSaved = await seederAcme.save();
    const techSaved = await seederTech.save();

    if(acmeSaved && techSaved) {
      stop()
    }
}