export const invertColor = (color, {red = true, green = true, blue = true} = {}) => {
    if (typeof color === 'string') {
      let values = [];
     
      if (color[0] === '#') {
        if (color.length === 4) {
          values[0] = color.substring(1, 2)
          values[1] = color.substring(2, 3)
          values[2] = color.substring(3, 4)
        } else if (color.length === 7) {
          values[0] = color.substring(1, 3)
          values[1] = color.substring(3, 5)
          values[2] = color.substring(5, 7)
        } else if (color.length === 9) {
          values[0] = color.substring(1, 3)
          values[1] = color.substring(3, 5)
          values[2] = color.substring(5, 7)
        } 
        
        if (values.length !== 0) {
          const hexTable = {
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
            '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            a: 10 , b: 11, c: 12, d: 13, e: 14, f: 15
          }
          values = values.map( value => {
            return hexTable[value[0]] * hexTable[value[1]]
          })
        }

      } else if (color.substring(0,3).toUpperCase() === 'RGB'){
        const valuesStart = color.indexOf('(') + 1;
        const valuesEnd = color.indexOf(')');
        values = color.substring(valuesStart, valuesEnd).split(',');
      }
      
      if (values.length === 0) return;

      const redValue = red ? 128 : 0;
      const greenValue = green ? 128 : 0;
      const blueValue = blue ? 128 : 0;

      let outputValue = 'rgba(';
      outputValue += ((parseInt(values[0]) + redValue) % 255).toString() + ',';
      outputValue += ((parseInt(values[1]) + greenValue) % 255).toString() + ',';
      outputValue += ((parseInt(values[2]) + blueValue) % 255).toString() + ',';
      outputValue += (1).toString();
      outputValue += ')';

      return outputValue;
    } 
  }
