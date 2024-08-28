import { NavLink } from "react-router-dom";
import styles from "./note-edit.module.scss";

const NoteEdit = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.noteCreate} onSubmit={handleSubmit}>
      <h2>Edit note</h2>

      <div className={styles.formGroup}>
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

export default NoteEdit;
