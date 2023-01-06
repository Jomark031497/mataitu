// Creating this helper because tailwind is having a meltdown when interpolating values with arbitrary values

const getColor = (color: string) => {
  return colors.find((item) => item.label.toLowerCase() === color.toLowerCase());
};

export const colors = [
  {
    label: "Orange",
    value: "text-orange-500",
  },
  {
    label: "Blue",
    value: "text-blue-500",
  },
  {
    label: "Red",
    value: "text-red-500",
  },
  {
    label: "Yellow",
    value: "text-yellow-700",
  },
  {
    label: "Black",
    value: "text-black",
  },
  {
    label: "Gray",
    value: "text-gray-500",
  },
  {
    label: "Violet",
    value: "text-violet-500",
  },
  {
    label: "Green",
    value: "text-green-500",
  },
];

export default getColor;
