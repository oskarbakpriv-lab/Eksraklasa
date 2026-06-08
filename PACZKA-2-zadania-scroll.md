# Paczka UX 2 — scroll/bramkarz + zadania (Normal/Hardcore)

Zakres: **tylko** ekran składu (scroll + slot BR) oraz zadania w Normal/Hardcore.
Bez nowych mechanik, bez zmian w stylu bazowym, bez Euro/ligi.

---

## CZĘŚĆ 1 — SCROLL I BRAMKARZ

**Diagnoza (zmierzona):** przy domyślnym scrollu dolna krawędź slotu BR (590 px)
schodziła *pod* sticky CTA (góra 576 px) — bramkarz był zasłonięty, a plansza
wyglądała na „kompletną", więc nikt nie scrollował niżej.

Wdrożone poprawki:
1. **Plansza składu skompaktowana** — usunięty sztuczny `minHeight 460/410`,
   rzędy rozłożone równym `gap: 16`. Cała czwórka linii (NAP/POM/OBR/**BR**)
   mieści się czytelnie, bez zmniejszania placeholderów.
2. **Bottom safe-area** — na końcu scrolla dodany dystans
   `28px + env(safe-area-inset-bottom)`. Po dosunięciu BR ma **~115 px luzu**
   nad CTA (zmierzone) — nigdy nie chowa się pod przyciskiem.
3. **Jeden pionowy scroll całego ekranu** (bez zagnieżdżonego scrolla w boisku),
   pasek zakładek Boisko/Lista/Turnieje pozostaje sticky na górze.
4. **CTA = siostra scrolla**, nie overlay — pasek na dole nie przykrywa treści.

CTA zależne od stanu składu (zgodnie z briefem):
- **Niepełny skład →** główne `DOBIERZ ZAWODNIKA` + mikrocopy
  „Brakuje jeszcze X zawodników do pełnej jedenastki.".
- **11/11 →** główne `ZAGRAJ MINITURNIEJ`.
- Opcja „zagraj mimo niepełnego składu" — **nie istnieje** (usunięta w Paczce 1,
  potwierdzona tutaj).

---

## CZĘŚĆ 2 — ZADANIA (Normal/Hardcore)

Zadania **tylko** w trybach budżetowych. Standard = sandbox bez zadań (potwierdzone:
w Standardzie nie renderuje się ani kafelka, ani panelu).

### Kafelek „Zadania"
- Tytuł `ZADANIA`, status `0/3 ZALICZONE`, ikona checklisty.
- Element kompaktowego rzędu (Menedżer / Budżet / Zadania), nie ściana tekstu.
- Klik → panel **„Zadania sezonu"**.

### Panel „Zadania sezonu"
Każde zadanie = osobna karta-wycinek:
- tytuł, opis, pasek + licznik postępu,
- **badge trudności** (stonowany): `Normal` (jasny) / `Hardcore` (czarny),
  po zaliczeniu → zielony `ZALICZONE`,
- **komentarz „co jeszcze brakuje"** liczony na żywo
  (np. „Dołóż mistrza w: pomoc, atak.").

### Paczki bez powtórzeń kategorii
Pula 5 kategorii; każdy tryb dostaje **3 zadania z różnych kategorii**.
Razem Normal + Hardcore pokrywają wszystkie 5:

| Tryb | Zadania w paczce | Kategorie |
|---|---|---|
| **Normal** | Kadrowy rdzeń · Egzotyczny akcent · Liderzy szatni | reprezentacja / obcokrajowcy / liderzy |
| **Hardcore** | Mocna każda linia · Bez zagranicznych gwiazd · Kadrowy rdzeń | siła linii / skład / reprezentacja |

Postęp liczony ze składu na żywo, **bez surowych danych** (zamiast „80+ OVR"
→ „klasa mistrza"; bramkarz/limit pokazane po ludzku).

---

## Lista mikro-poprawek do wdrożenia

1. Plansza składu: usunąć stałe `minHeight`, równe `gap` między rzędami.
2. Dodać `bottom safe-area` (28px + `env(safe-area-inset-bottom)`) na końcu scrolla.
3. Sprawdzić, że slot **BR** ma min. ~24 px luzu nad CTA na najmniejszym telefonie.
4. CTA: `DOBIERZ ZAWODNIKA` ↔ `ZAGRAJ MINITURNIEJ` zależnie od `11/11`.
5. Kafelek zadań: tytuł `ZADANIA`, status `x/3 ZALICZONE`, ikona checklisty.
6. Panel: tytuł `Zadania sezonu`, karty z badge trudności i komentarzem „co brakuje".
7. Paczka = 3 zadania z różnych kategorii; Normal i Hardcore mają inne zestawy.
8. Zadanie-ograniczenie („max 1 obcokrajowiec") liczone na **gotowym** składzie —
   nie pokazuje się jako zaliczone przy pustej jedenastce.
9. Standard: zero kafelków zadań/budżetu/menedżera (sandbox).
10. Polskie odmiany w komentarzach („1 obcokrajowca", „3 reprezentantów").

### Do uzgodnienia (copy)
- „Stałe fragmenty" z briefu wskazywały na plakietkę **SFG** (= kultowy
  obcokrajowiec). To dwie różne rzeczy — w makiecie użyto czytelnego tytułu
  **„Egzotyczny akcent"**. Jeśli zadanie ma dotyczyć rzeczywiście stałych
  fragmentów, potrzebny inny wyznacznik niż SFG.
