import './App.css';
import XLSX from 'xlsx';

import { SheetJSFT } from './types';
import { useState } from 'react';

function App() {

  //const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState();

  // function handleChange(e) {
  //   const files = e.target.files;
  //   console.log(files[0]);

  //   // if (files && files[0]) {
  //   //   setFile(files[0]);
  //   // }
  // }

  function handleFile(ex) {
    const bb = document.querySelector('input').files[0];
    console.log(bb);
    const files =ex.target.files;
    
      setFile(files[0]);
    
   // console.log(Files[0]);
    /* Boilerplate to set up FileReader */
    const reader = new FileReader(bb);
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
      console.log(data);
     // setCols(make_cols(ws['!ref']));
      
        // console.log(JSON.stringify(data, null, 2));
       // console.log(cols);
      
    };
    

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }

    ;
  }


  async function test() {
     const file =  document.querySelector('input').files[0];
   
    console.log(file);

    
    try {
      /* Boilerplate to set up FileReader */
      const reader = await new FileReader();
      const rABS = !!reader.readAsBinaryString;
  
      reader.onload = (e) => {
        /* Parse data */
        
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const kata = XLSX.utils.sheet_to_json(ws);

        setData(kata);
        console.log(kata);
        
        /* Update state */
        // this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        //   console.log(JSON.stringify(this.state.data, null, 2));
        // });
  
      };
  
      if (rABS) {
        reader.readAsBinaryString(file);
      }
       else {
        reader.readAsArrayBuffer(file);
      };
  } catch(err) {
    console.log(err);
  }

    




  }

  return (
    <div>
        <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={test} />
        <br />
        <input type='submit' value="Process Triggers" />
        {data.length}
    </div>
  );
}

export default App;
