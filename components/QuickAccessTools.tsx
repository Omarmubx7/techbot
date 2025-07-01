"use client";
import { Heart, Calendar, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickAccessTools() {
  // Function to trigger the chat widget open event
  const openAtharBot = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-atharbot-widget'));
    }
  };

  return (
    <div className="mx-auto max-w-4xl mt-12">
      <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Quick Access Tools</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
          <Heart className="h-6 w-6" />
          <span className="text-sm">Donate</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
          <Calendar className="h-6 w-6" />
          <span className="text-sm">Events</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
          <Users className="h-6 w-6" />
          <span className="text-sm">Volunteer</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
          <Mail className="h-6 w-6" />
          <span className="text-sm">Contact</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 bg-transparent"
          onClick={openAtharBot}
          aria-label="Open AtharBot"
        >
          <span style={{ fontSize: 24 }}>💬</span>
          <span className="text-sm">AtharBot</span>
        </Button>
      </div>
    </div>
  );
} 