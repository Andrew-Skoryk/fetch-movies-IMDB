import { FC, useState } from 'react';
import Select from "react-select";
import watchedListActions from '../../api/watchedListService';
import './SelectRating.scss';

interface Mark {
  value: number;
  label: string;
  color: string;
};

const marks: Mark[] = [
  { value: 1, label: "1", color: "#800000" },
  { value: 2, label: "2", color: "#FFA500" },
  { value: 3, label: "3", color: "#CCCC00" },
  { value: 4, label: "4", color: "#008000" },
  { value: 5, label: "5", color: "#0000FF" },
];


type Props = {
  id: string;
  movieRating: number | null;
};

export const SelectRating: FC<Props> = ({ id, movieRating }) => {
  const defaultRating = marks.find((mark) => mark.value === movieRating) || null;
  const [rating, setRating] = useState<Mark | null>(defaultRating);

  const handleChange = (selectedOption: Mark | null) => {
    if (selectedOption) {
      setRating(selectedOption);
      watchedListActions.updateMovieRating(id, selectedOption.value);
    }
  };

const formatOptionLabel = (option: Mark) => (
  <div
    style={{
      color: option.color,
      textAlign: "center",
      fontSize: "18px",
    }}
  >
    {`Rating -- ${option.label}`}
  </div>
);

  return (
    <div className="button-cart">
      <Select
        value={rating}
        onChange={(selectedOption) => handleChange(selectedOption)}
        options={marks}
        backspaceRemovesValue={true}
        formatOptionLabel={formatOptionLabel}
        placeholder="Choose rating"
      />
    </div>
  );
};
