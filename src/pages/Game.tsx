
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unityBuild/JUEGO_NIDE.loader.js",
    dataUrl: "/unityBuild/JUEGO_NIDE.data.unityweb",
    frameworkUrl: "/unityBuild/JUEGO_NIDE.framework.js.unityweb",
    codeUrl: "/unityBuild/JUEGO_NIDE.wasm.unityweb",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {isLoaded === false && (
        <p>Cargando Juego... {loadingPercentage}%</p>
      )}

      <Unity 
        unityProvider={unityProvider} 
        style={{ 
          width: "960px", 
          height: "600px",
          visibility: isLoaded ? "visible" : "hidden"
        }} 
      />
    </div>
  );
};

export default Game;