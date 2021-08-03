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
    <li title={`${title}`} className={`${selected && "selected"}`}>
      <button onClick={onClick}>{children}</button>
    </li>
  );
};

PageHeaderButton.defaultProps = {
  selected: false,
};

export default PageHeaderButton;
