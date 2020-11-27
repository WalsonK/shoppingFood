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
    //The register EMail
const output = `
<!Doctype html>
<html>
<head>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
        <header>
            <span id="date"></span>

            <div id="headerBlock">
                <h1 id="bienvenue">Bienvenue ${firstName} sur Eazy Home</h1>
                <span>Rendez votre vie plus simple !</span>

            </div>
        </header>
        <main>
            <div class="row">
                <div id="col1">
                    <h2>Fonctionnement</h2>
                    <span>
                        <i class="material-icons">home</i>
                        Activer votre maison
                    </span><br>
                    <span>
                        <i class="material-icons">library_add</i>
                        Ajouter pièces, objets de votre maison
                    </span><br>
                    <span>
                        <i class="material-icons">shopping_cart</i>
                        Acheter avec votre liste de course automatique
                    </span>
                </div>
                <div id="col2">
                    <h2>Nous sommes trés heureux de vous compter parmis notre communauté !</h2>
                    <p>
                        <b>by Eazy Home Team</b><br><br>
                        N'attendez plus pour profiter de la vrai vie, débarrasser vous des tâches inutiles et
                         concentrer vous uniquement sur ce qui compte réellement pour vous et uniquement cela.<br>
                         Ceci est le mojo d'Eazy Home, notre application suis donc cette philosophie afin de vous
                          aider à atteindre vos objectifs !
                    </p>
                    <img src="https://cdn.pixabay.com/photo/2018/07/14/11/28/network-3537389_1280.jpg">
                </div>

            </div>
        </main><br>
        <footer id="footer">
            <div class="row">
                <i class="material-icons">mail_outline</i>
                <a href="mailto:shoppingfood@gmail.com">contact@easyHome.com</a>

                <i class="material-icons" style="margin-left: 20%;">local_phone</i>
                <a href="tel:+33649019043">+33 2 92 00 00 01</a>

                <a href="https://www.facebook.com/" style="margin-left: 50%;">
                    <i class="material-icons">facebook</i>
                </a>
            </div><br>
        </footer>
        <style>
            body{
                background-color: #FFF9F6;
                color: #544441;
                padding:2%;
            }
            i{
                vertical-align: middle !important;
            }
            #headerBlock{
                margin-top: 2%;
                margin-bottom: 2%;
                border: 5px solid #544441;
                padding: 2%;
            }
            #headerBlock>h1{
                margin-left: 35%;
            }
            #headerBlock>span{
                margin-left: 43%;
            }
            img{
                width: 50%
            }
            .row{
                vertical-align: top;
                margin-top: 2%;
            }
            .row>*{
                display: inline-block;
            }
            #col1{
                display:inline-block;
                border: 2px solid #544441;
                width:30%;
                height: 100%;
                margin-right:2%;
                padding: 20px;
            }
            #col2{
                display:inline-block;
                vertical-align: top;
                width: 62%;
                text-align: center;
            }
            #col2>p{
                text-align: left;
            }
            footer{
                border: 5px solid #544441;
                width: 90%;
                display:block;
                padding: 2%;
            }
            a{
                color: inherit; /* blue colors for links too */
                text-decoration: inherit; /* no underline */
            }
        </style>
        <script type="text/javascript">
            var d = new Date();
            var month = new Array();
            month[0] = "Janvier";
            month[1] = "Février";
            month[2] = "Mars";
            month[3] = "Avril";
            month[4] = "Mai";
            month[5] = "Juin";
            month[6] = "Juillet";
            month[7] = "Aout";
            month[8] = "Septembre";
            month[9] = "Octobre";
            month[10] = "Novembre";
            month[11] = "Decembre";
            var m = month[d.getMonth()];
            var y = d.getFullYear();
            var d1 = d.getDate();
            const n = d1 + ' ' + m + ' ' + y

            const htmlDate = document.getElementById('date');
            htmlDate.innerHTML = n;
        </script>
</body>
</html>
`;


    //Step 2
    let mailOptions = {
        from: '"Eazy Home App" <shoppingFoodApp@gmail.com>',
        to: email,
        subject: 'Bienvenue ' + firstName + ' sur Eazy Home App !',
        text: 'The sender mail works great !!',
        html: output
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