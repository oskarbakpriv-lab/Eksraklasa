# Ekstraklasa Retro Draft — zasady projektu

## Tryby
- **Standard = Sandbox** — jeden i ten sam tryb „buduję drużynę marzeń".
  - BEZ budżetu, BEZ zadań/wyzwań, BEZ losowych eventów, BEZ zdarzeń trenera.
  - BEZ blokad przed turniejem — przycisk „Zagraj turniej" aktywny od startu.
  - W UI Standardu te elementy mają NIE ISTNIEĆ (nie wyszarzać ich, nie pokazywać „wkrótce").
- Normal / Hardcore zostają z budżetami — nie likwidujemy ich.

## Zakres prac
- Poprawiamy WYŁĄCZNIE UX/UI istniejącego flow: wybór trybu → losowanie ekipy → wybór zawodnika → skład → miniturniej → ekran końcowy.
- NIE projektujemy nowych mechanik (formacje, draft, liczenie zgrania, miniturniej — bez zmian w logice).

## Styl
- Mobile-first (testy z linku na telefonie).
- Retro piłkarskie, klimat polskiej ligi, czytelność > ozdobniki, mocne kontrasty, duże przyciski, krótkie teksty, dobre scrollowanie, brak chaosu w modalach.

## Twarde zasady UI
- Kodowanie UTF-8 — poprawne polskie znaki (żadnego mojibake).
- NIE pokazywać surowych danych technicznych: „OVR 70", „weirdRealTeam", „Najmocniejsza dekada: - - 0 ()". Zamiast liczb — etykiety/gwiazdki „po ludzku".
- Badge zawodników: REP (reprezentant), LEG (legenda), SFG (kultowy obcokrajowiec), KAP (kapitan), TECH (technik/kreator).
- Draft modal: zamknięcie / tap-poza ≠ reroll. Reroll tylko dedykowanym przyciskiem z licznikiem. Mikrokopia bezpieczeństwa.
- Tap-targety min. 44–56px, jedno dominujące CTA na ekran.
