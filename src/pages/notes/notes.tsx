import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./notes.module.scss";
import {
  faCheck,
  faPencil,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Notes = () => {
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
            <FontAwesomeIcon icon={faPencil} className={styles.edit} />
            <FontAwesomeIcon icon={faTrash} className={styles.remove} />
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
