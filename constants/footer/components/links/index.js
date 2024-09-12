export const FooterLInks = () => {
  const companyLink = [
    { id: 1, label: "About Us" },
    { id: 2, label: "Careers" },
    { id: 3, label: "Blog" },
    { id: 4, label: "Contact Us" },
  ];
  const SupportLink = [
    { id: 1, label: "Help Center" },
    { id: 2, label: "Shipping Info" },
    { id: 3, label: "Returns" },
    { id: 4, label: "FAQs" },
  ];

  return (
    <div className="flex  flex-wrap gap-32">
      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold font-heading text-white mb-4">
          Company
        </h4>
        {companyLink.map((link) => (
          <a
            key={link}
            href="/"
            className="  hover:text-secondary font-others text-white transition duration-300 ease-in-out"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold font-heading text-white mb-4">
          Support
        </h4>
        {SupportLink.map((link) => (
          <a
            key={link}
            href="/"
            className="  hover:text-secondary font-others text-white transition duration-300 ease-in-out"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
