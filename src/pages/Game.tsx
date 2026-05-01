
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data.unityweb",
    frameworkUrl: "/Build/Build.framework.js.unityweb",
    codeUrl: "/Build/Build.wasm.unityweb",
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
          width: "100%", 
          height: "100%",
          visibility: isLoaded ? "visible" : "hidden"
        }} 
      />
    </div>
  );
};

export default Game;