import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";

const RatingItem = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="min-w-full">
          <Card className="min-w-full bg-secondaryBlack border-grayOne text-white">
            <CardContent className="py-0 flex px-0">
              <div className="flex flex-col w-full gap-2 p-4">
                <img
                  src=""
                  alt="Rating Grafic"
                  className=" w-full h-40 object-cover"
                />

                <Button className="w-full bg-grayOne" variant="outline">
                  Ver Avaliação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetTrigger>
    </Sheet>
  );
};

export default RatingItem;
