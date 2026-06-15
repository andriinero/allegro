export const navLinks = [
  { href: "/blog", name: "Blog" },
  { href: "/about-me", name: "About Me" },
  { href: "/contact", name: "Contact" },
] as const;

import {
  BookOpen,
  Bot,
  CalendarPlusIcon,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
  UserPen,
} from "lucide-react";

export const tabs = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  general: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Lessons",
      url: "/dashboard/lessons",
      icon: BookOpen,
    },
    {
      name: "Book Lesson",
      url: "/dashboard/book-lesson",
      icon: CalendarPlusIcon,
    },
    {
      name: "Profile",
      url: "/dashboard/profile",
      icon: UserPen,
    },
    // {
    //   name: "Chat",
    //   url: "/dashboard/chat",
    //   icon: MessageSquare,
    // },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
} as const;
