import React from "react";
export default function formatRUT(rut) {
    let rutStr = rut.toString();
    const digito_verificador = rutStr[rutStr.length - 1];
    rutStr = rutStr.slice(0, -1);
    // Lógica de formateo aquí (puedes usar uno de los ejemplos anteriores)
    // Por ejemplo, usando JavaScript:
    return rutStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "-" + digito_verificador;

}