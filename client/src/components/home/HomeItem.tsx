// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { Link } from "react-router-dom";

// Common imports
import { COLOR } from "../../common/color";
import { Marknote, Checklist } from "../../common/types";
import { useDispatch } from "react-redux";
import { setSelectedTab } from "../../redux/actions";

const ItemContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.main.backgroundSecondary};
  padding: 1em 0;
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: ${(props) => props.theme.main.textPrimary};
  font-weight: 700;
  font-size: 16px;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.7em;
  }

  .title {
    margin-right: 1em;
    width: 100px;
  }

  .count {
    font-weight: 600;
    font-size: 14px;
    font-style: italic;
    color: ${(props) => props.theme.main.textSecondary};
  }
`;

const PageLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.blue.primary};
  text-decoration: none;

  &:hover {
    color: ${COLOR.blue.secondary};
    cursor: pointer;
  }
`;

const ItemBody = styled.div`
  h3 {
    font-size: 12px;
    margin-bottom: 0;
  }
`;

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.625em 0;
`;

interface HomeItemProps {
  type: "quicknotes" | "marknotes" | "checklists";
  icon: React.ReactNode;
  count: number;
  list?: Marknote[] | Checklist[];
}

const HomeItem = ({ type, icon, count, list }: HomeItemProps) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // Sort notes list by last modified date and get the first 3
  let notes_list;
  if (list !== undefined) {
    const sorted_list = list.sort(
      (a: Marknote | Checklist, b: Marknote | Checklist) =>
        b.lastModified - a.lastModified
    );
    notes_list = sorted_list
      .slice(0, 5)
      .map((note) => <NoteItem note={note} icon={icon} />);
  }

  return (
    <ItemContainer>
      <ItemHeader>
        <TitleContainer>
          {icon}
          <span className="title">{type}</span>
          <span className="count">
            {count} Note{count !== 1 && "s"}
          </span>
        </TitleContainer>
        <PageLink
          to={`/${type}`}
          onClick={() => {
            dispatch(setSelectedTab(`/${type}`));
          }}
        >
          View All
        </PageLink>
      </ItemHeader>
      {notes_list && notes_list.length > 0 && (
        <ItemBody>
          <h3>Recently Edited</h3>
          <NotesList>{notes_list}</NotesList>
        </ItemBody>
      )}
    </ItemContainer>
  );
};

export default HomeItem;

const NoteItemContainer = styled.li`
  .last-modified {
    font-size: 12px;
  }
`;

const NoteItemLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0.625em 0;
  color: ${(props) => props.theme.main.textSecondary};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.main.textPrimary};
  }
`;

const NoteItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: italic;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 0.6em;
  }
`;

const Untitled = styled.span`
  text-transform: capitalize;
`;

const NoteItem = ({
  note,
  icon,
}: {
  note: Marknote | Checklist;
  icon: React.ReactNode;
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  const title =
    note.title.trim() && note.title.length > 24
      ? note.title.slice(0, 24) + "..."
      : note.title;

  return (
    <NoteItemContainer>
      <NoteItemLink
        to={`/${note.type}s/${note._id}`}
        onClick={() => {
          dispatch(setSelectedTab(`/${note.type}s`));
        }}
      >
        <NoteItemTitle
          css={css`
            svg {
              color: ${COLOR[note.color].primary};
            }
          `}
        >
          {icon}
          {title.trim() ? (
            <span>{title}</span>
          ) : (
            <Untitled>Untitled {note.type}</Untitled>
          )}
        </NoteItemTitle>
        <div className="last-modified">
          Last Edited On{" "}
          {new Date(note.lastModified).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </NoteItemLink>
    </NoteItemContainer>
  );
};
