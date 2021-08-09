/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

export interface PageHeaderButtonProps {
  title: string;
  onClick: any;
  selected?: boolean;
}
const PageHeaderButton: React.FC<PageHeaderButtonProps> = ({
  title,
  onClick,
  selected,
  children,
}) => {
  return (
    <li title={`${title}`}>
      <button onClick={onClick} className={`${selected && "selected"}`}>
        {children}
      </button>
    </li>
  );
};

PageHeaderButton.defaultProps = {
  selected: false,
};

export default PageHeaderButton;
