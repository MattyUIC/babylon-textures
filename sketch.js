var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');

    //"Heavy misfortunes have befallen us, but let us only cling closer to what remains, and transfer our love for those whom we have lost to those who yet live."
    //Page 276


    //create spheres
    var death = createSphere(-2, 1, 0 , 2);
    var life = createSphere(2, 1, 0, 2);
    var darkness = createSphere(0, -3, 0, 2);

    
    death.material = fileMat('/babylon-textures/imgs/Fire_Sky.jpg', scene);
    life.material = fileMat('/babylon-textures/imgs/golden_sky.jpg', scene);
    darkness.material = fileMat('/babylon-textures/imgs/void.jpg', scene);
    
    //create box with params x, y, z, width, height, ddepth
    // var b1 = createBox(2, -2, 2, 1, 1, 1);

    // //wrap box in material colored with hex code
    // b1.material = hexMat('#ff0000');
    // b1.rotation.z += Math.PI/4;

    // var b2 = createBox(0, -2, -1.5, 2, 2, 2);

    // //wrap box in material from local file
    // b2.material = fileMat('why.png');

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});