import { useCallback, useEffect, useState, useRef} from 'react'

function App() {
    const [length, setLength] = useState("8");
    const [numallowed, setNumAllowed] = useState(false);
    const [charallowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passsordRef = useRef(null)
    const passGenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numallowed){
        str += "0123456789";
      }
      if(charallowed){
        str += "`~!@#$%^&*-_=+[]{}";
      }

      for(let i = 1; i<=length; i++){
        let char = Math.floor(Math.random() * str.length +1);
        pass += str.charAt(char);
      }

      setPassword(pass);

    },[length, numallowed, charallowed, setPassword]);


    const copyPassToClipboard = useCallback(()=>{
      passsordRef.current ?.select();
      passsordRef.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passGenerator()
    },[length, numallowed, charallowed, passGenerator])

  return (
    <>
      <div className='w-full max-w-md shadow-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center text-white my-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3'
              type='text'
              value={password}
              placeholder='Password'
              readOnly
              ref={passsordRef}
          />
          <button onClick={copyPassToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer'
              type='range'
              min={6}
              max={100}
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked = {numallowed}
            id='numberInput'
            onChange={()=> {
              setNumAllowed((prev)=> !prev);
            }}
            />
            <label htmlFor='numberIput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
              defaultChecked = {charallowed}
              id='characterInput'
              onChange={()=>{
                setCharAllowed((prev)=> !prev);
              }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
