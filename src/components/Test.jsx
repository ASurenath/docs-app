import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


function Test() {

  const [value, setValue] = useState('');
  useEffect(() => {
    console.log(value)
    , [value]
  })
  console.log(value);
  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Test