import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailsToSubscribers(subscribers) {
  if (!subscribers.length) {
    throw new Error("No subscribers found.");
  }
try{
  await Promise.all(
    subscribers.map(email =>
      resend.emails.send({
        from: "navnit.23bce11827@vitbhopal.ac.in",
        to: "nithin.23mim10111@vitbhopal.ac.in",
        subject: "Latest AI News",
        html: `<p>Check out our latest AI updates!</p>`,
      })
    )
  );

  return { success: true, message: "Emails sent successfully!" };
}catch(e){
    console.log('error sending mail',e);
}
}
