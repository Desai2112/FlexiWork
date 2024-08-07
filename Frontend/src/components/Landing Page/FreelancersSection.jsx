// import React from 'react';

const FreelancersSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Top Freelancers</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Talented Freelancers</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our top-rated freelancers are ready to help you achieve your goals.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
            </span>
            <div>
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Graphic Designer</p>
            </div>
          </div>
          <div className="grid gap-1">
            <p className="text-muted-foreground">
              John is a highly skilled graphic designer with over 5 years of experience. He specializes in
              creating visually stunning designs for a variety of projects.
            </p>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-yellow-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">(123 reviews)</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Jane Smith</h3>
              <p className="text-sm text-muted-foreground">Web Developer</p>
            </div>
          </div>
          <div className="grid gap-1">
            <p className="text-muted-foreground">
              Jane is a passionate web developer who loves creating user-friendly and responsive websites.
              She has a knack for problem-solving and delivering high-quality code.
            </p>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-yellow-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-muted-foreground">(98 reviews)</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Alice Johnson</h3>
              <p className="text-sm text-muted-foreground">Digital Marketer</p>
            </div>
          </div>
          <div className="grid gap-1">
            <p className="text-muted-foreground">
              Alice specializes in digital marketing strategies and helps businesses grow their online presence
              through effective campaigns and analytics.
            </p>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-yellow-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-sm font-medium">4.7</span>
              <span className="text-sm text-muted-foreground">(89 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FreelancersSection;
