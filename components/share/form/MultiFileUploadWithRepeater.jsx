'use client'

import { Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const MultiFileUploadWithRepeater = ({
  setImageUpload,
  updateImage,
  setDeletedOldImages,
  setFiles,
  files = [], 
  projIdx
}) => {

  const [finalUpdatedImg, setFinalUpdatedImg] = useState([])

  
  useEffect(() => {
    if (Array.isArray(updateImage)) {
      setFinalUpdatedImg(updateImage)
    }
  }, [updateImage])
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const updatedFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          id: `${projIdx}-${crypto.randomUUID()}`,

          preview: URL.createObjectURL(file),
          index: projIdx || 0
        })
      )

      const newFiles = [...(Array.isArray(files) ? files : []), ...updatedFiles]
      setFiles(newFiles)
      setImageUpload(newFiles)
    }
  })

  const removeFile = useCallback((idToRemove) => {
    const validFiles = Array.isArray(files) ? files : []
    const updatedFiles = validFiles.filter(file => file.id !== idToRemove)
  
    validFiles.forEach(file => {
      if (!updatedFiles.some(f => f.preview === file.preview)) {
        URL.revokeObjectURL(file.preview)
      }
    })
  
    setFiles(updatedFiles)
    setImageUpload(updatedFiles)
  }, [files, setFiles, setImageUpload])
  


  //  Remove old files by URL (for `updateImage`/existing files)
  const removeOldFileByUrl = useCallback(url => {
    setFinalUpdatedImg(prev => {
      const filtered = (prev || []).filter(file => file.url !== url)
      const removed = (prev || []).find(file => file.url === url)
  
      if (removed) {
        setDeletedOldImages(prevDeleted => {
          const existingForRow = Array.isArray(prevDeleted[projIdx])
            ? prevDeleted[projIdx]
            : []
          return {
            ...prevDeleted,
            [projIdx]: [...existingForRow, removed]
          }
        })
      }
  
      return filtered
    })
  }, [setDeletedOldImages, projIdx])
  

  // Set updateImage only once on mount
  useEffect(() => {
    setFinalUpdatedImg(updateImage || [])

    return () => {
      if (Array.isArray(files)) {
        files.forEach(file => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview)
          }
        })
      }
    }
  }, [])

  return (
    <div className='theme-bg-light-rgba mx-auto w-full rounded-sm border-2 border-dashed p-8'>
      <div {...getRootProps({ className: 'text-center cursor-pointer' })}>
        <input {...getInputProps()} />
        <>
          <h2 className='text-xl'>Drop your files here</h2>
          <p className='rounded-6 bg-white p-4 text-sm font-medium'>
            <Upload className='m-auto' /> Upload
          </p>
        </>
      </div>

      <div className='mt-4 space-y-2'>
        {Array.isArray(files) && files.length > 0 && (
          <span className='w-full font-semibold'>New Images</span>
        )}
        <div className='!mb-4 grid grid-cols-4 gap-4'>
          {Array.isArray(files) &&
            files.map(file => (
              <div
                key={file.id}
                className='relative flex w-full items-center justify-between rounded-md border bg-white p-2'
              >
                {file.type?.startsWith('image') && (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className='h-10 w-10 rounded object-cover'
                  />
                )}
                <div className='ml-2 flex-1'>
                  <p className='!m-0 !line-clamp-1 !w-fit !border-0 !p-0 text-sm font-medium'>
                    {file.name}
                  </p>
                </div>
                <button
                  type='button'
                  className='close-icon absolute w-5 rounded-full bg-red-500 text-sm font-medium text-white'
                  onClick={() => removeFile(file.id)}
                >
                  ×
                </button>
              </div>
            ))}
        </div>

        {Array.isArray(finalUpdatedImg) && finalUpdatedImg.length > 0 && (
          <span className='w-full font-semibold'>Old Images</span>
        )}
        <div className='grid grid-cols-4 gap-4'>
          {Array.isArray(finalUpdatedImg) &&
            finalUpdatedImg.map(file => (
              <div
                key={file.id || file.url}
                className='relative flex w-full items-center justify-between rounded-md border bg-white p-2'
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className='h-10 w-10 rounded object-cover'
                />
                <div className='ml-2 flex-1'>
                  <p className='!m-0 !line-clamp-1 !w-fit !border-0 !p-0 text-sm font-medium'>
                    {file.name}
                  </p>
                </div>
                <button
                  type='button'
                  className='close-icon absolute w-5 rounded-full bg-red-500 text-sm font-medium text-white'
                  onClick={() => removeOldFileByUrl(file.url)}
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export { MultiFileUploadWithRepeater }
