import {
  HiOutlineWallet,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineCake,
  HiOutlineBanknotes,
  HiOutlineTruck,
  HiOutlineHeart,
  HiOutlineFilm,
  HiOutlineBolt,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlinePlayCircle,
  HiOutlineCube,
} from "react-icons/hi2";

function Icon({ name }) {
  switch (name) {
    case "wallet":
      return <HiOutlineWallet />;

    case "grocery":
      return <HiOutlineShoppingCart />;

    case "shopping":
      return <HiOutlineShoppingBag />;

    case "restaurant":
      return <HiOutlineCake />;

    case "budget":
      return <HiOutlineBanknotes />;

    case "travel":
      return <HiOutlineTruck />;

    case "medical":
      return <HiOutlineHeart />;

    case "entertainment":
      return <HiOutlineFilm />;

    case "bills":
      return <HiOutlineBolt />;

    case "transportation":
      return <HiOutlineTruck />;

    case "education":
      return <HiOutlineAcademicCap />;

    case "personalCare":
      return <HiOutlineSparkles />;

    case "subscriptions":
      return <HiOutlinePlayCircle />;

    case "other":
      return <HiOutlineCube />;

    default:
      return <HiOutlineWallet />;
  }
}

export default Icon;
