import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./note-edit.module.scss";
import Input from "../../../lib/components/form/input/input";
import dateFormat from "dateformat";
import { useEffect, useMemo, useRef, useState } from "react";
import { NotesService } from "../../../lib/services/notes.service";
import Loader from "../../../lib/components/loader/loader";
import { Note } from "../../../lib/models/note.model";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef<HTMLFormElement>(null);
  const [note, setNote] = useState<Note>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const service = useMemo(() => new NotesService(), []);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(() => true);

    service
      .find(id)
      .then((note) => {
        if (note) {
          setNote(() => note);
        } else {
          setError("Note not found");
        }
      })
      .finally(() => {
        setLoading(() => false);
      });
  }, [id]);

  useEffect(() => {
    if (!note || !ref?.current) {
      return;
    }

    ref.current.task.value = note.task;
    ref.current.dueDate.value = dateFormat(note.dueDate, "yyyy-mm-dd");
  }, [note, ref.current]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(() => true);

    const formData = new FormData(event.currentTarget);
    const task = formData.get("task") as string;
    const dueDate_str = formData.get("dueDate") as string;
    const dueDate = new Date(dueDate_str);

    service
      .update(id!, task, dueDate, note!.completed)
      .then((note) => {
        if (note) {
          navigate("/notes");
        } else {
          setError("Failed to create note");
        }
      })
      .finally(() => {
        setSaving(() => false);
      });
  };

  const now = new Date();

  return (
    <form ref={ref} className={styles.noteCreate} onSubmit={handleSubmit}>
      <h2>Edit note</h2>

      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <Input
          type="text"
          placeholder="Task"
          name="task"
          required
          minLength={5}
          maxLength={250}
          disabled={saving}
        />
        <Input
          type="date"
          placeholder="Due date"
          name="dueDate"
          min={dateFormat(now, "yyyy-mm-dd")}
          required
          disabled={saving}
        />
      </div>

      <div className="footer">
        <NavLink to="/notes" className="button">
          Back
        </NavLink>
        <button type="submit" className="button" disabled={saving}>
          Update
        </button>
      </div>
    </form>
  );
};

export default NoteEdit;
