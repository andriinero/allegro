import ContentWrapper from "../_components/general/content-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";

const features = [
  {
    title: "Guided Learning Path",
    description:
      "Follow our step-by-step curriculum designed by professional instructors. Each lesson builds on the previous one, ensuring steady progress from beginner to advanced.",
    icon: "🎯",
  },
  {
    title: "Play Hundreds of Songs",
    description:
      "Learn to play your favorite songs with our extensive library. From classic rock to modern hits, we have something for every musical taste and skill level.",
    icon: "🎵",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from professional guitarists and certified instructors who provide personalized feedback and guidance throughout your musical journey.",
    icon: "👨‍🏫",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your improvement with our advanced progress tracking system. Set goals, track practice time, and celebrate your achievements.",
    icon: "📈",
  },
]

export default function FeaturesSection() {
  return (
    <section className="flex flex-col items-center">
      <ContentWrapper className="flex-col items-center gap-4 max-w-screen-5xl py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4 font-black">
            Why Choose Allegro?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have transformed their musical abilities with our comprehensive learning
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="font-bold text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </ContentWrapper>
    </section>
  );
}