document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav button");
  const modules = document.querySelectorAll(".module");

  // -------------- FUNÇÃO PARA TROCAR O MÓDULO --------------
  function activateModule(targetId) {
    // Remove active de todos os módulos
    modules.forEach((m) => m.classList.remove("active"));

    // Ativa módulo clicado
    const mod = document.getElementById(targetId);
    if (mod) mod.classList.add("active");

    // Marca botão ativo
    buttons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.target === targetId)
    );

    // Subir para o topo da página ao trocar de módulo
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // -------------- EVENTOS DOS BOTÕES --------------
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      activateModule(target);
    });
  });

  // -------------- ATIVAR O PRIMEIRO MÓDULO POR PADRÃO --------------
  if (buttons.length > 0) {
    const first = buttons[0].dataset.target;
    activateModule(first);
  }

  // -------------- MARCAR BOTÃO CORRETO AO CARREGAR COM ÂNCORA (opcional) --------------
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const exists = document.getElementById(id);
    if (exists) activateModule(id);
  }

  // -------------- ATUALIZA O HASH NA URL (opcional e útil) --------------
  function updateHash(id) {
    history.replaceState(null, "", "#" + id);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => updateHash(btn.dataset.target));
  });
});
