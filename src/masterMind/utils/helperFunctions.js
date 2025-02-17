/// Chunking array
export const chunk = (array, size) => {
  const chunkedArr = [];
  let i = 0;
  while (i < array.length) {
    chunkedArr.push(array.slice(i, size + i));
    i += size;
  }
  return chunkedArr;
};

/// Push to the beginning of array instead of nulls
export const pushElementsFromBeginingToRight = (array, element) => {
  let tempArr = [...array];
  let index = tempArr.findIndex((el) => el === null);
  tempArr[index] = element;
  return tempArr;
};

/// Check if winning and guessing arrays are matching
export const compareArrays = (arr1, arr2) => {
  const result = [];
  const copyArr1 = [...arr1];
  const copyArr2 = [...arr2];

  arr2.forEach((el, i) => {
    if (
      typeof el !== "string" &&
      copyArr1.includes(el) &&
      copyArr1.findIndex((elem, ind) => elem === el && ind === i) !== -1
    ) {
      result.push("red");
      copyArr1[i] = "red";
      copyArr2[i] = "red";
    }
  });
  copyArr2.forEach((el, i) => {
    if (typeof el !== "string" && copyArr1.includes(el)) {
      result.push("yellow");
      copyArr1[copyArr1.indexOf(el)] = "yellow";
      copyArr2[i] = "yellow";
    }
  });
  copyArr2.forEach((el, i) => {
    if (typeof el !== "string" && !copyArr1.includes(el)) {
      result.push("black");
      copyArr2[i] = "black";
    }
  });
  return result;
};

export const checkIfCombinationIsMatching = (array, winning) => {
  let matchingResultsArray = [];

  array.forEach((arrElem) => {
    if (arrElem.every((one) => one !== null)) {
      matchingResultsArray.push(...compareArrays(arrElem, winning));
    }
  });
  return matchingResultsArray;
};

/// Group users per their position
export const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const getPositionOfUsers = (users) => {
  const fetchedUsersInArray = [];
  for (let key in users) {
    fetchedUsersInArray.push({
      ...users[key],
      id: key,
    });
  }
  fetchedUsersInArray.sort((a, b) => b.score - a.score);

  const groupedUsersByScore = groupBy(fetchedUsersInArray, "score");
  const keys = Object.keys(groupedUsersByScore)
    .map((el) => Number(el))
    .sort((a, b) => b - a);

  fetchedUsersInArray.forEach((el) => {
    keys.forEach((elem) => {
      if (el.score === elem) {
        el.position = keys.indexOf(elem) + 1;
      }
    });
  });
  return fetchedUsersInArray;
};

/// get winning combination in main Mastermind file
export const getWinnigCombination = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 6));
};
