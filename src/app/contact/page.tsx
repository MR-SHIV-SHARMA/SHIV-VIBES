"use client";

import React, { FormEvent, useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

function MusicSchoolContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null); // To display success or error message
  const [isDarkMode, setIsDarkMode] = useState(true); // To toggle between light and dark themes

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Submitted successfully:", data);
        setStatus("Message sent successfully!");

        // Clear the form fields
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }  pt-16 sm:pt-20 px-4 relative`}
      >
        <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="max-w-2xl mx-auto  relative z-10">
          <h1
            className={`text-lg md:text-7xl text-center font-sans font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Contact Us
          </h1>
          <p
            className={`max-w-lg mx-auto my-2 text-sm text-center ${
              isDarkMode ? "text-neutral-500" : "text-neutral-800"
            }`}
          >
            We&apos;re here to help with any questions about our courses,
            programs, or events. Reach out and let us know how we can assist you
            in your musical journey.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`rounded-lg border focus:ring-2 w-full p-4 placeholder:text-neutral-700 ${
                isDarkMode
                  ? "border-neutral-800 focus:ring-teal-500 bg-neutral-950"
                  : "border-neutral-300 focus:ring-teal-500 bg-white"
              }`}
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              className={`rounded-lg border focus:ring-2 w-full p-4 placeholder:text-neutral-700 ${
                isDarkMode
                  ? "border-neutral-800 focus:ring-teal-500 bg-neutral-950"
                  : "border-neutral-300 focus:ring-teal-500 bg-white"
              }`}
              rows={5}
              required
            ></textarea>
            {status && (
              <p
                className={`mt-4 text-center ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {status}
              </p>
            )}
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mt-4 text-sm text-center underline"
          >
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicSchoolContactUs;
