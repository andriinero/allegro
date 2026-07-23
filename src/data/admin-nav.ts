import {
  BookOpen,
  Bot,
  CalendarDays,
  Clock,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  SquarePlusIcon,
  SquareTerminal,
} from "lucide-react";

export const tabs = {
  navSecondary: [
    {
      title: "Support",
      url: "/admin/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/admin/feedback",
      icon: Send,
    },
  ],
  general: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Schedule",
      url: "/admin/schedule",
      icon: CalendarDays,
    },
    {
      name: "Bookings",
      url: "/admin/bookings",
      icon: SquarePlusIcon,
    },
    {
      name: "Lessons",
      url: "/admin/lessons",
      icon: BookOpen,
    },
    {
      name: "Time Slots",
      url: "/admin/time-slots",
      icon: Clock,
    },
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
