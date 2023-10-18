import { useEffect, useState, useRef } from 'react';
import { getAnswer, getLanguages } from '../app/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { clearAnswer } from '../app/translateSlice';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const [text, setText] = useState('');

  const sourceInput = useRef();
  const targetInput = useRef();

  console.log(sourceInput, targetInput);


  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });

  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English',
  });

  useEffect(() => {
   
    dispatch(getLanguages());
  }, []);


  const handleClick = () => {
  
    dispatch(getAnswer({ text, sourceLang, targetLang }));
  };

  const changeLang = () => {

    setSourceLang(targetLang);
  
    setTargetLang(sourceLang);

 
    sourceInput.current.value = '';
    dispatch(clearAnswer());
  };

  return (
    <>
      <h1 class="head">TRANSLATE</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            // Notify the selector when language data is loaded.
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            type="text"
            ref={sourceInput}
          />
        </div>
        <button className="change-btn" onClick={changeLang}>
          CHANGE
        </button>
        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            //
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            //Writing the response from the API to the screen.
            value={state.answer}
            className="disabled-area"
            disabled
            type="text"
            ref={targetInput}
          />
        </div>
      </div>
      <button onClick={handleClick}>Çevir</button>
    </>
  );
};

export default MainPage;