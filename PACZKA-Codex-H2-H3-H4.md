# Paczka wdrożeniowa dla Codexa — H2 · H3 · H4

**Kontekst:** Druga porcja mikro-hotfixów po H1 (usunięcie starego UI spod nowego layoutu).
Każdy hotfix wdrażamy **osobno**, z osobnym smoke testem. **Nie łączyć** ich w jeden commit.

**Zasada nadrzędna (z całego projektu):**
- Claude Design = źródło UX/wyglądu. Obecna aplikacja = źródło logiki gry.
- Codex **nie podmienia całych plików**, nie rusza `data.js`, bazy zawodników ani logiki draftu/turnieju.
- Te trzy hotfixy są **kosmetyczne / weryfikacyjne** — porządkują mobile UX, kodowanie i tryb Standard. **Nie wchodzimy** w turnieje, miniturniej, EURO 2016 ani system zdarzeń.

> **Stan zastany (zweryfikowany w plikach Designu):**
> - `SquadScreen` (`app.jsx`) ma już **jeden** kontener `.scroll`, spacer bottom safe-area `calc(28px + env(safe-area-inset-bottom,0px))` oraz `CTABar` z własnym `paddingBottom` uwzględniającym safe-area.
> - `Pitch` (`screens-flow.jsx`) używa `overflow:hidden` **tylko** do dekoracyjnych linii boiska (pozycjonowane absolutnie); sloty są w zwykłych flex-rzędach — **brak** zagnieżdżonego scrolla.
> - `MechTiles` renderuje się **wyłącznie** pod `mode.hasBudget` (Normal/Hardcore). Standard już ich nie pokazuje.
> - `index.html` ma `<meta charset="utf-8">`. `normalizeName()` **nie występuje** w plikach Designu (jest tylko w dokumentacji) — jeśli istnieje, to po stronie logiki realnej appki.
>
> Dlatego H2 i H4 to przede wszystkim **weryfikacja + zakaz regresji**, a H3 to **audyt kodowania i ścieżki renderu nazw**.

---

## MIKRO-HOTFIX: H2 — scroll / safe-area / bramkarz

**CEL:**
Slot bramkarza (BR) i pozostałe dolne sloty nigdy nie chowają się pod stickym CTA na najmniejszych telefonach.

**ZAKRES:**
- Potwierdź, że ekran składu ma **jeden** pionowy scroll: kontener `.scroll` w `SquadScreen` (`app.jsx`). CTA (`CTABar`) jest **siostrą** scrolla (poniżej, w tym samym flex-kolumnowym layoucie), **nie** overlayem nad treścią.
- Zachowaj spacer bottom safe-area na końcu scrolla: `calc(28px + env(safe-area-inset-bottom, 0px))`, `flexShrink:0`.
- Zachowaj `paddingBottom` w `CTABar` z `env(safe-area-inset-bottom, 0px)`.
- Sprawdź, że `Pitch` (`screens-flow.jsx`) **nie** wprowadza własnego scrolla ani sztywnej wysokości obcinającej sloty: `overflow:hidden` ma dotyczyć **tylko** dekoracyjnych linii boiska, a flex-rzędy slotów mają rosnąć z treścią.
- Upewnij się, że pasek zakładek Boisko/Lista/Turnieje pozostaje `sticky` na górze scrolla i nie nakłada się na pierwszy rząd slotów.
- Czytelność slotów bez zmian: nie zmniejszaj placeholderów ani tap-targetów, żeby „upchnąć" planszę.

**NIE RUSZAJ:**
- Logiki składu, draftu, liczenia zgrania, `data.js`, bazy zawodników.
- Treści CTA i jego warunków (`Dobierz zawodnika` ↔ `Zagraj miniturniej`).
- Ekranów turnieju / miniturnieju / EURO.
- Rozmiarów i układu naklejek/slotów (tylko odstępy/scroll, nie skala).

**WALIDACJA:**
1. Na szerokości 360 / 390 / 414 px po dosunięciu scrolla slot **BR** ma widoczny luz nad CTA (min. ~24 px), nigdy nie jest ucięty.
2. Cały ekran składu scrolluje jako **jeden** obszar — brak drugiego, zagnieżdżonego scrolla w boisku.
3. Pasek zakładek pozostaje przyklejony na górze i nie zasłania pierwszego rzędu slotów.
4. CTA na dole nie nachodzi na treść (jest pod scrollem, nie nad nim).
5. Na telefonach z wcięciem dolnym (safe-area) między CTA a krawędzią ekranu jest dodatkowy odstęp.
6. Placeholdery slotów (BR/OBR/POM/NAP + „WYBIERZ" + ＋) są czytelne, nie zmniejszone.
7. Zakładki Boisko / Lista / Turnieje przełączają się i każda scrolluje poprawnie do końca.
8. Brak błędów w konsoli; mount OK.

---

## MIKRO-HOTFIX: H3 — polskie znaki / UTF-8

**CEL:**
W całej grze nie ma mojibake ani krzaków — wszystkie polskie znaki renderują się poprawnie.

**ZAKRES:**
- Potwierdź `<meta charset="utf-8">` w `index.html` (powinno już być) i `lang="pl"`.
- Upewnij się, że **wszystkie pliki źródłowe** (`*.jsx`, `data.js`, `styles.css`, `*.html`) są zapisane w **UTF-8 bez BOM**. Jeśli którykolwiek plik jest w innym kodowaniu — przekoduj na UTF-8, nie zmieniając treści.
- Render nazw/etykiet **z pól tekstowych** (`name`, `teamName(code)` itp.), nie z funkcji porównawczych.
- **`normalizeName()` (jeśli istnieje w logice gry) wolno używać WYŁĄCZNIE do porównań/dopasowań — nigdy do wyświetlania w UI.** Jeśli gdziekolwiek nazwa trafia do widoku przez `normalizeName()`, podmień ścieżkę na surowe pole tekstowe.
- Przejrzyj dosłownie ekrany: **menu startowe, draft, skład, zadania, turnieje, zdarzenia** — pod kątem znaków `ą ć ę ł ń ó ś ż` oraz nazw klubów/zawodników.

**NIE RUSZAJ:**
- Treści i sformułowań mikrocopy (tylko kodowanie i ścieżka renderu — żadnych zmian w słowach).
- Logiki `normalizeName()` jako funkcji porównawczej.
- `data.js` jako danych (nie edytuj wartości — tylko zadbaj o poprawne kodowanie pliku).
- Logiki gry, draftu, turnieju.

**WALIDACJA:**
1. Menu startowe: „Wybierz tryb", opisy trybów, „Zgłoś błąd" — polskie znaki OK.
2. Draft: tytuł i mikrokopia bezpieczeństwa, nazwiska w puli — bez krzaków.
3. Skład: „Skład", „Zgranie ekipy", etykiety zgrania, „Formacja" — OK.
4. Zadania (Normal/Hardcore): opisy zadań — OK.
5. Turnieje (hub): „EURO 2016 Retro", opisy, „Wkrótce" — OK.
6. Zdarzenia (jeśli widoczne w Normal/Hardcore): nagłówki/opisy — OK.
7. Nigdzie nie pojawia się „Â", „Ã", „â€", „Å" ani znaki zapytania zamiast liter.
8. Nazwy klubów i zawodników poprawne (np. „Górnik", „Łódź", „Śląsk").

---

## MIKRO-HOTFIX: H4 — Standard jako czysty sandbox

**CEL:**
W trybie Standard nie istnieją budżet, zadania, zdarzenia ani blokady przed turniejem — to prosty tryb „uczę się grając".

**ZAKRES:**
- Potwierdź, że `MechTiles` / kafelek budżetu / kafelek zadań / menedżer renderują się **wyłącznie** pod warunkiem `mode.hasBudget` (Normal/Hardcore). W Standardzie te elementy **nie istnieją** — nie są wyszarzone ani opisane „wkrótce".
- Potwierdź, że w Standardzie **nie** pojawiają się zdarzenia/eventy trenera.
- Potwierdź, że wejście do turnieju w Standardzie **nie** wymaga zaliczenia żadnych zadań — jedynym warunkiem jest pełny skład **11/11** (ta sama zasada co dla wszystkich trybów).
- Jeśli gdziekolwiek przebija się resztka warunku „zrób zadania, by zagrać" zależna od trybu — usuń ją dla Standardu.
- Standard ma pokazywać tylko: skład/zgranie, kafelek formacji, zakładki Boisko/Lista/Turnieje, CTA.

**NIE RUSZAJ:**
- Trybów budżetowych Normal/Hardcore i ich logiki (budżet, zadania, menedżer mają tam zostać).
- Systemu zdarzeń jako całości (nie usuwamy go z gry — tylko nie pokazujemy w Standardzie).
- Logiki składu/draftu/turnieju, `data.js`, bazy zawodników.
- Warunku 11/11 jako bramki do turnieju (zostaje dla wszystkich trybów).

**WALIDACJA:**
1. Standard: brak kafelka/paska budżetu na ekranie składu.
2. Standard: brak kafelka „Zadania sezonu" i brak panelu zadań.
3. Standard: brak kafelka menedżera i brak zdarzeń/eventów.
4. Standard: po skompletowaniu 11/11 CTA „Zagraj miniturniej" jest aktywne, bez wymogu zadań.
5. Standard: żaden z usuniętych elementów nie jest wyszarzony ani opisany „wkrótce" — po prostu go nie ma.
6. Normal: budżet + zadania + menedżer są obecne (nie zostały skasowane przy okazji).
7. Hardcore: jak Normal — komplet mechanik obecny.
8. Przełączanie Standard ↔ Normal ↔ Normal działa bez błędów; konsola czysta.

---

## KOLEJNOŚĆ I ZASADY WDROŻENIA

1. **H2** → smoke test → commit.
2. **H3** → smoke test → commit.
3. **H4** → smoke test → commit.

**Po każdym hotfixie smoke test (z paczki głównej, sekcja H):**
- Gra startuje (brak białego ekranu, mount OK).
- Standard: wybór trybu → ekran składu działa.
- Normal: budżet + zadania widoczne.
- Draft się otwiera; da się wybrać zawodnika; skład się aktualizuje.
- Scroll działa (Boisko/Lista/Turnieje), dolne sloty odsłaniane.
- Brak starych sekcji UI pod spodem.
- Konsola czysta; polskie znaki poprawne na dotkniętych ekranach.

**Poza zakresem tej paczki (NIE robić teraz):**
hub turniejów jako nowy flow, miniturniej, EURO 2016, zdarzenia turniejowe, Mundial 2002, liga, kariera, rynek transferowy, nowe mechaniki, nowe ekrany, nowe funkcje.
