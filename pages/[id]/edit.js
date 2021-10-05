/*import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
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

  const handleSubmit = (e) => {
      e.preventDefault();
      let errs=validate();
      setErrors(errs);
      if(!errors){
        setIsSubmitting(true);
        createNote(form)
      }
  }

  const handleChange = (e) => {
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
  
  const createNote= async (form) => {
    try{
       const res = await Fetch("http://localhost:3000/api/notes",{
       method:'POST',
       headers: {
         "Accept":"application/json",
         "Content-Type":"application/json"
       },
       body: JSON.stringify(form)
      })
      router.push("/");
  }   catch(error){
    console.log(error);
  }
  setIsSubmitting(false);
  }
  return (
    <div className="flex w-screen h-screen bg-indigo-300">
      {
        isSubmitting ? <CircularProgress  className="place-items-center m-auto flex"/> : (
        
          <div className="flex flex-col shadow-xl bg-indigo-100 rounded-2xl hover:shadow-sm transition duration-500 place-items-center m-auto w-4/3">
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
              <button className="flex px-6 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-400 -translate-y-0.5 hover:translate-y-0 duration-300 text-white font-bold font-serif" type="submit" onClick={handleSubmit}>
                Post
              </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default NewNote; */
import Link from "next/link";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/dist/client/router";
import fetch from "isomorphic-unfetch";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const EditNote = ({ note }) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  
const router = useRouter();

  const onSubmit = (data) => {
    updateNote(data);
  };

  const handleClose = () => {
    router.push("/")
  };

  const updateNote = async (form) => {
    try {
        const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        router.push("/");
    } catch (error) {
        console.log(error);
    }
}
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Title"
            variant="filled"
            style={{ width: 500 }}
                multiline={true}
                rows={1}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Title required' }}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Description"
            variant="filled"
            style={{ width: 500 }}
                multiline={true}
                rows={4}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Description required' }}
      />
      
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
};
EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}
export default EditNote;
