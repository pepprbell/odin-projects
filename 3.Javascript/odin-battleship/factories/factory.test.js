import Ship from './shipFactory'
import Gameboard from './gameboardFactory';

// ship factory test code is written by ChatGPT
describe('Ship factory function', () => {
  it('should return an object with the correct length property', () => {
    const length = 4;
    const ship = Ship(length);
    expect(ship.length).toEqual(length);
  });

  it('should increase the hits property when the hit method is called', () => {
    const ship = Ship(4);
    ship.hit();
    expect(ship.count()).toEqual(1);
  });

  it('should return false when the isSunk method is called and the length is greater than the hits', () => {
    const ship = Ship(4);
    expect(ship.isSunk()).toBe(false);
  });

  it('should return true when the isSunk method is called and the length is equal to the hits', () => {
    const ship = Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe('Gameboard factory function', () => {
  it('should place ship and return true when valid coordinate and ship length are entered', () => {
    const gameboard = Gameboard()
    const coord = [0,0]
    const length = 4
    const garo = true
    expect(gameboard.placeShip(coord, length, garo)).toBe(true)
  })
  
  it('should not place ship when invalid coordinate is entered', () => {
    const gameboard = Gameboard()
    const coord = [11,-2]
    const length = 1
    expect(gameboard.placeShip(coord, length)).toBe(false)
  })

  it('should not place ship when invalid coordinate and length are entered', () => {
    const gameboard = Gameboard()
    const coord = [9,9]
    const length = 3
    const garo = false
    expect(gameboard.placeShip(coord, length, garo)).toBe(false)
  })

  it('should not place ship when there is another ship in the coordinates', () => {
    const gameboard = Gameboard()
    gameboard.placeShip([0,0],3,false)
    expect(gameboard.placeShip([0,0],3)).toBe(false)
  })

  it('should record attack and return if ship has sunk when the ship is attacked', () => {
    const gameboard = Gameboard()
    gameboard.placeShip([0,0], 3)
    expect(gameboard.receiveAttack([0,0])).toBe(false)
  })
  
  it('should record shot when a ship is not attacked', () => {})
  
  it('should return false when the spot has already shot', () => {})
  
  it('should when', () => {})
  
  it('should when', () => {})
})