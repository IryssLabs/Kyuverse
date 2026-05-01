import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen py-24 bg-[#0a0a0c] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contactform.png"
          alt="Contact background"
          fill
          priority
          quality={95}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        {/* Gradient overlay biar form tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-[#0a0a0c]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ContactForm />
      </div>

    </section>
  );
}