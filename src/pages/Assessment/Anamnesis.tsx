import HeaderComponent from "@/components/Header";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PagedList } from "@/services/Common/Interfaces/PagedList";
import { Anamnesis as AnamnesisType, getAnamnesisByStudentId, Questionnare } from "@/services/anamnesisService";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Circle, EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Anamnesis: React.FC = () => {
    const { user } = useAuth();

    useEffect(() => {
        getAnamnesisByStudentId(user!.id, false).then((data) => setData(data));
    }, []);

    const [data, setData] = useState<PagedList<AnamnesisType> | undefined>();

    const navigate = useNavigate();

    const goToForm = (anamnesis: AnamnesisType) => {
        navigate('form', { state: anamnesis });
    }

    const canAnswered = (anamnesis: AnamnesisType): boolean => {
        return anamnesis.questionnare.length > 0
            && anamnesis.questionnare.some(x => x.answer !== null);
    }

    return (
        <div className="container flex flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-grayThree">
                    <span className="text-primaryPurple uppercase">Gym </span>
                    Wise
                </h1>
                <HeaderComponent />
            </div>
            <Link to="/dashboard/assessments">
                <ChevronLeft className="text-white" />
            </Link>
            <Separator className="opacity-15" />
            <Table>
                <TableCaption>Anamneses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Finalizado</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium text-white">
                    {data ? data?.items.map(item => {
                        function checkAllIsAnswered(): React.ReactNode {
                            return canAnswered(item)
                                ? (<Circle color="red" />)
                                : (<CheckCircle color="green" />);
                        }

                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{checkAllIsAnswered()}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                              variant="outline">
                                                <EllipsisVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="text-center" >
                                                    <Button
                                                        disabled={!canAnswered(item)}
                                                        variant="outline"
                                                        onClick={() => goToForm(item)}>
                                                        Responder
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    }) : <span>Carregando ...</span>}
                </TableBody>
            </Table>
        </div>

    );
}

export default Anamnesis;
