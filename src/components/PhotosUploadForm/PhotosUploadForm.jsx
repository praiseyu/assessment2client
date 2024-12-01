import { useState } from "react";
import axios from "axios";
import { Form, Button, FormGroup } from "react-bootstrap";

const PhotosUploadForm = ({ eventId }) => {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [message, setMessage] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!files) {
      setMessage("No file selected!");
      return;
    }

    try {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append(`images`, files[i]);
      }
      setMessage("Uploading...");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}/photos`,
        fd,
        {
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: progressEvent.progress * 100 };
            });
          },
        }
      );

      setMessage("Upload successful.");
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err.message);
    }
  }
  return (
    <div className="mt-3">
      <Form className="d-flex flex-column gap-4">
        <FormGroup>
          <Form.Label>Upload Event Photos Here:</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
        </FormGroup>
        <Button
          variant="primary"
          type="submit"
          size="sm"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Form>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {message && <span>{message}</span>}
    </div>
  );
};

export default PhotosUploadForm;
