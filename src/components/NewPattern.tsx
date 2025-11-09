import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Send } from 'lucide-react'
import './NewPattern.css'

function NewPattern() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf')
    setFiles(prev => [...prev, ...pdfFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (files.length === 0) return
    
    // Hier würde die Backend-Integration erfolgen
    console.log('Sende PDFs an Backend:', files)
    alert(`${files.length} Anleitung(en) würden jetzt an das Backend gesendet werden.`)
    
    // Nach erfolgreichem Upload zurücksetzen
    setFiles([])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="new-pattern">
      <div className="page-header">
        <h1 className="page-title">Neue Anleitung hinzufügen</h1>
        <p className="page-description">
          Lade deine Strickanleitungen als PDF hoch. Sie werden automatisch analysiert und strukturiert.
        </p>
      </div>

      <div className="upload-section">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'dropzone-active' : ''} ${files.length > 0 ? 'dropzone-has-files' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <Upload className="dropzone-icon" size={48} />
            {isDragActive ? (
              <p className="dropzone-text">Lass die PDFs hier fallen...</p>
            ) : (
              <>
                <p className="dropzone-text">
                  <strong>Klicke hier</strong> oder ziehe PDFs hierher
                </p>
                <p className="dropzone-hint">
                  Du kannst mehrere PDF-Dateien gleichzeitig hochladen
                </p>
              </>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="files-list">
            <h3 className="files-list-title">
              Ausgewählte Dateien ({files.length})
            </h3>
            <div className="files-grid">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <FileText className="file-icon" size={24} />
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    className="file-remove"
                    onClick={() => removeFile(index)}
                    aria-label="Datei entfernen"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="upload-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setFiles([])}
              >
                Alle entfernen
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                <Send size={20} />
                {files.length === 1 ? 'Anleitung senden' : `${files.length} Anleitungen senden`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewPattern

