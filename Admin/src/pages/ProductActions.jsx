import Navbar from "../components/Navbar.jsx";
import NewProduct from "../components/NewProduct.jsx";
import UpdateProduct from "../components/UpdateProduct.jsx";
import { useParams } from "react-router-dom";
export default function ProductActions(props) {
  const { id } = useParams();
  return (
    <div className="flex gap-3 w-full">
      <Navbar />
      {props.add ? <NewProduct /> : <UpdateProduct id={id} />}
    </div>
  );
}