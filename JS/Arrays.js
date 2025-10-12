//! Arrays:
//TODO: ARREGLO UNIDIMENSIONAL (VECTOR):
function setupVectorVisualization() {
    const container = document.getElementById('vector-canvas');
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let scene, camera, renderer, vectorGroup;

    const vectorData = [
        { value: 10, color: 0x00FFFF },
        { value: 25, color: 0xFF00FF },
        { value: 40, color: 0xFFFF33 },
        { value: 55, color: 0x33FF33 },
        { value: 70, color: 0xA35050 }
    ];
    const numElements = vectorData.length;
    const spacing = 1.8;
    const FIXED_SCALE_FACTOR = 1.8;

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        camera.position.z = 10;
        camera.position.y = 1.5;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        container.appendChild(renderer.domElement);

        //* Iluminación
        const light = new THREE.DirectionalLight(0xffffff, 4);
        light.position.set(5, 10, 5).normalize();
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040, 3));

        //* Elementos del Vector
        vectorGroup = new THREE.Group();
        scene.add(vectorGroup);

        const totalWidth = (numElements - 1) * spacing;
        const startX = -totalWidth / 2;

        for (let i = 0; i < numElements; i++) {
            const data = vectorData[i];
            const xPos = startX + i * spacing;
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshPhongMaterial({ color: data.color, emissive: 0x000000, shininess: 50 });
            const cube = new THREE.Mesh(geometry, material);

            cube.scale.y = FIXED_SCALE_FACTOR;
            cube.position.set(xPos, (1.5 * FIXED_SCALE_FACTOR) / 2, 0);
            vectorGroup.add(cube);
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        vectorGroup.rotation.y += 0.005;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        }
    }

    init();
    animate();
    window.addEventListener('resize', onWindowResize);
}

//TODO: ARREGLO BIDIMENSIONAL (MATRIZ)
function setupMatrixVisualization() {
    const container = document.getElementById('Matriz-canvas');
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let scene, camera, renderer, matrixGroup;

    const rows = 3;
    const cols = 4;
    const colors = [0x00FFFF,0xFF00FF,0xFFFF33,0xFF3333 ];
    const boxSize = 1.0;
    const spacing = 1.2;
    const FIXED_SCALE_FACTOR = 1.5;

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        camera.position.set(0, 5, 8);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        container.appendChild(renderer.domElement);

        //* Iluminación
        const light = new THREE.DirectionalLight(0xffffff, 4);
        light.position.set(5, 10, 5).normalize();
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040, 3));

        //* Elementos de la Matriz
        matrixGroup = new THREE.Group();
        scene.add(matrixGroup);

        const totalWidth = (cols - 1) * spacing;
        const totalDepth = (rows - 1) * spacing;
        const startX = -totalWidth / 2;
        const startZ = -totalDepth / 2;

        for (let r = 0; r < rows; r++) { //? Filas (Z)
            for (let c = 0; c < cols; c++) { //? Columnas (X)
                const xPos = startX + c * spacing;
                const zPos = startZ + r * spacing;
                const color = colors[c % colors.length];

                const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
                const material = new THREE.MeshPhongMaterial({ color: color, emissive: 0x000000, shininess: 50 });
                const cube = new THREE.Mesh(geometry, material);

                cube.scale.y = FIXED_SCALE_FACTOR;
                cube.position.set(xPos, (boxSize * FIXED_SCALE_FACTOR) / 2, zPos);
                matrixGroup.add(cube);
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        matrixGroup.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        }
    }

    init();
    animate();
    window.addEventListener('resize', onWindowResize);
}


//TODO: ARREGLO TRIDIMENSIONAL (CUBO 3x3x3) 
function setupCubeVisualization() {
    const container = document.getElementById('Matriz-Matrizes-canvas');
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let scene, camera, renderer, cubeGroup;

    const layers = 3;
    const rows = 3;
    const cols = 3;
    const baseColors = [0x00FFFF,0xFF00FF,0xFFFF33 ]; 
    
    const boxSize = 1.0;
    const spacing = 1.2;

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        camera.position.set(6, 6, 6);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        container.appendChild(renderer.domElement);

        //* Iluminación
        const light = new THREE.DirectionalLight(0xffffff, 4);
        light.position.set(10, 10, 10).normalize();
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040, 3));

        //* Elementos del Cubo
        cubeGroup = new THREE.Group();
        scene.add(cubeGroup);

        const totalDimensionX = (cols - 1) * spacing;
        const totalDimensionY = (layers - 1) * spacing;
        const totalDimensionZ = (rows - 1) * spacing;

        const startX = -totalDimensionX / 2;
        const startY = -totalDimensionY / 2;
        const startZ = -totalDimensionZ / 2;

        for (let l = 0; l < layers; l++) { //? Capas (Y)
            for (let r = 0; r < rows; r++) { //? Filas (Z)
                for (let c = 0; c < cols; c++) { //? Columnas (X)

                    const xPos = startX + c * spacing;
                    const yPos = startY + l * spacing;
                    const zPos = startZ + r * spacing;

                    const baseColor = baseColors[l % baseColors.length];
                    const materialColor = new THREE.Color(baseColor);

                    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
                    const material = new THREE.MeshPhongMaterial({ color: materialColor, emissive: 0x000000, shininess: 50 });
                    const cube = new THREE.Mesh(geometry, material);

                    cube.position.set(xPos, yPos, zPos);

                    cubeGroup.add(cube);
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        cubeGroup.rotation.y += 0.003;
        cubeGroup.rotation.x += 0.001;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        }
    }

    init();
    animate();
    window.addEventListener('resize', onWindowResize);
}


window.addEventListener('load', () => {
    setupVectorVisualization();
    setupMatrixVisualization();
    setupCubeVisualization();
});
