import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/accordion";

const faqs = [
  {
    question: "How quickly can I learn to play guitar?",
    answer:
      "With consistent practice, most beginners can play simple songs within 2-4 weeks. Our structured lessons help you progress faster by focusing on essential skills first. Everyone learns at their own pace, but our step-by-step approach ensures steady progress.",
  },
  {
    question: "Do I need any experience to start?",
    answer:
      "Absolutely not! Our lessons are designed for complete beginners. We start with the very basics like holding the guitar, finger positioning, and your first chords. No prior musical experience is required.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "All you need is a guitar (acoustic or electric) and access to our online lessons. We recommend starting with an acoustic guitar as it's more portable and doesn't require additional equipment like amplifiers.",
  },
  {
    question: "How much should I practice?",
    answer:
      "We recommend practicing 15-30 minutes daily for best results. Consistent short sessions are more effective than long, infrequent practice sessions. Our lessons are designed to fit into your busy schedule.",
  },
  {
    question: "Can I learn different music styles?",
    answer:
      "Yes! We offer lessons in rock, blues, country, folk, classical, and many other styles. You can explore different genres as you progress and find what you enjoy most.",
  },
  {
    question: "What if I get stuck on a lesson?",
    answer:
      "Our instructors provide personalized feedback and support. You can also repeat lessons as many times as needed, and our community forum is full of helpful fellow students and instructors.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes! Our mobile app lets you take lessons anywhere. Practice on your commute, during lunch breaks, or wherever it's convenient. All your progress syncs across devices.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings, and you'll retain access until the end of your billing period.",
  },
];

export default function FaqSection() {
  return (
    <section className="flex justify-center py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Got questions? We&apos;ve got answers. Here are the most common
            questions about learning guitar with us.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm"
            >
              <AccordionTrigger className="py-4 text-left hover:no-underline">
                <h3 className="pr-4 text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Still have questions? We&apos;re here to help!
          </p>
          <button className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
