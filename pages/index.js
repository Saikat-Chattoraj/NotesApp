import fetch from "isomorphic-unfetch";
import Link from "next/link";
const index = ({ notes }) => {
  return (
    <div className="flex w-screen">
      <div className="flex mt-4 m-auto font-mono font-bold w-full">
        <div className="flex flex-col m-auto place-items-center w-4/5">
          <div className="flex place-items-center m-auto text-4xl mb-20">
            View Notes
          </div>

          <div className="flex">
            <div className="grid grid-cols-3 gap-x-24 gap-y-32">
              {notes.map((note) => {
                return (
                  <div
                    key={note._id}
                    className="flex flex-col w-full rounded overflow-hidden shadow-md px-14  hover:rotate-0 hover:scale-125 hover:transition hover:duration-500 hover:shadow-xl hover:ease-in-out"
                  >
                    <div className="flex mt-4 mb-4">
                      <div className="flex text-2xl">
                        <Link href={`/${note._id}`}>
                          <a>{note.title}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex w-full border border-gray-300 " />
                    <div className="flex mt-10 space-x-10 mb-6">
                      <div>
                        <Link href={`/${note._id}`}>
                          <button className="flex bg-indigo-300 p-2 rounded-md object-cover hover:shadow-none shadow-lg transition duration-500 ease-in-out hover:bg-indigo-500 text-md">
                            View
                          </button>
                        </Link>
                      </div>
                      <div>
                        <Link href={`/${note._id}/edit`}>
                          <button className="flex bg-indigo-300 p-2 rounded-md object-cover hover:shadow-none shadow-lg transition duration-500 ease-in-out hover:bg-indigo-500 text-md">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();
  return { notes: data };
};

export default index;
