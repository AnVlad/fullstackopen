import { Visibility } from '../types';

interface VisibilityProps {
  visibility: Visibility;
  setVisibility: (value: Visibility) => void;
}

const VisibilityForm: React.FC<VisibilityProps> = ({
  // eslint-disable-next-line react/prop-types
  visibility,
  // eslint-disable-next-line react/prop-types
  setVisibility,
}) => {
  const visibilityList = Object.values(Visibility).map((value) =>
    value.toString()
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedElement = event.target.value as Visibility;
    setVisibility(selectedElement);
  };

  return (
    <div>
      <p>visibility: </p>
      {visibilityList.map((element) => {
        return (
          <div key={element}>
            <input
              type='radio'
              name='visibility'
              checked={visibility === element}
              value={element}
              id={element}
              onChange={handleRadioChange}
            />
            <label htmlFor='visibility'>{element}</label>
          </div>
        );
      })}
    </div>
  );
};

export default VisibilityForm;
