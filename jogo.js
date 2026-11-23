const frota = new Map([['porta-aviões', 5], ['encouraçado', 4], ['submarino', 3], ['destroier', 2]]);

function dentro(n) {
  return Number.isInteger(n) && n >= 0 && n < 10;
}

class BatalhaNaval {
  constructor() {
    this.navios = new Map();
    this.ocupacao = new Map();
    this.tiros = new Set();
    this.afundados = 0;
  }

  posicionar(tipo, linha, coluna, direcao) {
    if (!frota.has(tipo) || this.navios.has(tipo) || !['H', 'V'].includes(direcao)) {
      throw new Error('Navio ou direção inválida.');
    }
    const casas = [];
    for (let i = 0; i < frota.get(tipo); i++) {
      const l = linha + (direcao === 'V' ? i : 0);
      const c = coluna + (direcao === 'H' ? i : 0);
      const casa = l * 10 + c;
      if (!dentro(l) || !dentro(c) || this.ocupacao.has(casa)) throw new Error('Posição inválida.');
      casas.push(casa);
    }
    this.navios.set(tipo, casas);
    for (const casa of casas) this.ocupacao.set(casa, tipo);
  }

  atirar(l, c) {
    if (this.navios.size !== frota.size || this.venceu()) throw new Error('Tiro fora da partida.');
    const casa = l * 10 + c;
    if (!dentro(l) || !dentro(c) || this.tiros.has(casa)) throw new Error('Tiro inválido.');
    this.tiros.add(casa);
    if (!this.ocupacao.has(casa)) return 'água';
    const tipo = this.ocupacao.get(casa);
    if (this.navios.get(tipo).every(i => this.tiros.has(i))) {
      this.afundados++;
      return 'afundou';
    }
    return 'acertou';
  }

  venceu() {
    return this.afundados === frota.size;
  }
}
module.exports = { BatalhaNaval };
