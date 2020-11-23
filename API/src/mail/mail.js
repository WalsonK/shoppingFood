require('dotenv').config();

const nodemailer = require('nodemailer');
//Envoie mail !

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mail,
        pass: process.env.pass
    }
});

const sendMail = (email, firstName, cb) => {
    //Step 2
    let mailOptions = {
        from: '"Shopping Food App" <shoppingFoodApp@gmail.com>',
        to: email,
        subject: 'Bienvenue ' + firstName + ' sur ShoppingFood App !',
        text: 'The sender mail works great !!'
    };

    //step 3
    transporter.sendMail(mailOptions, function(err, data){
        if(err)
            cb(err, null)
        else
            cb(null, data)
    });
}

module.exports = sendMail;

/* 
    transporter.sendMail(mailOptions, function(err, data){
        if(err)
            console.log('Error :' + err);
        else
            console.log('Email sent !!')
    });

*/

           
            //Step 4 : Activate connection of gmail : https://myaccount.google.com/lesssecureapps