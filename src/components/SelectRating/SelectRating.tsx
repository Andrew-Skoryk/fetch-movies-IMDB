import { FC, useState } from 'react';
import Select from "react-select";
import watchedListActions from '../../api/watchedListService';

interface Mark {
  value: number;
};

const marks: Mark[] = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

type Props = {
  id: string;
  movieRating: number | null;
};

export const SelectRating: FC<Props> = ({ id, movieRating }) => {
  const defaultRating = movieRating
    ? { value: movieRating }
    : null;
  const [rating, setRating] = useState<Mark | null>(defaultRating);

  const handleChange = (selectedOption: Mark | null) => {
    if (selectedOption) {
       setRating({ value: selectedOption.value });
      watchedListActions.updateMovieRating(id, selectedOption.value);
    }
  };

  return (
    <Select
      value={rating}
      onChange={(selectedOption) => handleChange(selectedOption)}
      options={marks}
      backspaceRemovesValue={true}
      getOptionLabel={(option: Mark) => option.value.toString()}
    />
  );
};
