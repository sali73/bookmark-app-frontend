import React from "react";
import "./css/style.css";
import Form from "./form.js";

const App = (props) => {

  // State to hold the bookmarks
  const [books, setBooks] = React.useState(null);

  // State to hold the bookmark the user wants to edit
  const [editBookmark, setEditBookmark] = React.useState({
    title: '',
    url: ''
  });

  // Holds blank form data
  const blank = {
    title: '',
    url: ''
  }

  // Hook to get the bookmarks when the component loads
  React.useEffect(() => {
    getInfo();
  }, []);

  // Get the bookmarks from the API
  const getInfo = async () => {
    const response = await fetch('https://bookmark-application-backend.herokuapp.com/books');
    const result = await response.json();
    console.log(result);
    setBooks(result);
  };

  const handleCreate = async (data) => {
    const response = await fetch('https://bookmark-application-backend.herokuapp.com/books', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    getInfo(); // Update the list of bookmarks
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://bookmark-application-backend.herokuapp.com/books/${id}`, {
      method: "DELETE",
    });
    getInfo(); // Update the list of bookmarks
  };

  const handleSelect = async (bookmark) => {
    setEditBookmark(bookmark);
  };

  const handleEdit = async (data) => {

    const response = await fetch(`https://bookmark-application-backend.herokuapp.com/books/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(data);
    // Update list of bookmarks
    getInfo();
  };



  return (
    <div className='container-fluid'>
    <div className = 'grid'>
    <header><h1>Bookmarkd</h1></header>
    <nav>
      <h4>Add a Bookmark</h4>
      <Form className='form' initial={blank} handleSubmit={handleCreate}></Form>
    </nav>
    <article>
      <h4>Edit Bookmark</h4>
      <Form className='form'  initial={editBookmark} handleSubmit={handleEdit} />
      </article>
    <main className='container-fluid main'>
      <ul>
        {books
          ? books.map((bookmark) => {
            return (
                <div className="book">
                    <li key={bookmark._id}>
                      <a href={bookmark.url}><h5>{bookmark.title}</h5></a>
                      <button className="btn btn-link" onClick={() => {handleDelete(bookmark._id);}}>
                        <img className="icons" src="https://icons.iconarchive.com/icons/graphicloads/polygon/48/cross-2-icon.png" />
                      </button>
                      <button className="btn btn-link" onClick={() => {handleSelect(bookmark)}}>
                        <img className="icons" src="https://icons.iconarchive.com/icons/graphicloads/polygon/48/pencil-icon.png"/>
                      </button>
                    </li>
                </div>
            );
          })
          : "Loading..."
        }
      </ul>
      </main>
      <footer><h4>@2020 by <big >Sali Mohamed & Curtis Woods</big> </h4></footer>
    </div>
    </div>
  );
}

export default App;
