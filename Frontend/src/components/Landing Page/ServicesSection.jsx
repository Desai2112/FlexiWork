// import React from 'react';

const ServicesSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover the Expertise You Need</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From design to development, marketing to accounting, our freelancers are ready to tackle any task.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
        <div className="grid gap-1">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Design</div>
          <h3 className="text-xl font-bold">Graphic Design</h3>
          <p className="text-muted-foreground">Bring your ideas to life with our talented graphic designers.</p>
        </div>
        <div className="grid gap-1">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            Development
          </div>
          <h3 className="text-xl font-bold">Web Development</h3>
          <p className="text-muted-foreground">
            Build stunning websites and web applications with our expert developers.
          </p>
        </div>
        <div className="grid gap-1">
          <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">Marketing</div>
          <h3 className="text-xl font-bold">Digital Marketing</h3>
          <p className="text-muted-foreground">Reach your target audience with our experienced digital marketers.</p>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
