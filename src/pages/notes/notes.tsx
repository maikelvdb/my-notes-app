import styles from "./notes.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Note } from "../../lib/models/note.model";
import Loader from "../../lib/components/loader/loader";
import { NotesService } from "../../lib/services/notes.service";
import NoteTable from "./note-table/note-table";

const Notes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);

  const service = useMemo(() => new NotesService(), []);

  useEffect(() => {
    service
      .all()
      .then((notes) => {
        setNotes(() => notes);
      })
      .catch(() => {
        setNotes(() => []);
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
      setNotes((prev) => prev.filter((x) => x.id !== id));
    });
  };

  const setNoteCompleted = (id: string) => {
    const note = notes.find((x) => x.id === id);
    if (!note) {
      return;
    }

    service.update(note.id, note.task, note.dueDate, true).then((note) => {
      if (note) {
        setNotes((prev) => prev.map((x) => (x.id === note.id ? note : x)));
      }
    });
  };

  return (
    <div className={styles.notes}>
      <NoteTable
        title="Notes"
        notes={notes.filter((x) => !x.completed)}
        onComplete={setNoteCompleted}
        onDelete={removeNote}
      />

      <div className={styles.footer}>
        <NavLink to="/notes/create" className={`${styles.add} button`}>
          Add note
        </NavLink>
      </div>

      <NoteTable
        className={styles.completed}
        title="Completed"
        notes={notes.filter((x) => x.completed)}
        showActions={false}
      />
    </div>
  );
};

export default Notes;
