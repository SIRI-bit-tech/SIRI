import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcryptjs.hash("Emuesiri@12", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@siridev.me" },
    update: {},
    create: {
      email: "admin@siridev.me",
      password: hashedPassword,
      name: "Emuesiri Onovwiona",
    },
  });

  console.log("Admin user created:", adminUser.email);

  // Create initial site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: "siritech" },
    update: {},
    create: {
      id: "siritech",
      siteTitle: "SIRITECH - Full-Stack Engineer",
      siteDescription: "Full-stack engineer building production-ready systems. 3+ years shipping fast, scalable software for real users.",
      metaDescription: "SIRITECH - Full-Stack Software Engineer | Building Fast, Scalable Systems",
      analyticsGaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      analyticsClarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
    },
  });

  console.log("Site settings created");

  // Create projects
  const projects = [
    {
      title: "BidForge",
      slug: "bidforge",
      description: "A SaaS platform connecting contractors with subcontractors. Full bidding lifecycle, RFP management, instant notifications.",
      body: "BidForge is a SaaS platform built for the construction industry that connects general contractors with qualified subcontractors. It handles the full bidding lifecycle — from RFP creation and document management to real-time bid comparison and one-click contract awards. Includes subcontractor network with search and filtering by trade, location, and certification.",
      tags: JSON.stringify([
        "schadcn",
        "Next.js",
        "React",
        "Prisma",
        "TypeScript",
        "Tailwind CSS",
        "Bun",
        "Cloudinary",
        "Ably",
        "GraphQL",
        "GraphQL Yoga",
        "GraphQL Subscriptions",
        "urql",
        "Better Auth",
        "Zustand",
        "Redis",
      ]),
      images: JSON.stringify([]),
      liveUrl: "https://bidforge.io",
      githubUrl: null,
      featured: true,
      order: 1,
    },
    {
      title: "CodeLens",
      slug: "codelens",
      description: "Desktop application that explains code in six distinct ways. Built with Python for developers who want to understand, not just run.",
      body: "CodeLens is a desktop application built with Python that explains code in six distinct ways — designed for developers who want to understand, not just run, the code in front of them. Provides multiple perspectives on code behavior and logic.",
      tags: JSON.stringify(["Python", "Desktop", "Developer Tools", "Education"]),
      images: JSON.stringify([]),
      liveUrl: null,
      githubUrl: null,
      featured: true,
      order: 2,
    },
    {
      title: "Online Banking Platform",
      slug: "banking-platform",
      description: "Full-stack banking system with secure authentication, transactions, and real-time updates. Production-ready security.",
      body: "A complete online banking platform with robust security, real-time transaction processing, account management, and regulatory compliance. Built with full-stack architecture prioritizing security and performance under load.",
      tags: JSON.stringify([
        "Next.js",
        "Django",
        "schadcn",
        "WebSocket",
        "BetterAuth",
        "Zustand",
        "React",
        "PostgreSQL",
        "Security",
        "Finance",
      ]),
      images: JSON.stringify([]),
      liveUrl: null,
      githubUrl: null,
      featured: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    const createdProject = await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log("Project created:", createdProject.title);
  }

  // Create skills
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", proficiency: "Expert", order: 1 },
    { name: "Next.js", category: "Frontend", proficiency: "Expert", order: 2 },
    { name: "TypeScript", category: "Frontend", proficiency: "Expert", order: 3 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: "Expert", order: 4 },
    { name: "Framer Motion", category: "Frontend", proficiency: "Advanced", order: 5 },
    { name: "CSS/SCSS", category: "Frontend", proficiency: "Expert", order: 6 },
    
    // Backend
    { name: "Node.js", category: "Backend", proficiency: "Expert", order: 7 },
    { name: "Python", category: "Backend", proficiency: "Advanced", order: 8 },
    { name: "Django", category: "Backend", proficiency: "Advanced", order: 9 },
    { name: "PostgreSQL", category: "Backend", proficiency: "Expert", order: 10 },
    { name: "Prisma", category: "Backend", proficiency: "Expert", order: 11 },
    { name: "REST APIs", category: "Backend", proficiency: "Expert", order: 12 },
    { name: "GraphQL", category: "Backend", proficiency: "Advanced", order: 13 },
    
    // Tools & DevOps
    { name: "Docker", category: "Tools", proficiency: "Advanced", order: 14 },
    { name: "Git", category: "Tools", proficiency: "Expert", order: 15 },
    { name: "Vercel", category: "Tools", proficiency: "Expert", order: 16 },
    
    // Soft Skills
    { name: "System Design", category: "Soft Skills", proficiency: "Advanced", order: 18 },
    { name: "Problem Solving", category: "Soft Skills", proficiency: "Expert", order: 19 },
    { name: "Code Review", category: "Soft Skills", proficiency: "Advanced", order: 20 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: { category: skill.category, proficiency: skill.proficiency, order: skill.order },
      create: skill,
    });
  }
  console.log("Skills created:", skills.length);

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
