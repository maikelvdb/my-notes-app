import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./note-table.module.scss";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Note } from "../../../lib/models/note.model";
import dateFormat from "dateformat";
import { NavLink } from "react-router-dom";

type NoteTableProps = {
  title: string;
  notes: Note[];
  showEmpty?: boolean;
  showActions?: boolean;
  className?: string;

  onDelete?: (id: string) => void;
  onComplete?: (id: string) => void;
};

const NoteTable = ({
  title,
  notes,
  onDelete,
  onComplete,
  showEmpty = true,
  showActions = true,
  className = "",
}: NoteTableProps) => {
  const renderActions = (note: Note) => {
    if (!showActions) {
      return <></>;
    }

    return (
      <>
        {onComplete ? (
          <FontAwesomeIcon
            icon={faCheck}
            className={styles.compete}
            onClick={() => onComplete(note.id)}
          />
        ) : (
          <></>
        )}
        <NavLink to={`/notes/${note.id}`} className={styles.edit}>
          <FontAwesomeIcon icon={faPencil} className={styles.edit} />
        </NavLink>
        {onDelete ? (
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.remove}
            onClick={() => onDelete(note.id)}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className={className}>
      <h2>{title}</h2>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.header}`}>
          <div className={styles.cell}>Task</div>
          <div className={styles.cell}>Due date</div>
          <div className={styles.cell}></div>
        </div>

        {notes?.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className={styles.row}>
              <div className={styles.cell}>{note.task}</div>
              <div className={styles.cell}>
                {dateFormat(note.dueDate, "yyyy-mm-dd")}
              </div>
              <div className={`${styles.cell} ${styles.actions}`}>
                {renderActions(note)}
              </div>
            </div>
          ))
        ) : showEmpty ? (
          <div className={styles.empty}>No notes found</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NoteTable;
