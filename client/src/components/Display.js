import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState(""); // Store image data

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value; // Get address from input

    try {
      if (Otheraddress) {
        // Fetch data for other address
        dataArray = await contract.display(Otheraddress);
      } else {
        // Fetch data for the connected account
        dataArray = await contract.display(account);
      }
    } catch (e) {
      // Error handling if contract interaction fails
      alert("You don't have access or error fetching data");
      console.error(e);
    }

    // Check if dataArray is valid (not null or undefined)
    if (dataArray && dataArray.length > 0) {
      const images = dataArray.map((item, i) => (
        <a href={item} key={i} target="_blank" rel="noopener noreferrer">
          <img src={item} alt={`Uploaded File ${i}`} className="image-list" />
        </a>
      ));
      setData(images); // Set images in state
    } else {
      alert("No images to display"); // Alert if no images are available
      setData(""); // Reset state if no images
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list">{data}</div> {/* Display the images */}
    </>
  );
};

export default Display;
