document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav button[data-target]");
  const modules = document.querySelectorAll(".module");

  // Scroll suave ao clicar em um módulo na sidebar
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const section = document.getElementById(targetId);
      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveNav(targetId);
    });
  });

  function setActiveNav(targetId) {
    navButtons.forEach((btn) => {
      const id = btn.getAttribute("data-target");
      btn.classList.toggle("active", id === targetId);
    });

    modules.forEach((mod) => {
      mod.classList.toggle("active", mod.id === targetId);
    });
  }

  // Scroll spy simples: destaca o módulo visível
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;
      const id = visibleEntry.target.id;
      setActiveNav(id);
    },
    {
      root: null,
      threshold: 0.35,
    }
  );

  modules.forEach((section) => observer.observe(section));

  // Toggle simples de "abrir/fechar" visual ao clicar no header do módulo
  modules.forEach((module) => {
    const header = module.querySelector(".module-header");
    const body = module.querySelector(".module-body");

    if (!header || !body) return;

    header.addEventListener("click", (e) => {
      // evita conflito quando o clique veio de um botão da sidebar
      if (e.target.closest("button[data-target]")) return;
      body.style.display =
        body.style.display === "none" || body.style.display === ""
          ? "block"
          : "none";
    });

    // Por padrão, todos abertos; se quiser começar fechado:
    // body.style.display = "none";
  });
});