import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-foreground p-4 text-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">Allegro</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The most comprehensive online guitar learning platform with over 4 million satisfied students worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Learning</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beginner Lessons
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Intermediate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Advanced
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Song Library
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Interactive Lessons
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-gray-400 text-sm">© 2024 Allegro. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" className="">
              Facebook
            </Button>
            <Button variant="ghost" size="sm" className="">
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="">
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
