# Paczka UX 3 — Zdarzenia (Normal/Hardcore)

Spec wizualny + lista hotfixów do wdrożenia przez Codex. **Bez nowego silnika
eventów, bez nowych mechanik, bez danych eventów, bez Standardu.** Porządkujemy
tylko **wygląd i układ karty zdarzenia** — ma wyglądać jak wycinek z retro-gazety
sportowej, nie jak systemowy alert.

Makieta: `Zdarzenia.html` (8 wariantów + mobile/desktop). Komponent: `event-cards.jsx`.

---

## A. Zasada trybów
1. Zdarzenia **tylko Normal/Hardcore**. W **Standardzie nie istnieją** — nie
   renderować, nie wyszarzać, nie pokazywać „wkrótce".

## B. Anatomia karty (stała kolejność)
2. **Pasek „ZDARZENIE"** (czarny tag) + mikro-etykieta po prawej w akcencie
   (np. „Wycinek z szatni"). Pod spodem drobna data/sekcja (Oswald, mute2).
3. **Podwójna linijka** (`.dbl-rule`) jak w winiecie gazety.
4. **Nagłówek** jak tytuł gazety (Oswald 700, duży, `text-wrap: balance`).
5. **Lead** — krótki opis sytuacji (Barlow, `--ink-soft`).
6. **Flavor** — cytat/kursywa z pionową listwą w kolorze tonu.
7. **Sekcja efektu** w ramce (`border-top` w kolorze tonu, tło `--paper-3`):
   - nagłówek „Co to znaczy",
   - efekt **po ludzku** (pierwszy plan),
   - drobny **skrót techniczny** niżej (`Efekt: + zgranie / − świeżość`) — mute2,
     Oswald, mały. Nigdy jako tekst główny.
8. **Wybory** (jeśli są) — patrz C.
9. **Jedno dominujące CTA** na dole (`Kontynuuj` / kontekstowe).

## C. Wybory i stan po decyzji
10. Każdy wybór = **duży kafelek** (tap-target): litera A/B + tytuł + efekt po
    ludzku + drobny skrót techniczny. Listwa w kolorze tonu.
11. **Efekt każdego wyboru widoczny od razu** (przed kliknięciem) — gracz wie,
    co wybiera.
12. **Po decyzji:** wybrany kafelek podświetlony + badge `WYBRANO`, drugi
    **wygaszony** (opacity + grayscale), ramka efektu pokazuje wynik wyboru
    („Wybór zapadł"), CTA `Kontynuuj`.
13. **Mikrocopy bezpieczeństwa** pod wyborami: „Najpierw wybierz wariant —
    decyzji nie da się cofnąć.". Przed wyborem CTA nieaktywne („Wybierz powyżej").

## D. Tony (spokojne, papierowe — NIE krzyczą kolorem)
14. **Pozytywne** → zieleń `--b-tech` + badge „Dobra wiadomość". Ciepłe, nie cukierkowe.
15. **Negatywne** → czerń/sepia (`--ink`) + badge „Trudna sprawa", ciemne CTA.
    **Bez gryzącej czerwieni.**
16. **Menedżer** → osobny wariant: **notka z ławki** — złoty awatar trenera (inicjały),
    nazwisko + „trener · ławka", cytat trenera, złota listwa, ciemne CTA.
    Eventy menedżerów **unikalne per trener, bez powtórek i bez generyków**.
17. **Przedmeczowy** → pasek rywala (runda + opis przeciwnika), badge rundy w
    akcencie (czerwień **oszczędnie**), CTA „Wyjdź na boisko". Buduje dramaturgię.
18. **Pomeczowy** → chip wyniku (zieleń = wygrana / czerń = porażka), krótka reakcja.

## E. Mikrocopy etykiet (do rotacji, nie generyczne)
„Wycinek z szatni" · „Notka z boiska" · „Głos z trybun" · „Raport przedmeczowy" ·
„Doniesienia klubowe" · „Kronika kolejki" · „Notka z ławki".

## F. Mobile / desktop
19. Karta mieści się wygodnie na telefonie; przy długim tekście **scroll wewnątrz
    karty** (`max-height` + `overflow-y:auto`), nie obcinać CTA.
20. **Duże przyciski wyboru**, jedno dominujące CTA, **brak drobnego tekstu**
    (drugorzędny min. ~0.8rem; efekt nigdy w mikroczcionce).
21. Desktop: ta sama karta szersza (max ~560 px, wyśrodkowana na „stronie"),
    wybory mogą iść w **2 kolumnach**.

## G. Zakazane (twarde)
22. Neon, gryzące czerwienie/fiolety, systemowe alerty/popupy, generyczne teksty
    („coś się wydarzyło"), techniczne efekty na pierwszym planie, domyślne
    przyciski typu „Dokręć śrubę / Dodaj regenerację", placeholdery.

---

### Poza zakresem (NIE robić teraz)
Pełny silnik eventów, nowe dane zdarzeń, triggery/losowanie, nowe tryby,
Euro 2016, liga, ekonomia, zadania.
