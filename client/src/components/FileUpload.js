import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [isUploading, setIsUploading] = useState(false);

  const uploadEndpoint = process.env.REACT_APP_UPLOAD_ENDPOINT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !account || !contract) {
      return;
    }

    if (!uploadEndpoint) {
      alert("Upload service is not configured. See README.md.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // The backend owns the Pinata credential and returns { IpfsHash: "..." }.
      // Never place Pinata secrets or JWTs in React environment variables.
      const response = await axios.post(uploadEndpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const ipfsHash = response.data?.IpfsHash;
      if (!ipfsHash) {
        throw new Error("Upload service did not return an IPFS hash");
      }

      const transaction = await contract.add(
        account,
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
      );
      await transaction.wait();

      alert("File uploaded successfully");
      setFileName("No file selected");
      setFile(null);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Unable to upload the file");
    } finally {
      setIsUploading(false);
    }
  };

  const retrieveFile = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose file
        </label>
        <input
          disabled={!account || isUploading}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button
          type="submit"
          className="upload"
          disabled={!file || !contract || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload file"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
