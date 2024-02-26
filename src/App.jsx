import { useState, useCallback,useEffect,useRef } from 'react'


function App() {
  const[length, setLength] = useState(8)
  const[numallowed, setNumallowed] = useState(false);
  const[char, setChar] = useState(false)
  const[password, setPassword] = useState("")
  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed) str += "0123456789"
    if(setChar) str += "!@#$%^&*()_+=-/{}[]~`?"

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numallowed, char, setPassword])
  const copyPasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numallowed, passwordGenerator, setChar])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-green-400 bg-gray-700'> 
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value = {password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />

        <button onClick={copyPasswordtoclipboard}
         className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700'> copy </button>
      </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min= {6}
          max = {50}
          value = {length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}} />
          <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numallowed}
            id = "numberInput"
            onChange={() => {
              setNumallowed((prev) => !prev)
            }} />
            <label htmlFor="numberInput"> Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numallowed}
            id = "characterInput"
            onChange={() => {
              setChar((prev)=> !prev)
            }} />
            <label htmlFor="characterInput"> Characters</label>

            </div>

        </div>
       </div>
    </>
  )
}

export default App
