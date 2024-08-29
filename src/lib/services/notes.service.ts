import { AxiosInstance } from "axios";
import { getAxiosInstance } from "./axios-instance";
import { Note } from "../models/note.model";
import { v4 as uuidv4 } from "uuid";

export class NotesService {
  private client: AxiosInstance;
  private baseUrl = `${import.meta.env.VITE_APP_API_URL}/notes`;

  constructor() {
    this.client = getAxiosInstance();
  }

  all = (): Promise<Note[]> => {
    return this.client
      .get<Note[]>(this.baseUrl)
      .then((response) => response.data);
  };

  find = (id: string): Promise<Note> => {
    return this.client
      .get<Note>(`${this.baseUrl}/${id}`)
      .then((response) => response.data);
  };

  create = (task: string, dueDate: Date): Promise<Note> => {
    return this.client
      .post<Note>(this.baseUrl, {
        id: uuidv4(),
        task,
        dueDate,
        created: new Date(),
        completed: false,
      })
      .then((response) => response.data);
  };

  update = (
    id: string,
    task: string,
    dueDate: Date,
    completed: boolean = false
  ): Promise<Note> => {
    return this.client
      .put<Note>(`${this.baseUrl}/${id}`, {
        task,
        dueDate,
        completed,
      })
      .then((response) => response.data);
  };

  delete = async (id: string): Promise<void> => {
    await this.client.delete(`${this.baseUrl}/${id}`).catch((error) => error);
  };
}
