import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: "smtp.sendgrid.net",
	port: 587,
	auth: {
		user: "apikey",
		pass: process.env.SENDGRID_API_KEY,
	},
});

async function sendEmail(toEmail: string, subject: string, emailContent: string) {
    try {
        await transporter.sendMail({
            from: '"DeepSearchAI" <aideepsearch@gmail.com>',
            to: toEmail,
            subject: subject,
            html: emailContent
        })
    } catch (error) {
        console.log("erro ao enviar email", error);
        
    }
}

export default sendEmail;