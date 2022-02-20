import React, { useState, useEffect } from 'react'
import "./App.css";


function App() {

  const [inputList, setInputList] = useState("");
  const [addItem, setaddItem] = useState([]);
  const [gif, setgif] = useState([]);
  const [gifInput, setGifInput] = useState("");
  const [pGif, setPGif] = useState("");
  const [gifB, setGifB] = useState("none")
  const [img, setImg] = useState("none")
  const [imagesPost, setImagesPost] = useState([]);
  const [ postGif,setPostGif] = useState("none")



  function onChange(e) {
    var val = e.target.value;

    setInputList(val);
  }


  useEffect(() => {
    fetch("https://api.giphy.com/v1/gifs/search?api_key=zpBEIr3pdJvZkejIlhH58bBkpoE6IgIv&q=" + gifInput + "&limit=25&offset=0&rating=g&lang=en")
      .then(res => res.json())

      .then(result => {

        setgif(result.data);

      })
  }, [gifInput]);


  function getGif(e) {
    var val = e.target.value;

    setGifInput(val)

  }


  function getPGif(e) {

    setPGif(e.target.src);
    setImg("block");
    setGifInput("");
  }

  function addInput() {
    if (gifB == "block") {
      setGifB("none")
    }
    else {
      setGifB("block");
    }
  }



  function para() {
    setImagesPost((oldItem) => {
      return [oldItem, pGif]
    });
    setImg("none")
    setaddItem((oldItem) => {
      return [...oldItem, inputList]

    })
    setPGif("")
    setInputList("");
    setPostGif("block")


  }


  return (
    <div className='container'>
      <div className='inputContainer'>

        <input className='inputPost' type="text" placeholder="enter text here " onChange={onChange} value={inputList} />
        <img className='inputGif' src={pGif} style={{ display: img }} />

      </div>
      <div class="postContainer">
        <div>
          <button onClick={addInput} >GIF</button>
          <input placeholder='search here for gif' className='gifInput' style={{ display: gifB }} type="text" value={gifInput} onChange={getGif} />
          <div className='gifContainer'>
            {
              gif.map((item) => {
                return <div className='gif'> <img className='image' onClick={getPGif} src={item.images.original.url} /> </div>
              })
            }
            <div>
            </div>
          </div>
        </div>
        <div className='post'>
          <button onClick={para} >post</button>
        </div>

      </div>
      <div>
        {
          addItem.map((item) => {
            return <h1>{item}</h1>
          })}
        {
          imagesPost.map((item) => {
            return <div className="postimg" > <img src={item} style={{display:postGif}} /> </div>

          })
        }
      </div>
    </div>



  )
}

export default App;