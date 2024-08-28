import { RouteObject } from "react-router-dom";
import Layout from "./lib/components/layout/layout";
import Notes from "./pages/notes/notes";
import NoteCreate from "./pages/notes/create/note-create";
import NoteEdit from "./pages/notes/edit/note-edit";

const routes: RouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Notes />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/notes/create",
    element: <NoteCreate />,
  },
  {
    path: "/notes/:id",
    element: <NoteEdit />,
  },
];

export const AppRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [{ path: "/", children: routes }],
  },
];
