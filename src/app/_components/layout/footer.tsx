import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-foreground p-4 text-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">Allegro</span>
            </div>
            <p className="leading-relaxed text-gray-400">
              The most comprehensive online guitar learning platform with over 4
              million satisfied students worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Learning</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Beginner Lessons
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Intermediate
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Advanced
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Song Library
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Interactive Lessons
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-8 text-gray-400 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 Allegro. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
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
