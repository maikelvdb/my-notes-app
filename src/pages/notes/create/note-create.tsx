import { NavLink, useNavigate } from "react-router-dom";
import styles from "./note-create.module.scss";
import Input from "../../../lib/components/form/input/input";
import { useMemo, useState } from "react";
import dateFormat from "dateformat";
import { NotesService } from "../../../lib/services/notes.service";

const NoteCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const service = useMemo(() => new NotesService(), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(() => true);

    const formData = new FormData(event.currentTarget);
    const task = formData.get("task") as string;
    const dueDate_str = formData.get("dueDate") as string;
    const dueDate = new Date(dueDate_str);

    service
      .create(task, dueDate)
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
    <form className={styles["create-form"]} onSubmit={handleSubmit}>
      <h2>Create note</h2>

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
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteCreate;
