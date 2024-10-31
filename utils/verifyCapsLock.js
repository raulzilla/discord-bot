const verifyCapsLock = (msg) => {
  const msgSplit = msg.split("");
  const arr = { isUp: [], isNotUp: [] };
  msgSplit.map((item) => {
    if (/^[A-Z]*$/.test(item)) {
      arr.isUp.push(item);
    } else {
      arr.isNotUp.push(item);
    }
  });
  if (arr.isUp.length > arr.isNotUp.length) {
    return true;
  } else {
    return false;
  }
};

export default verifyCapsLock;
