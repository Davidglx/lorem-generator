import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Modal from './Modal';

const App = () => {
  const [input, setInput] = useState(1);
  const [tags, setTags] = useState('P');
  const [includesHtml, setIncludesHtml] = useState('yes');
  const [paragraph, setParagraph] = useState([]);
  const [copy, setCopy] = useState(false);
  const [modalContent, setModalContent] = useState('copied to clipboard');


useEffect(() => {
  handleSumbit();
}, []);

const closeModal = () => {
  setCopy(false);
}

  const handleSumbit = () => {
    const url = (`https://baconipsum.com/api/?type=all-meat&paras=${input}&start-with-lorem=1`);
    fetch(url)
    .then((res) => res.json())
    .then((data) => setParagraph(data));
  }
  

  return (
    <div className="App">
      <h1>ginger IPSUM PARAGRAPH</h1>
      <div className="paragraph">
        <h3>Paragraph:</h3>
        <input 
        min="1"
        max="15"
        type='number'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <label>Tags:</label>
        <select
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        name='tags'
        >
          <option className='option' value="p">p</option>
          <option className='option' value="h1">h1</option>
          <option className='option' value="h2">h2</option>
          <option className='option' value="h3">h3</option>
          <option className='option' value="h4">h4</option>
          <option className='option' value="h5">h5</option>
          <option className='option' value="h6">h6</option>
          <option className='option' value="span">span</option>
        </select>

        <label>Includes  HTML:</label>
        <select
        value={includesHtml}
        onChange={(e) => setIncludesHtml(e.target.value)}>
          <option className='option' value='yes'>yes</option>
          <option className='option' value='no'>no</option>
        </select>
        <button onClick={handleSumbit}>Generate</button>
        </div>

        <div className='now'>
        <CopyToClipboard text={paragraph.map((item) => includesHtml === 'yes' ? `<${tags}>${item}</${tags}>` : item)}
        onCopy={() => setCopy(true)}
        >
          <button>Copy to clipboard</button>
        </CopyToClipboard>
        <div className='arrow'> 
          {copy && <Modal modalContent={modalContent} closeModal={closeModal} />}
        </div>
        </div>
      <div className="laast-paragraph">
       {includesHtml === "yes" ? (<p>{paragraph.map((para) => `<${tags}>${para}</${tags}>`)}</p>)
        : 
       (<p>{paragraph.map((para) => para)}</p>)}
      </div>

    </div>
  )
}

export default App;

