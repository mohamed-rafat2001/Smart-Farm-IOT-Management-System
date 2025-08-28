function Footer() {
  return (
    <footer className="@container">
      {/* subscription section */}
      <section className="mx-auto mt-40 mb-10 w-[80%] sm:w-[90%] md:w-[85%] lg:w-[80%]">
        {/* social media */}
        <div className="mt-10 flex flex-col items-center justify-between gap-y-5 border-t-1 border-stone-700 pt-10 text-center text-white sm:flex-row sm:gap-y-0 sm:text-left">
          <div className="w-[100%] text-stone-400 sm:w-1/2">
            <h1>
              © All rights reserved
              <span className="text-md text-white"> Smart Farm</span>. Powered
              by
              <span className="text-md text-white"> Mohamed Rafat.</span>
            </h1>
          </div>
          <div className="flex w-[100%] items-center justify-center gap-x-5 sm:w-1/2 sm:justify-end">
            <a
              className="rounded-full bg-[#191919] p-2 hover:bg-[#2a2a2a] transition-colors duration-200"
              href="https://www.facebook.com/mohamed.rafat.622731/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                ></path>
              </svg>
            </a>
            <a
              className="rounded-full bg-[#191919] p-2 hover:bg-[#2a2a2a] transition-colors duration-200"
              href="https://www.linkedin.com/in/mohamed-rafaat-19046b229/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-8 sm:h-8"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#fff"
                  d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                />
              </svg>
            </a>
            <a
              className="rounded-full bg-[#191919] p-2 hover:bg-[#2a2a2a] transition-colors duration-200"
              href="https://www.instagram.com/mohamed_rafat2001/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <path
                  fill="#fff"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5 11.7 99.5 9 132.1 9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
