// Test MCD
// const maximoComunDivisor = calcularMaximoComunDivisor([21,42,84,7]);

// Test Descifrar letras.
// console.log(obtenerLetraCrifrada("L", "R"));
// console.log(obtenerLetraCrifrada("N", "A"));
// console.log(obtenerLetraCrifrada("U", "U"));

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "Ñ", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const letrasVigenere = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const longitud = 3;
const textoIngresado = "LNUDVMUYRMUDVLLPXAFZUEFAIOVWVMUOVMUEVMUEZCUDVSYWCIVCFGUCUNYCGALLGRCYTIJTRNNPJQOPJEMZITYLIAYYKRYEFDUDCAMAVRMZEAMBLEXPJCCQIEHPJTYXVNMLAEZTIMUOFRUFC";
const respuesta = {};

// ["A", "E", "O"] = [posición 0, posición de la E después de la E, posición de la O después de la E]
const posicionLetrasFrecuentesEspanol = [0, 4, 11];

// ["A", "E", "T"] = [posición 0, posición de la E después de la E, posición de la T después de la E]
const posicionLetrasFrecuentesIngles = [0, 4, 16];

descifrar();

function descifrar() {
    const secuencias = encontrarSecuencias();
    const separaciones = calcularSeparacionEntreSecuencias(secuencias);
    const maximoComunDivisor = calcularMaximoComunDivisor(separaciones);
    let subCriptogramas = obtenerSubCriptogramas(maximoComunDivisor);
    subCriptogramas = calcularFrecuenciaLetrasPorSubCriptograma(subCriptogramas);
    subCriptogramas = calcularFrecuenciaRelaticaLetrasPorSubCriptograma(subCriptogramas, posicionLetrasFrecuentesEspanol);
    subCriptogramas = calcularLetraMasFrecuente(subCriptogramas);

    const listaLetrasMasFrecuentes = obtenerListaLetrasPorSubCriptograma(subCriptogramas);
    respuesta.subCriptogramas = subCriptogramas;
    respuesta.listaLetrasMasFrecuentes = listaLetrasMasFrecuentes;
    respuesta.clavesPosibles = calcularPosiblesCasos(listaLetrasMasFrecuentes);

    respuesta.textosPosibles = obtenerPosiblesTextos(respuesta.clavesPosibles, textoIngresado);

    console.log("secuencias", secuencias);
    console.log("separaciones", separaciones);
    console.log("maximoComunDivisor", maximoComunDivisor);
    console.log("subCriptogramas", subCriptogramas);
    console.log("respuesta", respuesta);

    console.log(JSON.stringify(respuesta));
    // document.getElementById("textoEncriptar").value = JSON.stringify(respuesta);
    document.getElementById("textoDesencriptado").innerText  = JSON.stringify(respuesta);
}

function encontrarSecuencias() {
    let secuenciasEncontradas = [];
    for (let index = 0; index < textoIngresado.length / 2; index++) {

        secuenciaEncontrada = encontrarSecuencia(index, index + longitud, textoIngresado, []);
        if (secuenciaEncontrada.length === 2) {
            secuenciasEncontradas = [...secuenciasEncontradas, textoIngresado.substring(secuenciaEncontrada[0], secuenciaEncontrada[1])];
        }
    }

    secuenciasEncontradas = secuenciasEncontradas.filter(function (elem, pos) {
        return secuenciasEncontradas.indexOf(elem) == pos;
    });

    return secuenciasEncontradas;
}

function encontrarSecuencia(inicio, fin, texto, secuenciaActual) {

    const textoEncontrar = texto.substring(inicio, fin);
    textoDespuesDeTextoAEncontrar = texto.substring(fin, texto.length);

    const indiceSecuenciaRepetida = textoDespuesDeTextoAEncontrar.indexOf(textoEncontrar);
    if (indiceSecuenciaRepetida >= 0) {
        secuenciaActual = [inicio, fin]
    }

    return secuenciaActual;
}

function calcularSeparacionEntreSecuencias(secuencias) {
    let separacionesPorSecuencias = [];
    for (let index = 0; index < secuencias.length; index++) {
        const secuenciaEncontrada = secuencias[index];
        const separacionesEntreSecuencias = calcularSeparacionEntreSecuencia(secuenciaEncontrada, textoIngresado, []);

        for (let index = 1; index < separacionesEntreSecuencias.length; index++) {
            const separacionEntreSecuencia = separacionesEntreSecuencias[index];
            separacionesPorSecuencias = [...separacionesPorSecuencias, separacionEntreSecuencia + secuenciaEncontrada.length];
        }
    }

    return separacionesPorSecuencias;
}

function calcularSeparacionEntreSecuencia(secuencia, texto, resultado) {

    const indiceCoincidencia = texto.indexOf(secuencia);
    if (indiceCoincidencia >= 0) {
        const nuevoTexto = texto.substring(indiceCoincidencia + secuencia.length);
        resultado = [...resultado, indiceCoincidencia]
        return calcularSeparacionEntreSecuencia(secuencia, nuevoTexto, resultado);
    }

    return resultado;
}

function calcularMaximoComunDivisor(separaciones) {
    let maximoComunDivisor = Math.min.apply(null, separaciones);

    let noEsDivisor = true;
    while (noEsDivisor) {
        noEsDivisor = separaciones.find(separacion => separacion % maximoComunDivisor > 0);
        if (noEsDivisor) {
            maximoComunDivisor--;
        }
    }

    return maximoComunDivisor;
}

function obtenerSubCriptogramas(cantidadSubCriptogramas) {
    let subCriptogramas = [];
    for (let indiceCriptograma = 0; indiceCriptograma < cantidadSubCriptogramas; indiceCriptograma++) {
        let subCriptograma = {
            texto: ''
        };
        for (let indiceTextoIngresado = indiceCriptograma; indiceTextoIngresado < textoIngresado.length; indiceTextoIngresado = indiceTextoIngresado + cantidadSubCriptogramas) {
            const letra = textoIngresado[indiceTextoIngresado];
            subCriptograma.texto = subCriptograma.texto + letra;
        }

        subCriptogramas = [...subCriptogramas, subCriptograma];
    }

    return subCriptogramas;
}

function calcularFrecuenciaLetrasPorSubCriptograma(subCriptogramas) {

    subCriptogramas.forEach(subCriptograma => {
        subCriptograma.frecuenciasLetra = [];
        letras.forEach(letra => {
            let contadorLetras = 0;
            for (let index = 0; index < subCriptograma.texto.length; index++) {
                const letraTexto = subCriptograma.texto[index];
                if (letraTexto === letra) {
                    contadorLetras = contadorLetras + 1;
                }
            }

            subCriptograma.frecuenciasLetra = [...subCriptograma.frecuenciasLetra, [letra, contadorLetras]];
        });
    });

    return subCriptogramas;
}

function calcularFrecuenciaRelaticaLetrasPorSubCriptograma(subCriptogramas, posicionLetrasFrecuentesIdioma) {
    subCriptogramas.forEach(subCriptograma => {
        subCriptograma.frecuenciasRelativaLetra = [];

        for (let index = 0; index < subCriptograma.frecuenciasLetra.length; index++) {
            let frecuenciaRelativa = 0;

            const letra = subCriptograma.frecuenciasLetra[index][0];
            let siguientePosicion = index;
            posicionLetrasFrecuentesIdioma.forEach(posicionLetraFrecuenteIdioma => {
                siguientePosicion = siguientePosicion + posicionLetraFrecuenteIdioma;
                if (siguientePosicion > letras.length - 1) {
                    siguientePosicion = siguientePosicion - letras.length;
                }

                const frecuencia = subCriptograma.frecuenciasLetra[siguientePosicion][1];
                frecuenciaRelativa = frecuenciaRelativa + frecuencia;
            });

            subCriptograma.frecuenciasRelativaLetra = [...subCriptograma.frecuenciasRelativaLetra, [letra, frecuenciaRelativa]];

        }

    });

    return subCriptogramas;
}

function calcularLetraMasFrecuente(subCriptogramas) {
    subCriptogramas.forEach(subCriptograma => {
        let mayor = 0;
        let letra = '';
        subCriptograma.letraMayor = [];

        subCriptograma.frecuenciasRelativaLetra.forEach(frecuenciaRelativa => {

            if (frecuenciaRelativa[1] >= mayor) {
                mayor = frecuenciaRelativa[1];
                letra = frecuenciaRelativa[0];
                subCriptograma.letraMayor = [...subCriptograma.letraMayor, [letra, mayor]];
            }
        });

        subCriptograma.letraMayor = subCriptograma.letraMayor.slice(subCriptograma.letraMayor.length - 2, subCriptograma.letraMayor.length);
    });

    return subCriptogramas;
}

function calcularPosiblesCasos(combinaciones) {
    if (combinaciones.length === 0) {
        return [];
    } else if (combinaciones.length === 1) {
        return combinaciones[0];
    } else {
        var result = [];
        var restoCasos = calcularPosiblesCasos(combinaciones.slice(1));

        for (var c in restoCasos) {
            for (var i = 0; i < combinaciones[0].length; i++) {
                result.push(combinaciones[0][i] + restoCasos[c]);
            }
        }
        return result;
    }
}

function obtenerListaLetrasPorSubCriptograma(subCriptogramas) {
    let lista = [];

    subCriptogramas.forEach(subCriptograma => {
        lista = [...lista, subCriptograma.letraMayor.map(letra => letra[0])];
    });

    return lista;
}

function obtenerLetraCrifrada(letraCifrada, letraClave) {
    const posicionLetraCifrar = letrasVigenere.indexOf(letraCifrada);
    const posicionLetraClave = letrasVigenere.indexOf(letraClave);
    const totalLetras = letrasVigenere.length;

    const diferenciaPosiciones = posicionLetraCifrar - posicionLetraClave;
    let posicionCifrada = 0;
    if (diferenciaPosiciones >= 0) {
        posicionCifrada = diferenciaPosiciones % totalLetras;
    } else {
        posicionCifrada = (diferenciaPosiciones + totalLetras) % totalLetras;
    }

    letraCifrada = letrasVigenere[posicionCifrada];

    return letraCifrada;
}

function obtenerTextosSubCriptogramas(subCriptogramas) {
    return subCriptogramas.map(subCriptograma => subCriptograma.texto);
}

function obtenerPosiblesTextos(clavesPosibles, texto) {
    let textosPosiblesdescifrados = [];
    clavesPosibles.forEach(clavePosible => {
        let textoDescifrado = '';
        for (let indicetexto = 0; indicetexto < texto.length;) {
            for (let indiceClave = 0; indiceClave < clavePosible.length; indiceClave++) {
                textoDescifrado = textoDescifrado + obtenerLetraCrifrada(texto[indicetexto], clavePosible[indiceClave]);
                indicetexto = indicetexto + 1;
            }
        }

        textosPosiblesdescifrados = [...textosPosiblesdescifrados, [clavePosible, textoDescifrado]];
    });

    return textosPosiblesdescifrados;
}