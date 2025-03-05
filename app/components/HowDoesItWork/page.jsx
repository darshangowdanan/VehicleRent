import { useEffect, useState, useRef } from "react";
import { Car, CalendarCheck, RotateCcw, CheckCircle2, ArrowRight } from "lucide-react";

const HowDoesItWork = () => {
  const stepRefs = useRef([]); // ✅ Ensure it's an array
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(parseInt(entry.target.dataset.index));
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // ✅ Triggers when element is in middle of the screen
        threshold: 0.5,
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Desktop Layout
  if (!isMobile) {
    return (
      <div className="w-full  flex flex-col justify-center items-center p-6">
      <div className="w-[95vw] mx-auto rounded-xl bg-white p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">🚗 How It Works</h2>

        <div className="flex flex-wrap justify-center items-center gap-6 px-4">
          {[
            { title: "Select", icon: <Car size={40} />, desc: "Choose your desired car from our fleet." },
            { title: "Book", icon: <CalendarCheck size={40} />, desc: "Reserve your car online instantly." },
            { title: "Drive", icon: <CheckCircle2 size={40} />, desc: "Pick up your car and hit the road." },
            { title: "Return", icon: <RotateCcw size={40} />, desc: "Bring it back when your rental ends." },
          ].map((item, index, arr) => (
            <div key={index} className="flex items-center gap-20">
              {/* Step */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-110">
                  {item.icon}
                </div>
                <p className="text-xl font-semibold text-gray-800">{item.title}</p>
                {/* <p className="text-sm text-gray-600 max-w-xs">{item.desc}</p> */}
              </div>

              {/* Arrow (except for the last item) */}
              {index !== arr.length - 1 && (
                <div className="hidden md:flex items-center mx-4 pb-6">
                  <ArrowRight size={40} className="text-orange-500 animate-bounce-right" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  // ✅ Mobile Layout with Scroll Animation
  return (
    <div className="w-[95vw] bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-2xl mx-auto max-w-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">🚗 How It Works</h2>
      <p className="text-lg text-gray-600 text-center mb-8">Follow these simple steps to get your vehicle</p>

      <div className="space-y-6">
        {[
          { text: "📍", title: "Select", desc: "Choose your desired car from our fleet." },
          { text: "📦", title: "Book", desc: "Reserve your car online instantly." },
          { text: "🚗", title: "Drive", desc: "Pick up your car and hit the road." },
          { text: "🔙", title: "Return", desc: "Bring it back when your rental ends." },
        ].map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRefs.current[index] = el)}
            data-index={index}
            className={`flex items-center bg-white p-4 rounded-xl shadow-lg transition-all duration-500 ease-in-out transform
              ${activeIndex === index ? "scale-110 bg-blue-200 shadow-2xl opacity-100" : "opacity-50"}
            `}
          >
            <div className="w-14 h-14 bg-blue-500 flex items-center justify-center rounded-full shadow-lg transition-all">
              <img
                alt={`${step.title.toLowerCase()}-icon`}
                src={`https://openui.fly.dev/openui/48x48.svg?text=${step.text}`}
                className="w-9 h-9"
              />
            </div>
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowDoesItWork;
