import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
	try {
		// console.log("REQ.BODY", req.body);
		await sendgrid.send({
			to: 'jory@downbeatacademy.com', // Your email where you'll receive emails
			from: `jory@downbeatacademy.com`, // your website email address here
			replyTo: req.body.email,
			subject: `[Downbeat Academy Contact] Message from ${req.body.fullName}`,
			html: `
				<div>
					<p>You've recieved a message from the Downbeat Academy contact form.</p>
					<p><strong>Name:</strong> ${req.body.fullName}</p>
					<p><strong>Email:</strong> ${req.body.email}</p>
					<p><strong>Message:</strong> ${req.body.message}</p>
				</div>
			`,
		});
	} catch (error) {
		return res
			.status(error.statusCode || 500)
			.json({ error: error.message });
	}

	return res.status(200).json({ error: '' });
}

export default sendEmail;
