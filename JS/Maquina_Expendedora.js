//! Script

//TODO: Configuración de las pilas con productos específicos
const productTypes = [
    { name: "Papas", emoji: "🍟", color: 0xffc107 },
    { name: "Refresco", emoji: "🥤", color: 0x00bcd4 },
    { name: "Dulces", emoji: "🍬", color: 0xff4081 }
];


//TODO: Principal:
document.addEventListener('DOMContentLoaded', function () {
    
    //* Inicializar visualizaciones: "Reprecentaciones Graficas"
    setupVendingMachineVisualization();
});


//TODO: Crear máquina expendedora más realista:
function createVendingMachine() {
    const machine = new THREE.Group();

    //* Cuerpo principal
    const bodyGeometry = new THREE.BoxGeometry(4, 4, 1.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x2e2e2e,
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    machine.add(body);

    //* Ventana frontal transparente (vidrio realista)
    const windowGeometry = new THREE.BoxGeometry(3, 3.2, 0.05); // un poco de grosor
    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.1,
        transparent: true,
        opacity: 0.57,
        transmission: 0.5      //? vidrio real transparente
    });
    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
    windowMesh.position.set(0, 0, 0.8); //? un poco adelante del cuerpo
    machine.add(windowMesh);

    //* Panel lateral (botonera)
    const panelGeometry = new THREE.BoxGeometry(0.7, 4, 0.1);
    const panelMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(2, 0, 0.76);
    machine.add(panel);

    //* Botones en el panel
    const buttonGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0xff5555 });
    for (let i = 0; i < 3; i++) {
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.rotation.x = Math.PI / 2;
        button.position.set(1.85, 0.2 - i * 0.6, 0.85);
        machine.add(button);
    }

    //* Pantalla pequeña (simulada)
    const screenGeometry = new THREE.PlaneGeometry(0.5, 0.3);
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff99 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(1.85, 0.8, 0.85);
    machine.add(screen);

    //* Luz interna (para iluminar productos)
    const lightInside = new THREE.PointLight(0x66ccff, 1, 10);
    lightInside.position.set(0, 0, 0.5);
    machine.add(lightInside);

    //* Base metálica
    const baseGeometry = new THREE.BoxGeometry(4.2, 0.3, 1.6);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -2.2;
    machine.add(base);

    //* Posicionar máquina un poco a la derecha
    machine.position.x = 2;

    //TODO: Aumenta el tamaño general de la máquina:
    machine.scale.set(1.5, 1.5, 1.5);

    return machine;
}


//TODO: Configuración de la visualización de la Máquina Expendedora:
function setupVendingMachineVisualization() {
    const vendingCanvas = document.getElementById('vending-canvas');
    const width = vendingCanvas.clientWidth;
    const height = vendingCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    vendingCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;
    camera.position.x = 0;

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    //! Crear la máquina expendedora
    const machine = createVendingMachine();
    scene.add(machine);

    //* Productos en la máquina - convertir a matriz de matrices para tres pilas
    const productStacks = [[], [], []]; //? Tres pilas vacias
    const maxProductsPerStack = 6;

    //TODO: Crear textura con emoji:
    function createEmojiTexture(emoji) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '100px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    //TODO: Función para crear un producto según su tipo:
    function createProduct(typeIndex) {
        const type = productTypes[typeIndex];
        const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        const texture = createEmojiTexture(type.emoji);
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            color: type.color
        });
        const product = new THREE.Mesh(geometry, material);
        return product;git update-git-for-windows

    }

    //TODO: Agregar un producto a una pila específica:
    function addProductToStack(stackIndex) {
        if (productStacks[stackIndex].length >= maxProductsPerStack) return;

        const product = createProduct(stackIndex);
        const y = -1.5 + productStacks[stackIndex].length * 0.6;
        const stackXOffset = (stackIndex - 1) * 1.0; //? -1, 0, 1 posiciones
        product.position.set(2 + stackXOffset, y, -0.2);
        product.scale.set(0, 0, 0);
        scene.add(product);
        productStacks[stackIndex].push(product);

        //* Animación de aparición
        gsap.to(product.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.5,
            ease: "elastic.out"
        });
    }


    //* Clientes en la cola
    const customers = [];

    //* Actualizar pocicion de la maquiena
    machine.position.x = 2;


    //! función para crear un "monito":
    function createHumanoid() {
        const group = new THREE.Group();

        //* Cabeza
        const headGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffd7a8 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.2;
        group.add(head);

        //* Cuerpo
        const bodyGeometry = new THREE.BoxGeometry(1.25, 2.05, 0.45);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x3498db });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        group.add(body);

        //* Piernas
        const legGeometry = new THREE.BoxGeometry(0.4, 1.1, 0.35);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.35, -0.9, 0);
        rightLeg.position.set(0.35, -0.9, 0);
        group.add(leftLeg);
        group.add(rightLeg);

        //* Brazos
        const armGeometry = new THREE.BoxGeometry(1.5, 1.3, 0.3);
        const armMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.32, 1.1, 0);
        rightArm.position.set(0.32, 1.1, 0);
        group.add(leftArm);
        group.add(rightArm);

        //* Ajustar centro
        group.position.y = -1.5;

        return group;
    }


    //TODO: Agregar cliente a la cola:
    function addCustomer() {
        const customer = createHumanoid();

        //* Posición en la cola (lado izquierdo)
        const x = -6 - customers.length * 2;
        customer.position.set(x, -1.5, 2);
        customer.scale.set(0, 0, 0);
        scene.add(customer);
        customers.push(customer);

        //* Animación de entrada
        gsap.to(customer.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.5,
            ease: "back.out"
        });
    }

    //TODO: Servir al primer cliente de la cola:
    function serveCustomer() {
        if (customers.length === 0) return;

        //* Obtener índices de todas las pilas que no están vacías
        const nonEmptyStacks = productStacks
            .map((stack, index) => ({ stack, index }))
            .filter(item => item.stack.length > 0);

        if (nonEmptyStacks.length === 0) return; // No hay productos disponibles

        //* Elegir una pila aleatoria entre las no vacías
        const randomIndex = Math.floor(Math.random() * nonEmptyStacks.length);
        const chosenStackIndex = nonEmptyStacks[randomIndex].index;

        //* Tomar el primer cliente y un producto de la pila elegida
        const customer = customers.shift();
        const product = productStacks[chosenStackIndex].pop();

        //* Animar el producto saliendo (Caida)
        gsap.to(product.position, {
            y: -1.7,
            duration: 2,
            ease: "bounce.out"
        });

        //* Animar al cliente acercarse a la máquina
        gsap.to(customer.position, {
            x: 1.5,
            z: 2,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
                //* Producto hacia el cliente
                gsap.to(product.position, {
                    x: 1.5,
                    y: -1.2,
                    duration: 0.6,
                    ease: "power1.out",
                    onComplete: () => {
                        //* Cliente sigue avanzando hacia la derecha (sale de la escena)
                        gsap.to(customer.position, {
                            x: 10,
                            duration: 2,
                            ease: "power2.inOut",
                            onComplete: () => {
                                scene.remove(customer);
                                scene.remove(product);
                            }
                        });

                        //* Producto acompaña al cliente (como si lo llevara)
                        gsap.to(product.position, {
                            x: 12,
                            y: -1.2,
                            duration: 2,
                            ease: "power2.inOut"
                        });
                    }
                });
            }
        });

        //* Mover el resto de clientes en la cola "Se Recorren"
        customers.forEach((c, i) => {
            gsap.to(c.position, {
                x: -6 - i * 2,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    //! Eventos de botones:
    document.getElementById('vending-restock').addEventListener('click', () => {
        //* Elegir aleatoriamente una pila a reabastecer
        const stackIndex = Math.floor(Math.random() * productStacks.length);
        addProductToStack(stackIndex);

        //* Añadir un cliente ocasionalmente
        if (Math.random() > 0.5) {
            addCustomer();
        }
    });

    document.getElementById('vending-serve').addEventListener('click', serveCustomer);
    document.getElementById('vending-add').addEventListener('click', addCustomer);

    //! Inicializar con algunos productos y clientes:
    //* Agregar productos a diferentes pilas
    for (let stackIndex = 0; stackIndex < 3; stackIndex++) {
        for (let i = 0; i < 2; i++) {
            addProductToStack(stackIndex);
        }
    }

    addCustomer();
    addCustomer();

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

