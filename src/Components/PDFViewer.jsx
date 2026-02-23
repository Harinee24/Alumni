import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) =>
      Math.min(prev + 1, numPages)
    );
  };

  return (
    <div className="pdf-wrapper">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page 
            pageNumber={pageNumber} 
            width={800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
        />
      </Document>

      <div className="pdf-controls">
        <button onClick={goToPrevPage} disabled={pageNumber === 1}>
          ⬅
        </button>

        <span>
          {pageNumber} / {numPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={pageNumber === numPages}
        >
          ➡
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;