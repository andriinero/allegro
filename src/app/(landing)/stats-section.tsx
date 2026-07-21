import ContentWrapper from "../_components/general/content-wrapper";
import { Card, CardContent } from "../_components/ui/card";

export default function StatsSection() {
  return (
    <section className="flex justify-center bg-gray-100/50">
      <ContentWrapper className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Join Over <span className="text-red-600">4 Million</span> Members
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The world&apos;s most popular guitar learning platform with proven
              results
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-2 text-3xl font-bold text-red-600">4M+</div>
                <div className="text-gray-600">Active Members</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-2 text-3xl font-bold text-red-600">
                  11,000+
                </div>
                <div className="text-gray-600">Video Lessons</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-2 text-3xl font-bold text-red-600">700+</div>
                <div className="text-gray-600">Popular Songs</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-2 text-3xl font-bold text-red-600">25+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
