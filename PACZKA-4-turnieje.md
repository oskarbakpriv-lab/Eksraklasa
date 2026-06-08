# Paczka UX 4 — Turnieje 1.0 (miniturniej + EURO 2016 Retro)

Spec wizualny + lista hotfixów do wdrożenia przez Codex. **Bez ligi, kariery,
rynku, ekonomii, nowych zadań i nowych danych zawodników.** Porządkujemy tylko
UX turniejów: miniturniej Ekstraklasy + pierwszy turniej historyczny EURO 2016.

Makieta: `Turnieje.html` (hub + 11 ekranów EURO + 2 ekrany miniturnieju).
Komponenty: `tournament-screens.jsx`, eventy z `event-cards.jsx`.

---

## A. Hub turniejów
1. Lista kafelków w stylu gazety: **Miniturniej Ekstraklasy** (tryb podstawowy),
   **EURO 2016 Retro** (akcent — polecany), oraz **zablokowane „Wkrótce"**:
   EURO 2000, Europejskie puchary, Historyczne sezony — **bez szczegółów**.
2. Kafelek EURO 2016 — dokładnie wg briefu: tytuł „EURO 2016 Retro",
   opis „Poprowadź Polskę od grupy z Niemcami, Ukrainą i Irlandią Północną aż do
   finału.", CTA „Rozpocznij turniej".

## B. Bez flag SVG
3. Reprezentacje/kluby = **kodowe chipy w barwach** (POL, GER, UKR, NIR…),
   nie rysowane flagi. Czytelne, on-brand, łatwe do utrzymania.

## C. Tabela live (kluczowy element)
4. Mobile = **maks. 5 kolumn**: `# · Drużyna · M · Pkt · +/−`. Bez ścisku.
5. **Polska podświetlona** (listwa w akcencie), miejsca awansu z zieloną kropką
   + legenda „Miejsca 1–2 — awans".
6. **Pasek statusu** pod tabelą, zmienny po każdym meczu:
   „Awans coraz bliżej" / „Wszystko rozstrzygnie ostatni mecz" /
   „Polska wychodzi z grupy!" / „Koniec marzeń o fazie pucharowej".
7. (opcjonalnie) tap w drużynę → szczegóły bilansu. Nie jest wymagane na start.

## D. Ekran meczu
8. Karta meczu: etap, `POLSKA — RYWAL` (chipy + nazwy), krótki opis, **forma**
   obu ekip (W/R/P), CTA „Rozegraj mecz".
9. Po meczu: duży wynik + **komentarz gazetowy** („Kronika kolejki", kursywa).
   Przykład: 0:0 → „Bezbramkowy klasyk. Defensywa zdała egzamin.".

## E. Faza pucharowa
10. **Pionowa ścieżka** (mobile): 1/8 → ćwierćfinał → półfinał → finał.
    Etap zaliczony = zielony „✓" + wynik; aktualny = akcent + „Teraz" + rywal;
    kolejne = zablokowane („Rywal nieznany"). Nie trzeba pełnej graficznej drabinki.

## F. EURO 2016 — droga Polski (Grupa C)
11. Realne grupy do prezentacji (focus na Grupie C: Polska, Niemcy, Ukraina,
    Irlandia Płn.). Pozostałe grupy mogą być w uproszczonym hubie — **nie
    symulować wszystkich naraz**.
12. Realne wyniki grupowe Polski jako domyślny scenariusz makiety
    (1:0 NIR, 0:0 GER, 1:0 UKR → 2. miejsce, awans). Faza pucharowa jako
    interaktywna droga (gracz może dojść dalej niż w rzeczywistości — aż do finału).

## G. Ekran końcowy (warianty)
13. Wspólny layout: winieta wyniku, **nagłówek gazetowy**, „Droga Polski"
    (lista etapów + wyniki), **najlepszy zawodnik**, **finalny skład**,
    komentarz. Warianty: odpadnięcie w grupie / 1/8 / ćwierćfinale / półfinale /
    finale + **wygranie turnieju**. Nagłówki: „Karny dramat w ćwierćfinale",
    „Historia napisana na nowo", „Biało-czerwoni w finale!" itd.
14. Wygrana = ton złoty/świętujący; odpadnięcie = ton stonowany (czerń/sepia),
    bez krzyczenia kolorem.

## H. Zdarzenia turniejowe
15. Miejsce na zdarzenia = **te same karty-wycinki** z Paczki 3 (`EventCard`),
    wstawiane przed ważnym meczem / po awansie / po porażce / przed finałem.
    Nie budować osobnej bazy eventów — tylko punkt zaczepienia w przepływie.

## I. Mobile / styl
16. Wszystko mobile-first: duże CTA (jedno dominujące na ekran), terminarz i
    tabela jak wycinek z gazety, brak drobnego tekstu, czytelne odstępy.
17. Reużycie tokenów `styles.css` (Oswald/Barlow, papier, badge) — żadnych nowych
    kolorów; akcent (czerwień) oszczędnie.

---

### Poza zakresem (NIE robić teraz)
Pełna liga, kariera, rynek transferowy, ekonomia, pełna symulacja wszystkich
turniejów/grup naraz, nowe zadania, nowe dane zawodników, przebudowa draftu.
