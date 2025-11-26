document.addEventListener("DOMContentLoaded", () => {

    const templateSimple = `
        <div class="visualization-area" id="colaSimple">
            <h4>Visualización Interactiva</h4>
            <div class="canvas-container" id="queue-canvas"></div>
            <div class="control-buttons-Colas">
                <button class="control-btn enqueue" id="queue-enqueue">Enqueue <i
                        class="fas fa-arrow-right"></i></button>
                <button class="control-btn dequeue" id="queue-dequeue">Dequeue <i
                        class="fas fa-arrow-left"></i></button>
            </div>
        </div>
    `;

    const templateCircular = `
        <div class="visualization-area" id="colaCircular">
            <h4>Visualización Interactiva</h4>
            <div class="canvas-container" id="queueCircle-canvas"></div>
            <div class="control-buttons-Colas">
                <button class="control-btn enqueue" id="queueCircle-enqueue">Enqueue <i
                        class="fas fa-arrow-right"></i></button>
                <button class="control-btn dequeue" id="queueCircle-dequeue">Dequeue <i
                        class="fas fa-arrow-left"></i></button>
            </div>
        </div>
    `;

    const container = document.getElementById("colaContainer");
    const selector = document.getElementById("tipoCola");

    function cargarCola(tipo) {
        container.innerHTML = "";
        
        if (tipo === "simple") {
            container.innerHTML = templateSimple;
            setupQueueVisualization();
        } else {
            container.innerHTML = templateCircular;
            setupQueueCircleVisualization();
        }
    }

    selector.addEventListener("change", () => {
        cargarCola(selector.value);
    });

    cargarCola("simple");

});
