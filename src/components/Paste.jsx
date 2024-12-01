import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/PasteSlice";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const handleShare = (paste) => {
    const { Note, title, content, createdAt } = paste;

    // Format the share text
    const shareText = `
Note: "Testing For SnippetHelper"
Title: ${title}
Date & Time: ${new Date(createdAt).toLocaleString()}
Content:
${content}
    `;

    if (navigator.share) {
      // Use the Web Share API if available
      navigator
        .share({
          welcome: Note,
          title: title,
          text: shareText,
        })
        .then(() => {
          toast.success("Content shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          toast.error("Failed to share content.");
        });
    } else {
      // Fallback for desktop: Copy the share text to the clipboard
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          toast.success("Content copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying content:", error);
          toast.error("Failed to copy content.");
        });
    }
  };

  return (
    <div className="ml-[520px]">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste?._id} className="border place-content-evenly">
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      Edit
                    </NavLink>
                    </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div>{new Date(paste.createdAt).toLocaleString()}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
