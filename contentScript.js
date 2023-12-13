/*
    This JavaScript file is part of a software package that is licensed under the GNU General Public License (GPL).
    For more details about the GNU GPL, see <https://www.gnu.org/licenses/>.
*/

// Sélectionner l'élément sidebar (assurez-vous que ce sélecteur est correct)
const sidebar = document.querySelector(
  "#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.dark.flex-shrink-0.overflow-x-hidden.bg-black > div > div > div > div"
);

// Créer un nouvel élément de style
const style = document.createElement("style");
style.id = "hideText";

// Corriger le style pour cacher les éléments (utiliser 'visibility: hidden;' au lieu de 'none')
style.innerHTML =
  "#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.dark.flex-shrink-0.overflow-x-hidden.bg-black > div > div > div > div .font-semibold { visibility: hidden; }";

// Ajouter le style au head du document
document.head.appendChild(style);

// Créer un observateur de mutations
const observer = new MutationObserver((mutations) => {
  try {
    chrome.storage.sync.get("userName", function (data) {
      if (data?.userName) {
        updateText(data.userName);
      } else {
        document.getElementById("hideText")?.remove();
      }
    });
  } catch {}
});

// Configuration de l'observateur: observer les changements dans les descendants
const config = { childList: true, subtree: true };

// Démarrer l'observation de 'sidebar'
if (sidebar) {
  observer.observe(sidebar, config);
} else {
  console.error("Sidebar non trouvé");
}

// Écouter les modifications de stockage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "userName") {
      updateText(newValue);
    }
  }
});

function updateText(name) {
  const element = document.querySelector(
    "#headlessui-menu-button-\\:rf\\: > div.relative.-top-px.grow.-space-y-px.overflow-hidden.text-ellipsis.whitespace-nowrap.text-left.text-gray-700.dark\\:text-white > div"
  );
  if (element) {
    element.textContent = name;
  }

  document.getElementById("hideText")?.remove();
}
