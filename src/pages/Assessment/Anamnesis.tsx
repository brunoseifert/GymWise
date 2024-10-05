import HeaderComponent from "@/components/Header";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PagedList } from "@/services/Common/Interfaces/PagedList";
import { Anamnesis as AnamnesisType, getAnamnesisByStudentId } from "@/services/anamnesisService";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Circle, EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Anamnesis: React.FC = () => {
    // TODO: Pegar Id do usuário do Contexto
    // const { user } = useAuth();
    useEffect(() => {
        getAnamnesisByStudentId("f7f3ffed-3bee-40f4-8fc0-499193fa3a74").then((data) => setData(data));
    }, []);

    const [data, setData] = useState<PagedList<AnamnesisType> | undefined>();

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
                            return item.questionnare.some(x => x.answer !== null)
                                ? (<CheckCircle color="green" />)
                                : (<Circle color="red" />);
                        }

                        return (
                            <TableRow >
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{checkAllIsAnswered()}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem >
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    <span>Abrir</span>
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
