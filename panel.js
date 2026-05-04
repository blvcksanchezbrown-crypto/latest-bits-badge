const BITS_DATA_URL = "https://latest-bits-badge.netlify.app/.netlify/functions/bits";

/***********************
 * MEDIA CARD LIBRARY
 ***********************/
const MEDIA_LIBRARY = {
  69: {
    title: "69 Gifted Subs",
    bits: 69,
    image: "https://latest-bits-badge.netlify.app/images/card1.png"
  },
  990: {
    title: "Aunt May",
    bits: 990,
    image: "https://latest-bits-badge.netlify.app/images/card2.png"
  },
  3050: {
    title: "Redline",
    bits: 3050,
    image: "https://latest-bits-badge.netlify.app/images/card3.png"
  },
  3050: {
    title: "Crunk",
    bits: 300,
    image: "https://latest-bits-badge.netlify.app/images/crunk.png"
  },
  4100: {
    title: "Test Media 4",
    bits: 4100,
    image: "https://latest-bits-badge.netlify.app/images/card4.png"
  }
};

const FALLBACK_CARD = {
  title: "Latest Cheer",
  bits: 0,
  image: "https://latest-bits-badge.netlify.app/images/card1.png"
};

async function loadLatestCheers() {
  try {
    const response = await fetch(BITS_DATA_URL);
    const data = await response.json();

    const recentBits = data.recentBits || [];
    renderLatestCheers(recentBits);

  } catch (error) {
    console.error("Could not load latest cheers:", error);

    const container = document.getElementById("mediaCards");

    if (container) {
      container.innerHTML = `
        <div class="card">
          <div class="card-footer">
            <div class="card-title">Could not load cheers</div>
            <div class="bits">0</div>
          </div>
        </div>
      `;
    }
  }
}

function renderLatestCheers(recentBits) {
  const container = document.getElementById("mediaCards");
  container.innerHTML = "";

  if (!recentBits.length) {
    container.innerHTML = `
      <div class="card">
        <div class="card-footer">
          <div class="card-title">No recent cheers yet</div>
          <div class="bits">0</div>
        </div>
      </div>
    `;
    return;
  }

  recentBits.slice(0, 3).forEach(cheer => {
    const bitsAmount = Number(cheer.bits || 0);

    const card = MEDIA_LIBRARY[bitsAmount] || {
      ...FALLBACK_CARD,
      title: `${cheer.username} cheered`,
      bits: bitsAmount
    };

    renderCard(card, cheer.username);
  });
}

function renderCard(card, username) {
  const container = document.getElementById("mediaCards");

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${card.image}" alt="${escapeHtml(card.title)}">
    <div class="card-footer">
      <div>
        <div class="card-title">${escapeHtml(card.title)}</div>
        <div class="card-user">${escapeHtml(username || "")}</div>
      </div>
      <div class="bits">${escapeHtml(card.bits)}</div>
    </div>
  `;

  container.appendChild(div);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadLatestCheers();
setInterval(loadLatestCheers, 35000);