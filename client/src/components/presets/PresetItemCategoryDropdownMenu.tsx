import React from "react";
import { INewPreset } from "../../frontend-types/INewPreset";
import { IPreset } from "../../frontend-types/IPreset";
/* import {
  Bankfee,
  Commute,
  Salary,
  Insurance,
  ChildBenefit,
  Childcare,
  Food,
  Housing,
  Sport,
  Clothing,
  EntertainmentElectronics,
  EntertainmentSubscriptions,
  EntertainmentHobby,
  Phone,
  Internet,
  Computer,
  Giving,
  Studentloan,
  Electricalbill,
  Travel,
  Car,
} from '../layout/images/index'; */

//get categoryicon
/* const getCategoryIcon = (category) => {
  switch (category) {
    case 'Commute':
      return Commute;
    case 'Bank fee':
      return Bankfee;
    case 'Salary':
      return Salary;
    case 'Insurance':
      return Insurance;
    case 'Child benefit':
      return ChildBenefit;
    case 'Childcare':
      return Childcare;
    case 'Food':
      return Food;
    case 'Housing':
      return Housing;
    case 'Sport Activities':
      return Sport;
    case 'Clothing':
      return Clothing;
    case 'Entertainment Electronics':
      return EntertainmentElectronics;
    case 'Entertainment Subscriptions':
      return EntertainmentSubscriptions;
    case 'Entertainment Hobby':
      return EntertainmentHobby;
    case 'Phone':
      return Phone;
    case 'Internet':
      return Internet;
    case 'Computer':
      return Computer;
    case 'Giving':
      return Giving;
    case 'Student loan':
      return Studentloan;
    case 'Electrical bill':
      return Electricalbill;
    case 'Travel':
      return Travel;
    case 'Car':
      return Car;
    case 'Reminder Fee':
      return Car;
    default:
      return 'Select Category';
  }
}; */
interface PresetItemCategoryDropdownMenuProps {
  onDropdownClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  localpreset: INewPreset;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  category: string;
}

const PresetItemCategoryDropdownMenu = ({
  onDropdownClick,
  localpreset,
  onClick,
  category,
}: PresetItemCategoryDropdownMenuProps) => {
  const [active, setActive] = React.useState(false);
  // localpreset.markdelete !== undefined && console.log(localpreset.markdelete);
  return (
    <>
      <div
        className={
          localpreset.markdelete === false
            ? "dropdown"
            : localpreset.markdelete
            ? "dropdown disable__hover"
            : "dropdown"
        }
      >
        {/*  <button
        onClick={onClick}
      
        className={
          localpreset.category === 'Select Category' || localpreset.category === 'Select an category'
            ? localpreset.markdelete
              ? 'dropbtn markgraydelete disable__hover'
              : 'dropbtn'
            : localpreset.markdelete
            ? 'dropbtn__afterchosencategory markgraydelete disable__hover'
            : 'dropbtn__afterchosencategory'
        }
        style={
          localpreset.markdelete === undefined
            ? { border: 'none' }
            : localpreset.markdelete === true
            ? { border: '2px solid var(--light-color)' }
            : { border: '2px solid var(--primary-color)' }
        }
      >
        {category === 'Select Category' || category === 'Select an category' ? (
          'Select Category'
        ) : (
          <img
            src={getCategoryIcon(category)}
            alt=''
            style={{
              height: '20px',
              width: '20px',
            }}
            name='edit category'
            onClick={onClick}
                        className={localpreset.markdelete ? 'dropdown__categoryicon__grayedout' : 'dropdown__categoryicon'}
          />
        )}
      </button> */}
      </div>
      <button onClick={onClick} className="dropbtn">
        t
      </button>

      <div className={active ? "dropdown-content dropdown-active" : "dropdown-content"}>
        <button name="Commute" onClick={onDropdownClick}>
          Commute
        </button>
        <button name="Car" onClick={onDropdownClick}>
          Car
        </button>
        <button name="Travel" onClick={onDropdownClick}>
          Travel
        </button>
        <button name="Food" onClick={onDropdownClick}>
          Food
        </button>
        <button name="Housing" onClick={onDropdownClick}>
          Housing
        </button>
        <button name="Insurance" onClick={onDropdownClick}>
          Insurance
        </button>
        <button name="Child benefit" onClick={onDropdownClick}>
          Child Benefit
        </button>
        <button name="Childcare" onClick={onDropdownClick}>
          Childcare
        </button>
        <button name="Salary" onClick={onDropdownClick}>
          Salary
        </button>
        <button name="Sport Activities" onClick={onDropdownClick}>
          Sport Activities
        </button>
        <button name="Clothing" onClick={onDropdownClick}>
          Clothing
        </button>
        <button name="Entertainment Electronics" onClick={onDropdownClick}>
          Entertainment Electronics
        </button>
        <button name="Entertainment Subscriptions" onClick={onDropdownClick}>
          Entertainment Subscriptions
        </button>
        <button name="Entertainment Hobby" onClick={onDropdownClick}>
          Entertainment Hobby
        </button>
        <button name="Phone" onClick={onDropdownClick}>
          Phone
        </button>
        <button name="Internet" onClick={onDropdownClick}>
          Internet
        </button>
        <button name="Computer" onClick={onDropdownClick}>
          Computer
        </button>
        <button name="Giving" onClick={onDropdownClick}>
          Giving
        </button>
        <button name="Student loan" onClick={onDropdownClick}>
          Student loan
        </button>
        <button name="Electrical bill" onClick={onDropdownClick}>
          Electrical bill
        </button>
        <button name="Bank fee" onClick={onDropdownClick}>
          Bank fee
        </button>
        <button name="Reminder Fee" onClick={onDropdownClick}>
          Reminder Fee
        </button>
      </div>
    </>
  );
};
export default PresetItemCategoryDropdownMenu;
