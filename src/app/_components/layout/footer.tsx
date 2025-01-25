import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import ContentWrapper from "../general/content-wrapper";
import Logo from "../general/logo";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-foreground p-4 text-secondary">
      <ContentWrapper className="flex flex-col gap-16">
        <div className="flex gap-16">
          <div className="space-y-6">
            <h4 className="text-lg font-extrabold uppercase text-background">
              Support
            </h4>

            <ul className="space-y-4">
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>

              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>

              <li>
                <Link href="/accessibility-policy">Accessibility Policy</Link>
              </li>

              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-extrabold uppercase text-background">
              Social Media
            </h4>

            <ul className="space-y-4">
              <li>
                <Link href="/instagram" className="flex items-center gap-2">
                  <Instagram className="size-4" /> Instagram
                </Link>
              </li>

              <li>
                <Link href="/twitter" className="flex items-center gap-2">
                  <Twitter className="size-4" /> Twitter
                </Link>
              </li>

              <li>
                <Link href="/facebook" className="flex items-center gap-2">
                  <Facebook className="size-4" /> Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <Logo className="text-secondary" />

          <p className="text-sm">
            © Copyright 2024-2025 Allegro Inc. All Rights Reserved.
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
}
