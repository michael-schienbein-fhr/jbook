import * as esbuild from 'esbuild-wasm';
import {useState, useEffect, useRef} from "react";

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = () => {
        if(initialized) return
        try {
            esbuild.initialize({
                worker: true,
                wasmURL: '/esbuild.wasm'
            }).then(r => {
                setInitialized(true);
            });
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        startService();
    }, []);
    
    const onClick = () => {
        if(!initialized) return;
        try {
            esbuild.transform(input,{
                loader: 'jsx',
                target: 'es2015'
            }).then((res: any) => setCode(res.code));
        } catch (err) {
            console.error(err)
        }
    }
    return (
    <div className="App">
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
  );
}

export default App;
