import { NavLink, useNavigate } from "react-router-dom";
import styles from "./note-create.module.scss";
import Input from "../../../lib/components/form/input/input";
import { useMemo, useState } from "react";
import dateFormat from "dateformat";
import { NotesService } from "../../../lib/services/notes.service";

const NoteCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const service = useMemo(() => new NotesService(), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const task = formData.get("task") as string;
    const dueDate_str = formData.get("dueDate") as string;
    const dueDate = new Date(dueDate_str);

    service.create(task, dueDate).then((note) => {
      if (note) {
        navigate("/notes");
      } else {
        setError("Failed to create note");
      }
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
        />
        <Input
          type="date"
          placeholder="Due date"
          name="dueDate"
          min={dateFormat(now, "yyyy-mm-dd")}
          required
        />
      </div>

      <div className={styles.footer}>
        <NavLink to="/notes" className="button">
          Back
        </NavLink>
        <button type="submit" className="button">
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteCreate;
