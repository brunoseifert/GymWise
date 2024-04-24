import HeaderComponent from "@/components/Header";
import { DatePickerPopUp } from "@/components/ui/DatePicker";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const rating = [
  {
    title: "Massa Muscular",
    quantid: "33%",
  },
  {
    title: "Massa Magra",
    quantid: "43%",
  },
  {
    title: "Gordura Corporal",
    quantid: "23%",
  },
  {
    title: "Gordura Visceral",
    quantid: "13%",
  },
];

const RatingPage = () => {
  return (
    <div className="container">
      <div className="flex flex-col">
        <div>
          <div className="flex items-center justify-between">
            <Link to="/">
              <ChevronLeft className="text-white" />
            </Link>
            <HeaderComponent />
          </div>
          <img src="" alt="avaliação" height={300} width={600} />
        </div>

        <div className="space-y-4">
          <h1 className="text-white ">Treino A</h1>
          <div className="flex items-center gap-2">
            <Star className="text-primaryPurple" size={15} />
            <p className="text-grayThree text-sm">Treino de Peito</p>
          </div>
        </div>
        <Separator className="opacity-15 mt-6 mb-6" />
        <h1 className="text-white text-sm items-center mx-auto mb-6">
          Período de Avaliação
        </h1>
        <div className="flex items-center justify-around gap-4 mb-6 ">
          <DatePickerPopUp />
          <span className="text-grayThree text-sm">Até</span>
          <DatePickerPopUp />
        </div>
        <Separator className="opacity-15 mt-6 mb-6" />
        <div>
          {rating.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-white justify-between gap-4 mb-6"
            >
              <h1>{item.title}</h1>
              <h1 className=" bg-grayOne px-2 py-1 rounded-md">
                {item.quantid}
              </h1>
            </div>
          ))}
        </div>
        <Separator className="opacity-15 mt-6 mb-6" />
      </div>
    </div>
  );
};

export default RatingPage;
