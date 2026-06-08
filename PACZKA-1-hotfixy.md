# Paczka UX 1 — mikro-hotfixy do wdrożenia przez Codex

Lista konkretnych, drobnych poprawek UX/UI z Paczki 1. **Bez nowych mechanik** —
porządkujemy tylko wejście do gry i ekran składu. Kolejność = priorytet wdrożenia.

---

## A. Menu startowe
1. **Usuń ramkę telefonu** z ekranu startowego: godzina `9:41`, dynamic island,
   bateria, ikony systemowe (sieć/wifi). Ekran ma być „czystą" kartą aplikacji,
   nie mockupem iPhone'a.
2. **Dodaj 3 małe kafelki pomocnicze** pod wyborem trybu: `Jak grać?`,
   `Co nowego?`, `Zgłoś błąd`. Mniejsze, drugorzędne — nie mogą konkurować
   wizualnie z kartami trybów.
3. Karta **Standard** wyraźnie polecana na start (akcent + plakietka
   „Polecany na start"). Opisy trybów dokładnie wg briefu.

## B. Trzy modale (proste, bez ciężkich systemów)
4. **Jak grać?** — 6 kroków (Losujesz ekipę → … → Sprawdzasz wynik) + komunikat
   końcowy: „Na start wybierz Standard — bez budżetu, zadań i zdarzeń."
5. **Co nowego?** — patch notes w stylu notki redakcyjnej, sekcje:
   *Aktualna wersja*, *Najważniejsze zmiany*, *Znane problemy*, *Co testujemy teraz*.
6. **Zgłoś błąd** — prosty formularz: kategoria (Menu / Draft / Skład / Turniej /
   Zdarzenie / Mobile-wygląd / Inne), opis, opcjonalny kontakt, przycisk
   „Wyślij zgłoszenie", stan po wysłaniu „Dzięki, zgłoszenie zapisane.".
   **Bez** systemu ticketów.

## C. Standard = sandbox (twarda zasada)
7. W trybie **Standard** w UI **NIE renderuj wcale**: budżetu, zadań/wyzwań,
   zdarzeń trenera, losowych eventów, menedżera, blokad przed turniejem.
   Nie wyszarzać, nie pokazywać „wkrótce" — po prostu ich tam nie ma.
8. **Normal / Hardcore**: Budżet, Zadania, Menedżer pokazuj jako **kafelki-skróty**
   (jeden wiersz każdy), nie jako ścianę informacji.

## D. Ekran składu
9. **Kafelek „Formacja"** — obowiązkowy we wszystkich trybach, nad zakładkami
   Boisko/Lista. Pokazuje: tytuł, aktualne ustawienie (np. `4-3-3`), krótki opis
   (np. „Szeroka ofensywa"), akcję zmiany. Po kliknięciu wybór z 5 ustawień:
   `4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2`. Bez zaawansowanej taktyki.
10. **Placeholdery pustych slotów** — każdy pusty slot = „brakująca naklejka”:
    pozycja (BR/OBR/POM/NAP) + tekst `WYBIERZ` + znak `＋`.
11. **CTA na dole zależne od stanu składu**:
    - niepełny skład → główne `DOBIERZ ZAWODNIKA` + mikrocopy
      „Brakuje jeszcze X zawodników do pełnej jedenastki.".
    - pełne 11/11 → główne `ZAGRAJ MINITURNIEJ`.
    - **USUNIĘTE** (decyzja po Paczce 1): drugorzędna opcja „Zagraj miniturniej
      mimo niepełnego składu" oraz wszelkie zachęty „możesz grać niepełnym
      składem". Jedyna droga do turnieju to pełna jedenastka.
12. **Bottom safe area** — sticky CTA nie może zasłaniać bramkarza ani dolnych
    slotów. CTA jest siostrą scrolla (nie overlay) + `env(safe-area-inset-bottom)`.
13. Zakładki: `Boisko`, `Lista`, oraz **`Turnieje`** — wyeksponowana (akcent,
    ikona pucharu, znacznik „WKRÓTCE"), klikalna, otwiera teaser. To placeholder
    pod ważny przyszły tryb — NIE pełny hub turniejowy.

## D2. Kompaktowość i scroll (hotfix po Paczce 1)
14. **Cały ekran składu scrolluje pionowo** (jeden scroll, bez zagnieżdżonego
    scrolla w boisku). Pasek zakładek **sticky** na górze scrolla.
15. **Normal/Hardcore: Menedżer / Budżet / Zadania jako 3 kompaktowe, kwadratowe
    kafelki** (grid 1fr 1fr 1fr) zamiast trzech pełnych pasków — oszczędza pionu,
    nie zmniejsza tap-targetów ani czytelności pozycji/CTA.
16. **Standard** pokazuje tylko: skład/zgranie, formację, zakładki boisko/lista
    /turnieje. Bez budżetu, zadań, menedżera, zdarzeń, blokad.

## E. Czystość danych (twarde zasady UI)
14. **Usuń surowe dane techniczne** z widoku gracza:
    - `OVR 70` → etykieta klasy + pasek/gwiazdki („Światowa klasa", „Mistrz ligi"…).
    - liczbowe `ZGRANIE 13` → etykieta po ludzku („Zgrany zespół" + 4 paski).
    - identyfikatory typu `weirdRealTeam` → nazwa klubu po ludzku.
    - bug `Najmocniejsza dekada: - - 0 ()` → ukryj, dopóki nie ma sensownej wartości.
15. **Badge zawodników** wyłącznie z zestawu: `REP, LEG, SFG, KAP, TECH`
    (z legendą „co to znaczy?").
16. **Kodowanie UTF-8** — naprawić polskie znaki (żadnego mojibake:
    „skład", „drużyna", „błąd", „Górnik", „Łódź").

## F. Draft (bezpieczeństwo akcji)
17. **Reroll ≠ zamknięcie.** Zamknięcie okna / tap poza modalem **nie losuje**
    od nowa — wylosowana ekipa zostaje. Reroll tylko dedykowanym przyciskiem
    z licznikiem prób. Dodaj mikrocopy bezpieczeństwa pod przyciskami.

## G. Mobile
18. **Tap-targety** min. 44–56 px. Jedno dominujące CTA na ekran.
19. Pionowy scroll całego ekranu składu (nie zagnieżdżony scroll wewnątrz boiska).

---

### Poza zakresem Paczki 1 (NIE robić teraz)
Euro 2016, pełna liga, pełny system eventów, nowe zadania, nowe dane piłkarzy,
ekonomia, przebudowa bazy danych, pełny album kolekcjonerski.
