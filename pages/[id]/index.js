import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Note = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="flex w-screen">
            <div className="flex flex-col place-items-center m-auto space-y-7 w-2/3">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold shadow-lg -translate-y-0.5 hover:translate-y-0 duration-500 hover:shadow-sm" onClick={open}>Delete</Button>
                </>
            }
            
            <Confirm className=" bg-red-200 place-items-center m-auto mt-10 px-72 py-5 rounded-lg shadow-2xl hover:shadow-sm -translate-y-0.5 hover:translate-y-0 duration-500"
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
            </div>
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;