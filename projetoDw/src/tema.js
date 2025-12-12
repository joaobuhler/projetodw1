export function aplicarTema(modoEscuro) {
    const root = document.documentElement;

    if (modoEscuro) {
        root.style.setProperty("--cor-principal", "#024950");
        root.style.setProperty("--cor-fundo", "#161616");
        root.style.setProperty("--cor-detalhes", "#1c5966");
        root.style.setProperty("--cor-escura", "#172a3a");
        root.style.setProperty("--cor-navbar", "rgb(17, 17, 17)");
        root.style.setProperty("--cor-texto", "#ffffff");
    } else {
        root.style.setProperty("--cor-principal", "#82c0cc");
        root.style.setProperty("--cor-fundo", "#edf2f4");
        root.style.setProperty("--cor-detalhes", "#489fb5");
        root.style.setProperty("--cor-escura", "#16697a");
        root.style.setProperty("--cor-navbar", "#489fb5");
        root.style.setProperty("--cor-texto", "#000000");
    }

    localStorage.setItem("modoEscuro", JSON.stringify(modoEscuro));
}
