"use client";

import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserPlus, LogIn, BellRing } from "lucide-react";

function Subscribers() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setIsSubscribed(false); 
        setLoading(false);
        return;
      }

      const subscribersRef = collection(firestore, "subscribers");
      const q = query(subscribersRef, where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);

      setIsSubscribed(!querySnapshot.empty); 
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      alert("You must be logged in to subscribe.");
      return;
    }

    if (isSubscribed) {
      alert("You are already subscribed.");
      return;
    }

    try {
      const subscribersRef = collection(firestore, "subscribers");
      await addDoc(subscribersRef, { email: user.email, timestamp: new Date() });

      setIsSubscribed(true); // Fix: Manually update state
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="md:flex flex-col items-center justify-center space-y-4">
      {!user ? (
        <>
          <Link href="/signup">
            <div className="relative mb-3 group p-2 rounded-full bg-purple-500 text-white cursor-pointer">
              <UserPlus size={24} />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition">
                Register
              </span>
            </div>
          </Link>

          <Link href="/Login">
            <div className="relative mb-3 group p-2 rounded-full bg-purple-500 text-white cursor-pointer">
              <LogIn size={24} />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition">
                Login
              </span>
            </div>
          </Link>
        </>
      ) : (
       
          <Button
            onClick={handleSubscribe}
            className="relative group p-2 rounded-full bg-red-500 text-white"
          >
            <BellRing size={24} />
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition">
              Subscribe
            </span>
          </Button>
        )
      }
    </div>
  );
}

export default Subscribers;
