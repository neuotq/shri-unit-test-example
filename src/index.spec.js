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


const goodInn12_zerozero = [
    549737680900
]


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const getInn10 = () => goodInn10_nonzero[getRandomInt(goodInn10_nonzero.length)]
const getInn10_zero = () => goodInn10_zero[getRandomInt(goodInn10_zero.length)]

const getInnBadCRCPos = (inn, pos = -1) => 
 {
    const innStr = String(inn)    
    const newCrc = String( parseInt(innStr.at(pos)) + 1 )
    return innStr.substring(0, pos) +
        newCrc +
        innStr.substring(pos + 1);
 }

const getInn12 = () => goodInn12_nonzero[getRandomInt(goodInn12_nonzero.length)]
const getInn12_zero = () => goodInn12_zero[getRandomInt(goodInn12_zero.length)]
const getInn12_zero2 = () => goodInn12_zero2[getRandomInt(goodInn12_zero2.length)]
const getInn12_zerozero = () => goodInn12_zerozero[getRandomInt(goodInn12_zerozero.length)]


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
        expect(testFunction(getInn12_zerozero())).toBeTruthy();    });    

    it('Проверяем не верный 10 значный ИНН по контрольной сумме', () => {
        expect(testFunction(getInnBadCRCPos(getInn10()))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn10_zero()))).toBeFalsy();
    });

    it('Проверяем не верный 12 значный ИНН по контрольной сумме', () => {
        expect(testFunction(getInnBadCRCPos(getInn12()) )).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zero()) )).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zerozero()) )).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12(), -2))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zero2(), -2))).toBeFalsy();
        expect(testFunction(getInnBadCRCPos(getInn12_zerozero(), -2))).toBeFalsy();
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
