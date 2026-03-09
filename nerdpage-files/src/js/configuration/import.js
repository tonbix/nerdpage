"use strict";

import { spawnToastMessage } from "../toast/spawnToastMessage.js";
import { validateUrl } from "../validateUrl.js";
import { loadBookmarks } from "../loadBookmarks.js";

const importButtonElement = document.getElementById("import-configuration-button");
const overlayImport = document.getElementById("overlay-allow-import-configuration");
const textarea = document.getElementById("overlay-allow-import-configuration-textarea");
const acceptButton = document.getElementById("overlay-allow-import-configuration-accept-button");
const discardButton = document.getElementById("overlay-allow-import-configuration-discard-button");

let pendingConfiguration = null;

const validateConfiguration = (configurationText) => {
    try {
        const config = JSON.parse(configurationText);
        const validConfig = {};

        for (const [category, content] of Object.entries(config)) {
            // Базовая проверка структуры
            if (!content || typeof content !== 'object' || !Array.isArray(content.bookmarks)) return null;

            // Валидация hue
            const hue = parseInt(content.hue);
            if (isNaN(hue) || hue < 0 || hue > 360) return null;

            const validatedBookmarks = [];
            for (const bm of content.bookmarks) {
                const cleanUrl = validateUrl(bm.url);
                // Если имя пустое или URL не прошел регулярку — весь конфиг в помойку
                if (!bm.name || typeof bm.name !== 'string' || !cleanUrl) return null;

                validatedBookmarks.push({
                    name: bm.name.trim(),
                    url: cleanUrl
                });
            }

            validConfig[category] = {
                hue: hue.toString(),
                bookmarks: validatedBookmarks
            };
        }
        return Object.keys(validConfig).length > 0 ? validConfig : null;
    } catch (e) {
        return null;
    }
};

const hideOverlay = () => {
    overlayImport.classList.add("disabled");
    textarea.value = "";
    pendingConfiguration = null;
};

// Главная логика: читаем буфер -> валидируем -> показываем оверлей
importButtonElement.addEventListener("click", async () => {
    try {
        const clipboardContent = await navigator.clipboard.readText();
        const validConfig = validateConfiguration(clipboardContent);

        if (!validConfig) {
            spawnToastMessage("0", "invalid configuration in clipboard");
            return;
        }

        // Сохраняем во временную переменную и выводим в поле
        pendingConfiguration = validConfig;
        textarea.value = JSON.stringify(validConfig, null, 4);
        overlayImport.classList.remove("disabled");

    } catch (e) {
        spawnToastMessage("0", "clipboard access denied");
        console.error(e);
    }
});

// Кнопка подтверждения
acceptButton.addEventListener("click", () => {
    if (pendingConfiguration) {
        localStorage.setItem("nerdpage-bookmarks", JSON.stringify(pendingConfiguration));
        loadBookmarks(); // Перерисовываем интерфейс
        spawnToastMessage("100", "configuration applied");
        hideOverlay();
    }
});

// Кнопка отмены
discardButton.addEventListener("click", hideOverlay);
