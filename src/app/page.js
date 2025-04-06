"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Subribers from "@/components/Subsribebtn";

export default function HuggingFacePages() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendWeeklyEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/sendEmail", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        setMessage("Emails sent successfully!");
      } else {
        setMessage("Failed to send emails. Try again.");
      }
    } catch (error) {
      setMessage("Error sending emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-100 w-50 h-50 text-black m-25">
      <Link href="/Arxivpages">
        <Button className="m-4 cursor-pointer">Arxiv Pages</Button>
      </Link>
      <Link href="/huggingfacepages">
        <Button className="m-4 cursor-pointer">Hugging Face Pages</Button>
      </Link>
      <Link href="/githubpages">
        <Button className="m-4 cursor-pointer">GitHub Pages</Button>
      </Link>

      <Subribers />

      {/* Send Weekly Email Button */}
      <Button onClick={sendWeeklyEmail} className="m-4 cursor-pointer" disabled={loading}>
        {loading ? "Sending..." : "Send Weekly Email"}
      </Button>

      {/* Show Status Message */}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
