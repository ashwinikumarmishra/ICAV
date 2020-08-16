const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const {Customer, BookMow, ConfirmBooking} = require('./models/MowBooking')

// const BookSchema = new Schema({
// name : String
// })

const Model = mongoose.model
//const Book = Model('Books',BookSchema)
//const NodeJsGuide = new Book({name : 'NodeJS : A Guide' })


const customer  = Model('Customer',Customer)
const newCustomer = new customer({
    customerId : 1,
    Name : 'First',
    contactNumber : 1,
    email : 'test@test.com',
    address : 'Noida'
 })

 newCustomer.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
})

///////
const bookMow  = Model('Booking',BookMow)
const newBookMow = new bookMow({
    customerId : 1,
    MowArea : 10,
    cooponCode : '10'
 })

 newBookMow.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
})


///
const confirmedBooking  = Model('ConfirmedBooking',ConfirmBooking)
const newconfirmedBooking = new confirmedBooking({
        bookingId : 1,
        amount : 100
 })

 newconfirmedBooking.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
})
