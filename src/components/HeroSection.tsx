export default function HeroSection() {
  return (
    <section className="pt-16 pb-8 text-center">
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          AI Model Active — Free & Unlimited
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Transform Your Ideas
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Into Stunning Images
          </span>
        </h2>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Describe any image you can imagine and watch AI bring it to life in seconds.
          No sign-up required. Completely free.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: '⚡', text: 'Fast Generation' },
            { icon: '🎨', text: 'Multiple Styles' },
            { icon: '📐', text: 'Custom Sizes' },
            { icon: '🆓', text: '100% Free' },
            { icon: '🔒', text: 'No Sign-up' },
          ].map((feature) => (
            <div 
              key={feature.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
            >
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
