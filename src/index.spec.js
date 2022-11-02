import {testFunction} from '.';
const goodInn10 = [
    6702838316,
    6117254255,
    2736366872,
    7563045020,
    '0913766388',
    4838182483,
    9107181170,
    4815497818,
    1017313194,
    5370771751,
    1088834411,
    8621976791,
    8180872644
]

const goodInn12 = [
    471439872630,
    518835114323,
    104672257783,
    544753898929,
    578770001983,
    686738171802,
    206538749770,
    338502122766,
    474570151004,
    141356890821,
    674930910030,
    642808931736,
    436029480336
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const getInn10 = () => goodInn10[getRandomInt(goodInn10.length)]
const getInn10BadCRC = () => goodInn10[getRandomInt(goodInn10.length)] + getRandomInt(8)+1

const getInn12 = () => goodInn12[getRandomInt(goodInn12.length)]
const getInn12BadCRC = () => goodInn12[getRandomInt(goodInn12.length)] + getRandomInt(8)+1

const getBadLongInn = () => Math.floor(getRandomInt(goodInn12.length) * (getRandomInt(10)+1) * 10)
const getBadShortInn = () => Math.floor(getRandomInt(goodInn10.length) / (getRandomInt(10)+1) * 10)
const getBadInnSymbol = () =>  'f' + String(getInn10).slice(1)

describe('Проверяем функцию валидации ИНН', () => {
    it('Проверяем верный 10 значный ИНН', () => {
        expect(testFunction(getInn10())).toBeTruthy();
    });    

    it('Проверяем верный 12 значный ИНН', () => {
        expect(testFunction(getInn12())).toBeTruthy();
    });

    it('Проверяем не верный 10 значный ИНН по контрольной сумме', () => {
        expect(testFunction(getInn10BadCRC())).toBeFalsy();
    });

    it('Проверяем не верный 12 значный ИНН по контрольной сумме', () => {
        expect(testFunction(getInn12BadCRC())).toBeFalsy();
    });

    it('Проверяем не верный ИНН по длине', () => {
        expect(testFunction(getBadLongInn())).toBeFalsy();
        expect(testFunction(getBadShortInn())).toBeFalsy();
    });

    it('Проверяем не верный ИНН по символам', () => {
        expect(testFunction(getBadInnSymbol())).toBeFalsy();        
    });
});
