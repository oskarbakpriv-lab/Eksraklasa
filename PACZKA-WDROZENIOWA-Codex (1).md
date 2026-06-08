# Paczka wdrożeniowa dla Codexa — „Ekstraklasa Retro Draft"

**Zasada nadrzędna**
- **Claude Design = źródło UX i wyglądu** (pliki `*.jsx` ekranów, `styles.css`, `event-cards.jsx`, `tournament-screens.jsx`, `tournament-flow-*.jsx`, `Turnieje-flow.html`).
- **Obecna aplikacja = źródło logiki gry** (stan w `app.jsx`, dane w `data.js`, logika draftu/zadań/zgrania).
- Codex **nie podmienia całych plików** z Designu. Codex **przenosi/dostraja UI** i **podpina** je do istniejącej logiki małymi krokami.

Stan na dziś: większość UX jest już w aplikacji (`index.html` + `app.jsx` + `screens-*.jsx`). Największy otwarty obszar to **pełny flow Turniejów** (gotowa makieta: `Turnieje-flow.html`). Dlatego część hotfixów to „zweryfikuj/dostrój", a część to „wepnij nowy flow".

---

## A. MAPA EKRANÓW

Ekrany i stany, które mają działać po wdrożeniu.

**1. Menu startowe** (`ModeScreen`, `screens-flow.jsx`)
- masthead „EKSTRAKLASA / RETRO DRAFT" (bez ramki telefonu),
- 3 kafelki trybu: Standard (plakietka „Polecane na start"), Normal (Budżet 200 mln), Hardcore (Budżet 180 mln),
- 3 kafelki pomocnicze: Jak grać?, Co nowego?, Zgłoś błąd.

**2. Ekran składu** (`SquadScreen` w `app.jsx` + `Pitch`, `SquadSummary`, `FormationStrip`)
- pasek SKŁAD x/11 + ZGRANIE EKIPY (etykieta słowna, gwiazdki),
- kafelek FORMACJA (4-3-3 + „Zmień"),
- przełącznik **Boisko / Lista / Turnieje** (lepki),
- stan **Boisko**: album-boisko z naklejkami + puste sloty (placeholder „WYBIERZ +"),
- stan **Lista**: album pozycjami (NAP/POM/OBR/BR),
- stan **Turnieje**: hub (patrz ekran 6),
- safe-area pod CTA,
- CTA niepełny skład: „Dobierz zawodnika"; pełny skład: „Zagraj miniturniej".

**3. Modal draftu** (`DraftSheet`, `screens-sheets.jsx`)
- zamrożona pula (wylosowana ekipa), komunikat o zamrożeniu,
- przycisk **„Inna ekipa"** z licznikiem (reroll ≠ zamknięcie / tap-poza),
- zawodnicy pogrupowani po pozycjach,
- CTA „Dodaj do składu".

**4. Zadania** (`MechTiles`/`TasksEntry` + `TasksSheet`, `screens-mechanics.jsx`)
- Standard: **brak zadań**,
- Normal/Hardcore: kafelek „Zadania sezonu" + panel szczegółów (opisy, pasek postępu, skalowanie trudności, bez powtórek kategorii).

**5. Zdarzenia** (`EventCard`, `event-cards.jsx`)
- tylko Normal/Hardcore,
- warianty: bez wyboru / dwa wybory / menedżerski / przedmeczowy-pomeczowy,
- styl wycinka retro-gazety, bez generycznych alertów.

**6. Turnieje** — hub + dwa flow
- **Hub** (`TournamentHub` w `app.jsx`): EURO 2016 Retro (Polecany), „Wkrótce": Mundial 2002, Historyczne sezony, Europejskie puchary,
- **Miniturniej Ekstraklasy**: start → faza grupowa → tabela live → awans/odpadnięcie → faza pucharowa → finał → ekran końcowy,
- **EURO 2016 Retro (droga Polski)**: intro → Grupa C → 3 mecze → tabela live → awans/odpadnięcie (w tym z 3. miejsca) → drabinka 1/8→ćwierć→pół→finał → ekran końcowy (warianty),
- referencyjna, klikalna makieta wszystkich tych stanów: **`Turnieje-flow.html`**.

---

## B. MAPA KOMPONENTÓW

| Komponent | Plik źródłowy | Eksport (window) |
|---|---|---|
| Kafelek trybu | `screens-flow.jsx` | `ModeScreen` (+ wewn. karty) |
| Kafelek pomocniczy (Jak grać?/Co nowego?/Zgłoś błąd) | `screens-flow.jsx` | `HelpTile` |
| Kafelek formacji | `screens-flow.jsx` | `FormationStrip`, `FormationDots` |
| Placeholder slotu / naklejka | `screens-flow.jsx` | `PitchSlot`, `Pitch` |
| Karta zawodnika | `screens-sheets.jsx` | `PlayerCardSheet`, `PlayerListSheet` |
| Kafelek zadania + panel | `screens-mechanics.jsx` | `TasksEntry`, `TasksSheet`, `MechTiles` |
| Karta zdarzenia | `event-cards.jsx` | `EventCard` |
| Tabela live | `tournament-screens.jsx` | `StandingsTable` |
| Karta meczu | `tournament-screens.jsx` | `MatchCard`, `FixtureRow` |
| Drabinka pucharowa | `tournament-screens.jsx` | `Ladder` |
| Kafelek turnieju (hub) | `tournament-screens.jsx` / `app.jsx` | `TournamentTile` / `TournamentHub` |
| Ekran końcowy turnieju | `tournament-screens.jsx` | `EndScreen` |
| Chip drużyny / nazwa | `tournament-screens.jsx` | `FlagChip`, `teamName`, `TEAM` |
| Modal draftu | `screens-sheets.jsx` | `DraftSheet` |
| Modal zgłoszenia błędu | `screens-modals.jsx` | `ReportBugSheet` |
| Modal patch notes | `screens-modals.jsx` | `WhatsNewSheet` |
| Modal „Jak grać?" | `screens-modals.jsx` | `HowToPlaySheet` |
| Wybór formacji / menedżera | `screens-modals.jsx` / `screens-mechanics.jsx` | `FormationSheet`, `ManagerSheet` |

**Router makiety turniejów** (referencja, nie do wklejenia 1:1): `tournament-flow-data.jsx`, `tournament-flow-steps.jsx`, `tournament-flow-app.jsx` (host: `Turnieje-flow.html`).

---

## C. MIKROCOPY (PL — dokładne teksty UI)

> Renderuj nazwy z czytelnych pól (`name`, `teamName(code)`). **Nie używaj `normalizeName()` do wyświetlania** — to funkcja porównawcza, nie prezentacyjna.

**Menu startowe**
- Sekcja: „Wybierz tryb"
- Standard — plakietka: „Polecane na start"; opis: „Buduj drużynę marzeń. Bez budżetu, bez zadań — sama frajda."
- Normal — „Budżet 200 mln"; opis: „Mocny skład w ramach budżetu. Trochę kompromisów."
- Hardcore — „Budżet 180 mln"; opis: „Mniej pieniędzy, większa rola średniaków. Dla wyjadaczy."
- Kafelki: „Jak grać?", „Co nowego?", „Zgłoś błąd"

**Ekran składu**
- „Skład" · „x/11" · „Zgranie ekipy"
- Etykiety zgrania: „Słabo zgrani" / „Średnie zgranie" / „Dobre zgranie" / „Zgrany zespół"
- „Formacja" · „4-3-3" · „Szeroka ofensywa" · przycisk „Zmień"
- Zakładki: „Boisko" / „Lista" / „Turnieje"
- Pusty slot: „Wybierz +" (+ kod pozycji: NAP/POM/OBR/BR)
- CTA: „Dobierz zawodnika" / „Zagraj miniturniej"
- Pasek braków: „Brakuje jeszcze {n} zawodników do pełnej jedenastki."

**Modal draftu**
- Tytuł: „Twoja wylosowana ekipa"
- Komunikat o zamrożeniu: „Ta pula jest zamrożona. Zamknięcie nic nie zmienia — losuje tylko przycisk poniżej."
- Przycisk: „Inna ekipa ({pozostało})"
- CTA: „Dodaj do składu" / „Zostaw tę ekipę"

**Zadania (Normal/Hardcore)**
- Kafelek: „Zadania sezonu" · „{done}/{all} zaliczone"
- Panel: „Zadania sezonu"; brak powtórek kategorii; pasek + licznik „po ludzku".

**Zdarzenia (wycinek gazety)**
- Plakietka: „Zdarzenie"; sekcje: „Co to znaczy", „Wybór zapadł"
- Mikrokopia przy wyborze: „Najpierw wybierz wariant — decyzji nie da się cofnąć."
- CTA: „Kontynuuj"

**Turnieje — hub**
- Nagłówek: „Turnieje" · „Wybierz rozgrywki"
- EURO 2016 Retro — plakietka „Polecany"; opis: „Poprowadź Polskę od grupy z Niemcami, Ukrainą i Irlandią Północną aż do finału."
- Blokada składu: „Skompletuj skład {x}/11, aby wejść do turnieju."
- Sekcja „Wkrótce":
  - Mundial 2002 — „Poprowadź Polskę przez turniej w Korei i Japonii. Korea, Portugalia, USA — i szansa, żeby napisać historię na nowo."
  - Historyczne sezony — „Kultowe sezony polskiej ligi do odtworzenia od pierwszej kolejki."
  - Europejskie puchary — „Droga przez europejskie drabinki — od eliminacji aż po wielki finał."

**Turnieje — flow (przykłady)**
- Tabela: kolumny „# · Drużyna · M · Pkt · +/−"; legenda „Miejsca 1–2 — awans do fazy pucharowej" + „3. miejsce — najlepsze ekipy też awansują" (tylko EURO).
- Paski statusu: „Polska wychodzi z grupy!" / „Wszystko rozstrzygnie ostatni mecz" / „Koniec marzeń o fazie pucharowej".
- Mecz: „Rozegraj mecz" → wynik → „Zobacz tabelę"; komentarz w sekcji „Kronika kolejki".
- Drabinka: etapy „1/8 finału · Ćwierćfinał · Półfinał · Finał"; stany „Teraz" / „Rywal nieznany".
- Ekran końcowy: nagłówek gazetowy + „Droga Polski"/„Twoja droga" + „Najlepszy" + „Skład" + komentarz; CTA „Wróć do huba" / „Zagraj ponownie".

**Badge zawodników (zawsze etykiety, nie surowe kody w treści):** REP — reprezentant, LEG — legenda, SFG — kultowy obcokrajowiec, KAP — kapitan, TECH — technik/kreator.

---

## D. LISTA MIKRO-HOTFIXÓW DLA CODEXA

### MIKRO-HOTFIX 1: Kodowanie i polskie znaki
**CEL:** Wszędzie poprawne UTF-8, zero mojibake.
**ZAKRES:** Upewnij się, że `index.html` ma `<meta charset="utf-8">`; wszystkie pliki zapisane w UTF-8; render nazw z pól tekstowych, nie z `normalizeName()`.
**NIE RUSZAJ:** treści/logiki — tylko kodowanie i ścieżka renderu nazw.
**WALIDACJA:** ą ć ę ł ń ó ś ż widoczne na: menu, składzie, draftcie, zadaniach, turniejach; brak „Â"/„Ã"; nazwiska zawodników poprawne.

### MIKRO-HOTFIX 2: Zakładka Turnieje → realny hub
**CEL:** Zakładka „Turnieje" otwiera hub kafelków zamiast ekranu „Wkrótce".
**ZAKRES:** W `app.jsx` render `TournamentHub` w `view === 'tournaments'`; zdjąć plakietkę „WKRÓTCE" z przycisku zakładki (już zrobione w Designie — zweryfikuj w aplikacji).
**NIE RUSZAJ:** logiki składu, CTA budowania, `data.js`.
**WALIDACJA:** kliknięcie „Turnieje" pokazuje EURO 2016 (Polecany) + 3 kafelki „Wkrótce"; żaden przycisk nie jest martwy; kafelki „Wkrótce" nieklikalne; styl spójny z kartami SKŁAD/FORMACJA.

### MIKRO-HOTFIX 3: Draft — „Inna ekipa" i zamrożenie
**CEL:** Reroll wyłącznie dedykowanym przyciskiem; zamknięcie/tap-poza nie losuje.
**ZAKRES:** W `DraftSheet` etykieta „Inna ekipa ({n})”; komunikat o zamrożeniu; grupowanie po pozycjach; CTA „Dodaj do składu".
**NIE RUSZAJ:** algorytmu losowania puli, bazy zawodników, kosztów.
**WALIDACJA:** tap-poza/X zostawia ekipę; tylko przycisk losuje; licznik rerolli spada; pozycje pogrupowane; brak „Losuj ponownie" w treści.

### MIKRO-HOTFIX 4: Standard bez zadań/eventów/budżetu
**CEL:** W Standardzie nie istnieją budżet, zadania, eventy, blokady przedturniejowe.
**ZAKRES:** Warunkowy render `MechTiles`/`TasksEntry`/zdarzeń tylko dla Normal/Hardcore; w Standardzie ich nie pokazywać (nie wyszarzać).
**NIE RUSZAJ:** trybów budżetowych (Normal/Hardcore) i ich logiki.
**WALIDACJA:** Standard: brak paska budżetu, brak kafelka zadań, brak eventów, „Zagraj miniturniej" dostępny po skompletowaniu składu; Normal: budżet+zadania obecne.

### MIKRO-HOTFIX 5: Tabela live — czytelność mobile
**CEL:** Tabela ma 5 kolumn i mieści się na telefonie.
**ZAKRES:** Użyj `StandingsTable` (# · Drużyna · M · Pkt · +/−); drużyna gracza wyróżniona; bez tekstu „stuknij drużynę".
**NIE RUSZAJ:** liczenia wyników/punktów (logika gry).
**WALIDACJA:** brak poziomego scrolla na 360–414 px; gracz podświetlony; legenda awansu widoczna; brak martwych afordansów.

### MIKRO-HOTFIX 6: Miniturniej — jeden spójny flow
**CEL:** Jeden tryb: grupa → tabela live → awans/odpadnięcie → faza pucharowa → finał → ekran końcowy.
**ZAKRES:** Wepnij ekrany z `tournament-screens.jsx` (StandingsTable, MatchCard, Ladder, EndScreen) do istniejącego silnika; usuń równoległy „stary puchar" bez grupy/tabeli (`screens-tournament.jsx`), gdy nowy flow działa.
**NIE RUSZAJ:** sposobu liczenia wyniku meczu (`simulateScore`) — podłącz go pod nowe ekrany.
**WALIDACJA:** od „Zagraj miniturniej" przejście aż do ekranu końcowego; tabela aktualizuje się po kolejce; awans i odpadnięcie mają osobne ekrany; brak dwóch różnych doświadczeń turnieju.

### MIKRO-HOTFIX 7: EURO 2016 — droga Polski
**CEL:** Kafelek EURO 2016 uruchamia narracyjny flow Grupy C.
**ZAKRES:** Podłącz EURO pod scenariusz z `Turnieje-flow.html` (intro → Grupa C → 3 mecze → tabela → awans/odpadnięcie → drabinka → finał → końcówki); rywale jako reprezentacje (`teamName`/`FlagChip`), bez danych technicznych.
**NIE RUSZAJ:** silnika miniturnieju ani bazy zawodników; nie symuluj wszystkich grup naraz.
**WALIDACJA:** widoczna Grupa C (POL/GER/UKR/NIR), terminarz 3 meczów, tabela live, awans z 1–2 oraz wariant z 3. miejsca, drabinka 1/8→finał, ≥2 warianty końcówek; czyste nazwy rywali.

### MIKRO-HOTFIX 8: Zdarzenia turniejowe (haki)
**CEL:** Miejsca na zdarzenia w przepływie turnieju, bez nowej bazy eventów.
**ZAKRES:** Wstaw `EventCard` w punktach: przed 1. meczem / przed meczem o awans / po awansie / przed finałem.
**NIE RUSZAJ:** bazy eventów Normal/Hardcore — tylko punkty zaczepienia.
**WALIDACJA:** karty mają nagłówek/opis/flavor/efekt/CTA „Kontynuuj"; wariant z 2 wyborami działa; styl wycinka gazety; brak generycznych alertów.

### MIKRO-HOTFIX 9: Mundial 2002 jako kafelek „Wkrótce"
**CEL:** Roadmapa, bez implementacji.
**ZAKRES:** Kafelek „Mundial 2002" w sekcji „Wkrótce" z opisem z sekcji C; stan zablokowany.
**NIE RUSZAJ:** flow EURO/miniturnieju.
**WALIDACJA:** kafelek widoczny, nieklikalny, opis poprawny (Korea/Japonia), brak prowadzenia donikąd.

---

## E. KOLEJNOŚĆ WDROŻENIA (od najbezpieczniejszych)

1. HOTFIX 1 — kodowanie/PL (czysto kosmetyczne, zero ryzyka logiki).
2. HOTFIX 9 — kafelek Mundial 2002 (statyczny).
3. HOTFIX 2 — hub w zakładce Turnieje (UI, bez logiki gry).
4. HOTFIX 5 — tabela live (prezentacja).
5. HOTFIX 3 — draft „Inna ekipa"/zamrożenie (UI nad istniejącą logiką).
6. HOTFIX 4 — Standard bez zadań/eventów (warunkowy render).
7. HOTFIX 8 — haki zdarzeń turniejowych (wstawki).
8. HOTFIX 6 — jeden miniturniej (dotyka silnika turnieju).
9. HOTFIX 7 — EURO 2016 droga Polski (najwięcej składania).

---

## F. CZEGO NIE PODMIENIAĆ 1:1

- **`index.html`** — nie nadpisywać całości (montuje całą logikę + skrypty). Edytuj punktowo.
- **`data.js` / `GAME_DATA`** — nie nadpisywać (MODES, FORMATIONS, TASKS, MANAGERS, PATCH_NOTES, BUG_CATEGORIES, baza zawodników).
- **`app.jsx` jako cały flow** — nie zastępować maszyny stanów; edytuj fragmenty (render `view`, `TournamentHub`).
- **Logika draftu** (losowanie puli, koszty, rerolle) — UI tak, algorytm nie.
- **Baza zawodników** — nie nadpisywać nazwisk/atrybutów/badge'ów.
- **`ios_frame.jsx` / ramki telefonu** — nie używać; aplikacja ma własną ramkę bez chromu telefonu.
- Pliki Designu `tournament-flow-*.jsx` i `Turnieje-flow.html` traktować jako **referencję/spec**, nie jako drop-in do produkcyjnego flow.

---

## G. RYZYKA

- **Utrata logiki draftu** — przy przenoszeniu UI podmieniono algorytm losowania zamiast tylko wyglądu.
- **Martwe przyciski** — kafelki/CTA bez podpiętego handlera (szczególnie hub, „Inna ekipa", warianty końcówek).
- **Brak scrolla na mobile** — sztywne wysokości / `overflow:hidden` zamiast scrolla treści; CTA zasłania dolne sloty (brak safe-area).
- **Przebijanie starego UI** — pozostawiony stary teaser/ekran turnieju pod nowym hubem.
- **Podwójne systemy turnieju** — równolegle stary puchar (bez grupy) i nowy flow → dwa różne doświadczenia.
- **Złe polskie znaki** — mojibake przy zapisie nie-UTF-8 lub renderze przez `normalizeName()`.
- **Zbyt skomplikowany onboarding** — dokładanie kroków/tłumaczeń w Standardzie (ma być „od razu gram").

---

## H. SMOKE TEST PO KAŻDYM HOTFIXIE

- [ ] Gra się uruchamia (brak białego ekranu, mount OK).
- [ ] Działa Standard (wybór trybu → ekran składu).
- [ ] Działa Normal (budżet + zadania widoczne).
- [ ] Otwiera się draft (modal, zamrożona pula).
- [ ] Da się wybrać zawodnika (Dodaj do składu działa).
- [ ] Skład się aktualizuje (licznik x/11, zgranie).
- [ ] Działa scroll (Boisko/Lista/Turnieje, dolne sloty odsłaniane).
- [ ] Brak starych sekcji UI pod spodem (zero duplikatów/teaserów).
- [ ] Brak krytycznych błędów JS (konsola czysta).
- [ ] Polskie znaki poprawne na wszystkich ekranach dotkniętych hotfixem.

---

**Poza zakresem (nie robić):** liga, kariera, rynek transferowy, ekonomia, nowe zadania, nowa baza zawodników, pełny Mundial 2002, pełna symulacja wszystkich grup EURO, przebudowa draftu. Nie projektować nowych ekranów — tylko wdrożyć ustalony UX.
