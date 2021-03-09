import * as React from "react";

/**
 * A document preview which renders it's contents as JSON
 */
export const DocumentJsonPreview = ({
  document,
}: {
  document: { displayed: Object };
}) => <pre>{JSON.stringify(document.displayed, null, 2)}</pre>;
