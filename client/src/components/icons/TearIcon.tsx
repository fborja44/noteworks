import { HeroIconProps } from "../../common/types";

const TearIcon = ({ className, filled }: HeroIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 177 244"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M79.5393 12.2306C83.4872 6.52688 91.9013 6.47715 95.9164 12.1338L160.058 102.5L96.6637 191.893C92.676 197.516 84.3285 197.513 80.3451 191.887L17.058 102.5L79.5393 12.2306Z"
        fill="#2A8BF4"
      />
      <circle cx="88.5" cy="154.576" r="88.5" fill="#2A8BF4" />
    </svg>
  );
};

export default TearIcon;
