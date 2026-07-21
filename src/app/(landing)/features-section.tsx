import ContentWrapper from "../_components/general/content-wrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";

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
];

export default function FeaturesSection() {
  return (
    <section className="flex flex-col items-center bg-gray-100/50">
      <ContentWrapper className="max-w-screen-5xl flex-col items-center gap-4 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-foreground lg:text-4xl">
              Why Choose Allegro?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join thousands of students who have transformed their musical
              abilities with our comprehensive learning platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <CardHeader className="pb-4 text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
