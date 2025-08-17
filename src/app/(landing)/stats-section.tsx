import ContentWrapper from "../_components/general/content-wrapper";
import { Card, CardContent } from "../_components/ui/card";

export default function StatsSection() {
  return (
    <section className="flex justify-center bg-gray-100/50">
   <ContentWrapper className="py-16">
   <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Over <span className="text-red-600">4 Million</span> Members
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The world&apos;s most popular guitar learning platform with proven results
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">4M+</div>
              <div className="text-gray-600">Active Members</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">11,000+</div>
              <div className="text-gray-600">Video Lessons</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">700+</div>
              <div className="text-gray-600">Popular Songs</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </CardContent>
          </Card>
        </div>
      </div>
      </ContentWrapper>
    </section>
  );
}