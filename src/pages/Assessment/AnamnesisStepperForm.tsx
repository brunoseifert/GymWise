import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Anamnesis, answerAnamnesis } from "@/services/anamnesisService";
import { Input } from "@/components/ui/input";
import HeaderComponent from "@/components/Header";
import { Check, ChevronLeft } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const schema = z.object({
    anamnesisId: z.string().uuid("ID inválido"),
    answerItems: z.array(
        z.object({
            questionnaireId: z.string().uuid("ID inválido"),
            answer: z.string().min(1, "Resposta não pode ser vazia"),
        })
    ).min(1, "Deve haver pelo menos uma resposta"),
});

type FormData = z.infer<typeof schema>;

const timeInMsToShowAlert = 3000;

const AnamnesisStepperForm: React.FC = () => {
    const { user } = useAuth();
    const [formItem, setFormItem] = useState<number>(0);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const location = useLocation();
    const anamnesis: Anamnesis = location.state || {};
    const navigate = useNavigate();
    // Form
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {        
        answerAnamnesis(user!.id, data).then(res => {
            if (res?.status === 200) {
                setTimeout(() => {
                    setShowSuccessAlert(true)
                }, timeInMsToShowAlert);

                navigate("/")
            }
        })
    };

    // Handle Next and Previous
    const handleNext = () => {
        const currentAnswer = getValues().answerItems[formItem].answer;
        if (formItem == anamnesis.questionnare.length - 1 || !currentAnswer) {
            return;
        }

        const nextFormItemIndex = formItem + 1;
        setFormItem(nextFormItemIndex);
        setValue(`answerItems.${nextFormItemIndex}.answer`, '');
    }

    const handlePrevious = () => {
        if (formItem == 0) {
            return;
        }

        const previousFormItemIndex = formItem - 1;
        const previousAnswer = getValues().answerItems[formItem - 1].answer;
        setFormItem(previousFormItemIndex);
        setValue(`answerItems.${previousFormItemIndex}.answer`, previousAnswer);
    }

    const handlerPressEnterKey = (e: any) => {
        if (e.key === 'Enter') {
            return handleNext()
        }
    }

    const getFormItemPercent = Math.round(((formItem + 1) / anamnesis.questionnare.length) * 100);
    const hiddenNextButton = formItem + 1 == anamnesis.questionnare.length;
    const showSubmitButton = !hiddenNextButton;

    return (
        <div className="container flex flex-col text-white">
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
            <Separator className="opacity-15 pb-10" />
            <div className="flex-col flex pt-1 items-center">
                <p>{formItem + 1}  de {anamnesis.questionnare.length}</p>
                <Progress className="text-white" value={getFormItemPercent} />

                <form
                    className="flex-col pt-3 ">
                    <input hidden {...register('anamnesisId')} value={anamnesis.id} />

                    <Label>{anamnesis.questionnare[formItem].question}</Label>
                    <input
                        hidden
                        {...register(`answerItems.${formItem}.questionnaireId`)}
                        value={anamnesis.questionnare[formItem].id} />
                    <Input
                        onKeyDown={handlerPressEnterKey}
                        {...register(`answerItems.${formItem}.answer`)}
                        className="w-full bg-transparent border-b-[1px] border-grayThree text-white" />

                    {errors.answerItems?.[formItem]?.answer && (
                        <p>{errors.answerItems[formItem].answer?.message}</p>
                    )}

                    <div className="text-center">
                        <Button
                            disabled={formItem == 0}
                            type="button"
                            onClick={handlePrevious}
                            variant="ghost">
                            Voltar
                        </Button>
                        <button
                            type="button"
                            onClick={handleNext}
                            hidden={hiddenNextButton}
                        >
                            Próximo
                        </button>
                        <button
                            type="submit"
                            hidden={showSubmitButton}
                            onClick={handleSubmit(onSubmit)}>Enviar</button>
                    </div>
                </form>

                {showSuccessAlert &&
                    <Alert>
                        <Check color="green" />
                        <AlertTitle>Salvo com sucesso!</AlertTitle>
                        <AlertDescription>
                            Obrigado por responder
                        </AlertDescription>
                    </Alert>
                }
            </div>
        </div>
    );
}

export default AnamnesisStepperForm;
