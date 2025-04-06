import { render } from "@react-email/components";
import index from "../../../../email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request, res){
    const {email,userFirstname} = await request.json();

    const {data,errror} = await resend.emails.send({
        from:"Acme <onboarding@resend.dev>",
        to:[email],
        subject:"Thanklk u ",
        html:<p>hi</p>
        // navnit.23bce11827@vitbhopal.ac.in
    });

    if(error){
        return Response.json(error);
    }
return Response.json({message:"email sent successfully"});
}