/* Ekstraklasa Retro Draft — przykładowe dane (prawdziwe historyczne nazwiska i kluby).
   Tylko do prototypu UX. Atrybuty „po ludzku" jako gwiazdki 1–5, bez surowego OVR. */
(function () {
  // Pozycje: BR = bramkarz, OBR = obrońca, POM = pomocnik, NAP = napastnik
  // Badge: REP reprezentant · LEG legenda · SFG kultowy obcokrajowiec · KAP kapitan · TECH technik/kreator
  // klasa: etykieta zamiast liczby OVR
  const A = (a, b, c, d) => [a, b, c, d]; // skrót dla gwiazdek

  const PLAYERS = [
    // ── BRAMKARZE ─────────────────────────────────────────────
    { id: 'tomaszewski', name: 'Jan Tomaszewski', pos: 'BR', club: 'ŁKS Łódź', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Światowa klasa', attrs: { 'Refleks': 5, 'Wyjścia': 4, 'Gra nogą': 3, 'Spokój': 5 } },
    { id: 'mlynarczyk', name: 'Józef Młynarczyk', pos: 'BR', club: 'Widzew Łódź', era: 'lata 80.', badges: ['REP', 'LEG'], klasa: 'Mistrz ligi', attrs: { 'Refleks': 5, 'Wyjścia': 4, 'Gra nogą': 3, 'Spokój': 4 } },
    { id: 'boruc', name: 'Artur Boruc', pos: 'BR', club: 'Legia Warszawa', era: 'lata 2000.', badges: ['REP'], klasa: 'Mistrz ligi', attrs: { 'Refleks': 5, 'Wyjścia': 4, 'Gra nogą': 4, 'Spokój': 3 } },
    { id: 'dudek', name: 'Jerzy Dudek', pos: 'BR', club: 'Sokół Tychy', era: 'lata 90.', badges: ['REP', 'LEG'], klasa: 'Światowa klasa', attrs: { 'Refleks': 5, 'Wyjścia': 5, 'Gra nogą': 3, 'Spokój': 4 } },

    // ── OBROŃCY ───────────────────────────────────────────────
    { id: 'zmuda', name: 'Władysław Żmuda', pos: 'OBR', club: 'Widzew Łódź', era: 'lata 70.', badges: ['REP', 'LEG', 'KAP'], klasa: 'Światowa klasa', attrs: { 'Krycie': 5, 'Odbiór': 5, 'Gra w powietrzu': 4, 'Siła': 4 } },
    { id: 'szymanowski', name: 'Antoni Szymanowski', pos: 'OBR', club: 'Wisła Kraków', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Mistrz ligi', attrs: { 'Krycie': 4, 'Odbiór': 4, 'Gra w powietrzu': 3, 'Siła': 4 } },
    { id: 'gorgon', name: 'Jerzy Gorgoń', pos: 'OBR', club: 'Górnik Zabrze', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Mistrz ligi', attrs: { 'Krycie': 4, 'Odbiór': 4, 'Gra w powietrzu': 5, 'Siła': 5 } },
    { id: 'bak', name: 'Jacek Bąk', pos: 'OBR', club: 'Polonia Warszawa', era: 'lata 2000.', badges: ['REP', 'KAP'], klasa: 'Mistrz ligi', attrs: { 'Krycie': 4, 'Odbiór': 4, 'Gra w powietrzu': 4, 'Siła': 4 } },
    { id: 'hajto', name: 'Tomasz Hajto', pos: 'OBR', club: 'GKS Katowice', era: 'lata 90.', badges: ['REP'], klasa: 'Solidny ligowiec', attrs: { 'Krycie': 3, 'Odbiór': 4, 'Gra w powietrzu': 4, 'Siła': 4 } },
    { id: 'wasilewski', name: 'Marcin Wasilewski', pos: 'OBR', club: 'GKS Katowice', era: 'lata 2000.', badges: ['REP'], klasa: 'Solidny ligowiec', attrs: { 'Krycie': 4, 'Odbiór': 3, 'Gra w powietrzu': 4, 'Siła': 5 } },
    { id: 'jalocha', name: 'Jacek Jałocha', pos: 'OBR', club: 'Wisła Kraków', era: 'lata 90.', badges: [], klasa: 'Solidny ligowiec', attrs: { 'Krycie': 3, 'Odbiór': 4, 'Gra w powietrzu': 3, 'Siła': 3 } },
    { id: 'wojcicki', name: 'Roman Wójcicki', pos: 'OBR', club: 'GKS Katowice', era: 'lata 80.', badges: ['REP'], klasa: 'Mistrz ligi', attrs: { 'Krycie': 4, 'Odbiór': 4, 'Gra w powietrzu': 3, 'Siła': 4 } },

    // ── POMOCNICY ─────────────────────────────────────────────
    { id: 'deyna', name: 'Kazimierz Deyna', pos: 'POM', club: 'Legia Warszawa', era: 'lata 70.', badges: ['REP', 'LEG', 'KAP', 'TECH'], klasa: 'Światowa klasa', attrs: { 'Technika': 5, 'Podanie': 5, 'Wizja': 5, 'Wytrzymałość': 4 } },
    { id: 'boniek', name: 'Zbigniew Boniek', pos: 'POM', club: 'Widzew Łódź', era: 'lata 80.', badges: ['REP', 'LEG', 'TECH'], klasa: 'Światowa klasa', attrs: { 'Technika': 5, 'Podanie': 4, 'Wizja': 5, 'Wytrzymałość': 5 } },
    { id: 'kasperczak', name: 'Henryk Kasperczak', pos: 'POM', club: 'Stal Mielec', era: 'lata 70.', badges: ['REP', 'LEG', 'TECH'], klasa: 'Mistrz ligi', attrs: { 'Technika': 5, 'Podanie': 5, 'Wizja': 4, 'Wytrzymałość': 4 } },
    { id: 'maszczyk', name: 'Zygmunt Maszczyk', pos: 'POM', club: 'Ruch Chorzów', era: 'lata 70.', badges: ['REP'], klasa: 'Mistrz ligi', attrs: { 'Technika': 4, 'Podanie': 4, 'Wizja': 4, 'Wytrzymałość': 5 } },
    { id: 'krzynowek', name: 'Jacek Krzynówek', pos: 'POM', club: 'Raków Częstochowa', era: 'lata 90.', badges: ['REP'], klasa: 'Mistrz ligi', attrs: { 'Technika': 4, 'Podanie': 4, 'Wizja': 4, 'Wytrzymałość': 4 } },
    { id: 'sobolewski', name: 'Radosław Sobolewski', pos: 'POM', club: 'Wisła Kraków', era: 'lata 2000.', badges: ['REP', 'KAP'], klasa: 'Solidny ligowiec', attrs: { 'Technika': 3, 'Podanie': 4, 'Wizja': 3, 'Wytrzymałość': 5 } },
    { id: 'andradina', name: 'Edi Andradina', pos: 'POM', club: 'Wisła Kraków', era: 'lata 2000.', badges: ['SFG', 'TECH'], klasa: 'Mistrz ligi', attrs: { 'Technika': 5, 'Podanie': 4, 'Wizja': 5, 'Wytrzymałość': 3 } },
    { id: 'baszczynski', name: 'Mariusz Kukiełka', pos: 'POM', club: 'Górnik Zabrze', era: 'lata 2000.', badges: [], klasa: 'Solidny ligowiec', attrs: { 'Technika': 3, 'Podanie': 3, 'Wizja': 3, 'Wytrzymałość': 4 } },

    // ── NAPASTNICY ────────────────────────────────────────────
    { id: 'lubanski', name: 'Włodzimierz Lubański', pos: 'NAP', club: 'Górnik Zabrze', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Światowa klasa', attrs: { 'Wykończenie': 5, 'Drybling': 5, 'Szybkość': 5, 'Spryt': 5 } },
    { id: 'szarmach', name: 'Andrzej Szarmach', pos: 'NAP', club: 'Górnik Zabrze', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Światowa klasa', attrs: { 'Wykończenie': 5, 'Drybling': 4, 'Szybkość': 4, 'Spryt': 5 } },
    { id: 'lato', name: 'Grzegorz Lato', pos: 'NAP', club: 'Stal Mielec', era: 'lata 70.', badges: ['REP', 'LEG'], klasa: 'Światowa klasa', attrs: { 'Wykończenie': 5, 'Drybling': 4, 'Szybkość': 5, 'Spryt': 4 } },
    { id: 'citko', name: 'Marek Citko', pos: 'NAP', club: 'Widzew Łódź', era: 'lata 90.', badges: ['REP', 'TECH'], klasa: 'Mistrz ligi', attrs: { 'Wykończenie': 4, 'Drybling': 5, 'Szybkość': 5, 'Spryt': 4 } },
    { id: 'frankowski', name: 'Tomasz Frankowski', pos: 'NAP', club: 'Wisła Kraków', era: 'lata 2000.', badges: ['REP'], klasa: 'Mistrz ligi', attrs: { 'Wykończenie': 5, 'Drybling': 3, 'Szybkość': 4, 'Spryt': 5 } },
    { id: 'zurawski', name: 'Maciej Żurawski', pos: 'NAP', club: 'Wisła Kraków', era: 'lata 2000.', badges: ['REP', 'KAP'], klasa: 'Mistrz ligi', attrs: { 'Wykończenie': 4, 'Drybling': 4, 'Szybkość': 4, 'Spryt': 4 } },
    { id: 'olisadebe', name: 'Emmanuel Olisadebe', pos: 'NAP', club: 'Polonia Warszawa', era: 'lata 2000.', badges: ['REP', 'SFG'], klasa: 'Mistrz ligi', attrs: { 'Wykończenie': 4, 'Drybling': 4, 'Szybkość': 5, 'Spryt': 4 } },
    { id: 'rengifo', name: 'Hernán Rengifo', pos: 'NAP', club: 'Lech Poznań', era: 'lata 2010.', badges: ['SFG'], klasa: 'Solidny ligowiec', attrs: { 'Wykończenie': 4, 'Drybling': 3, 'Szybkość': 4, 'Spryt': 4 } },
    { id: 'chinyama', name: 'Takesure Chinyama', pos: 'NAP', club: 'Legia Warszawa', era: 'lata 2010.', badges: ['SFG'], klasa: 'Solidny ligowiec', attrs: { 'Wykończenie': 4, 'Drybling': 3, 'Szybkość': 4, 'Spryt': 3 } },
    { id: 'paixao', name: 'Flávio Paixão', pos: 'NAP', club: 'Lechia Gdańsk', era: 'lata 2010.', badges: ['SFG'], klasa: 'Mistrz ligi', attrs: { 'Wykończenie': 4, 'Drybling': 4, 'Szybkość': 3, 'Spryt': 5 } },
  ];

  // Etykiety pozycji „po ludzku"
  const POS_LABELS = {
    BR: { short: 'BR', full: 'Bramkarze', one: 'Bramkarz' },
    OBR: { short: 'OBR', full: 'Obrona', one: 'Obrońca' },
    POM: { short: 'POM', full: 'Pomoc', one: 'Pomocnik' },
    NAP: { short: 'NAP', full: 'Atak', one: 'Napastnik' },
  };

  // Definicje badge'y (kolory ustawiane w CSS przez klasy)
  const BADGES = {
    REP: { code: 'REP', label: 'Reprezentant Polski', desc: 'Grał w biało-czerwonych barwach.' },
    LEG: { code: 'LEG', label: 'Legenda', desc: 'Kultowa postać polskiej piłki.' },
    SFG: { code: 'SFG', label: 'Kultowy obcokrajowiec', desc: 'Zagraniczna gwiazda Ekstraklasy.' },
    KAP: { code: 'KAP', label: 'Kapitan', desc: 'Prowadzi drużynę z opaską.' },
    TECH: { code: 'TECH', label: 'Technik / kreator', desc: 'Rozdaje gole i dyktuje grę.' },
  };

  // Tryby gry — flagi sterują tym, co W OGÓLE istnieje w UI danego trybu
  const MODES = [
    { id: 'standard', name: 'Standard', tag: 'Polecane na start', desc: 'Buduj drużynę marzeń. Bez budżetu, bez zadań — sama frajda.', recommended: true, budget: 0, hasBudget: false, hasTasks: false },
    { id: 'normal', name: 'Normal', tag: 'Budżet 200 mln', desc: 'Mocny skład w ramach budżetu. Trochę kompromisów.', recommended: false, budget: 200, hasBudget: true, hasTasks: true },
    { id: 'hardcore', name: 'Hardcore', tag: 'Budżet 180 mln', desc: 'Mniej pieniędzy, większa rola średniaków. Dla wyjadaczy.', recommended: false, budget: 180, hasBudget: true, hasTasks: true },
  ];

  // Menedżerowie — premia jako etykieta „po ludzku" (we wszystkich trybach)
  const MANAGERS = [
    { id: 'gorski', name: 'Kazimierz Górski', era: 'lata 70.', bonus: 'Duch Złotej Jedenastki', desc: 'Lepsze zgranie przy zawodnikach z lat 70.', affEra: 'lata 70.' },
    { id: 'kasperczak', name: 'Henryk Kasperczak', era: 'lata 70.', bonus: 'Wiślacki trzon', desc: 'Bonus do zgrania za graczy Wisły i Stali Mielec.', affClub: ['Wisła Kraków', 'Stal Mielec'] },
    { id: 'piechniczek', name: 'Antoni Piechniczek', era: 'lata 80.', bonus: 'Turniejowy spokój', desc: 'Drużyna mocniej gra w fazie pucharowej.', affEra: 'lata 80.' },
    { id: 'smuda', name: 'Franciszek Smuda', era: 'lata 2000.', bonus: 'Oko do obcokrajowca', desc: 'Bonus do zgrania za kultowych obcokrajowców (SFG).', affBadge: 'SFG' },
  ];

  // Ranking „klasy" zawodnika (po ludzku, zamiast OVR) — do zadania „linie"
  const KLASA_RANK = { 'Światowa klasa': 4, 'Mistrz ligi': 3, 'Objawienie': 2, 'Solidny ligowiec': 2 };

  // ── ZADANIA / WYZWANIA — TYLKO Normal/Hardcore ─────────────
  // Pula 5 kategorii. Każdy tryb dostaje „paczkę sezonu" = 3 zadania
  // o RÓŻNYCH kategoriach (bez powtórek). Postęp liczony na żywo ze składu.
  // diff = poziom trudności zadania (etykieta), niezależny od trybu gry.
  const TASKS_POOL = [
    {
      id: 'kadra', cat: 'reprezentacja', title: 'Kadrowy rdzeń', diff: 'Normal',
      desc: 'Miej 3 reprezentantów Polski w składzie.',
      kind: 'badge', badge: 'REP', goal: 3, unit: 'reprezentantów', unitOne: 'reprezentanta',
    },
    {
      id: 'sfg', cat: 'obcokrajowcy', title: 'Egzotyczny akcent', diff: 'Normal',
      desc: 'Miej przynajmniej 1 kultowego obcokrajowca (plakietka SFG).',
      kind: 'badge', badge: 'SFG', goal: 1, unit: 'obcokrajowców', unitOne: 'obcokrajowca',
    },
    {
      id: 'liderzy', cat: 'liderzy', title: 'Liderzy szatni', diff: 'Normal',
      desc: 'Miej 2 zawodników z plakietką KAP albo LEG.',
      kind: 'badgeAny', badges: ['KAP', 'LEG'], goal: 2, unit: 'liderów', unitOne: 'lidera',
    },
    {
      id: 'linie', cat: 'siła linii', title: 'Mocna każda linia', diff: 'Hardcore',
      desc: 'Miej zawodnika klasy mistrza w obronie, pomocy i ataku.',
      kind: 'lines', lines: ['OBR', 'POM', 'NAP'], goal: 3, unit: 'linie',
    },
    {
      id: 'rodzimy', cat: 'skład', title: 'Bez zagranicznych gwiazd', diff: 'Hardcore',
      desc: 'Zbuduj skład z maksymalnie 1 obcokrajowcem.',
      kind: 'foreignLimit', limit: 1, unit: 'obcokrajowiec',
    },
  ];

  // Paczka sezonu per tryb — 3 zadania, każde z innej kategorii.
  // Razem Normal+Hardcore pokrywają wszystkie 5 kategorii.
  const TASK_PACKS = {
    normal: ['kadra', 'sfg', 'liderzy'],
    hardcore: ['linie', 'rodzimy', 'kadra'],
  };
  function taskPackFor(modeId) {
    const ids = TASK_PACKS[modeId] || TASK_PACKS.normal;
    return ids.map((id) => TASKS_POOL.find((t) => t.id === id)).filter(Boolean);
  }
  // zgodność wstecz
  const TASKS = TASKS_POOL;

  // Region klubu — do zadań (po ludzku, nie techniczne)
  const CLUB_REGION = {
    'Górnik Zabrze': 'śląsk', 'Ruch Chorzów': 'śląsk', 'GKS Katowice': 'śląsk',
    'Widzew Łódź': 'łódź', 'ŁKS Łódź': 'łódź',
    'Legia Warszawa': 'stolica', 'Polonia Warszawa': 'stolica',
    'Wisła Kraków': 'małopolska',
    'Lech Poznań': 'wielkopolska',
    'Lechia Gdańsk': 'pomorze', 'Stal Mielec': 'podkarpacie',
    'Raków Częstochowa': 'śląsk', 'Sokół Tychy': 'śląsk',
  };

  // Koszt zawodnika (mln) — pochodna „klasy", używany tylko w trybach budżetowych
  const KOSZT = { 'Światowa klasa': 55, 'Mistrz ligi': 35, 'Solidny ligowiec': 18, 'Objawienie': 22 };
  PLAYERS.forEach((p) => {
    p.cost = (KOSZT[p.klasa] || 20) + (p.badges.includes('LEG') ? 10 : 0) + (p.badges.includes('SFG') ? 4 : 0);
    p.region = CLUB_REGION[p.club] || 'inne';
  });

  // ── FORMACJE ──────────────────────────────────────────────
  // Każda formacja to rzędy od ataku (góra) do bramki (dół).
  // Sloty budowane są automatycznie: BR-1, OBR-1..5, POM-1..5, NAP-1..3.
  // Dzięki temu przy zmianie formacji zawodnik zostaje na slocie o tym
  // samym indeksie pozycji, a nadmiarowe sloty są po prostu zwalniane.
  const FORMATIONS = {
    '4-4-2':   { id: '4-4-2',   name: '4-4-2',   desc: 'Klasyczna równowaga', rows: [['NAP', 'NAP'], ['POM', 'POM', 'POM', 'POM'], ['OBR', 'OBR', 'OBR', 'OBR'], ['BR']] },
    '4-3-3':   { id: '4-3-3',   name: '4-3-3',   desc: 'Szeroka ofensywa',    rows: [['NAP', 'NAP', 'NAP'], ['POM', 'POM', 'POM'], ['OBR', 'OBR', 'OBR', 'OBR'], ['BR']] },
    '4-2-3-1': { id: '4-2-3-1', name: '4-2-3-1', desc: 'Kontrola środka',     rows: [['NAP'], ['POM', 'POM', 'POM'], ['POM', 'POM'], ['OBR', 'OBR', 'OBR', 'OBR'], ['BR']] },
    '3-5-2':   { id: '3-5-2',   name: '3-5-2',   desc: 'Mocny środek pola',   rows: [['NAP', 'NAP'], ['POM', 'POM', 'POM', 'POM', 'POM'], ['OBR', 'OBR', 'OBR'], ['BR']] },
    '5-3-2':   { id: '5-3-2',   name: '5-3-2',   desc: 'Solidna defensywa',   rows: [['NAP', 'NAP'], ['POM', 'POM', 'POM'], ['OBR', 'OBR', 'OBR', 'OBR', 'OBR'], ['BR']] },
  };
  const FORMATION_ORDER = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2'];

  // Buduje listę slotów {slot, pos, row} z definicji formacji.
  function buildSlots(formation) {
    const counters = {};
    const slots = [];
    formation.rows.forEach((row, r) => {
      row.forEach((pos) => {
        counters[pos] = (counters[pos] || 0) + 1;
        slots.push({ slot: `${pos}-${counters[pos]}`, pos, row: r });
      });
    });
    return slots;
  }

  // domyślna formacja (zgodność wstecz)
  const FORMATION_433 = buildSlots(FORMATIONS['4-3-3']);

  // ── PATCH NOTES — modal „Co nowego?" (notka redakcyjna) ────
  const PATCH_NOTES = {
    version: 'Beta 0.9 · „Paczka UX 1"',
    date: 'wydanie czerwcowe',
    changes: [
      'Nowe menu startowe — bez ramki telefonu, czytelny wybór trybu.',
      'Tryb Standard naprawdę bez budżetu, zadań i zdarzeń — sama gra.',
      'Obowiązkowy kafelek „Formacja" i wybór ustawienia w każdym trybie.',
      'Ekran składu jak strona albumu — puste sloty to brakujące naklejki.',
      'Przycisk na dole reaguje na skład: dobierasz zawodnika lub grasz turniej.',
    ],
    known: [
      'Symulacja miniturnieju bywa kapryśna przy bardzo słabym składzie.',
      'Część nazwisk i klubów to wciąż dane przykładowe.',
    ],
    testing: [
      'Pełniejsza lista zawodników i klubów Ekstraklasy.',
      'Zakładka „Turnieje" i historia rozgrywek.',
    ],
  };

  // Kategorie zgłoszeń — modal „Zgłoś błąd"
  const BUG_CATEGORIES = ['Menu', 'Draft', 'Skład', 'Turniej', 'Zdarzenie', 'Mobile / wygląd', 'Inne'];

  window.GAME_DATA = {
    PLAYERS, POS_LABELS, BADGES, MODES,
    FORMATIONS, FORMATION_ORDER, buildSlots, FORMATION_433,
    MANAGERS, TASKS, TASKS_POOL, TASK_PACKS, taskPackFor, KLASA_RANK,
    CLUB_REGION, PATCH_NOTES, BUG_CATEGORIES,
  };
})();
