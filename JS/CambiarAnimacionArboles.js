document.addEventListener("DOMContentLoaded", () => {

    //TODO: Plantillas de arboles:
    const template = `
        <div class="visualization-area">
            <h4>Visualización Interactiva</h4>
            <div class="canvas-container" id="tree-canvas"></div>
            <div class="control-buttons">
                <button class="control-btn insert" id="tree-insert">Insert <i
                        class="fas fa-plus"></i></button>
                <button class="control-btn delete" id="tree-delete">Delete <i
                        class="fas fa-minus"></i></button>
            </div>
        </div>
    `;

    const templateAG = `
        <div class="visualization-area">
            <h4>Árbol General (AG)</h4>
            <div class="canvas-container" id="tree-canvas"></div>
            
            <p><b>+ 2 hijos</b></p>

            <div class="control-buttons">
                <p><b>Orden:</b> 3</p>
                <p><b>Grado:</b> 3</p>
            </div>
        </div>
    `;

    const templateAB = `
        <div class="visualization-area">
            <h4>Árbol Binario (AB)</h4>
            <div class="canvas-container" id="tree-canvas"></div>
            
            <p><b>Máx 2 hijos</b></p>

            <div class="control-buttons">
                <p><b>Orden:</b> 2</p>
                <p><b>Grado:</b> 2</p>
            </div>
        </div>
    `;

    const templateABB = `
        <div class="visualization-area">
            <h4>Árbol Binario de Búsqueda (ABB)</h4>
            <div class="canvas-container" id="tree-canvas"></div>

            <!-- <a href="ARrays.html" class="btn-ABB">Interactuar</a> -->

            <div class="control-buttons">
                <button class="control-btn insert" id="tree-insert">Insert <i class="fas fa-plus"></i></button>
                <button class="control-btn delete" id="tree-delete">Delete <i class="fas fa-minus"></i></button>
            </div>

            <p><b>Regla:</b><br> izq <-- R --> der</p>
        </div>
    `;

    const templateAB_plus = `
        <div class="visualization-area">
            <h4>Árbol Balanceado (AB+)</h4>
            <div class="canvas-container" id="tree-canvas"></div>

            <div class="control-buttons-Colas">
                <button class="control-btn enqueue" id="tree-insert">Insert <i class=""></i></button>
                <button class="control-btn dequeue" id="tree-balance">Rebalancear <i class=""></i></button>
            </div>
            <p><b>Características:</b> Mantiene equilibrio para optimizar búsqueda</p>
        </div>
    `;


    const container = document.getElementById("arbolesContainer");
    const selector = document.getElementById("tipoArbol");

    function cargarArbol(tipo) {
        container.innerHTML = "";
        
        switch (tipo) {
            case 'AG':
                container.innerHTML = templateAG;
                setupGeneralTreeVisualization();
                break;
            case 'AB':
                container.innerHTML = templateAB;
                setupBianryTreeVisualization();
                break;
            case 'ABB':
                container.innerHTML = templateABB;
                setupBianrySearchTreeVisualization();
                break;
            case 'AB+':
                container.innerHTML = templateAB_plus;
                setupDalancedTreeVisualization();         
                break;
            case 'Ax':
                container.innerHTML = template;
                setupTreeVisualization();              
                break;
        }

    }

    selector.addEventListener("change", () => {
        cargarArbol(selector.value);
    });

    cargarArbol("Ax");

});
