const truffleCost = require('truffle-cost');
const Ownable = artifacts.require('OwnableTest');

const smallString = 'Proinde concepta rabie saeviore, quam desperatio incendebat et fames';

const mediumString = 'Proinde concepta rabie saeviore, quam desperatio incendebat et fames, amplificatis viribus ardore incohibili in excidium urbium matris Seleuciae efferebantur, quam comes tuebatur Castricius tresque legiones bellicis sudoribus induratae. Unde Rufinus ea tempestate praefectus praetorio ad discrimen trusus est ultimum. ire enim ipse compellebatur ad militem, quem exagitabat inopia simul et feritas, et alioqui coalito more in ordinarias dignitates asperum semper et saevum, ut satisfaceret atque monstraret, quam ob causam annonae convectio sit impedita. In his tractibus navigerum nusquam visitur flumen sed in locis plurimis aquae suapte natura calentes emergunt ad usus aptae multiplicium medelarum. verum has quoque regiones pari sorte Pompeius Iudaeis domitis et Hierosolymis captis in provinciae speciem delata iuris dictione formavit.';

let hugeString;

for (let i = 0; i < 10; i++) {
  hugeString = hugeString + mediumString;
}

contract('OwnableTest', async (accounts) => {
  const user1 = accounts[1];
  const user2 = accounts[2];
  let ownable;
  let result;

  it('User1 should deploy Ownable', async() => {
    ownable = await Ownable.new({from: user1})
    assert(ownable);
  });

  it('Ownable\'s owner should be User1', async() => {
    result = await ownable.owner();
    assert.equal(result, user1);
  });

  it('User1 should transfer Ownable to User2', async() => {
    result = await truffleCost.log(
      ownable.transferOwnership(user2, {from: user1})
    );
    assert(result);
  });

  it('User2 should set a small string in contract storage', async() => {
    result = await truffleCost.log(
      ownable.setString(smallString, {from: user2}),
      'USD'
    );
    assert(result);
  });

  it('User2 should set a medium string in contract storage', async() => {
    result = await truffleCost.log(
      ownable.setString(mediumString, {from: user2}),
      'USD'
    );
    assert(result);
  });

  it('User2 should set a freaking long string in contract storage', async() => {
    result = await truffleCost.log(
      ownable.setString(hugeString, {from: user2}),
      'USD'
    );
    assert(result);
  });

});
