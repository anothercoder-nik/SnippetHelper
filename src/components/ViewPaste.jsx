import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams(); // Destructure `id` from useParams
  const data = useSelector((state) => state.paste.pastes);
  const paste = data.find((p) => p._id === id); // Find the paste by id

  if (!paste) {
    // If no paste is found, render a fallback UI
    return <div className="ml-[520px]">Paste not found</div>;
  }

  return (
    <div className="ml-[520px]">
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%]"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
        />
      </div>
      <div className="mt-8">
        <textarea
          value={paste.content}
          disabled
          placeholder="enter the content here"
          rows={20}
          className="rounded-2xl mt-4 min-w-[500px] p-4 placeholder-white"
        />
      </div>
    </div>
  );
};

export default ViewPaste;
