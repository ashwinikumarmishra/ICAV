const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const {Customer, BookMow, ConfirmBooking, Coopon, Rate} = require('./models/MowBooking')
var bodyParser = require('body-parser');
var express = require('express');

var app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var port = process.env.PORT || 3000;

const Model = mongoose.model

app.post('/api/rate',async  function(req, res) {

    let msg=''
    let status=500    

    const rate  = Model('Rate',Rate)
    const newRate = new rate({
        rate : req.body.rate
    })
    
    await rate.deleteMany({})
    newRate.save((err,result)=>{
        if(err) {
            console.log(err)
            status=500
            msg='error while saving rate details'
            res.status(status).send(msg);
            return
        }
        else
        {
            status=200
            msg='rate successfully created, rate: '+result.rate
            console.log(result);
            res.status(status).send(msg);
            return
        }                
        })
});

app.post('/api/coopon',async  function(req, res) {

    
    let msg=''
    let status=500    

    const coopon  = Model('Coopon',Coopon)   
    
    coopon.findOne({"cooponCode" : req.body.cooponCode})
   .limit(1)
   .exec(function(err, coopons){
    let newCoopon = null;
       if(coopons)
       {
            
            coopon.findOneAndUpdate({cooponCode: req.body.cooponCode}, {$set: {discount: req.body.discount,
                flagActive: req.body.flagActive}}, function (err, doc) {
            if (err) {
                status=500
                msg='error while creating coopon'
                res.status(status).send(msg);
                return
            } else {
                status=200
                msg='coopon successfuly updated'
                res.status(status).send(msg);
                return
            }

});
       }
               
            
        else
        {
            newCoopon = new coopon({
                cooponCode : req.body.cooponCode,
                discount : req.body.discount,    
                flagActive : req.body.flagActive          
            })
            newCoopon.save((err,result)=>{
            if(err) {
                console.log(err)
                status=500
                msg='error while creating coopon'
                res.status(status).send(msg);
                return
            }
            else
            {
                status=200
                msg='coopon successfully created, cooponCode: '+result.cooponCode
                console.log(result);
                res.status(status).send(msg);
                return
            }                
            })
        }
            
    });
    
    });


app.post('/api/customer',async  function(req, res) {

    let msg=''
    let status=500    
   
    const customer  = Model('Customer',Customer)
    
    
    
    customer.find({
        'email': req.body.email
      },async function(err, customers) {
        if (err) {
          console.log(err)
        } else {
          if(customers.length>0)
          {
            status=500
            msg='customer already exists'
            res.status(status).send(msg);
            return
          }
          else{
            
            let newCustomerId=1
            await customer.find({}).sort({"customerId" : -1})
            .limit(1)
            .exec({}, function(err, cc) {
                if (err) {
                console.log(err)
                } else {
                    if(cc.length>0)
                    {
                        newCustomerId=cc[0].customerId+1
                        const newcustomer = new customer({
                            customerId : newCustomerId,
                            Name : req.body.Name,
                            contactNumber : req.body.contactNumber,
                            email : req.body.email,
                            address : req.body.address
                        })
                        newcustomer.save((err,result)=>{
                            if(err) {
                                console.log(err)
                                status=500
                                msg='error while saving customer details'
                                res.status(status).send(msg);
                                return
                            }
                            else
                            {
                                status=200
                                msg='customer successfully created, customerId: '+result.customerId
                                console.log(result);
                                res.status(status).send(msg);
                                return
                            }                
                            })
                    }
                                    
                }
            });

            
          }
        }
      });
});

app.post('/api/booking',async  function(req, res) {

    /*assumptions
    
    I created API for Rate and Coopon, before booking,  
    Rate and coopon API should be called to create Rate and few coopons 

    */
    

    let msg=''
    let status=200    
    const coopon  = Model('Coopon',Coopon)
    const rate  = Model('Rate',Rate)
    const bookMow  = Model('Booking',BookMow)
    
    
    await bookMow.find({}).sort({"bookingId" : -1})
   .limit(1)
   .exec(async function(err, bookings){
    let newBookingId=1;
       if(bookings.length>0)        
        newBookingId= bookings[0].bookingId+1;
        let disocunt=0;
        await coopon.findOne({cooponCode: req.body.cooponCode}, function(err, coopons) {
            if (err) {
              console.log(err)
            } else {
              if(!coopons)
              {
                status=500
                msg=`coopon ${req.body.cooponCode} not found`
                res.status(status).send(msg);
                return
              }
              else{    
                  if(coopons.flagActive===1)          
                    disocunt= coopons.discount
                else{
                    status=500
                    msg=`entered coopon ${req.body.cooponCode} not active`
                    res.status(status).send(msg);
                    return
                }
              }
            }
          })

          let rateAmount=0;
          await rate.findOne({}, function(err, rates) {
              if (err) {
                console.log(err)
              } else {
                if(!rates)
                {
                  status=500
                  msg=`rate not found`
                  res.status(status).send(msg);
                  return
                }
                else{                    
                    rateAmount= rates.rate
                }
              }
            })
        if(status===200) {
            let amount= parseInt(req.body.mowArea)*rateAmount-(parseInt(req.body.mowArea)*rateAmount *disocunt)/100
        
        const newbookMow = new bookMow({
            bookingId: newBookingId,
            customerId : req.body.customerId,
            mowArea : req.body.mowArea,
            date : req.body.date,
            time : req.body.time,
            cooponCode : req.body.cooponCode        
        })
        await newbookMow.save((err,result)=>{
            if(err) {
                console.log(err)
                status=500
                msg='error while creating booking'
                res.status(status).send(msg);
                return
            }
            else
            {
                status=200
                let bookresp= {}
                bookresp.bookingId= result.bookingId
                bookresp.amount= amount
                
                console.log(JSON.stringify(bookresp));
                res.status(status).send(bookresp);
                return;
            }                
            })
        }
        
    });
    
    });


app.post('/api/bookingConfirmation',async  function(req, res) {

    let msg=''
    let status=500    

    const bookMow  = Model('Booking',BookMow)
    let newbookMow =null
    
    bookMow.findOne({"bookingId" : req.body.bookingId})
    .exec(function(err, bookings){
    
        if(!bookings)  
        {
            res.status(404).send({
                success: false,
                message: "bookingid not found"
              });
              return
               
        }   
        else
        {
            bookMow.findOneAndUpdate({"bookingId" : req.body.bookingId}, {$set: {amount: req.body.amount,
                flagConfirmed: req.body.flagConfirmed}}, function (err, doc) {
            if (err) {
                status=500
                msg='error while confirming booking'
                res.status(status).send(msg);
                return
            } else {
                status=200
                msg='booking confirmed, bookingId: '+req.body.bookingId
                res.status(status).send(msg);
                return
            }
        });
           
        }   
            

        
    });
    
    });
    
app.listen(port);
console.log('Server started! At http://localhost:' + port);