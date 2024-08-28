import Link from "next/link";
/**
 * `LinkWithIcon` Component
 *
 * A reusable React component that renders a link with an accompanying icon and label.
 * It allows the icon to be positioned either to the left or right of the text, with customizable styles
 * and hover effects. The icon can also translate in the opposite direction based on its position.
 *
 * @component
 * @example
 * import LinkWithIcon from "@/components/LinkWithIcon";
 * import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
 *
 * const MyComponent = () => (
 *   <>
 *     <LinkWithIcon
 *       href="/"
 *       icon={FiArrowLeft}
 *       label="Go Back Home"
 *       iconPosition="left"
 *     />
 *     <LinkWithIcon
 *       href="/next"
 *       icon={FiArrowRight}
 *       label="Go Forward"
 *       iconPosition="right"
 *     />
 *   </>
 * );
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.href - The URL to navigate to when the link is clicked.
 * @param {React.ComponentType} props.icon - The icon component to be rendered.
 * @param {string} props.label - The text label to display next to the icon.
 * @param {string} [props.iconPosition="left"] - The position of the icon relative to the text. Can be "left" or "right".
 *
 * @returns {JSX.Element} The rendered link with icon and label.
 */

const LinkWithIcon = ({
  href,
  icon: Icon,
  label,
  iconPosition = "left",
  className,
}) => {
  const isLeft = iconPosition === "left";
  return (
    <Link href={href}>
      <div
        className={`group flex items-center text-primary font-others text-lg  hover:text-secondary transition ${className}`}
      >
        {isLeft && Icon && (
          <Icon className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
        )}
        {label}
        {!isLeft && Icon && (
          <Icon className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        )}
      </div>
    </Link>
  );
};

export default LinkWithIcon;
