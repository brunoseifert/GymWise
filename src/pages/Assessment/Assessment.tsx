import HeaderComponent from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SheetTrigger, Sheet } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Assessment: React.FC = () => {
    const navigate = useNavigate();

    const handleAnamnesis = () => {
        navigate("/dashboard/assessments/anamnesis");
    };

    return (
        <div className="container flex flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-grayThree">
                    <span className="text-primaryPurple uppercase">Gym </span>
                    Wise
                </h1>
                <HeaderComponent />
            </div>
            <Link to="/">
                <ChevronLeft className="text-white" />
            </Link>
            <Separator className="opacity-15" />
            <div className="container flex w-full">
                <div className="flex w-full flex-col">
                    <ul>
                        <li className="mb-2">
                            <Sheet >
                                <SheetTrigger className="w-full">
                                        <div className="w-full">
                                            <Card className="bg-secondaryBlack border-grayOne text-white">
                                                <CardContent className="py-0 flex px-0">
                                                    <div className="flex flex-col w-full gap-2 p-4">
                                                        <div>
                                                            <h2>
                                                                Anamnéses
                                                            </h2>
                                                        </div>

                                                        <Button onClick={handleAnamnesis} className="w-full bg-grayOne" variant="outline">
                                                            Ver
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                </SheetTrigger>
                            </Sheet>
                        </li>
                        <li>
                            <Sheet >
                                <SheetTrigger className="w-full">
                                    <Link to="/">
                                        <div className="w-full">
                                            <Card className="bg-secondaryBlack border-grayOne text-white">
                                                <CardContent className="py-0 flex px-0">
                                                    <div className="flex flex-col w-full gap-2 p-4">
                                                        <div>
                                                            <h2>
                                                                Avaliação por Imagens
                                                            </h2>
                                                        </div>

                                                        <Button className="w-full bg-grayOne" variant="outline">
                                                            Ver
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </Link>
                                </SheetTrigger>
                            </Sheet>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Assessment;
