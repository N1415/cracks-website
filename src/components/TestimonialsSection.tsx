import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Cracks Hospitality was instrumental in transforming our restaurant concept into reality. Their attention to detail and industry knowledge made all the difference in our successful launch.",
    author: "Somchai Laohapongphan",
    position: "Owner, Kenshin Omakase",
  },
  {
    id: 2,
    content: "Working with Cracks gave us the competitive edge we needed. Their operational strategies helped us increase revenue by 40% while maintaining our culinary standards and vision.",
    author: "Natcha Wongprasert",
    position: "Executive Chef, Blanc Bistro",
  },
  {
    id: 3,
    content: "The team at Cracks doesn't just understand restaurants—they understand Bangkok's unique dining culture. Their insights were invaluable for positioning our brand in this competitive market.",
    author: "Alexander Thompson",
    position: "Founder, Ember Steakhouse",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl text-black mb-4">Client Testimonials</h2>
          <div className="w-16 h-px bg-black mx-auto my-6"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative">
            <Quote size={40} className="text-black/10 absolute -top-6 -left-6" />
            
            <div className="overflow-hidden">
              <div 
                className="transition-all duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <p className="font-lato font-thin text-lg md:text-xl text-gray-800 mb-8 leading-relaxed">
                        {testimonial.content}
                      </p>
                      <div>
                        <div className="font-playfair text-xl text-black mb-1">{testimonial.author}</div>
                        <div className="font-lato font-thin text-sm text-gray-600">{testimonial.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-4">
            <button 
              onClick={goToPrev}
              className="p-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index ? 'bg-black w-4' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={goToNext}
              className="p-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
              disabled={isAnimating}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;