import Link from "next/link";
import { useEffect, useState } from "react";
import Fetch from "isomorphic-unfetch";
import { useRouter } from "next/dist/client/router";
import { TextField, CircularProgress } from "@material-ui/core";
const NewNote = () => {
  const [form,setForm]=useState({ title: '', description:''
  });   
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors,setErrors] = useState({});
  const router = useRouter();

  useEffect(()=>{
    if(isSubmitting){
        if(Object.keys(errors).length === 0){
            alert("Success")
        }
        else{
            setIsSubmitting(false);
        }
    }
  },[errors])

  const handleChange = (e) => {
      e.preventDefault();
      let errs=validate();
      setErrors(errs);
      setIsSubmitting(true);
  }

  const handleSubmit = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  }

  const validate = () => {
      let err = {};
    if (!form.title)
    {
        err.title="Title is required";
    }
    if (!form.description)
    {
        err.description="Description is required"
    }
    return err;
  }

  return (
    <div className="flex w-screen h-screen bg-indigo-300">
      {
        isSubmitting ? <CircularProgress  className="place-items-center m-auto flex"/> : (
        
          <div className="flex flex-col shadow-xl bg-indigo-100 rounded-2xl hover:shadow-sm transition duration-500 place-items-center m-auto w-4/3" onSubmit={handleSubmit}>
            <div className="flex  mt-5 px-24 ">
              <TextField    
                error={errors.title ? {content:"Please provide a title", pointing:"below"}:null}
                name='title'
                label="Title"
                variant="outlined"
                style={{ width: 500 }}
                multiline={true}
                rows={1}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-10">
              <TextField
                error={errors.description ? {content:"Please provide a Description", pointing:"below"}:null}
                name='description'
                label="Description"
                variant="outlined"
                style={{ width: 500 }}
                multiline={true}
                rows={4}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-10 mb-10">
              <button className="flex px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-400 -translate-y-0.5 hover:translate-y-0 duration-300 text-white font-bold font-serif" type="submit">
                Post
              </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default NewNote;
