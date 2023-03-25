import { HeroIconProps } from "../../common/types";

const SparkleIcon = ({ className, filled }: HeroIconProps) => {
  if (filled) {
    return (
      <svg
        width="38"
        height="39"
        viewBox="0 0 38 39"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 1.875V9.70833M1 5.79167H9M7 29.2917V37.125M3 33.2083H11M21 1.875L25.5714 15.3036L37 19.5L25.5714 23.6964L21 37.125L16.4286 23.6964L5 19.5L16.4286 15.3036L21 1.875Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="38"
        height="39"
        viewBox="0 0 38 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 1.875V9.70833M1 5.79167H9M7 29.2917V37.125M3 33.2083H11M21 1.875L25.5714 15.3036L37 19.5L25.5714 23.6964L21 37.125L16.4286 23.6964L5 19.5L16.4286 15.3036L21 1.875Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};

export default SparkleIcon;
