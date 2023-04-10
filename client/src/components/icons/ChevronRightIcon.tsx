import { HeroIconProps } from "../../common/types";

const ChevronRightIcon = ({
  className,
  filled,
  strokeWidth,
}: HeroIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

ChevronRightIcon.defaultProps = {
  strokeWidth: 1.5,
};

export default ChevronRightIcon;
