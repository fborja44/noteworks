/* Page Header Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

// Component imports
import Searchbar from "../Searchbar";

export interface PageHeaderProps {
  title: string;
  useSearch?: boolean;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  useSearch,
  setSearchText,
  children,
}) => {
  return (
    <section className="sub-header">
      <div className="sub-header-left">
        <h1>{title}</h1>
      </div>
      <div className="sub-header-right">
        {useSearch && setSearchText && (
          <Searchbar handleSearchNote={setSearchText} />
        )}
        <div className="sub-header-buttons">
          <ul>{children}</ul>
        </div>
      </div>
    </section>
  );
};

PageHeader.defaultProps = {
  useSearch: false,
};

export default PageHeader;
