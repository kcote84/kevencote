(function () {
    var linesEl = document.getElementById('type-lines');
    var stampEl = document.getElementById('type-stamp');
    var cardEl = document.getElementById('type-card');

    if (!linesEl || !stampEl || !cardEl) {
        return;
    }

    var dialogue = [
        'Bonjour! Avez-vous une place mercredi?',
        'Oui, 14h ou 16h30 vous conviendrait?',
        '14h, parfait.'
    ];

    var TYPE_SPEED = 35;
    var LINE_PAUSE = 500;
    var END_PAUSE = 2400;
    var FADE_DURATION = 400;
    var RESTART_PAUSE = 900;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        linesEl.innerHTML = dialogue
            .map(function (line) { return '<p class="type-line">' + line + '</p>'; })
            .join('');
        cardEl.classList.add('is-done');
        stampEl.classList.add('is-visible');
        return;
    }

    function typeLine(lineIndex, charIndex, p) {
        var text = dialogue[lineIndex];
        p.textContent = text.slice(0, charIndex);

        if (charIndex < text.length) {
            setTimeout(function () { typeLine(lineIndex, charIndex + 1, p); }, TYPE_SPEED);
            return;
        }

        if (lineIndex + 1 < dialogue.length) {
            setTimeout(function () { startLine(lineIndex + 1); }, LINE_PAUSE);
        } else {
            setTimeout(showStamp, LINE_PAUSE);
        }
    }

    function startLine(lineIndex) {
        var p = document.createElement('p');
        p.className = 'type-line';
        linesEl.appendChild(p);
        typeLine(lineIndex, 0, p);
    }

    function showStamp() {
        cardEl.classList.add('is-done');
        stampEl.classList.add('is-visible');
        setTimeout(resetCycle, END_PAUSE);
    }

    function resetCycle() {
        cardEl.classList.add('is-fading');
        setTimeout(function () {
            linesEl.innerHTML = '';
            stampEl.classList.remove('is-visible');
            cardEl.classList.remove('is-done', 'is-fading');
            setTimeout(function () { startLine(0); }, RESTART_PAUSE);
        }, FADE_DURATION);
    }

    startLine(0);
})();
