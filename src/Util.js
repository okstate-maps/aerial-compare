export function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

export function moveWithinArray(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

