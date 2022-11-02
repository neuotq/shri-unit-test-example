export const testFunction = (inn) => {
    const innStr = String(inn)       
    
    if(innStr.length != 10 && innStr.length != 12 && !isIntegerString(innStr)) {        
        return false
    }
    
    if(innStr.length == 10) {
        return checkTenInn(innStr)
    }

    return checkTwelveInn(innStr)
};


const isIntegerString = str => /^\+?\d+$/.test(str)

const checkTenInn = innStr => {
    const innArr = Array.from(innStr)    
    const controlNum = parseInt(innArr.pop())
    const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8]
    
    const testNum = innArr.reduce(
      (prevVal, curVal, currIndex) => prevVal + curVal * weights[currIndex],
      0
    ) % 11;

    return testNum === controlNum || (controlNum === 0 && testNum > 9)
}

const checkTwelveInn = innStr => {
    const innArr = Array.from(innStr)    
    const controlNum1 = parseInt(innArr.pop())
    const weights1 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
    const testNum1 = innArr.reduce(
      (prevVal, curVal, currIndex) => prevVal + curVal * weights1[currIndex],
      0
    ) % 11;

    if(testNum1 !== controlNum1 || (controlNum1 !== 0 && testNum1 > 9)) {
      return false
    }
    
    const controlNum2 = parseInt(innArr.pop())
    const weights2 = [7, 2,	4, 10, 3, 5, 9, 4, 6, 8]
    

    const testNum2 = innArr.reduce(
        (prevVal, curVal, currIndex) => prevVal + curVal * weights2[currIndex],
        0
      ) % 11;

    return testNum2 === controlNum2 || (controlNum2 === 0 && testNum2 > 9)
}
