import { NextResponse } from "next/server";
import { firestore } from "../../../../firebase/firebase";
import { collection,getDocs } from "firebase/firestore";
import { sendEmailsToSubscribers } from "@/lib/mail";

export async function POST() {
  try {
    // Fetch all subscribers from Firestore
    const subscribersSnapshot = await getDocs(collection(firestore, "subscribers"));

    if (subscribersSnapshot.empty) {
      return NextResponse.json({ success: false, message: "No subscribers found." });
    }

    const subscribers = subscribersSnapshot.docs
      .map((doc) => doc.data().email)
      .filter((email) => email);

    if (subscribers.length === 0) {
      return NextResponse.json({ success: false, message: "No valid emails found." });
    }

    // Send emails using your mailing function
    const response = await sendEmailsToSubscribers(subscribers);

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
