import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../_components/ui/accordion";

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
]

export default function FaqSection() {
  return (
    <section className="flex justify-center py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Here are the most common questions about learning guitar with us.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We&apos;re here to help!</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}