//! Script 

//TODO: Data para el glosario
const terminosData = [
    {
        termino: "TDA",
        definicion: "Tipo de Dato Abstracto. Conjunto de datos con operaciones asociadas y una interfaz que abstrae su implementación."
    },
    {
        termino: "LIFO",
        definicion: "Last In, First Out. Principio de las pilas donde el último elemento en entrar es el primero en salir."
    },
    {
        termino: "FIFO",
        definicion: "First In, First Out. Principio de las colas donde el primer elemento en entrar es el primero en salir."
    },
    {
        termino: "Nodo",
        definicion: "Bloque básico de construcción para estructuras de datos como listas enlazadas y árboles. Contiene datos y referencias a otros nodos."
    },
    {
        termino: "Puntero",
        definicion: "Variable que almacena la dirección de memoria de otra variable o estructura."
    },
    {
        termino: "Recursividad",
        definicion: "Técnica de programación donde una función se llama a sí misma para resolver un problema dividiéndolo en subproblemas más pequeños."
    },
    {
        termino: "Árbol Binario",
        definicion: "Estructura jerárquica donde cada nodo tiene como máximo dos hijos: izquierdo y derecho."
    },
    {
        termino: "Caso Base",
        definicion: "En recursión, es la condición que detiene las llamadas recursivas y previene bucles infinitos."
    }
];
const terminosExtra = [
    {
        termino: "NULL",
        definicioninicion: "Representa la ausencia de un valor o la falta de información. El elemento existe, pero no posee valor."
    },
    {
        termino: "DELETE",
        definicion: "Operación utilizada para eliminar un elemento de una estructura de datos. Remueve el valor, dejando el espacio vacío."
    },
    {
        termino: "EMPTY",
        definicion: "Condición que indica que una estructura de datos (pila o cola) no contiene elementos. No modifica la estructura."
    },
    {
        termino: "Apuntador (*)",
        definicion: "Se representa con un asterisco y su función es guardar direcciones en memoria."
    },
    {
        termino: "Iterador",
        definicion: "Variable indexada inteligente que lleva el control de la estructura. Solo se usa con estructuras."
    },
    {
        termino: "Índice",
        definicion: "Número que identifica la posición de un elemento en colecciones de una sola dimensión (vectores/arreglos)."
    },{
        termino: "Estáticas",
        definicion: "Tienen un tamaño fijo que se definicionine al momento de crearlas y no cambia. Usan memoria contigua."
    },
    {
        termino: "Dinámicas",
        definicion: "Tienen un tamaño variado. Pueden crecer o reducirse durante la ejecución. Usan memoria no contigua mediante punteros o referencias."
    },
    {
        termino: "Lineales",
        definicion: "Los elementos se almacenan secuencialmente, uno detrás de otro. Cada elemento tiene un predecesor y un sucesor (excepto primero y último)."
    },
    {
        termino: "No Lineales",
        definicion: "Los elementos no siguen una secuencia, sino que se organizan de manera jerárquica o en forma de red (Ej. Árboles)."
    }
];

//TODO: Variables de audio (deben estar accesibles en todo el script)
let pushEnqueuesound;
let popDequeuesound;


//TODO: Cargar datos del glosario:
document.addEventListener('DOMContentLoaded', function () {
    const glosarioContainer = document.getElementById('terminos-list');
    const glosarioExtContainer = document.getElementById('terminosExt-list');
    //*Sonidos: asignar después de que el DOM exista
    pushEnqueuesound = document.getElementById("push-Enqueue-sound");
    popDequeuesound = document.getElementById("pop-Dequeue-sound");

    //* Llenar el glosario
    terminosData.forEach(item => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card';
        termCard.innerHTML = `
                    <h4>${item.termino}</h4>
                    <p>${item.definicion}</p>
                `;
        glosarioContainer.appendChild(termCard);
    });
    
    //* Llenar el glosario Extras
    terminosExtra.forEach(item => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card';
        termCard.innerHTML = `
                    <h4>${item.termino}</h4>
                    <p>${item.definicion}</p>
                `;
        glosarioExtContainer.appendChild(termCard);
    });

    //* Inicializar visualizaciones: "Reprecentaciones Graficas"
    setupStackVisualization();
    setupQueueVisualization();
    setupTreeVisualization();
    setupListVisualization();
    setupRecursionVisualization();

    //* Listener para "priming" de audio al primer click del usuario
    // Esto permite que los navegadores permitan la reproducción posterior sin interacción adicional.
    document.body.addEventListener("click", () => {
        if (pushEnqueuesound) {
            //* intentar reproducir y pausar inmediatamente para "unlock" audio
            const p = pushEnqueuesound.play();
            if (p && p.then) p.then(() => pushEnqueuesound.pause()).catch(() => {});
        }
        if (popDequeuesound) {
            const p2 = popDequeuesound.play();
            if (p2 && p2.then) p2.then(() => popDequeuesound.pause()).catch(() => {});
        }
    }, { once: true });
});

//! Alertas personalizadas
function showAlert(title, message, type = "info") {
    let iconColor;
    switch (type) {
        case "success":
            iconColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-green');
            break;
        case "error":
            iconColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-purple');
            break;
        case "warning":
            iconColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-yellow');
            break;
        default:
            iconColor = '#ffffff';
    }

    Swal.fire({
        title: title,
        text: message,
        icon: type,
        iconColor: iconColor,
        background: getComputedStyle(document.documentElement).getPropertyValue('--bg-card'),
        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
        showConfirmButton: true,
        confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-green')
    });
}


//TODO: Configuración de la visualización de Pilas:
function setupStackVisualization() {
    //TODO: Configuración Three.js para el stack
    const stackCanvas = document.getElementById('stack-canvas');
    //? Obtener las dimensiones visibles del canvas (en píxeles) para configurar el tamaño del renderizado:
    const width = stackCanvas.clientWidth;
    const height = stackCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true }); //? Crea el renderizador WebGL de Three.js. | { antialias: true }: suaviza los bordes de los objetos (evita que se vean "dientes de sierra").
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    stackCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene(); //? Crea una escena 3D donde estarán todos los objetos.
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000); //? Crea una cámara en perspectiva. El 75 es el campo de visión.
    camera.position.z = 5; //? Se coloca la cámara un poco separada (z = 5) para ver los objetos.

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1); //? Añade luz: direccional (como la del sol).
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); //? Añade luz: ambiente (suaviza las sombras).
    light.position.set(0, 5, 10);
    scene.add(ambientLight);

    //* Crear elementos de la pila
    const stack = [];
    const maxStackSize = 5;
    const boxGeometry = new THREE.BoxGeometry(2, 0.5, 1); //? Define la forma base de cada elemento (una caja rectangular).

    //* Base de la pila
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 1.5);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.5;
    scene.add(base);

    //* Indicador del Tope
    const topeDiv = document.createElement('div');
    topeDiv.style.position = 'absolute';
    topeDiv.style.color = '#00ff9d';
    topeDiv.style.fontFamily = "'Space Mono', monospace";
    topeDiv.style.fontSize = '16px';
    topeDiv.style.fontWeight = '700';
    topeDiv.style.display = 'none'; // oculto al inicio
    topeDiv.textContent = '← Tope';
    stackCanvas.appendChild(topeDiv);

    //TODO: Función para actualizar posición del texto "← Tope"
    const tempVector = new THREE.Vector3();
    function updateTopLabelPosition() {
        if (stack.length > 0) {
            const topBox = stack[stack.length - 1];
            tempVector.copy(topBox.position);
            tempVector.project(camera);

            const x = (tempVector.x * 0.5 + 0.5) * width;
            const y = (-tempVector.y * 0.5 + 0.5) * height;
            topeDiv.style.left = `${x + 30}px`;
            topeDiv.style.top = `${y - 13}px`;
            topeDiv.style.display = 'block';
        } else {
            topeDiv.style.display = 'none';
        }
    }

    //TODO: Eventos de botones
    document.getElementById('stack-push').addEventListener('click', () => {
        if (stack.length < maxStackSize) {
            const colors = [0x00ff9d, 0x00d9ff, 0xc67fff, 0xffde59, 0xff6b6b];
            const material = new THREE.MeshPhongMaterial({ color: colors[stack.length % colors.length] });
            const box = new THREE.Mesh(boxGeometry, material); //? Crea un cubo con un color distinto.
            box.position.y = -1.2 + (stack.length * 0.6); //? Lo posiciona justo encima del anterior.
            box.scale.set(0.1, 0.1, 0.1);
            scene.add(box);
            stack.push(box);

            //* Animación con GSAP
            gsap.to(box.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out" }); //? Lo anima desde una escala pequeña (0.1) hasta tamaño completo (1) con un efecto de rebote.

            //* Actualizar el indicador del Tope
            updateTopLabelPosition();

            //* Reproducir sonido de push
            if (pushEnqueuesound) {
                pushEnqueuesound.pause();
                pushEnqueuesound.currentTime = 0;
                pushEnqueuesound.play().catch(() => {});
            }
        } else {
            //* Desbordamiento (Overflow)
            showAlert("Stack Overflow!", "La pila está llena. No puedes agregar más elementos hasta que elimines algunos.", "error");
        }
    });

    document.getElementById('stack-pop').addEventListener('click', () => {
        if (stack.length > 0) {
            const box = stack.pop(); //? Toma el último cubo.
            //? Animacion de desaparecer (encogerse).
            gsap.to(box.scale, {
                x: 0.1, y: 0.1, z: 0.1,
                duration: 0.5,
                ease: "back.in",
                onComplete: () => {
                    scene.remove(box); //? Lo elimina de la escena.
                }
            });

            //* Actualizar el indicador del Tope
            updateTopLabelPosition();

            //* Reproducir sonido de pop
            if (popDequeuesound) {
                popDequeuesound.pause();
                popDequeuesound.currentTime = 0;
                popDequeuesound.play().catch(() => {});
            }
        } else {
            //* Subdesbordamiento (Underflow)
            showAlert("Stack Underflow!", "La pila está vacía. No se pueden extraer elementos porque no quedan ninguno.", "error");
        }
    });

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

//TODO: Configuración de la visualización de Colas
function setupQueueVisualization() {
    const queueCanvas = document.getElementById('queue-canvas');
    const width = queueCanvas.clientWidth;
    const height = queueCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    queueCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    //* Crear elementos de la cola
    const queue = [];
    const maxQueueSize = 4;
    const boxGeometry = new THREE.BoxGeometry(1, 0.8, 0.8);

    //* Base de la cola
    const baseGeometry = new THREE.BoxGeometry(6, 0.2, 1.5);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    scene.add(base);

    //* Marcadores de entrada/salida
    const createMarker = (x, color, text) => {
        const geometry = new THREE.ConeGeometry(0.4, 0.8, 32);
        const material = new THREE.MeshPhongMaterial({ color });
        const cone = new THREE.Mesh(geometry, material);
        cone.position.set(x, 0, 0);
        cone.rotation.z = Math.PI / 2;
        scene.add(cone);

        //* Etiqueta
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.color = '#' + color.toString(16).padStart(6, '0');
        div.style.fontFamily = 'Space Mono, monospace';
        div.style.fontWeight = 'bold';
        div.style.fontSize = '12px';
        div.textContent = text;
        div.style.bottom = (x > 0 ? '10px' : '10px');
        div.style.right = (x > 0 ? '10px' : 'auto');
        div.style.left = (x < 0 ? '10px' : 'auto');
        queueCanvas.appendChild(div);
    };

    createMarker(-2.5, 0xc67fff, 'SALIDA');
    createMarker(2.5, 0x00d9ff, 'ENTRADA');

    //TODO: Eventos de botones
    document.getElementById('queue-enqueue').addEventListener('click', () => {
        if (queue.length < maxQueueSize) {
            const colors = [0x00ff9d, 0x00d9ff, 0xc67fff, 0xffde59];
            const material = new THREE.MeshPhongMaterial({ color: colors[queue.length % colors.length] });
            const box = new THREE.Mesh(boxGeometry, material);

            //* Empieza fuera de la vista a la derecha
            box.position.set(4, 0, 0);
            box.scale.set(0.1, 0.1, 0.1);
            scene.add(box);
            queue.push(box);

            //* Reordenar toda la cola
            repositionQueue();

            //* Reproducir sonido de Enqueu
            if (pushEnqueuesound) {
                pushEnqueuesound.pause();
                pushEnqueuesound.currentTime = 0;
                pushEnqueuesound.play().catch(() => {});
            }
        } else {
            //* Desbordamiento (Overflow)
            showAlert("Queue Overflow!", "La cola está llena. No puedes agregar más elementos hasta que elimines algunos.", "error");
        }
    });

    document.getElementById('queue-dequeue').addEventListener('click', () => {
        if (queue.length > 0) {
            const box = queue.shift();
            gsap.to(box.position, {
                x: -4,
                duration: 0.7,
                ease: "power2.inOut",
                onComplete: () => {
                    scene.remove(box);
                }
            });

            //* Reordenar la cola después de eliminar
            setTimeout(repositionQueue, 100);
            
            //* Reproducir sonido de Dequeue
            if (popDequeuesound) {
                popDequeuesound.pause();
                popDequeuesound.currentTime = 0;
                popDequeuesound.play().catch(() => {});
            }
        } else {
            //* Subdesbordamiento (Underflow)
            showAlert('Queue Underflow!', 'La cola está vacía. No puedes eliminar elementos porque no hay ninguno.', 'warning');
        }
    });

    function repositionQueue() {
        queue.forEach((box, index) => {
            const targetX = 1.5 - (index * 1.2);
            const targetScale = 1;

            gsap.to(box.position, {
                x: targetX,
                duration: 0.7,
                ease: "power2.out"
            });

            gsap.to(box.scale, {
                x: targetScale,
                y: targetScale,
                z: targetScale,
                duration: 0.5,
                ease: "back.out"
            });
        });
    }

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

//TODO: Configuración de la visualización de Árboles
function setupTreeVisualization() {
    const treeCanvas = document.getElementById('tree-canvas');
    const width = treeCanvas.clientWidth;
    const height = treeCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    treeCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y = 1;

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    //* Clase para nodos del árbol
    class TreeNode {
        constructor(value, x, y, color) {
            this.value = value;
            this.left = null;
            this.right = null;
            this.x = x;
            this.y = y;
            this.color = color;

            //* Crear la esfera para el nodo
            const geometry = new THREE.SphereGeometry(0.4, 32, 32);
            const material = new THREE.MeshPhongMaterial({ color });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.set(x, y, 0);
            this.mesh.scale.set(0, 0, 0);
            scene.add(this.mesh);

            //* Animación de entrada
            gsap.to(this.mesh.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.5,
                ease: "back.out"
            });
        }
    }

    //* Función para crear líneas entre nodos
    function createLine(startNode, endNode) {
        const material = new THREE.LineBasicMaterial({ color: 0x666666 });
        const points = [
            new THREE.Vector3(startNode.x, startNode.y, 0),
            new THREE.Vector3(endNode.x, endNode.y, 0)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        return line;
    }

    //* Crear árbol binario simple para demostración
    let root = null;
    const lines = [];

    //* Función para agregar nodo
    function addNode(value) {
        const colors = [0x00ff9d, 0x00d9ff, 0xc67fff, 0xffde59, 0xff6b6b];

        if (!root) {
            root = new TreeNode(value, 0, 2, colors[0]);
            return;
        }

        //* Calcular posición para nuevo nodo
        function insert(node, level = 1, direction = 0) {
            const spacing = 3 / Math.pow(2, level);

            if (Math.random() > 0.5 && !node.left) {
                const newX = node.x - spacing;
                const newY = node.y - 1.2;
                const newNode = new TreeNode(value, newX, newY, colors[level % colors.length]);
                node.left = newNode;
                lines.push(createLine(node, newNode));
                return true;
            } else if (!node.right) {
                const newX = node.x + spacing;
                const newY = node.y - 1.2;
                const newNode = new TreeNode(value, newX, newY, colors[level % colors.length]);
                node.right = newNode;
                lines.push(createLine(node, newNode));
                return true;
            }

            //* Si ambos hijos existen, intentar insertar en uno de ellos
            if (node.left && Math.random() > 0.5) {
                return insert(node.left, level + 1, -1);
            } else if (node.right) {
                return insert(node.right, level + 1, 1);
            } else if (node.left) {
                return insert(node.left, level + 1, -1);
            }

            return false;
        }

        insert(root);

        //* Reproducir sonido de insertNodo
        if (pushEnqueuesound) {
            pushEnqueuesound.pause();
            pushEnqueuesound.currentTime = 0;
            pushEnqueuesound.play().catch(() => {});
        }
    }

    //* Función para eliminar un nodo hoja aleatorio
    function removeLeafNode() {
        if (!root) return;

        //* Encontrar nodos hoja
        const leafNodes = [];

        function findLeaves(node, parent = null, isLeft = false) {
            if (!node) return;

            if (!node.left && !node.right) {
                leafNodes.push({ node, parent, isLeft });
            }

            if (node.left) findLeaves(node.left, node, true);
            if (node.right) findLeaves(node.right, node, false);
        }

        findLeaves(root);

        //* Si hay nodos hoja, eliminar uno aleatorio
        if (leafNodes.length > 0) {
            const index = Math.floor(Math.random() * leafNodes.length);
            const { node, parent, isLeft } = leafNodes[index];

            //* Animación de salida
            gsap.to(node.mesh.scale, {
                x: 0, y: 0, z: 0,
                duration: 0.5,
                ease: "back.in",
                onComplete: () => {
                    scene.remove(node.mesh);

                    //* Eliminar la línea conectora
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        const start = new THREE.Vector3(parent.x, parent.y, 0);
                        const end = new THREE.Vector3(node.x, node.y, 0);

                        //* Verificar si esta es la línea que conecta los nodos
                        const points = line.geometry.attributes.position;
                        const p1 = new THREE.Vector3(points.getX(0), points.getY(0), points.getZ(0));
                        const p2 = new THREE.Vector3(points.getX(1), points.getY(1), points.getZ(1));

                        if ((p1.distanceTo(start) < 0.1 && p2.distanceTo(end) < 0.1) ||
                            (p1.distanceTo(end) < 0.1 && p2.distanceTo(start) < 0.1)) {
                            scene.remove(line);
                            lines.splice(i, 1);
                            break;
                        }
                    }

                    //* Eliminar referencia del padre
                    if (parent) {
                        if (isLeft) parent.left = null;
                        else parent.right = null;
                    } else {
                        root = null;
                    }
                }
            });
        }

        //* Reproducir sonido de RemoverNodo
        if (popDequeuesound) {
            popDequeuesound.pause();
            popDequeuesound.currentTime = 0;
            popDequeuesound.play().catch(() => {});
        }
    }

    //* Agregar raíz inicial
    addNode(1);

    //* Eventos de botones
    document.getElementById('tree-insert').addEventListener('click', () => {
        addNode(Math.floor(Math.random() * 100));
    });

    document.getElementById('tree-delete').addEventListener('click', () => {
        removeLeafNode();
    });

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

//TODO: Configuración de la visualización de Listas
function setupListVisualization() {
    const listCanvas = document.getElementById('list-canvas');
    const width = listCanvas.clientWidth;
    const height = listCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    listCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    //* Nodos y flechas de la lista enlazada
    const nodes = [];
    const arrows = [];
    const maxNodes = 5;

    //* Crear un nodo para la lista
    function createNode(position) {
        const group = new THREE.Group();

        //* Bloque del nodo (datos)
        const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.3);
        const colors = [0x00ff9d, 0x00d9ff, 0xc67fff, 0xffde59, 0xff6b6b];
        const material = new THREE.MeshPhongMaterial({ color: colors[nodes.length % colors.length] });
        const box = new THREE.Mesh(boxGeometry, material);
        group.add(box);

        //* Bloque del puntero
        const pointerGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.3);
        const pointerMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
        pointer.position.x = 0.6;
        group.add(pointer);

        group.position.copy(position);
        group.scale.set(0, 0, 0);
        scene.add(group);

        //* Animación de entrada
        gsap.to(group.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.5,
            ease: "back.out"
        });

        return group;
    }

    //* Crear una flecha entre nodos
    function createArrow(startNode, endNode) {
        const start = new THREE.Vector3().copy(startNode.position);
        start.x += 0.8;

        const end = new THREE.Vector3().copy(endNode.position);
        end.x -= 0.4;

        //* Crear línea
        const material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const arrow = new THREE.Line(geometry, material);
        scene.add(arrow);

        //* Crear punta de flecha
        const dir = new THREE.Vector3().subVectors(end, start).normalize();
        const arrowHead = new THREE.ConeGeometry(0.1, 0.2, 8);
        const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        const arrowMesh = new THREE.Mesh(arrowHead, arrowMaterial);
        arrowMesh.position.copy(end);
        arrowMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        arrowMesh.rotateX(Math.PI / 2);
        scene.add(arrowMesh);

        return { line: arrow, head: arrowMesh };
    }

    //* Agregar nodo al final de la lista
    function addNode() {
        if (nodes.length >= maxNodes) return;

        const x = -2 + nodes.length * 1.2;
        const newNode = createNode(new THREE.Vector3(x, 0, 0));

        //* Si hay nodos anteriores, conectar con flecha
        if (nodes.length > 0) {
            const lastNode = nodes[nodes.length - 1];
            const arrow = createArrow(lastNode, newNode);
            arrows.push(arrow);
        }

        nodes.push(newNode);

        //* Reproducir sonido de Add
        if (pushEnqueuesound) {
            pushEnqueuesound.pause();
            pushEnqueuesound.currentTime = 0;
            pushEnqueuesound.play().catch(() => {});
        }
    }

    //* Eliminar el último nodo
    function removeNode() {
        if (nodes.length === 0) return;

        const nodeToRemove = nodes.pop();

        //* Animación de salida
        gsap.to(nodeToRemove.scale, {
            x: 0, y: 0, z: 0,
            duration: 0.5,
            ease: "back.in",
            onComplete: () => {
                scene.remove(nodeToRemove);
            }
        });

        //* Si había una flecha conectando este nodo, eliminarla
        if (arrows.length > 0) {
            const arrowToRemove = arrows.pop();
            scene.remove(arrowToRemove.line);
            scene.remove(arrowToRemove.head);
        }

        //* Reproducir sonido de remove
        if (popDequeuesound) {
            popDequeuesound.pause();
            popDequeuesound.currentTime = 0;
            popDequeuesound.play().catch(() => {});
        }
    }

    //TODO: Eventos de botones
    document.getElementById('list-insert').addEventListener('click', addNode);
    document.getElementById('list-delete').addEventListener('click', removeNode);

    //* Agregar nodo inicial
    addNode();

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

//TODO: Configuración de la visualización de Recursividad
function setupRecursionVisualization() {
    const recursionCanvas = document.getElementById('recursion-canvas');
    const width = recursionCanvas.clientWidth;
    const height = recursionCanvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x252525);
    recursionCanvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    //* Iluminación
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    //* Variables para la animación de recursión
    let callStack = [];
    let animationInProgress = false;

    //* Crear elemento de la pila de llamadas
    function createStackFrame(n, x, y) {
        const group = new THREE.Group();

        //* Marco para la llamada
        const frameGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.3);
        const frameMaterial = new THREE.MeshPhongMaterial({
            color: n === 0 ? 0x00ff9d : 0x00d9ff,
            transparent: true,
            opacity: 0.9
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        group.add(frame);

        //* Texto para el valor de n
        const textDiv = document.createElement('div');
        textDiv.className = 'stack-text';
        textDiv.style.position = 'absolute';
        textDiv.style.color = '#ffffff';
        textDiv.style.fontFamily = 'Space Mono, monospace';
        textDiv.style.fontWeight = 'bold';
        textDiv.style.fontSize = '12px';
        textDiv.style.textAlign = 'center';
        textDiv.style.marginTop = '50px';
        textDiv.style.width = '40px';
        textDiv.style.height = '20px';
        textDiv.innerHTML = `n=${n}`;
        recursionCanvas.appendChild(textDiv);

        //* Posicionar el grupo
        group.position.set(x, y, 0);
        group.scale.set(0, 0, 0);
        scene.add(group);

        //* Animación de entrada
        gsap.to(group.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.3,
            ease: "back.out"
        });

        return { group, textDiv };
    }

    //* Actualizar posición del texto
    function updateTextPosition() {
        callStack.forEach((frame, i) => {
            if (frame.textDiv) {
                //* Convertir posición 3D a 2D
                const vector = new THREE.Vector3();
                vector.setFromMatrixPosition(frame.group.matrixWorld);
                vector.project(camera);

                const x = (vector.x * 0.5 + 0.5) * recursionCanvas.clientWidth;
                const y = (-vector.y * 0.5 + 0.5) * recursionCanvas.clientHeight;

                frame.textDiv.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            }
        });
    }

    //* Animación de factorial recursivo
    function animateFactorial() {
        if (animationInProgress) return;
        animationInProgress = true;

        //* Limpiar pila anterior
        callStack.forEach(frame => {
            if (frame.textDiv) frame.textDiv.remove();
            scene.remove(frame.group);
        });
        callStack = [];

        //* Función para simular la fase de bajada (llamadas recursivas)
        function descent(n, delay = 0) {
            if (n < 0) {
                //* Iniciar fase de subida
                setTimeout(() => ascent(0, 1), delay + 1000);
                return;
            }

            setTimeout(() => {
                const x = 0;
                const y = 2 - n * 0.9;
                const frame = createStackFrame(n, x, y);
                callStack.push(frame);

                //* Agregar línea de conexión al frame anterior si existe
                if (callStack.length > 1) {
                    const prevFrame = callStack[callStack.length - 2].group;
                    const material = new THREE.LineDashedMaterial({
                        color: 0x666666,
                        dashSize: 0.1,
                        gapSize: 0.05
                    });

                    const points = [
                        new THREE.Vector3().copy(prevFrame.position),
                        new THREE.Vector3().copy(frame.group.position)
                    ];

                    const geometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(geometry, material);
                    line.computeLineDistances();
                    scene.add(line);
                }

                //* Continuar con la siguiente llamada recursiva
                descent(n - 1, 800);
            }, delay);
        }

        //* Función para simular la fase de subida (retorno de valores)
        function ascent(index, result, delay = 0) {
            if (index >= callStack.length) {
                setTimeout(() => {
                    animationInProgress = false;
                }, delay);
                return;
            }

            setTimeout(() => {
                const frame = callStack[index];

                //* Mostrar resultado
                const resultDiv = document.createElement('div');
                resultDiv.style.position = 'absolute';
                resultDiv.style.color = '#ffde59';
                resultDiv.style.fontFamily = 'Space Mono, monospace';
                resultDiv.style.fontWeight = 'bold';
                resultDiv.style.fontSize = '12px';
                resultDiv.style.marginTop = '50px';
                resultDiv.innerHTML = `=${result}`;
                recursionCanvas.appendChild(resultDiv);

                //* Posicionar texto resultado
                const vector = new THREE.Vector3();
                vector.setFromMatrixPosition(frame.group.matrixWorld);
                vector.project(camera);

                const x = (vector.x * 0.5 + 0.5) * recursionCanvas.clientWidth + 30;
                const y = (-vector.y * 0.5 + 0.5) * recursionCanvas.clientHeight;

                resultDiv.style.transform = `translate(0, -50%) translate(${x}px, ${y}px)`;

                //* Calcular siguiente resultado para factorial
                const n = callStack.length - index - 1;
                const nextResult = n === 0 ? 1 : result * n;

                //* Resaltar frame actual
                const currentMaterial = frame.group.children[0].material;
                gsap.to(currentMaterial, {
                    color: new THREE.Color(0xffde59),
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        //* Continuar con el siguiente frame
                        ascent(index + 1, nextResult, 800);
                    }
                });

            }, delay);
        }

        //* Iniciar animación con n = 5
        descent(5);
    }

    //* Eventos de botones
    document.getElementById('recursion-start').addEventListener('click', animateFactorial);
    document.getElementById('recursion-reset').addEventListener('click', () => {
        //* Limpiar pila actual
        callStack.forEach(frame => {
            if (frame.textDiv) frame.textDiv.remove();
            gsap.to(frame.group.scale, {
                x: 0, y: 0, z: 0,
                duration: 0.3,
                ease: "back.in",
                onComplete: () => scene.remove(frame.group)
            });
        });

        //* Eliminar todos los textos de resultado
        const resultDivs = recursionCanvas.querySelectorAll('div:not(.stack-text)');
        resultDivs.forEach(div => div.remove());

        //* Limpiar escena de líneas
        scene.children.forEach(child => {
            if (child instanceof THREE.Line) {
                scene.remove(child);
            }
        });

        callStack = [];
        animationInProgress = false;
    });

    //* Animación
    function animate() {
        requestAnimationFrame(animate);
        updateTextPosition();
        renderer.render(scene, camera);
    }
    animate();
}