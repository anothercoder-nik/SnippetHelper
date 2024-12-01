import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";

const Home = () => {

const [title,setTitle] = useState('');
const [value,setValue] = useState('');
const [searchParams,setSearchParams] = useSearchParams();
const pasteId = searchParams.get("pasteId");
// const pastes = useSelector((state) => state.paste.pastes);
const dispatch = useDispatch();

const data = useSelector((state) => state.paste.pastes);

useEffect(() => {
  if (pasteId) {
    const paste = data.find((p) => p._id === pasteId);

    if (paste) {
      setTitle(paste.title); // Safely set title
      setValue(paste.content); // Ensure you're using `content` if that's the correct key
    } else {
      // If no matching paste is found
      console.warn("Paste not found");
      setTitle("");
      setValue("");
    }
  }
}, [pasteId, data]); // Add `data` as a dependency


function createPaste(){
  const paste = {
    title: title,
    content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
  };
  if(pasteId){
   //update the paste
   dispatch(updateToPastes(paste));
  }
  else{
  // create the paste
  dispatch(addToPastes(paste));
  }

  //after creation or updation
  setTitle('');
  setValue('');
  setSearchParams({});
};


  return (
 <div className="ml-[520px]">
     <div className="flex flex-row gap-7 place-content-between">
      <input
      className="p-1 rounded-2xl mt-2 w-[66%]"
        type="text"
        placeholder="enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createPaste} className="p-2 rounded-2xl mt-2"
        >
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>
    <div className="mt-8">
    <textarea
  value={value}
  placeholder="enter the content here"
  onChange={(e) => setValue(e.target.value)}
  rows={20}
  className="rounded-2xl mt-4 min-w-[500px] p-4 placeholder-white"
/>

        </div>
 </div>

  )
}

export default Home
