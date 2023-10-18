import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from './constants';


export const getAnswer = createAsyncThunk(
  'translate/getAnswer',
  async (param) => {
    // When the action is run, we get the source and target language and sentence.
    console.log(param);
    // The information we will send when placing a request.
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', param.sourceLang.value);
    encodedParams.set('target_language', param.targetLang.value);
    encodedParams.set('text', param.text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key':
          '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };
    // API request section.
    const res = await axios.request(options);

    // It is necessary to return to transfer the data to the slice.
    return res.data.data.translatedText;
  }
);

// Action to pull languages data.
export const getLanguages = createAsyncThunk(
  'translate/getLanguages',
  async () => {
 // API request section.
    const res = await axios.request(options);
    const languages = res.data.data.languages;
    /*
     * we returned the array and the objects in the array
      * code and name values
      * we replaced value and label with value
      * and we created a new array
     */
    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));
    // transfer data to slice
    return newLanguages;
  }
);

