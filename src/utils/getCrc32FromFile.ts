const crc32Final = (crc: number) => {
  crc = ~crc
  crc = (crc < 0) ? (0xFFFFFFFF + crc + 1) : crc
  return crc
}

const addByte = (table: number[], crc: number, byte: number) =>  {
  return (crc >>> 8) ^ table[(byte) ^ (crc & 0x000000FF)]
};

const crc32Generate = (reversedPolynomial: number) => {
  let table = [];
  let i, j, n;

  for (i = 0; i < 256; i++) {
    n = i
    for (j = 8; j > 0; j--) {
      if ((n & 1) === 1) {
        n = (n >>> 1) ^ reversedPolynomial
      } else {
        n = n >>> 1
      }
    }
    table[i] = n
  }

  return table
}

const toHex = function (decimal: number) {
  let len = 8;
  var num = decimal < 0 ? (0xFFFFFFFF + decimal + 1) : decimal
  var hex = num.toString(16).toUpperCase()
  var pad = hex.length < len ? len - hex.length : 0
  return "0".repeat(pad) + hex;
}

export const getCrc32FromFile = (data: ArrayBuffer): string => {
  const dataView = new DataView(data);
  const table = crc32Generate(3988292384);
  let crc = 0;
  let i;

  crc = 0xFFFFFFFF;

  for (i = 0; i < dataView.byteLength; i++)
      crc = addByte(table, crc, dataView.getUint8(i))

  crc = crc32Final(crc);
  return toHex(crc)
}
