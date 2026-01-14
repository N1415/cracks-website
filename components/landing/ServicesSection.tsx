'use client';

const phases = [
  {
    number: '01',
    title: 'Smart Start — Capital Efficiency from Day Zero',
    description:
      'With over 50 openings across 3 continents, we help you avoid costly mistakes and make high-impact decisions early. From location choice to layout and budgeting, we protect your investment before the first guest walks in.',
  },
  {
    number: '02',
    title: 'Revenue Activation — Maximising the Top Line',
    description:
      'We engineer multiple revenue streams, from brand partnerships to service design. Our strategies are built into your operations, marketing, and menu — ensuring momentum from opening day.',
  },
  {
    number: '03',
    title: 'Sustained Profitability — Long-Term Performance',
    description:
      'We stay involved beyond the launch. From systems to leadership tools, we ensure your business is resilient, scalable, and tuned for consistent financial performance.',
  },
];

const services = [
  {
    id: 1,
    title: 'Concept Development and Launch',
    description:
      'Our concept development packages—Blueprint, Framework, and Launch—are designed to meet you where you are. Whether you need help validating an idea, developing a full concept, or going all the way for opening, each package offers a tailored set of services to match your needs. From strategy and branding to operational systems and launch execution, we provide the structure, expertise, and support to bring your vision to life.',
  },
  {
    id: 2,
    title: 'Management Services',
    description:
      'Our Management package provides continued operational support after your successful opening. We work alongside your team to optimize performance, implement systems, and drive sustainable growth through data-driven strategies and operational excellence.',
  },
  {
    id: 3,
    title: 'Partner Services',
    description:
      'Cracks Hospitality Studio works with a network of vetted specialist partners who can provide complementary services not included in our core packages. We can coordinate and oversee these partnerships to ensure seamless integration with our consulting work.',
  },
  {
    id: 4,
    title: 'Additional Services',
    description:
      'To help you get your restaurant up and running. Feasibility study, concept review, menu development, and operational audits.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 bg-background"
      role="region"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="font-serif text-3xl md:text-4xl text-foreground mb-4"
          >
            SERVICES
          </h2>
          <div className="w-16 h-px bg-foreground mx-auto my-6" aria-hidden="true" />
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
            STEP BY STEP
          </h3>

          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="bg-card border border-border p-8 transition-all duration-300 hover:shadow-lg group rounded-lg"
              >
                <div className="font-serif text-4xl text-foreground p-8 mb-6 group-hover:text-muted-foreground transition-colors">
                  {phase.number}
                </div>
                <div className="w-12 h-px bg-foreground/30 mb-6" aria-hidden="true" />
                <h4 className="font-serif text-xl mb-4 text-foreground">
                  {phase.title}
                </h4>
                <p className="font-sans font-light text-foreground">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 mt-16">
            SCOPE OF SERVICES
          </h3>
          <div className="w-16 h-px bg-foreground mx-auto my-6" aria-hidden="true" />
          <p className="font-sans font-light text-lg text-foreground text-center mb-6">
            Comprehensive restaurant consulting services tailored for high-end
            establishments, from concept development to operational excellence.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-card border border-border p-8 transition-all duration-300 hover:shadow-lg hover:border-secondary/30 group rounded-lg text-left"
              >
                <h4 className="font-serif text-xl text-foreground mb-4 group-hover:text-muted-foreground transition-colors">
                  {service.title}
                </h4>
                <p className="font-sans font-light text-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
