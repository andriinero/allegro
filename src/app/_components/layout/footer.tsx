import Link from "next/link";
import ContentWrapper from "../general/content-wrapper";
import Logo from "../general/logo";

export default function Footer() {
  return (
    <footer className="bg-foreground text-secondary flex justify-center p-8">
      <ContentWrapper className="flex flex-col gap-16">
        <div className="space-y-6">
          <h4 className="text-background text-lg font-extrabold uppercase">
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

        <div className="flex w-full items-center justify-between">
          <Logo className="text-secondary" />

          <p className="text-sm">
            © Copyright 2024-2025 Allegro Inc. All Right Reserved.
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
}
