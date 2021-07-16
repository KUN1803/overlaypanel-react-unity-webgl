import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VFC, useState, useEffect} from 'react';
import {
  UnityContext,
  UnityRenderer,
  UnityLoaderConfig,
} from 'react-unity-renderer';
import Draggable from "react-draggable";
import { Rnd } from 'react-rnd';
import { isWhiteSpaceLike } from 'typescript';

// get those URLs from your Unity WebGL build.
// you *could* put a JSON in your WebGL template containing this information
// and load that with fetch or axios to assemble your config.
const config: UnityLoaderConfig = {
  loaderUrl: '/unitywebgl/Build/WebDemo.loader.js',
  frameworkUrl: '/unitywebgl/Build/WebDemo.framework.js',
  codeUrl: '/unitywebgl/Build/WebDemo.wasm',
  dataUrl: '/unitywebgl/Build/WebDemo.data',
};


function App() {
  var divStyle = {
    color: 'black',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 25,
    paddingLeft: 15,
  };

  const [ctx] = useState<UnityContext>(new UnityContext(config));
  // Keep track of the game progress and ready state like this:
  const [progress, setProgress] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);


  function handleBtn(){
   if(ready) ctx.emit('Cube', 'StartStopRotation');
  }

  return (
    <>
    <UnityRenderer
      context={ctx}
      // optional state information callbacks
      onUnityProgressChange={(p) => setProgress(p)}
      onUnityReadyStateChange={(s) => setReady(s)}
      onUnityError={(e) => console.error(e)}
      // <UnityRenderer> has every prop (except ref) from HTMLCanvasElement.
      // This means you can use something like style!
      // Also it works perfectly with styled-components.
      style={{ width: '100%', height: '100%' }} // optional, but a good idea.
    />
    <Rnd
  default={{
    x: 0,
    y: 0,
    width: 320,
    height: 200,
  }}
>
  <div style={divStyle}>
  <h1>A pretty Overlay Panel</h1>
  <h3>Press the button to interact with the WebGL Unity Project. The Button lets the cube start / stop rotating.</h3>
  <button onClick={()=>handleBtn()}>RotationHandler</button>
  </div>
  
</Rnd>
    </>
  );
}



export default App;
