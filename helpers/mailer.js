require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("hbs");
const fs = require("fs");

// Templates: https://github.com/mailgun/transactional-email-templates

const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

const generateHTML = (filename, options) => {
    const html = hbs.compile(
        // Se puede tener una carpeta con los diferentes templates de HTML
        fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), "utf-8")
    );
    // Todo lo que se tenga en options se puede utilizar en el template de handlebars, ejemplo: email (options.emial)
    return html(options);
};

// Exportamos una función que se puede detonar donde sea que se requiera mandar un correo
exports.send = (options) => {
    const html = generateHTML(options.filename, options);
    // A partir de aquí se arma el correo:
    // options.message se muestra como default si no se puede mostrar el html
    console.log(options);
    const mailOptions = {
        from: "Josafat Solis <jsolis@macroaplicaciones.com>",
        to: options.email,
        subject: options.subject,
        message: options.message,
        html,
    };
    console.log("Enviando...");
    return transporter.sendMail(mailOptions);
}