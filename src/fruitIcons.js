// Handcrafted SVG Fruit & Treat Icons for 10 Game Worlds

export const FRUIT_SVGS = {
  // 1: Apple 🍎
  1: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff5252" />
          <stop offset="50%" stop-color="#e53935" />
          <stop offset="100%" stop-color="#8e0000" />
        </radialGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#76ff03" />
          <stop offset="100%" stop-color="#2e7d32" />
        </linearGradient>
        <filter id="fruitGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M50,22 Q54,12 60,8" fill="none" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
        <path d="M52,18 C62,12 70,16 68,24 C60,26 54,22 52,18 Z" fill="url(#leafGrad)"/>
        <path d="M50,26 C30,22 14,35 14,56 C14,78 35,90 50,86 C65,90 86,78 86,56 C86,35 70,22 50,26 Z" fill="url(#appleGrad)"/>
        <ellipse cx="32" cy="40" rx="9" ry="16" transform="rotate(-25 32 40)" fill="#ffffff" opacity="0.45"/>
      </g>
    </svg>
  `,

  // 2: Grape 🍇
  2: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="grapeGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#e100ff" />
          <stop offset="55%" stop-color="#8e24aa" />
          <stop offset="100%" stop-color="#4a148c" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M50,22 Q50,10 62,8" fill="none" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
        <path d="M46,18 C38,12 32,18 36,26 C42,26 44,22 46,18 Z" fill="url(#leafGrad)"/>
        <circle cx="36" cy="38" r="14" fill="url(#grapeGrad)"/>
        <circle cx="64" cy="38" r="14" fill="url(#grapeGrad)"/>
        <circle cx="50" cy="50" r="15" fill="url(#grapeGrad)"/>
        <circle cx="34" cy="64" r="14" fill="url(#grapeGrad)"/>
        <circle cx="66" cy="64" r="14" fill="url(#grapeGrad)"/>
        <circle cx="50" cy="78" r="13" fill="url(#grapeGrad)"/>
        <ellipse cx="46" cy="45" rx="4" ry="7" transform="rotate(-30 46 45)" fill="#ffffff" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 3: Orange 🍊
  3: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="orangeGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffab40" />
          <stop offset="50%" stop-color="#ff6d00" />
          <stop offset="100%" stop-color="#dd2c00" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <circle cx="50" cy="54" r="34" fill="url(#orangeGrad)"/>
        <circle cx="50" cy="22" r="3" fill="#33691e"/>
        <path d="M50,22 C58,14 68,18 64,26 C56,26 52,24 50,22 Z" fill="url(#leafGrad)"/>
        <ellipse cx="38" cy="40" rx="10" ry="16" transform="rotate(-30 38 40)" fill="#ffffff" opacity="0.45"/>
      </g>
    </svg>
  `,

  // 4: Strawberry 🍓
  4: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="strawGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff5252" />
          <stop offset="55%" stop-color="#d50000" />
          <stop offset="100%" stop-color="#7f0000" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M50,88 C25,72 14,50 18,36 C22,22 40,24 50,30 C60,24 78,22 82,36 C86,50 75,72 50,88 Z" fill="url(#strawGrad)"/>
        <path d="M50,28 L40,16 L46,26 L32,22 L44,30 L50,32 L56,30 L68,22 L54,26 L60,16 Z" fill="url(#leafGrad)"/>
        <circle cx="34" cy="44" r="1.8" fill="#ffea00"/>
        <circle cx="50" cy="46" r="1.8" fill="#ffea00"/>
        <circle cx="66" cy="44" r="1.8" fill="#ffea00"/>
        <ellipse cx="32" cy="38" rx="6" ry="11" transform="rotate(-20 32 38)" fill="#ffffff" opacity="0.4"/>
      </g>
    </svg>
  `,

  // 5: Banana 🍌
  5: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffff8d" />
          <stop offset="50%" stop-color="#ffd600" />
          <stop offset="100%" stop-color="#ffab00" />
        </linearGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M20,70 C16,40 38,18 78,16 C78,16 68,36 45,56 C28,70 20,70 20,70 Z" fill="url(#bananaGrad)"/>
        <path d="M78,16 L84,12" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
        <path d="M30,55 C42,42 55,28 72,19" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 6: Blueberry 🫐
  6: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="berryGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#82b1ff" />
          <stop offset="50%" stop-color="#2979ff" />
          <stop offset="100%" stop-color="#0d47a1" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <circle cx="34" cy="44" r="20" fill="url(#berryGrad)"/>
        <circle cx="66" cy="44" r="20" fill="url(#berryGrad)"/>
        <circle cx="50" cy="62" r="24" fill="url(#berryGrad)"/>
        <ellipse cx="40" cy="52" rx="6" ry="10" transform="rotate(-30 40 52)" fill="#ffffff" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 7: Cherry 🍒
  7: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="cherryGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff5252" />
          <stop offset="55%" stop-color="#c62828" />
          <stop offset="100%" stop-color="#4a0000" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M34,54 Q44,22 62,12" fill="none" stroke="#5d4037" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M66,60 Q56,30 62,12" fill="none" stroke="#5d4037" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="34" cy="64" r="18" fill="url(#cherryGrad)"/>
        <circle cx="66" cy="68" r="18" fill="url(#cherryGrad)"/>
        <ellipse cx="27" cy="56" rx="5" ry="9" transform="rotate(-25 27 56)" fill="#ffffff" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 8: Watermelon 🍉
  8: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="melonGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff5252" />
          <stop offset="70%" stop-color="#d50000" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <!-- Green Rind -->
        <path d="M14,35 A42,42 0 0,0 86,35 Z" fill="#2e7d32"/>
        <!-- White Inner Rim -->
        <path d="M18,35 A38,38 0 0,0 82,35 Z" fill="#f1f8e9"/>
        <!-- Red Slice -->
        <path d="M22,35 A34,34 0 0,0 78,35 Z" fill="url(#melonGrad)"/>
        <!-- Seeds -->
        <circle cx="36" cy="46" r="2.5" fill="#212121"/>
        <circle cx="50" cy="54" r="2.5" fill="#212121"/>
        <circle cx="64" cy="46" r="2.5" fill="#212121"/>
      </g>
    </svg>
  `,

  // 9: Peach 🍑
  9: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="peachGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ff8a80" />
          <stop offset="50%" stop-color="#ff7043" />
          <stop offset="100%" stop-color="#e64a19" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M50,22 C30,22 14,38 14,60 C14,80 36,88 50,86 C64,88 86,80 86,60 C86,38 70,22 50,22 Z" fill="url(#peachGrad)"/>
        <path d="M50,22 Q42,50 48,84" fill="none" stroke="#d84315" stroke-width="2.5"/>
        <ellipse cx="32" cy="40" rx="8" ry="15" transform="rotate(-25 32 40)" fill="#ffffff" opacity="0.4"/>
      </g>
    </svg>
  `,

  // 10: Pineapple 🍍
  10: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <linearGradient id="pineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffee58" />
          <stop offset="60%" stop-color="#f57f17" />
          <stop offset="100%" stop-color="#e65100" />
        </linearGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <!-- Green Crown -->
        <path d="M50,28 L35,10 L45,24 L50,6 L55,24 L65,10 L50,28 Z" fill="url(#leafGrad)"/>
        <!-- Pineapple Oval Body -->
        <ellipse cx="50" cy="58" rx="26" ry="30" fill="url(#pineGrad)"/>
        <!-- Diamond Cross Grid Lines -->
        <path d="M30,46 L70,70 M30,70 L70,46 M34,36 L66,80 M34,80 L66,36" stroke="#b71c1c" stroke-width="1.8" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 11: Kiwi 🥝
  11: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="kiwiGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f1f8e9" />
          <stop offset="40%" stop-color="#aed581" />
          <stop offset="85%" stop-color="#689f38" />
          <stop offset="100%" stop-color="#558b2f" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <!-- Fuzzy Brown Skin Rim -->
        <circle cx="50" cy="54" r="34" fill="#6d4c41"/>
        <!-- Green Inner Flesh -->
        <circle cx="50" cy="54" r="30" fill="url(#kiwiGrad)"/>
        <!-- White Center & Seeds -->
        <circle cx="50" cy="54" r="8" fill="#ffffff"/>
        <circle cx="40" cy="46" r="1.5" fill="#212121"/>
        <circle cx="60" cy="46" r="1.5" fill="#212121"/>
        <circle cx="40" cy="62" r="1.5" fill="#212121"/>
        <circle cx="60" cy="62" r="1.5" fill="#212121"/>
      </g>
    </svg>
  `,

  // 12: Lemon 🍋
  12: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="lemonGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffff8d" />
          <stop offset="60%" stop-color="#ffee58" />
          <stop offset="100%" stop-color="#fbc02d" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <ellipse cx="50" cy="54" rx="34" ry="24" transform="rotate(-30 50 54)" fill="url(#lemonGrad)"/>
        <ellipse cx="36" cy="42" rx="7" ry="12" transform="rotate(-45 36 42)" fill="#ffffff" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 13: Coconut 🥥
  13: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <g filter="url(#fruitGlow)">
        <circle cx="50" cy="54" r="32" fill="#4e342e"/>
        <circle cx="50" cy="54" r="24" fill="#ffffff"/>
        <circle cx="50" cy="54" r="18" fill="#3e2723"/>
        <!-- Coconut 3 Eyes -->
        <circle cx="42" cy="48" r="3" fill="#212121"/>
        <circle cx="58" cy="48" r="3" fill="#212121"/>
        <circle cx="50" cy="62" r="3" fill="#212121"/>
      </g>
    </svg>
  `,

  // 14: Mango 🥭
  14: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff5252" />
          <stop offset="40%" stop-color="#ff9100" />
          <stop offset="100%" stop-color="#ffea00" />
        </linearGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <path d="M50,22 C30,22 18,40 22,64 C26,84 48,88 64,80 C80,72 84,46 72,28 C64,20 56,22 50,22 Z" fill="url(#mangoGrad)"/>
        <ellipse cx="36" cy="40" rx="8" ry="14" transform="rotate(-25 36 40)" fill="#ffffff" opacity="0.45"/>
      </g>
    </svg>
  `,

  // 15: Avocado 🥑
  15: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <g filter="url(#fruitGlow)">
        <path d="M50,20 C34,20 22,40 22,62 C22,82 34,90 50,90 C66,90 78,82 78,62 C78,40 66,20 50,20 Z" fill="#1b5e20"/>
        <path d="M50,25 C37,25 27,42 27,62 C27,78 37,85 50,85 C63,85 73,78 73,62 C73,42 63,25 50,25 Z" fill="#c0ca33"/>
        <circle cx="50" cy="64" r="14" fill="#5d4037"/>
        <circle cx="46" cy="60" r="4" fill="#ffffff" opacity="0.3"/>
      </g>
    </svg>
  `,

  // 16: Starfruit 🌟
  16: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffff8d" />
          <stop offset="70%" stop-color="#ffd600" />
          <stop offset="100%" stop-color="#ffab00" />
        </radialGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <polygon points="50,15 62,38 88,38 67,54 75,78 50,62 25,78 33,54 12,38 38,38" fill="url(#starGrad)"/>
        <circle cx="50" cy="48" r="6" fill="#ffffff" opacity="0.5"/>
      </g>
    </svg>
  `,

  // 17: Candy 🍬
  17: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <linearGradient id="candyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff4081" />
          <stop offset="50%" stop-color="#e040fb" />
          <stop offset="100%" stop-color="#7c4dff" />
        </linearGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <polygon points="15,35 30,50 15,65" fill="#ff4081"/>
        <polygon points="85,35 70,50 85,65" fill="#7c4dff"/>
        <circle cx="50" cy="50" r="22" fill="url(#candyGrad)"/>
        <path d="M38,40 Q50,34 62,40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
      </g>
    </svg>
  `,

  // 18: Donut 🍩
  18: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <g filter="url(#fruitGlow)">
        <circle cx="50" cy="54" r="32" fill="#d7ccc8"/>
        <path d="M50,22 C34,22 22,34 22,50 C26,52 32,48 38,54 C44,60 56,48 62,54 C68,60 76,50 78,50 C78,34 66,22 50,22 Z" fill="#ff4081"/>
        <circle cx="50" cy="54" r="12" fill="#3e2723"/>
        <rect x="36" y="30" width="3" height="6" rx="1.5" fill="#ffea00" transform="rotate(30 36 30)"/>
        <rect x="58" y="32" width="3" height="6" rx="1.5" fill="#00e5ff" transform="rotate(-20 58 32)"/>
      </g>
    </svg>
  `,

  // 19: Golden Crown 👑
  19: `
    <svg viewBox="0 0 100 100" class="svg-fruit-icon">
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff176" />
          <stop offset="60%" stop-color="#ffd54f" />
          <stop offset="100%" stop-color="#ffb300" />
        </linearGradient>
      </defs>
      <g filter="url(#fruitGlow)">
        <polygon points="18,74 82,74 88,34 66,52 50,22 34,52 12,34" fill="url(#crownGrad)" stroke="#ff6f00" stroke-width="2"/>
        <circle cx="50" cy="22" r="5" fill="#ff1744"/>
        <circle cx="12" cy="34" r="4" fill="#29b6f6"/>
        <circle cx="88" cy="34" r="4" fill="#ab47bc"/>
      </g>
    </svg>
  `
};

export function getFruitSVG(fruitId) {
  return FRUIT_SVGS[fruitId] || FRUIT_SVGS[1];
}
