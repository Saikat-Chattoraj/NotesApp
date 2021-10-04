import Fetch from "isomorphic-unfetch";
import Link from "next/link";
const Feed = ({ notes }) => {
  return (
    <div className="flex w-screen">
      <div className="flex mt-4 m-auto text-3xl font-mono font-bold bg-green-600 w-full rounded-md">
        <div className="flex flex-wrap m-auto place-items-center w-4/5 ">
          <div className="flex place-items-center m-auto">View Notes</div>
          <div className="flex">
            <div className="flex">
                {notes.map(note => {
                    return(
                        <div key={note._id}>
                        <Link href={`/${note._id}`}>
                            <a>{note.title}</a>
                        </Link>
                        </div>
                    )
                })}    
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

Feed.getInitialProps = async () => {
  const res = await Fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();
  return { notes: data }
};

export default Feed;
