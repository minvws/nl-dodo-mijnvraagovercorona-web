import S from "@sanity/desk-tool/structure-builder";
import { IconType } from "react-icons";

import { getViews } from "./getViews";

/**
 * This will render a list of documents inside the CMS.
 */
export const getDocumentList = ({
  schemaType,
  title,
  icon,
}: {
  schemaType: string;
  title: string;
  icon: IconType;
}) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      S.documentTypeList(schemaType).child((documentId: string) =>
        S.document()
          .documentId(documentId)
          .schemaType(schemaType)
          .views(getViews("document"))
      )
    );
