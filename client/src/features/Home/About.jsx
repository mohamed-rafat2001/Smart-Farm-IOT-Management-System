import HeroSection from '../../ui/HeroSection';
import aboutImage from '../../assets/about-image.jpg';

function About() {
  return (
    <>
      <HeroSection 
        image={aboutImage} 
        bigText='About AgriTech'  
        smallText="Our mission is to revolutionize agriculture through technology, empowering farmers to achieve sustainable and efficient farming practices." 
      />
      
      {/* About Content Section */}
      <section className="mt-10 sm:mt-12 lg:mt-16">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Mission Statement */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Our Mission
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed sm:text-base md:text-lg lg:text-xl">
              To revolutionize agriculture through cutting-edge technology, making farming more 
              efficient, sustainable, and profitable for farmers worldwide.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              Our Vision
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed sm:text-base md:text-lg">
              A world where every farmer has access to intelligent farming solutions that 
              maximize yield while preserving our environment for future generations.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
              Our Values
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-[#283039] p-4 text-center transition-all duration-300 hover:bg-[#374151] hover:shadow-lg">
                <h4 className="mb-2 text-lg font-semibold text-white">Innovation</h4>
                <p className="text-sm text-stone-400">Pushing boundaries in agricultural technology</p>
              </div>
              <div className="rounded-xl bg-[#283039] p-4 text-center transition-all duration-300 hover:bg-[#374151] hover:shadow-lg">
                <h4 className="mb-2 text-lg font-semibold text-white">Sustainability</h4>
                <p className="text-sm text-stone-400">Protecting our planet while feeding the world</p>
              </div>
              <div className="rounded-xl bg-[#283039] p-4 text-center transition-all duration-300 hover:bg-[#374151] hover:shadow-lg sm:col-span-2 lg:col-span-1">
                <h4 className="mb-2 text-lg font-semibold text-white">Community</h4>
                <p className="text-sm text-stone-400">Supporting farmers in their journey to success</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
