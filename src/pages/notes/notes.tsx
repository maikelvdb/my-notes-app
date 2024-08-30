import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notes.module.scss";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Note } from "../../lib/models/note.model";
import Loader from "../../lib/components/loader/loader";
import { NotesService } from "../../lib/services/notes.service";

const Notes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const service = useMemo(() => new NotesService(), []);

  useEffect(() => {
    // pas op true zetten als de service de notes heeft opgehaald
    setIsLoading(() => false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const removeNote = (id: string) => {
    // remove note
  };

  return (
    <div className={styles.notes}>
      <h2>Notes</h2>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.header}`}>
          <div className={styles.cell}>Task</div>
          <div className={styles.cell}>Due date</div>
          <div className={styles.cell}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>Task name</div>
          <div className={styles.cell}>2024-12-31</div>
          <div className={`${styles.cell} ${styles.actions}`}>
            <FontAwesomeIcon icon={faCheck} className={styles.compete} />
            <NavLink to={`/notes/[note-id]`} className={styles.edit}>
              <FontAwesomeIcon icon={faPencil} className={styles.edit} />
            </NavLink>
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.remove}
              onClick={() => removeNote("id...")}
            />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <NavLink to="/notes/create" className={`${styles.add} button`}>
          Add note
        </NavLink>
      </div>
    </div>
  );
};

export default Notes;
