import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Preview = ({ onClose }:{ onClose: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { html } = useSelector((state:any) => state.preview);
  console.log(html);

  useEffect(() => {
    // Select all inputs within the rendered HTML and enable them
    const container = document.getElementById('preview-container');
    if (container) {
      const inputs = container.querySelectorAll('input[disabled],button[disabled]');
     
    }
  }, [html]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black rounded-lg p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-auto relative flex flex-col">
        <button
          onClick={() => onClose(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <center><div  id="preview-container" dangerouslySetInnerHTML={{ __html: html }} /></center>
      </div>
    </div>
  );
};

export default Preview;
