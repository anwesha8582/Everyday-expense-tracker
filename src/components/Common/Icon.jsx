import {
  HiOutlineWallet,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineCake,
  HiOutlineBanknotes,
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

    default:
      return <HiOutlineWallet />;
  }
}

export default Icon;
