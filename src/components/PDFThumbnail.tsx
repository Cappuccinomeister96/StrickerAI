import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// PDF.js Worker konfigurieren
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// PDF.js Warnungen unterdrücken (optional)
pdfjs.GlobalWorkerOptions.verbosity = 0 // 0 = keine Warnungen, 1 = Fehler, 5 = alle

interface PDFThumbnailProps {
  pdfPath: string
  alt: string
}

export function PDFThumbnail({ pdfPath, alt }: PDFThumbnailProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [error, setError] = useState(false)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setError(false)
  }

  function onDocumentLoadError() {
    setError(true)
  }

  if (error) {
    return (
      <div className="pdf-thumbnail-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
          <rect fill="#f5f1ed" width="300" height="400"/>
          <g fill="#8b7355" opacity="0.3">
            <path d="M150 150 L180 180 L150 210 L120 180 Z M150 190 L180 220 L150 250 L120 220 Z M150 110 L180 140 L150 170 L120 140 Z"/>
          </g>
          <text x="150" y="220" fontFamily="Arial" fontSize="16" fill="#8b7355" textAnchor="middle">PDF</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="pdf-thumbnail">
      <Document
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="pdf-thumbnail-loading">
            <div className="spinner"></div>
          </div>
        }
      >
        <Page 
          pageNumber={1} 
          width={300}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  )
}

