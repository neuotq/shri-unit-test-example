import {testFunction} from '.';
const goodInn10_nonzero = [
    6702838316,
    6117254255,
    2736366872,    
    '0913766388',
    4838182483,    
    4815497818,
    1017313194,
    5370771751,
    1088834411,
    8621976791,
    8180872644
]

const goodInn10_zero = [    
    7563045020,    
    9107181170,    
]

const goodInn12_nonzero = [    
    518835114323,
    104672257783,
    544753898929,
    578770001983,        
    338502122766,    
    141356890821,    
    642808931736,
    436029480336
]

const goodInn12_zero = [
    471439872630,
    206538749770,
    674930910030,    
]

const goodInn12_zero2 = [
    686738171802,
    474570151004,
]


const goodInn12_zeroZero = [
    549737680900
]


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const getInn10 = () => goodInn10_nonzero[getRandomInt(goodInn10_nonzero.length)]
const getInn10_zero = () => goodInn10_zero[getRandomInt(goodInn10_zero.length)]

const getInnBadCRCPos = (inn, pos = 0) => 
 {
    const innStr = String(inn)    
    const newCrc = String( parseInt(innStr.charAt(pos)) + 1 )
    return innStr.substring(0, pos) +
        newCrc +
        innStr.substring(pos + 1);
 }

const getInn12 = () => goodInn12_nonzero[getRandomInt(goodInn12_nonzero.length)]
const getInn12_zero = () => goodInn12_zero[getRandomInt(goodInn12_zero.length)]
const getInn12_zero2 = () => goodInn12_zero2[getRandomInt(goodInn12_zero2.length)]
const getInn12_zeroZero = () => goodInn12_zeroZero[getRandomInt(goodInn12_zeroZero.length)]


const getBadLongInn11 = () => String(getInn10()) + '1'
const getBadLongInn = () => String(getInn12()) + '1'

const getBadShortInn = () =>  String(getInn10()).slice(1)
const getBadInnSymbol = () =>  'f' + String(getInn10).slice(1)

describe('Проверяем функцию валидации ИНН', () => {
    it('Проверяем верный 10 значный ИНН', () => {
        expect(testFunction(getInn10())).toBeTruthy();
    });

    it('Проверяем верный 10 значный ИНН с нулевым контрольным числом', () => {
        expect(testFunction(getInn10_zero())).toBeTruthy();
    }); 

    it('Проверяем верный 12 значный ИНН', () => {
        expect(testFunction(getInn12())).toBeTruthy();
    });

    it('Проверяем верный 12 значный ИНН с нулевым контрольным числом последним', () => {
        expect(testFunction(getInn12_zero())).toBeTruthy();
    });

    it('Проверяем верный 12 значный ИНН с нулевым контрольным числом 2 предпоследним', () => {
        expect(testFunction(getInn12_zero2())).toBeTruthy();
    });

    it('Проверяем верный 12 значный ИНН с нулевыми контрольными числами', () => {
        expect(testFunction(getInn12_zeroZero())).toBeTruthy();    });    

    it('Проверяем не верный 10 значный ИНН по контрольной сумме', () => {
        expect(testFunction(getInnBadCRCPos(getInn10(), 9))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn10_zero(), 9))).toBeFalsy();
    });

    it('Проверяем не верный 12 значный ИНН по контрольной сумме 1', () => {
        expect(testFunction(getInnBadCRCPos(getInn12(), 11))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zero(), 11) )).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zeroZero(), 11) )).toBeFalsy();        
    });

    it('Проверяем не верный 12 значный ИНН по контрольной сумме 2', () => {
        expect(testFunction(getInnBadCRCPos(getInn12(), 10))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zero2(), 10))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zeroZero(), 10))).toBeFalsy();
    });

    it('Проверяем не верный ИНН по длине', () => {
        expect(testFunction(getBadLongInn())).toBeFalsy();
        expect(testFunction(getBadLongInn11())).toBeFalsy();
        expect(testFunction(getBadShortInn())).toBeFalsy();
    });

    it('Проверяем не верный ИНН по символам', () => {
        expect(testFunction(getBadInnSymbol())).toBeFalsy();        
    });
});
