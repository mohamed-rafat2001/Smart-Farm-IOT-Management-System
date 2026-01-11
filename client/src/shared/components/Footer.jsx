function Footer() {
  return (
    <footer className="@container relative mt-40 overflow-hidden border-t border-stone-800/50 bg-[#1b2127]/30 backdrop-blur-md">
      {/* Decorative Gradient */}
      <div className="absolute -bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-black tracking-tighter text-white">
              Smart Farm<span className="text-blue-500">.</span>
            </h2>
            <p className="mt-2 text-sm font-medium text-stone-500">
              © {new Date().getFullYear()} All rights reserved. Built with
              precision by{' '}
              <span className="cursor-pointer font-bold text-stone-300 transition-colors hover:text-blue-400">
                Mohamed Rafat
              </span>
              .
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              {
                href: 'https://www.facebook.com/mohamed.rafat.622731/',
                label: 'Facebook',
                icon: (
                  <path
                    fill="currentColor"
                    d="M24 4.5c-10.77 0-19.5 8.73-19.5 19.5 0 9.74 7.13 17.8 16.45 19.26v-13.62h-4.95v-5.64h4.95v-4.3c0-4.89 2.89-7.59 7.36-7.59 2.14 0 4.38.38 4.38.38v4.81h-2.47c-2.42 0-3.17 1.5-3.17 3.04v3.66h5.42l-.87 5.64h-4.55v13.62c9.32-1.46 16.45-9.52 16.45-19.26 0-10.77-8.73-19.5-19.5-19.5z"
                  />
                ),
              },
              {
                href: 'https://www.linkedin.com/in/mohamed-rafaat-19046b229/',
                label: 'LinkedIn',
                icon: (
                  <path
                    fill="currentColor"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                ),
              },
              {
                href: 'https://www.instagram.com/mohamed_rafat2001/',
                label: 'Instagram',
                icon: (
                  <path
                    fill="currentColor"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.773 6.973 6.973 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.351-.2 6.772-2.612 6.973-6.973.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.947C23.727 2.69 21.31.272 16.953.072 15.667.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44c.794 0 1.44.645 1.44 1.44z"
                  />
                ),
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-stone-800 bg-[#283039]/50 text-stone-400 transition-all duration-500 hover:border-blue-500/50 hover:bg-blue-600 hover:text-white hover:shadow-2xl hover:shadow-blue-500/20 active:scale-90"
              >
                <svg
                  className="relative z-10 h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {social.icon}
                </svg>
                <div className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-tr from-blue-600 to-blue-400 transition-transform duration-500 group-hover:translate-y-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex justify-center gap-4 border-t border-stone-800/50 pt-8">
          <div className="h-1 w-12 rounded-full bg-blue-600/20" />
          <div className="h-1 w-1 rounded-full bg-blue-600/20" />
          <div className="h-1 w-1 rounded-full bg-blue-600/20" />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
