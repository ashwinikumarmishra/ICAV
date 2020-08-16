const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Customer = new Schema({
    customerId : Number,
    Name : String,
    contactNumber : Number,
    email : String,
    address : String
    })

const BookMow = new Schema({
    bookingId: Number,
    customerId : Number,
    mowArea : Number,
    date : String,
    time : String,
    cooponCode : String,
    amount : Number,
    flagConfirmed : Number
    })
    

const ConfirmBooking = new Schema({
        bookingId : Number,
        amount : Number
        })



const Coopon = new Schema({
    cooponCode : String,
    discount : Number,    
    flagActive : Number
    })

const Rate = new Schema({
    rate : Number
    })
    


module.exports ={ Customer, BookMow, ConfirmBooking, Coopon, Rate}
