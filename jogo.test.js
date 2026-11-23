const test = require('node:test');
const assert = require('node:assert/strict');
const { BatalhaNaval } = require('./jogo');

const frota = [['porta-aviões',5], ['encouraçado',4], ['submarino',3], ['destroier',2]];
function preparar() {
  const jogo = new BatalhaNaval();
  frota.forEach(([tipo], linha) => jogo.posicionar(tipo, linha, 0, 'H'));
  return jogo;
}

test("Frota e dimensões", () => {
  const jogo = preparar();
  assert.deepEqual([...jogo.navios.values()].map(c => c.length), [5,4,3,2]);
  assert.equal(jogo.ocupacao.size, 14);
  assert.equal(jogo.atirar(9,9), 'água');
  for (const [l,c] of [[10,0],[0,10],[-1,0],[0,-1]]) assert.throws(() => jogo.atirar(l,c));
});

test("Posicionamento vertical na borda", () => {
  const jogo = new BatalhaNaval();
  jogo.posicionar('submarino',7,9,'V');
  assert.deepEqual(jogo.navios.get('submarino'), [79,89,99]);
});

test("Posições inválidas sem alteração parcial", () => {
  const jogo = new BatalhaNaval();
  jogo.posicionar('destroier',1,2,'V');
  assert.throws(() => jogo.posicionar('submarino',1,0,'H'));
  assert.throws(() => jogo.posicionar('submarino',8,0,'V'));
  assert.throws(() => jogo.posicionar('submarino',0,8,'H'));
  assert.throws(() => jogo.posicionar('destroier',4,0,'H'));
  assert.throws(() => jogo.posicionar('submarino',4,0,'D'));
  assert.throws(() => jogo.posicionar('barco',4,0,'H'));
  assert.equal(jogo.ocupacao.size, 2);
});

test("Preparação e repetição de tiros", () => {
  assert.throws(() => new BatalhaNaval().atirar(0,0));
  const jogo = preparar();
  for (const [l,c] of [[0,0],[9,9]]) {
    jogo.atirar(l,c);
    assert.throws(() => jogo.atirar(l,c));
  }
  assert.equal(jogo.tiros.size, 2);
});

test("Afundamento e vitória", () => {
  const jogo = preparar();
  for (const [l, [, tamanho]] of frota.entries()) {
    for (let c = 0; c < tamanho; c++) {
      assert.equal(jogo.venceu(), false);
      assert.equal(jogo.atirar(l,c), c === tamanho - 1 ? 'afundou' : 'acertou');
    }
  }
  assert.ok(jogo.venceu());
  assert.throws(() => jogo.atirar(9,9));
});
