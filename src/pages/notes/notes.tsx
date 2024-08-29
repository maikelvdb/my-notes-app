import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notes.module.scss";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Note } from "../../lib/models/note.model";
import Loader from "../../lib/components/loader/loader";
import { NotesService } from "../../lib/services/notes.service";
import dateFormat from "dateformat";

const Notes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoNotes, setTodoNodes] = useState<Note[]>([]);
  const [_, setCompletedNodes] = useState<Note[]>([]);

  const service = useMemo(() => new NotesService(), []);

  useEffect(() => {
    service
      .all()
      .then((notes) => {
        setTodoNodes(() => notes.filter((x) => !x.completed));
        setCompletedNodes(() => notes.filter((x) => x.completed));
      })
      .catch(() => {
        setTodoNodes(() => []);
        setCompletedNodes(() => []);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const removeNote = (id: string) => {
    service.delete(id).then(() => {
      setTodoNodes((prev) => prev.filter((x) => x.id !== id));
      setCompletedNodes((prev) => prev.filter((x) => x.id !== id));
    });
  };

  const setNoteCompleted = (id: string) => {
    const note = todoNotes.find((x) => x.id === id);
    if (!note) {
      return;
    }

    service.update(note.id, note.task, note.dueDate, true).then((note) => {
      if (note) {
        setTodoNodes((prev) => prev.filter((x) => x.id !== note.id));
        setCompletedNodes((prev) => [...prev, note]);
      }
    });
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

        {todoNotes?.length > 0 ? (
          todoNotes.map((note) => (
            <div key={note.id} className={styles.row}>
              <div className={styles.cell}>{note.task}</div>
              <div className={styles.cell}>
                {dateFormat(note.dueDate, "yyyy-mm-dd")}
              </div>
              <div className={`${styles.cell} ${styles.actions}`}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={styles.compete}
                  onClick={() => setNoteCompleted(note.id)}
                />
                <NavLink to={`/notes/${note.id}`} className={styles.edit}>
                  <FontAwesomeIcon icon={faPencil} className={styles.edit} />
                </NavLink>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.remove}
                  onClick={() => removeNote(note.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>No notes found</div>
        )}
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
