import { url } from "inspector";
import React from "react";
import AboutCard from "./AboutCard";

export default function About() {
  const about = [
    {
      id: 1,
      title: "Our Mission",
      des: "At Zemo, we believe in the power of consistency and community to transform lives. In a world dominated by technology, it's easy to fall into the trap of constant distractions, leaving our goals and aspirations behind. That's why we've created a platform that empowers individuals to break free from tech addiction, regain control of their lives, and achieve their dreams.",
    },
    {
      id: 2,
      title: "What We Do",
      des: "Zemo is a streak tracking app designed to help you create positive habits and stay connected with a supportive community of like-minded individuals. With our platform, you can set up and track your streaks – daily or weekly routines or goals you want to commit to. It could be anything from reading a chapter a day to exercising regularly, practicing mindfulness, or even limiting screen time.",
    },
    {
      id: 3,
      title: "The Power of Streaks",
      des: "Streaks are a proven method to build habits, increase productivity, and maintain focus. When you commit to a streak, you're not just setting a goal; you're establishing a system of consistency that leads to lasting change. Each day you successfully complete your streak, you'll feel a sense of accomplishment and motivation to continue.",
    },
    {
      id: 4,
      title: "Community Support",
      des: "But it's not just about streaks. Zemo is also about building a community of individuals who understand your journey and are there to support you every step of the way. Our platform connects you with like-minded people who share your goals and challenges. You can follow their progress, share your experiences, and encourage each other to stay on track.",
    },
    {
      id: 5,
      title: "Join Us on this Journey",
      des: "Whether you're looking to kick a bad habit, start a new one, or simply want to be a part of a community that values personal growth, Zemo welcomes you with open arms. Join us in the quest for self-improvement, consistency, and a life less dominated by screens.",
    },
  ];
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-4 pb-16 bg-[url('/assets/space.jpg')] bg-center bg-cover "
    >
      <h1 className="mt-24 text-3xl text-center text-white "> About Us</h1>
      <div className="max-w-4xl space-y-8 rounded-md mt-6  mx-auto p-8  ">
        {about.map(about => (
          <AboutCard key={about.title} about={about} />
        ))}
      </div>
    </section>
  );
}
