/// <reference path="../modules/Shared/Shared.ts" />


describe('foo',()=>{
   it('2 mal 3 is 6', ()=>{
       expect(Shared.mal(2,3)).toBe(6);
   })
});

describe('foobar',()=>{
   it('2 mal 3 is 5', ()=>{
       expect(Shared.plus(2,3)).toBe(5);
   })
});

