// src/pages/ContactPage.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <form className="space-y-4">
        <Input type="text" placeholder="Your Name" />
        <Input type="email" placeholder="Your Email" />
        <Textarea placeholder="Your Message" rows={5} />
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
