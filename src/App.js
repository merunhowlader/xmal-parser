import './App.css';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import { useState } from 'react';

function App() {

  const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState({});

  function handleChange(e) {
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  }

  function handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        bookVBA: true
      });
      /* Get first worksheet */

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */

      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */

      setData(data);
      setCols(make_cols(ws['!ref']));
      
        // console.log(JSON.stringify(data, null, 2));
        console.log(cols);
      
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }

    ;
  }

  return (
    <div>
        <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
        <br />
        <input type='submit' value="Process Triggers" onClick={handleFile} />
    </div>
  );
}

export default App;
