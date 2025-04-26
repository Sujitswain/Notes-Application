import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone';
import Slider from 'react-slick';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Modal = ({ isOpen, onClose, note, onSave, onDelete }) => {

  const [editedNote, setEditedNote] = useState({ ...note });
  const [images, setImages] = useState(note.addedImages || []);
  const [showCanvas, setShowCanvas] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [bgImage, setBgImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (note) {
      setEditedNote({
        id: note.id,
        heading: note.heading,
        notes: note.notes,
        createdAt: note.createdAt,
        addedImages: note.addedImages || [],
      });
    }
  }, [note]);

  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctxRef.current = ctx;

      if (bgImage) {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = bgImage;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
      }
    }
  }, [showCanvas, bgImage]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => {
    setDrawing(false);
    ctxRef.current.closePath();
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    ctxRef.current.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctxRef.current.stroke();
  };

  const handleCanvasSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const newImage = {
      id: Date.now(),
      base64: dataUrl,
    };

    setImages((prevImages) => {
      const updatedImages = [...prevImages, newImage];
      setEditedNote((prevNote) => ({
        ...prevNote,
        addedImages: updatedImages,
      }));
      return updatedImages;
    });    
    setShowCanvas(false);
    setBgImage(null);
  };

  const handleCanvasCancel = () => {
    setShowCanvas(false);
    setBgImage(null);
  };

  const handleSave = () => {
    onSave(editedNote);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editedNote.id);
    onClose();
  };

  const handleImageDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            id: crypto.randomUUID(),
            base64: reader.result,
          });
        };
      });
    });

    // Update the images state once the base64 images are ready
    Promise.all(newImages).then((newImagesArray) => {
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImagesArray];
        setEditedNote((prevNote) => ({
          ...prevNote,
          addedImages: updatedImages, 
        }));
        return updatedImages;
      });
    });
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result);
        setShowCanvas(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    setEditedNote((prevNote) => ({
      ...prevNote,
      addedImages: updatedImages,
    }));
  };  

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-5xl max-h-[93vh] overflow-y-auto flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        <div className="flex flex-col md:flex-row gap-[7px]">
          {/* Left Portion */}
          <div className="w-full md:w-1/2 min-w-[300px]">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Heading</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={editedNote.heading}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, heading: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1">Notes</label>
              <div className="h-[300px]">
                <ReactQuill
                  ref={quillRef}
                  value={editedNote.notes}
                  onChange={(value) =>
                    setEditedNote({ ...editedNote, notes: value })
                  }
                  theme="snow"
                  modules={modules}
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 h-[425px] mt-6 min-w-[300px]">
            {!showCanvas ? (
              <>
                <div className="flex justify-between items-center">
                  <Dropzone onDrop={handleImageDrop} accept={{ 'image/*': [] }}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="w-[85%] border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer mb-4"
                      >
                        <input {...getInputProps()} />
                        <p className="text-center text-sm text-gray-600">
                          Drag and drop images here or click to upload
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  <button
                    onClick={() => { 
                      setShowCanvas(true);
                      setBgImage(null);
                    }}
                    className="inline-flex items-center mt-[-20px] gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 hover:ring-4 hover:ring-purple-300/50"
                  >
                    🎨
                  </button>
                </div>

                {/* Image slider */}
                {images.length > 0 && (
                  <div className="mt-4 w-full relative">
                    {images.length > 0 && (
                      <Slider
                        dots={true}
                        infinite={false}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        vertical={false}
                        afterChange={(index) => setCurrentImageIndex(index)}
                      >
                        {images.map((image, index) => (
                          <div key={image.id} className="relative w-full flex items-center justify-center">

                            <button
                              onClick={() => handleImageDelete(image.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
                              title="Delete Image"
                            >
                              🗑️
                            </button>

                            {index === currentImageIndex && (
                              <button
                                onClick={() => {
                                  setBgImage(images[currentImageIndex].base64);
                                  setShowCanvas(true);
                                }}
                                className="absolute top-2 right-12 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 z-10"
                                title="Scribble on Image"
                              >
                                🖌️
                              </button>
                            )}
                                              
                            <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                              <img
                                src={image.base64}
                                alt={`Image ${index + 1}`}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="relative w-full h-[100%] border border-gray-300 rounded-lg">
                
                {/* Upload background image input */}
                <div className="absolute top-3 left-2 z-10">
                  <label
                    htmlFor="bgImageUpload"
                    className="cursor-pointer p-2 rounded-full bg-white border-[0.5px] border-gray-400 hover:bg-gray-100 transition shadow"
                    title="Upload Background Image"
                  >
                    🖼️
                  </label>
                  <input
                    id="bgImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleBgImageUpload}
                    className="hidden"
                  />
                </div>
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="bg-white px-4 w-full h-[100%] rounded-md"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
                    onClick={handleCanvasCancel}
                  >
                    ❌
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-violet-100 text-white rounded-md hover:bg-violet-300 transition duration-200"
                    onClick={handleCanvasSave}
                  >
                    ✔️
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-[10px] pt-2 border-t border-gray-200">
          <button
            className="bg-gray-200 text-white px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={handleDelete}
          >
            🗑️
          </button>
          <button
            className="bg-red-100 text-black px-4 py-2 rounded-md hover:bg-red-300"
            onClick={onClose}
          >
            ❌
          </button>
          <button
            className="bg-blue-100 text-white px-4 py-2 rounded-md hover:bg-blue-300"
            onClick={handleSave}
          >
            ✔️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;