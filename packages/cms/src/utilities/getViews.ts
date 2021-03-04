import S from "@sanity/desk-tool/structure-builder";

import { DocumentJsonPreview } from "./views/DocumentJsonPreview";
import { WebPreview } from "./views/WebPreview";

export const getViews = (type: "page" | "document") => [
  S.view.form(),
  S.view.component(DocumentJsonPreview).title("JSON"),
  type === "page" && S.view.component(WebPreview).title("Web"),
];
