import { NavLink } from "react-router-dom";
import styles from "./note-create.module.scss";

const NoteCreate = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.noteCreate} onSubmit={handleSubmit}>
      <h2>Create note</h2>

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

export default NoteCreate;
