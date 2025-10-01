const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-500/80 pt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-12 md:gap-8">
        {/* Brand Info */}
        <div className="max-w-80">
          <div className="flex gap-4"> 
            <img src="./favicon.svg" alt="logo" />
            <h1 className="text-3xl font-semibold text-[#212121]">ZipCart</h1>
          </div>
          <p className="text-sm mt-2">
            Your trusted grocery delivery partner. Fresh products delivered
            straight to your doorstep, anytime you need them.
          </p>
          
        </div>

        {/* Company */}
        <div>
          <p className="text-lg font-medium text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {["About", "Careers", "Press", "Blog", "Partners"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-black transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-lg font-medium text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {[
              "Help Center",
              "Safety Information",
              "Cancellation Options",
              "Contact Us",
              "Accessibility",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-black transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="text-lg font-medium text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="email"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none w-full text-sm"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center gap-1 bg-black text-white text-sm font-medium px-4 h-9 rounded-r hover:bg-gray-800 transition">
              Subscribe
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <hr className="border-gray-300 mt-8" />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-sm">
        <p>© {new Date().getFullYear()} ZipCart. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Sitemap"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-black transition">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
