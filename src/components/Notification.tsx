import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MessageSquare, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { PagedList } from "@/services/Common/Interfaces/PagedList";
import { getUserNotifications, markUserNotificationAllAsRead, markUserNotificationAsRead, Notification as NotificationType } from "@/services/notificationsService";
import { NavLink } from "react-router-dom";

export const Notification = () => {
    const [data, setData] = useState<PagedList<NotificationType> | undefined>();
    const [iconColor, setIconColor] = useState<'white' | 'red'>('white');

    const { user } = useAuth();

    useEffect(() => {
        getUserNotifications(user!.id, false).then((data) => {
            setData(data);

            data?.items.length == 0
                ? setIconColor('white')
                : setIconColor('red')
        }
        );
    }, []);


    const handleUriNav = (notification: NotificationType): string => {
        if (notification.uri) {
            return notification.uri
        }

        switch (notification.type) {
            case 'AnamnesisCreatedIntegrationEvent':
                return '/dashboard/assessments/anamnesis'
            default:
                return '/'
        }
    }

    const handleMarkAsRead = (notification: NotificationType): void => {
        if (notification) {
            markUserNotificationAsRead(notification.id)
        }
    }

    const handleMarkAllAsRead = (): void => {
        markUserNotificationAllAsRead(user!.id);
        setIconColor('white');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    <Bell color={iconColor} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {data?.items.length ?
                    data?.items.map(notification =>
                    (<DropdownMenuGroup>
                        <NavLink to={handleUriNav(notification)}
                            onClick={() => handleMarkAsRead(notification)}>
                            <DropdownMenuItem >
                                <span>{notification.title}</span>
                                <DropdownMenuShortcut>
                                    <MessageSquare />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </NavLink>
                    </DropdownMenuGroup>)
                    ) :
                    <DropdownMenuGroup>
                        <DropdownMenuItem >
                            <span>Nenhum notificação</span>
                            <DropdownMenuShortcut>
                                <MessageSquare />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                }
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem disabled={iconColor == 'white'} >
                            <Button variant="outline"
                                onClick={() => handleMarkAllAsRead()}>
                                Marcar todas como lidas
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
