interface checkValidProps {
  checkValue: string;
  mustInArr?: string[];
  mustNotArr?: string[];
}
export const checkValid = ({
  checkValue,
  mustInArr,
  mustNotArr,
}: checkValidProps) => {
  let mustIn = true,
    mustNot = false;
  if (mustInArr) {
    mustIn = mustInArr?.includes(checkValue);
  }
  if (mustNotArr) {
    mustNot = mustNotArr?.includes(checkValue);
  }
  return mustIn && !mustNot;
};
